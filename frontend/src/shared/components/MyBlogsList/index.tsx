import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Row,
    Table,
    Col,
    Button,
    TableProps,
    Dropdown,
    Space,
    Menu,
    Popconfirm,
} from "antd";
import { BlogType } from "../../../redux/features/blogs/type";
import {
    SearchOutlined,
    SettingOutlined,
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Card from "antd/es/card/Card";
import CustomModal from "../Modals";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteBlog, fetchBlog, getMyBlogs } from "../../../redux/features/blogs/blogSlice";
import BlogDetail from "./components/blogDetail";
import LoadingSpinner from '../../layout/ReactSpinner'
import { fetchCategories } from "../../../redux/features/categories/categorySlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { display } from "@mui/system";
const List: React.FC = () => {
    const [open, setOpen] = useState({
        open: false,
        content: "",
    });

    const dispatch = useAppDispatch();
    const myblogs = useAppSelector((state) => state.blog.list);
    const blog = useAppSelector((state) => state.blog.selected);
    const [loading, setLoading] = useState(true);
    const categories = useAppSelector((state) => state.categories.list);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMyBlogs())
            .then(() => setLoading(false));
        dispatch(fetchCategories())
    }, [dispatch]);

    const onDetailsHandle = useCallback(
        (e: boolean, id?: string) => {
            setOpen({
                open: e,
                content: "details",
            });
            if (id) {
                dispatch(fetchBlog(id));
            }
        },
        [dispatch]
    );

    const onDeleteHandle = useCallback(
        (e: any) => {
            dispatch(deleteBlog(e));
            toast.success('Removed successfully!', {
                autoClose: 3000,
                position: "top-right",
            })

        },
        [dispatch]
    );

    // const handleChange = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    const onNavigateToEditHandle = (id: string) =>
        navigate(`/writeBlog/${id}`);


    const category = (categoryId: string) => {
        const foundCategory = Array.isArray(categories) && categories.find(cat => cat._id === categoryId);
        return foundCategory ? foundCategory.categoryName : '';
    };
    type ColumnType = TableProps<BlogType>["columns"] | any;


    const columns: ColumnType = useMemo(
        () => [
            {
                title: "Blog Title",
                dataIndex: "title",
                key: `title`,
            },
            {
                title: "Description",
                dataIndex: "description",
                key: `description`,
            },
            {
                title: "Category",
                dataIndex: "categoryId",
                key: `categoryId`,
                render: (categoryId: any) => category(categoryId)
            },

            {
                title: "Status",
                dataIndex: "status",
                key: `status`,
            },
            {
                title: "Actions",
                key: `actions`,
                dataIndex: "_id",
                render: (_: any) => {
                    return (
                        <Dropdown
                            trigger={["click"]}
                            dropdownRender={(menu) => (
                                <div>
                                    <div style={{ display: "none" }}>{menu}</div>
                                    <Menu>
                                        <Menu.Item
                                            key={`edit_${_}`}
                                            onClick={() => onNavigateToEditHandle(_)}
                                            icon={<EditOutlined />}
                                        >
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item
                                            key={`details_${_}`}
                                            onClick={() => onDetailsHandle(true, _)}
                                            icon={<SearchOutlined />}
                                        >
                                            Details
                                        </Menu.Item>


                                        <Menu.Item
                                            key={`delete_${_}`}
                                            icon={<DeleteOutlined />}
                                            danger
                                        >
                                            <Popconfirm
                                                title="Delete the blog"
                                                description="Are you sure to delete this blog?"
                                                okText="Yes"
                                                cancelText="No"
                                                style={{ backgroundColor: 'var(--primary-color)' }}
                                                onConfirm={() => onDeleteHandle(_)}
                                            >
                                                Delete
                                            </Popconfirm>
                                        </Menu.Item>
                                    </Menu>
                                </div>
                            )}
                        >
                            <Button size={"middle"}>
                                <Space>
                                    <SettingOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    );
                },
            },
        ],
        []
    );
    return (
        <>
            {loading ? <LoadingSpinner /> : (
                <Card>
                    <Row>
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 0, offset: 0 }}
                        >

                        </Col>
                        <Col
                            xs={{ span: 0, offset: 0 }}
                            sm={{ span: 0, offset: 0 }}
                            md={{ span: 24, offset: 0 }}
                            lg={{ span: 24, offset: 0 }}
                            xl={{ span: 24, offset: 0 }}
                            xxl={{ span: 24, offset: 0 }}
                            style={{ marginBottom: 16 }}
                        >

                        </Col>

                        <Col span={24}>
                            {myblogs.length > 0 ? (
                                <Table
                                    size="middle"
                                    locale={{
                                        emptyText: "Empty list",
                                        filterSearchPlaceholder: "Ara",
                                    }}
                                    columns={columns}
                                    dataSource={myblogs}
                                    pagination={{
                                        pageSize: 3,
                                    }}
                                />
                            ) : (
                                <p>No blogs found.</p>
                            )}
                        </Col>
                    </Row>
                </Card>
            )}
            {blog && open.content === "details" && (
                <CustomModal
                    title={`Category Details`}
                    width={1200}
                    open={open.open}
                    onOpenHandler={onDetailsHandle}
                    content={<BlogDetail blog={blog} />}
                />
            )

            }
            <ToastContainer />
        </>
    );
};

export default List;

