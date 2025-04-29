import bannerphoto from '../../shared/media/images/bannerphoto3.jpg'
import Banner from '../../shared/components/Banner';
import HomeSlider from '../../shared/components/HomeSlider';
import HomeFeatures from '../../shared/components/HomeFeatures';
import AccordionFAQ from '../../shared/components/Accordion/AccordionFAQ';
import Footer from '../../shared/layout/Footer';
import { Helmet } from 'react-helmet-async'
import logoicon from '../../shared/media/images/logoicon.png'

const Home = () => {
  return (
    <div className="home-container">
      < Helmet >
        <title>Home</title>
        <link rel="icon" href={logoicon} />
      </Helmet >


      <Banner className='banner fs-sm' title="Consult Specialist Doctors Online" description={'We aim to provide affordable and easily accessible virtual health-care for you and your family round the clock with the help of our board-certified online doctors.'} img={bannerphoto} />
      <HomeSlider />
      <div className='home-body'>
        <HomeFeatures />
        <div className='d-flex flex-column align-items-center qna'>
          <h1 className='mb-4'>Frequently Asked Questions</h1>
          <AccordionFAQ />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
