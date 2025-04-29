import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CardComponents from '../Card';
import { acidity, breastfeeding, cardiac, childinfant, diabetes, generalphs, neurology, ortho, physc, skinprobs, stressmgmnt, weightmgmnt } from '../../media/images';
import { settings } from '../../constants/settings';

const HomeSlider = () => {
    return (
        <div className="home-slider">
            <Slider {...settings}>
                <div>
                    <CardComponents title="Dermatologist" icon={skinprobs} />
                </div>
                <div>
                    <CardComponents title=" Gastroenterologist" icon={acidity} />
                </div>
                <div>
                    <CardComponents title=" Psychiatrist" icon={physc} />
                </div>
                <div>
                    <CardComponents title=" General Physician" icon={generalphs} />
                </div>
                <div>
                    <CardComponents title=" Neurologist" icon={neurology} />
                </div>
                <div>
                    <CardComponents title="Pediatrics" icon={childinfant} />
                </div>
                <div>
                    <CardComponents title="Orthopedics" icon={ortho} />
                </div>
                <div>
                    <CardComponents title="Diabetologist" icon={diabetes} />
                </div>
                <div>
                    <CardComponents title="Cardiologist" icon={cardiac} />
                </div>
                <div>
                    <CardComponents title="Weight Management" icon={weightmgmnt} />
                </div>
                <div>
                    <CardComponents title="Breast feeding advice" icon={breastfeeding} />
                </div>
                <div>
                    <CardComponents title="Stress and Mental Health" icon={stressmgmnt} />
                </div>
            </Slider>
        </div>
    )
}

export default HomeSlider
