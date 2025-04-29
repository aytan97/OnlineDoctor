import List from "./addedAvailabilityList";

type DoctorAvailabilitiesProps = {
  id: string;
};
const DoctorAvailabilities: React.FC<DoctorAvailabilitiesProps> = ({ id }) => {
  return (
    <div className="availabilities p-3 ">
      <div className="d-flex price align-items-center justify-space-between">
        <span>Call Price </span>
        <span>100 AZN</span>
      </div>

      <div className="time-slots mt-2">
        <p>Available time slots:</p>
        <div className="doctor-availability-list">
          <List id={id} />
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilities;
