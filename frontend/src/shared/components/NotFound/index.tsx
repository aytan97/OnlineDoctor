import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Image } from "antd";
import notfoundimage from '../../media/images/communication.png';
const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (

        <div className='notfound d-flex flex-column justify-center align-items-center'>
            <Image
                width={200}
                src={notfoundimage}
                preview={false}
            />
            <Result
                className='result d-flex flex-column justify-center align-items-center'
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" style={{ backgroundColor: 'var(--primary-color)' }} onClick={() => navigate('/')}>Back Home</Button>}
            />
        </div>

    );
};

export default NotFound;