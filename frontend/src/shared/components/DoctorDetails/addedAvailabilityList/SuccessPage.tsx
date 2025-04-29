import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';


const SuccessResult: React.FC = () => (
    <>
        <div className='d-flex flex-column justify-center align-items-center'>
            <Result
                status="success"
                title="Successfully Purchased"
            />
            <Link to='/appointments' className='d-flex justify-center align-items-center ' style={{ color: 'var(--primary-color)' }}>See your appointments <i className="fa-solid fa-angle-right pl-1" style={{ color: 'var(--primary-color)', fontSize: '22px' }}></i></Link>
        </div>
    </>
);

export default SuccessResult;

