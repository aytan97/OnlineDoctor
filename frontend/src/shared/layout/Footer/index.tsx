import { Link } from 'react-router-dom'
import logo2white from '../../media/images/logo2white.png'
const Footer = () => {
    return (
        <div className="footer-items">
            <div className='nav-logo'><img src={logo2white} /></div>
            <div className="contact-details">

                <p >We aim to provide affordable, on-demand virtual healthcare accessible 24/7 for you and your family, led by our certified online physicians.</p>
                <div className="contacts">
                    <div className="email-call">
                        <span><i className="fa-solid fa-envelope-open-text"></i>
                            <a href="mailto:info@tabib.gov.az" className='contact-detail text-decoration'>info@tabib.gov.az</a>
                        </span>
                        <span><i className="fa-solid fa-phone-volume"></i>
                            <Link to="tel:(012) 815" className='contact-detail text-decoration'>(012) 815</Link></span>
                    </div>
                    <div className="social-medias">
                        <span> <Link to="https://www.facebook.com/" className='contact-detail  text-decoration'><i className="fa-brands fa-square-facebook"></i></Link></span>
                        <span><Link to="https://www.youtube.com/" className='contact-detail  text-decoration'><i className="fa-brands fa-square-youtube"></i></Link></span>
                        <span><Link to="https://www.instagram.com" className='contact-detail  text-decoration'><i className="fa-brands fa-instagram"></i></Link></span>
                        <span><Link to="https://twitter.com/" className='contact-detail  text-decoration'><i className="fa-brands fa-square-twitter"></i></Link></span>
                    </div>
                </div>
            </div>
            <div className="company">
                <h2>Company</h2>
                <Link to='/' className='nav-item  text-decoration' >About Us</Link>
                <Link to='/blogs' className='nav-item  text-decoration'>Blogs</Link>
                <Link to='/talkToDoctor' className='nav-item  text-decoration'>Doctors</Link>

            </div>
            <div className="support">
                <h2>Support</h2>
                <span>
                    <a href="mailto:helpdesk@tabib.gov.az" className='contact-detail text-decoration'>Help Center</a>
                </span>
                <span>
                    <Link to="tel:(012) 815" className='contact-detail text-decoration'>Contact Us (ext-111)</Link></span>
            </div>
        </div>
    )
}

export default Footer


{/* <div className="email-call">
                <span><i className="fa-solid fa-envelope-open-text"></i>example@test.com</span>
                <span><i className="fa-solid fa-phone-volume"></i>(012)112</span>
            </div>
            <div className="social-medias">
                <span><i className="fa-brands fa-square-facebook"></i></span>
                <span><i className="fa-brands fa-square-youtube"></i></span>
                <span><i className="fa-brands fa-instagram"></i></span>
                <span><i className="fa-brands fa-square-twitter"></i></span>
            </div> */}