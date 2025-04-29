import { AppointmentCard } from "../../shared/models";
import { Link } from "react-router-dom";


const AppointmentsCard: React.FC<AppointmentCard> = ({
  doctorid,
  patientid,
  name,
  photo,
  scpeicialities,
  hospital,
  date,
  time,
}) => {
  return (
    <div className="p-3  app-item">
      <div className="image">
        <img src={photo} alt={name} />
      </div>
      <div className="appointment-info">
        <h2 className="card-header">{name}</h2>

        <div className="d-flex flex-column">
          <span className="speciality rounded" >{scpeicialities}</span>
        </div>

        <p className="hospital ">{hospital}</p>
        <div className="date-time mt-1">
          <p><i>date:</i> {date}</p>
          <p><i>time:</i> {time}</p>
        </div>
        <Link to={`/callDetails/${doctorid}/${patientid}`} className="go-details mt-1">
          <i className="fa-solid fa-arrow-right"></i>
          <span>Join</span>
        </Link>

      </div>
    </div>
  )
}

export default AppointmentsCard
