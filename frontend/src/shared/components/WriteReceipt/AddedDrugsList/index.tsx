import React, { useCallback, useMemo, useState } from "react";
import { Row, Table, Col, Button, Dropdown, Menu, Popconfirm } from "antd";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import Card from "antd/es/card/Card";
import { useAppDispatch } from "../../../../redux/hooks";
import { SlotType } from "../../../../redux/features/blogs/type";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddedDrugsList: React.FC = () => {
    const myreceipts = [
        {
            key: "1",
            patient: "John Doe",
            drugName: "Advil, Motrin - Ibuprofen",
            dosage: "3",
            repeats: "Everyday",
            tobetaken: "Before Food",
            timeofday: "Evening"
        },
        {
            key: "2",
            patient: "John Doe",
            drugName: "Advil, Motrin - Ibuprofen",
            dosage: "3",
            repeats: "Everyday",
            tobetaken: "Before Food",
            timeofday: "Evening"
        },
        {
            key: "3",
            patient: "John Doe",
            drugName: "Advil, Motrin - Ibuprofen",
            dosage: "3",
            repeats: "Everyday",
            tobetaken: "Before Food",
            timeofday: "Evening"
        },
        {
            key: "4",
            patient: "John Doe",
            drugName: "Advil, Motrin - Ibuprofen",
            dosage: "3",
            repeats: "Everyday",
            tobetaken: "Before Food",
            timeofday: "Evening"
        },
    ];

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const onDeleteHandle = useCallback(
        (id: string) => {
            // dispatch(deleteBlog(key));
            toast.success('Removed successfully!', {
                autoClose: 3000,
                position: "top-right",
            })


        },
        [dispatch]
    );

    const columns = useMemo(() => [
        {
            title: "Patient",
            dataIndex: "patient",
            key: "patient",
        },
        {
            title: "Drug",
            dataIndex: "drugName",
            key: "drugName",
        },
        {
            title: "Dosage",
            dataIndex: "dosage",
            key: "dosage",
        },
        {
            title: "Repeats",
            dataIndex: "repeats",
            key: "repeats",
        },
        {
            title: "To be Taken",
            dataIndex: "tobetaken",
            key: "tobetaken",
        },
        {
            title: "Time of day",
            dataIndex: "timeofday",
            key: "timeofday",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any) => (
                <Dropdown
                    trigger={["click"]}
                    dropdownRender={(menu) => (
                        <Menu>
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
                                    onConfirm={() => onDeleteHandle(_)}
                                >
                                    Delete
                                </Popconfirm>
                            </Menu.Item>
                        </Menu>
                    )}
                >
                    <Button size="middle" icon={<SettingOutlined />} />
                </Dropdown>
            ),
        },
    ], [onDeleteHandle]);

    return (
        <>
            <Card>
                <Row>
                    <Col span={24}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <Table
                                size="middle"
                                locale={{
                                    emptyText: "Empty list",
                                    filterSearchPlaceholder: "Search",
                                }}
                                columns={columns}
                                dataSource={myreceipts}
                                pagination={{
                                    pageSize: 3,
                                }}
                            />
                        )}
                    </Col>
                </Row>
            </Card>

            <ToastContainer />
        </>
    );
};

export default AddedDrugsList;
