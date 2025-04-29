import { useNavigate } from 'react-router-dom'
import MyBlogsList from '../../shared/components/MyBlogsList/'
import { Button, ConfigProviderProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
type SizeType = ConfigProviderProps['componentSize'];
const MyBlogs = () => {
    const navigate = useNavigate()
    const [size, setSize] = useState<SizeType>('large');
    const handleClick = () => {
        navigate('/writeblog')
    }
    return (
        <div className="container my-blogs">
            <div className='d-flex flex-column'>
                <div className='mb-2'>
                    <Button onClick={handleClick} icon={<PlusOutlined />} size={size}>Write Blog</Button>
                </div>
                <div className=' my-blogs-list col-12'>
                    <h2 className='mb-2 ml-1' style={{ color: 'var(--primary-color)' }}>My Blogs</h2>
                    <div className='my-blogs-list'>
                        <MyBlogsList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBlogs
