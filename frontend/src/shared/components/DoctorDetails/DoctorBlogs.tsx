import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserIdProp } from "../../../types/User"
import { fetchPublishedBlogs } from "../../../redux/features/blogs/blogSlice";
import { fetchCategories } from "../../../redux/features/categories/categorySlice";
import LoadingSpinner from "../../layout/ReactSpinner";
import { formattedDate } from "../../models";
import BlogsCards from "./DoctorBlogsCard";

const DoctorBlogs: React.FC<UserIdProp> = ({ id, tagss, blogId }) => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector((state) => state.categories.list)
    const blogs = useAppSelector((state) => state.blog.list)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchPublishedBlogs())
            .then(() => setLoading(false));
        dispatch(fetchCategories());
    }, [dispatch])

    const filterBlogs = () => {
        if (id) {
            return blogs?.filter(blog => blog?.authorId === id && blog?.status === 'publish');
        } else if (tagss) {
            return blogs.filter(blog =>
                blog?.tags.some((tag: any) => tagss.includes(tag)) &&
                blog?._id !== blogId &&
                blog?.status === 'publish'
            );
        }
        return [];
    };

    return (
        <div>
            {loading ? <LoadingSpinner /> : (
                <>
                    {filterBlogs().length === 0 ? 'No blogs found from the doctor' : (
                        <div className="dr-blogs-list mb-4">
                            <div className="dr-blog-lists">
                                <div className="dr-blogs row ">
                                    <div className="dr-blog d-flex flex-column">
                                        {filterBlogs().map((blog) => {
                                            const buffer = blog?.image.data;
                                            const binary = buffer.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
                                            const base64Image = btoa(binary);
                                            const category = categories.find(category => category._id === blog.categoryId)
                                            const categoryName = category ? category.categoryName : 'Unknown';
                                            return (
                                                <BlogsCards key={blog._id} title={blog.title}
                                                    image={`data:image/jpeg;base64,${base64Image}`}
                                                    createdAt={formattedDate(blog.createdAt)}
                                                    categoryId={categoryName}
                                                    id={blog?._id}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DoctorBlogs;
