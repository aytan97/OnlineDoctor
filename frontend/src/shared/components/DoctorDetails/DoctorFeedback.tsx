import { Button } from "antd";
import avatarprof from "../../media/images/avatarprof.svg";
import starIcon from "../../media/images/star-svgrepo-com.svg";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import { UserIdProp } from "../../../types/User";

const DoctorFeedback: React.FC<UserIdProp> = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div className="mb-5 reviews">
      <h4>Reviews (0)</h4>
      <div className="reviewers mb-3">
        <div className="reviewer">
          <div style={{ width: "150px" }}>
            <figure>
              {" "}
              <img src={avatarprof} alt="patient-photo" />
            </figure>
            <div>
              <h5>Patient name surname</h5>
              <p className="review-date">04-28-2024</p>
            </div>
          </div>
          <div className="reviewer-comment">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              perspiciatis placeat quidem quae voluptate mollitia ipsam
              architecto quas libero, tempore nesciunt dolore pariatur? Iure
              nemo maxime autem aperiam. Dolores accusamus eligendi natus. Illo
              sed reprehenderit impedit modi numquam culpa maiores animi
              quaerat! Obcaecati voluptates aspernatur, consequatur illum dicta
              officiis enim?
            </p>
          </div>

          <div className="d-flex align-items-center justify-center">
            <img src={starIcon} alt="" />
            <span style={{ fontSize: "20px", marginLeft: "10px" }}>5</span>
          </div>
        </div>
      </div>
      {!showFeedbackForm ? (
        <div className="give-feedback-form">
          <Button onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </Button>
        </div>
      ) : (
        <FeedbackForm />
      )}
    </div>
  );
};

export default DoctorFeedback;
