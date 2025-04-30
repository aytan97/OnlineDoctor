import { Link } from 'react-router-dom'
// import facebook from '../../media/socialmedia/facebook-svgrepo-com.svg'
const ContactDetails = () => {
    return (
        <div className="contacts row d-flex justify-space-between align-items-center">
            <div className="email-call col-lg-10">
                <span>
                    <a href="mailto:info@tabib.gov.az" className='contact-detail'><i className="fa-solid fa-envelope-open-text"></i><span className='d-xs-none'>info@tabib.gov.az</span></a>
                </span>
                <span>
                    <Link to="tel:(012) 815" className='contact-detail'><i className="fa-solid fa-phone-volume"></i><span className='d-xs-none'>(012) 815</span></Link></span>
            </div>
            <div className="social-medias col-lg-2 d-flex justify-flex-end">

                <span> <Link to="https://www.facebook.com/" className='contact-detail'><i className="fa-brands fa-square-facebook"></i></Link></span>
                <span><Link to="https://www.youtube.com/" className='contact-detail'><i className="fa-brands fa-square-youtube"></i></Link></span>
                <span><Link to="https://www.instagram.com" className='contact-detail'><i className="fa-brands fa-instagram"></i></Link></span>
                <span><Link to="https://twitter.com/" className='contact-detail'><i className="fa-brands fa-square-twitter"></i></Link></span>
            </div>
        </div>
    )
}

export default ContactDetails
