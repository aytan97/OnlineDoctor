import React, { useState } from 'react';
import arrowdropdown from '../../media/images/arrow-drop-down.svg'
import questionmark from '../../media/images/question-mark.svg'

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onItemClick = (index: any) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const renderedItems = items.map((item: any, index: any) => {
        const isActive = index === activeIndex ? 'active' : '';

        return (
            <React.Fragment key={index}>
                <div className={`title ${isActive} accordion`} onClick={() => onItemClick(index)}>
                    <img src={questionmark} alt="questionmark" className='question-mark' />
                    <div className='accordion-item'>   {item.title}</div>
                    <div className='accordion-icon'>
                        {isActive ? (
                            <img src={arrowdropdown} alt="dropdownicon" className='turn-180' />
                        ) : (
                            <img src={arrowdropdown} alt="dropdownicon" />
                        )}
                    </div>
                </div>
                <div className={`acc-content ${isActive}`} >
                    <p >{item.content}</p>
                </div>
            </React.Fragment>
        );
    });

    return <div>{renderedItems}</div>;
};

export default Accordion;