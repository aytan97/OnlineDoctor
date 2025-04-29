
import { BCard } from '../../models';
import starIcon from '../../media/images/star-svgrepo-com.svg';
import { Link } from "react-router-dom";

const BlogsCards: React.FC<BCard> = ({
    id,
    categoryId,
    title,
    image,
    createdAt,
    avgRating,
    totalRating,
}) => {
    return (
        <div className="p-2 card-items">
            <div className="image">
                <img src={image} alt={title} />
            </div>
            <div className="blog-item-info">
                <div className=' blog-item-short'>
                    <h2 className="card-item-header mb-2">{title}</h2>
                    <div className="d-flex align-items-center ratings">
                        <span className="stars-rates ">
                            <img src={starIcon} alt="stars" /> {avgRating}
                        </span>
                        <span className="rate" >({totalRating || '0'})</span>
                    </div>

                    <div className="blog-item-intro d-flex align-items-center justify-space-between">
                        <div style={{ height: '50px' }}>
                            <p className="categoryId ">{categoryId}</p>
                            <p className="createdAt ">{createdAt}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <Link to={`/blogdetails/${id}`} className="goto-details mt-2 mr-3">
                        <i className="fa-solid fa-arrow-right"></i>
                        <span>Read</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default BlogsCards
