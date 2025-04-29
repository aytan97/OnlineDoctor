import { ICard } from "../../models";

const Banner: React.FC<ICard> = ({
  title, description, img, icon
}) => {
  return (
    <div className='banner_ px-4 py-3' style={{
      backgroundImage: `url(${img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      // height: '90vh',

    }}>
      <div className="banner-content">
        <h2 >{title}</h2>
        <img src={icon} />
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Banner
