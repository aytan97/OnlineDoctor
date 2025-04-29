import { DCard } from "../../shared/models";
import starIcon from '../../shared/media/images/star-svgrepo-com.svg';
import { Link } from "react-router-dom";


const DoctorsCard: React.FC<DCard> = ({
  id,
  name,
  photo,
  scpeicialities,
  hospital,
  languageSkills,
  workExperience,
  avgRating,
  totalRating,
  totalPatients
}) => {
  return (
    <div className="p-3 lgp-5 card-item">
      <div className="image">
        <img src={photo} alt={name} />
      </div>
      <div className="doctor-info">
        <h2 className="card-header">{name}</h2>
        <p><i>{workExperience}</i></p>

        <div className="mt-2 details d-flex align-items-center justify-space-between">
          <div className="d-flex flex-column">
            <span className="speciality rounded" >{scpeicialities}</span>

            <span className="languages" >{languageSkills}</span>
          </div>
          <div className="d-flex align-items-center mr-1">
            <span className="stars ">
              <img src={starIcon} alt="stars" /> {avgRating}
            </span>
            <span className="rating" >({totalRating || '0'})</span>

          </div>
        </div>


        <div className="patients d-flex align-items-center justify-space-between">
          <div style={{ height: '50px' }}>
            <h3 className="totalPatients">+{totalPatients || '0'} patients</h3>
            <p className="hospital ">{hospital}</p>
          </div>

          <Link to={`/doctordetails/${id}`} className="go-details ">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorsCard
