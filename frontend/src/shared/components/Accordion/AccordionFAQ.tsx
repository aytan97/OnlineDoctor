import Accordion from './accordiontemplate';

const items = [
    {
        title: ' How do I schedule an online consultation with a doctor?',
        content: 'You can schedule an online consultation with a doctor by the help of video manual',
    },
    {
        title: 'How long does an online consultation typically last?',
        content: 'The duration of an online consultation may vary according to your symptoms. ',
    },
    {
        title: 'How do I pay for an online consultation?',
        content: 'Payments for the consultation can be made online during taking online appointment. ',
    },
];

const AccordionFAQ = () => {
    return (
        <div className='accordionfaq '>

            <Accordion items={items} />
        </div>
    );
};

export default AccordionFAQ;