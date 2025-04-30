import CardComponents from '../Card'
import receiptdoc from '../../media/images/receiptdoc.svg'
import support from '../../media/images/support.svg'
import finddoc from '../../media/images/finddoc.svg'
import scheduleappointment from '../../media/images/scheduleappointment.svg'
import remindmed from '../../media/images/remindmed.svg'
import onlnedoc from '../../media/images/onlnedoc.svg'
const HomeFeatures = () => {
    return (
        <div className='features d-flex row justify-center'>
            <CardComponents icon={onlnedoc} title='Healthcare Anywhere' description='Provides accessible and convenient healthcare services to individuals anytime and anywhere' />
            <CardComponents title='Easy Access to Prescriptions' icon={receiptdoc} description="Provides electron prescriptions to the user's preferred pharmacy for convenient pickup or delivery" />
            <CardComponents title='Immediate Support' icon={support} description="Provides round-the-clock access to healthcare professionals, ensuring that users can receive assistance whenever they need it" />
            <CardComponents title='Find a Doctor' icon={finddoc} description="Enabling users to effortlessly discover and connect with qualified healthcare professionals" />
            <CardComponents title='See Doctor Online' icon={scheduleappointment} description="Schedule online appointment and ask your medical queries from a medical expert via video consultations." />
            <CardComponents title='Medical reminders' icon={remindmed} description="Take your daily medications on time and never miss a dose with our reminders." />

        </div>
    )
}

export default HomeFeatures

