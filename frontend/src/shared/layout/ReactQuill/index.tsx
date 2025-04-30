import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { blogSchema } from '../../../validation'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { fetchCategories } from '../../../redux/features/categories/categorySlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Image, Popconfirm, Select } from 'antd'
import { TAGS } from '../../constants/BlogTags'
import { formats, modules } from '../../constants/ReactQuillForm'
import { WriteBlogFormInput } from '../../../types/FormTypes'
import useImageUpload from '../../custom/ImageUpload'
import { addBlog, fetchBlog, getMyBlogs, updateBlog } from '../../../redux/features/blogs/blogSlice'
import { Helmet } from 'react-helmet-async'
import logoicon from '../../media/images/logoicon.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
for (let i = 23; i < 36; i++) {
    TAGS.push(i.toString(36) + i)
}

const Editor = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const categories = useAppSelector((state) => state.categories.list)
    const blog = useAppSelector((state) => state.blog.selected)
    const blogs = useAppSelector((state) => state.blog.list)
    const selectRef = useRef<HTMLInputElement | null>(null);
    const [isDraft, setIsdraft] = useState('')
    const { imageBase64, handleFileUpload, setImageBase64 } = useImageUpload();
    const isUpdating = location.pathname === `/writeBlog/${id}`;


    const {
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        control,
        setError
    } = useForm<WriteBlogFormInput>({ resolver: yupResolver(blogSchema) })

    const handleBeforeUnload = (event: any) => {
        if (isDirty || imageBase64 !== undefined) {
            event.preventDefault();
            event.returnValue = "";
            localStorage.removeItem('updatedProfileImage')
            localStorage.removeItem('updatedBlogImage')

        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);

        };
    }, [isDirty]);

    useEffect(() => {
        if (id) {
            dispatch(fetchBlog(id));
        }
        dispatch(fetchCategories())

    }, [dispatch, id])

    useEffect(() => {
        if (blog && id) {
            const { categoryId, title, description, image, body, status, tags } = blog;


            if (image && blog.image.data && Array.isArray(blog.image.data)) {
                const buffer = blog.image.data;
                const binary = buffer.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
                const base64Image = btoa(binary);
                setImageBase64(`data:image/jpeg;base64,${base64Image}`);
            }

            reset({
                categoryId: categoryId || '',
                title: title || '',
                description: description || '',
                body: body || '',
                status: status || '',
                tags: tags || [],
            });


            setIsdraft(status)
        }
    }, [blog, reset, id, setImageBase64]);



    const handleStatus = (status: string) => {
        setIsdraft(status)
    }

    const handleStatusChange = (value: string) => {
        setIsdraft(value)
    }



    const handleSubmitBtn = async (formResult: any) => {
        if (!formResult.tags || !formResult.tags.length) {
            setError('tags', {
                type: 'manual',
                message: 'Enter a tag for easy search result'
            });
            return;
        }
        if (imageBase64) {
            formResult.image = imageBase64;
        }

        formResult.status = isDraft;

        if (!isUpdating) {
            if (!blogs) {
                return <div>Loading...</div>;
            }
            console.log(formResult)
            dispatch(addBlog(formResult)).then(() => dispatch(getMyBlogs()))
            toast.success('New blog has been created!', {
                autoClose: 3000,
                position: "top-right",
            })

        } else if (id) {
            const _id = id
            dispatch(updateBlog({ _id, ...formResult })).then(() => dispatch(getMyBlogs()))
            toast.success('Changes updated successfully!', {
                autoClose: 3000,
                position: "top-right",
            })

            localStorage.removeItem('updatedProfileImage')
            localStorage.removeItem('updatedBlogImage')
        }
        reset();
        navigate('/myBlogs')
    };
    const handleImageUpload = () => {
        if (selectRef.current) {
            selectRef.current.click();
        }
    };


    const handleCancel = () => {
        localStorage.removeItem('updatedProfileImage')
        localStorage.removeItem('updatedBlogImage')
        navigate('/myBlogs');
    }




    return (
        <>
            <Helmet>
                <title>Write Blog</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            <div className="blog-details d-flex justify-center align-items-center pb-4 mt-2">
                <form onSubmit={handleSubmit(handleSubmitBtn)} className="editor  d-flex flex-column justify-space-between align-items-center">
                    <div className="d-flex flex-column  container justify-space-between align-items-center">
                        <div className="d-flex flex-row  justify-space-between mb-3 media">
                            <div className='form-group'>
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <Select
                                            style={{ width: '80%', height: '50px' }}
                                            className="mr-5 w-media"
                                            placeholder="Select Category"
                                            options={categories?.map((category) => ({
                                                value: category?._id,
                                                label: category?.departmentName,
                                            }))}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.categoryId && (
                                    <p className="error mt-1 ">{errors.categoryId.message}</p>
                                )}
                            </div>
                            <div className='form-group'>
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name="title"
                                    render={({ field }) => (
                                        <>
                                            <input
                                                // variant="filled"
                                                {...field}
                                                type="text"
                                                placeholder="Enter Title"
                                            />{' '}
                                        </>
                                    )}
                                />
                                {errors.title && <p className="error mt-1">{errors.title.message}</p>}
                            </div>
                        </div>
                        <div className="d-flex flex-row w-100  mb-2 media ">
                            <div className='form-group media-800'>
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <>
                                            <input
                                                // variant="filled"
                                                {...field}
                                                type="text"
                                                className="mr-5 "
                                                placeholder="Enter Description"
                                            />{' '}
                                        </>
                                    )}
                                />
                                {errors.description && (
                                    <p className="error mt-1">{errors.description.message}</p>
                                )}
                            </div>


                            <div className='form-group'>
                                <Controller
                                    control={control}
                                    name="img"
                                    render={({ field }) => (

                                        <div className='d-flex '>

                                            <div className="image-hidder" onClick={handleImageUpload}>
                                                Select image for your blog



                                                < input
                                                    {...field}
                                                    // variant="filled"
                                                    type="file"
                                                    ref={selectRef}
                                                    placeholder="Choose image"
                                                    onChange={(e) => handleFileUpload(e)}
                                                    value={''}
                                                />
                                            </div>

                                            <div className="blog-picture">
                                                {imageBase64 && (
                                                    <Image src={imageBase64} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />

                                                )}  </div>
                                        </div>



                                    )}
                                />

                            </div>


                        </div>
                        <div className='form-group d-flex flex-column w-100 media-tags '>
                            <Controller
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <Select
                                        mode="tags"
                                        options={TAGS?.map((tag) => ({
                                            value: tag,
                                        }))}
                                        placeholder="Add tags"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.tags && <p className="error mt-1">{errors.tags.message}</p>}

                        </div>
                        <div className=' media'>
                            <Controller
                                control={control}
                                defaultValue=""
                                name="body"
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        {...field}
                                        placeholder="Enter your blog here"
                                    />
                                )}
                            />
                            {errors.body && <p className="error">{errors.body.message}</p>}
                        </div>
                    </div>
                    <div className='btns w-100 d-flex justify-flex-end align-items-end '>




                        {!isUpdating ? (
                            <>
                                <Button
                                    htmlType="submit"
                                    className='mr-2'
                                    data-status="published"
                                    onClick={() => handleStatus("publish")}
                                >
                                    Publish
                                </Button>
                                <Button
                                    htmlType="submit"
                                    data-status="draft"
                                    onClick={() => handleStatus("draft")}
                                    className='mr-2'
                                >
                                    Save as draft
                                </Button></>
                        ) : (
                            <>
                                <Select
                                    defaultValue={blog?.status}
                                    style={{ width: 120, height: 50, fontSize: '20px !important' }}
                                    onChange={handleStatusChange}
                                    className='mt-2 mb-0'
                                    options={[
                                        { value: 'publish', label: 'Publish' },
                                        { value: 'draft', label: 'Draft' },
                                    ]}
                                />

                                <Button
                                    htmlType="submit"
                                    className='mr-2'

                                >
                                    Update
                                </Button>
                            </>
                        )}



                        <Popconfirm
                            title="Cancel the changes"
                            description="Are you sure to cancel the made changes?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={handleCancel}
                        >
                            <Button danger >Cancel</Button>
                        </Popconfirm>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}
export default Editor
