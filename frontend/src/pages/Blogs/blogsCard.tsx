import { BCard } from "../../shared/models";
import starIcon from '../../shared/media/images/star-svgrepo-com.svg';
import { Link } from "react-router-dom";


const BlogsCard: React.FC<BCard> = ({
  id,
  categoryId,
  title,
  description,
  image,
  body,
  authorId,
  status,
  tags,
  createdAt,
  avgRating,
  totalRating,
}) => {
  return (
    <div className="pt-2 lgp-5 card-item ">
      <div className="image">
        <img src={image} alt={title} />
      </div>

      <div className="blog-info">
        <h2 className="card-header mb-2">{title}</h2>
        <p className="description"><i>{description}</i></p>
        <div className="d-flex align-items-center rates">
          <span className="stars ">
            <img src={starIcon} alt="stars" /> {avgRating}
          </span>
          <span className="rating" >({totalRating || '0'})</span>
        </div>

        <div className="blog-intro d-flex align-items-center justify-space-between">
          <div style={{ height: '50px' }}>
            <h3 className="authorId">{authorId}</h3>
            <p className="categoryId ">{categoryId}</p>
            <p className="createdAt ">{createdAt}</p>
          </div>

        </div>
        <Link to={`/blogdetails/${id}`} className="go-details mt-2">
          <i className="fa-solid fa-arrow-right"></i>
          <span>Read</span>
        </Link>

      </div>
    </div>
  )
}

export default BlogsCard

