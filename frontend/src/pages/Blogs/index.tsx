import { Helmet } from 'react-helmet-async'
import logoicon from '../../shared/media/images/logoicon.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useEffect, useState } from 'react'
import { fetchUsers } from '../../redux/features/auth/authSlice'
import { fetchCategories } from '../../redux/features/categories/categorySlice'
import LoadingSpinner from '../../shared/layout/ReactSpinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMe } from '../../redux/features/auth/getMeSlice'
import Search, { SearchProps } from 'antd/es/input/Search'
import BlogsCard from './blogsCard'
import { fetchPublishedBlogs } from '../../redux/features/blogs/blogSlice'
import { formattedDate } from '../../shared/models'
import Footer from '../../shared/layout/Footer'
const Blogs = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.auth.list);
    const getme = useAppSelector((state) => state.getMe.user)
    const categories = useAppSelector((state) => state.categories.list)
    const category = useAppSelector((state) => state.categories.selected)
    const blogs = useAppSelector((state) => state.blog.list)
    const [notificationShown, setNotificationShown] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchPublishedBlogs())
            .then(() => setLoading(false));
        dispatch(fetchCategories())
        dispatch(getMe())
        dispatch(fetchUsers())
        if (!notificationShown) {
            toast.info("Welcome dear Doctor! If you do not find your blogs here, please make sure  the status of blog is PUBLISH, or you complited your data from My Profile", {
                autoClose: 10000,
                position: "top-right",
            });
            setNotificationShown(true);
        }
    }, [dispatch, notificationShown])


    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const author = Array.isArray(users) && users?.find((user) => Array.isArray(blogs) && blogs.find(blog => blog?.status === 'publish' && blog?.authorId === user._id))

    return (
        <>
            <Helmet>
                <title>Blogs</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            {loading ? <LoadingSpinner /> : (
                <>
                    {getme && getme?.data?.role === 'doctor' && getme?.data?.status === 'Waiting' && <ToastContainer />}
                    <div className='container d-flex align-item-center justify-center'>

                        <div className="blogs-list row d-flex align-item-center justify-center mb-4">
                            <div className="find-blog  d-flex align-item-center justify-center">      <Search placeholder="Find blogs" allowClear onSearch={onSearch} style={{ width: 500, zIndex: 0 }} />
                            </div>
                            <div className="blog-lists   d-flex align-item-center justify-center">
                                <div className="blogs  d-flex flex-column ">
                                    <div className="blog">
                                        {blogs && blogs?.map((blog) => {
                                            if (blog?.status === 'publish' && blog?.image && blog.image.data && Array.isArray(blog.image.data)) {
                                                const buffer = blog.image.data;
                                                const binary = buffer.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
                                                const base64Image = btoa(binary);
                                                const username = author ? `${author.firstname} ${author.lastname}` : 'Unknown';

                                                const category = categories?.find(category => category._id === blog?.categoryId)
                                                const categoryName = category ? category?.departmentName : '';
                                                return (
                                                    <BlogsCard key={blog._id} title={blog?.title}
                                                        image={`data:image/jpeg;base64,${base64Image}`}
                                                        description={blog?.description}
                                                        createdAt={formattedDate(blog?.createdAt)}
                                                        authorId={username}
                                                        categoryId={categoryName}
                                                        id={blog?._id}
                                                    />
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </>
    )
}

export default Blogs
