import React from 'react'
import cancelclose from '../../media/images/cancel-close.svg'
import { HeaderUserProps } from '../../models';

const HeaderNotification: React.FC<HeaderUserProps> = ({ onClose }) => {
    return (
        <div className="user-notification">
            <div className="notification-info">
                <h2>  Notifications</h2>
                <img className="cancel" src={cancelclose} alt="close" onClick={onClose} />
            </div>
            <div className='user-notification-detail'></div>
            {<p>There are no notifications at this time.</p>}
        </div>
    );
};

export default HeaderNotification

