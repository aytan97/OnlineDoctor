import {
  CallControls,
  CallingState,
  ParticipantView,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  StreamVideoParticipant,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import LoadingSpinner from "../../shared/layout/ReactSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGFydGhfQmFuZSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvRGFydGhfQmFuZSIsImlhdCI6MTcxNDg5Njc1NiwiZXhwIjoxNzE1NTAxNTYxfQ.x9k3j0I7vGxfXwANhTmFFmd8OdGn1cj9IFDVn1nNfiI";
const userId = "Darth_Bane";
const callId = "1YknbZUiGpga";

const user: User = {
  id: userId,
  name: "Aytan",
  image: "https://cdn-icons-png.flaticon.com/512/266/266033.png",
};

export const VideoConference = () => {
  const navigate = useNavigate();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [permissionsRequested, setPermissionsRequested] = useState(false);

  useEffect(() => {
    if (callingState === CallingState.JOINED && !permissionsRequested) {
      // Ask for video and mic permissions here
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          setPermissionsRequested(true);
        })
        .catch((error) => {
          console.error("Error getting user media:", error);
        });
    }
  }, [callingState, permissionsRequested]);
  if (callingState === CallingState.LEFT) {
    <LoadingSpinner />;
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
  if (callingState !== CallingState.JOINED) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <StreamTheme>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamTheme>
    </div>
  );
};

const CallApp = () => {
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("default", callId);
  call.join({
    create: true,
  });
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <VideoConference />
      </StreamCall>
    </StreamVideo>
  );
};
export default CallApp;

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        width: "100vw",
      }}
    >
      {participants.map((participant) => (
        <div style={{ width: "100%", aspectRatio: "3/2" }}>
          <ParticipantView
            muteAudio
            participant={participant}
            key={participant.sessionId}
          />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0,0,0,0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};
