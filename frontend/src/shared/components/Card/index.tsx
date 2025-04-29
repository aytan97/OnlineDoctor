import { ICard } from "../../models";

const CardComponents: React.FC<ICard> = ({
  title, description, img, icon
}) => {
  return (
    <div className='card_  px-4 py-3  text-center col-xs-12 col-sm-6 col-lg-4 col-lg-4 col-xxl-3' style={{
      backgroundImage: `url(${img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      <div className="card-content">
        <img src={icon} />
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default CardComponents
