import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Row, Table, Col, Button, Dropdown, Menu, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Card from "antd/es/card/Card";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { SlotType } from "../../../../redux/features/blogs/type";
import CustomModal from "../../Modals";
import PaymentForm from "./PaymentForm";
import { getMe } from "../../../../redux/features/auth/getMeSlice";

const List: React.FC = ({ id }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setselectedSlot] = useState({});
    const mine = useAppSelector((state) => state.getMe.user)
    useEffect(() => {
        dispatch(getMe())

    }, [dispatch])

    const [open, setOpen] = useState({
        open: false,
        content: "",
    });
    const myslots = [
        {
            id: "1",
            key: "1",
            date: "2024-05-30",
            time: "12:00-12:30",

            doctorId: "doctorid",
            doctorCost: "100"
        },
        {
            id: "2",
            key: "2",
            date: "2024-05-13",
            time: "08:00-08:30",

            doctorId: "doctorid",
            doctorCost: "100"
        },
        {
            id: "3",
            key: "3",
            date: "2024-05-10",
            time: "12:00-12:30",

            doctorId: "doctorid",
            doctorCost: "100"
        },
        {
            id: "4",
            key: "4",
            date: "2024-05-20",
            time: "12:00-12:30",

            doctorId: "doctorid",
            doctorCost: "100"
        }
    ];


    const handleTakeTime = useCallback(
        (e: boolean, id?: string) => {
            setOpen({
                open: e,
                content: "details",
            });
            if (id) {
                setselectedSlot(id)
                console.log('object', id)
            }
        },
        [dispatch]
    );

    const columns = useMemo(() => [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: SlotType) => (

                <Button size="middle" icon={<PlusOutlined />} onClick={() => handleTakeTime(true, _)} />
            ),
        },
    ], [handleTakeTime]);

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
                                dataSource={myslots}
                                pagination={{
                                    pageSize: 2,
                                }}
                            />
                        )}
                    </Col>
                </Row>
            </Card>
            <CustomModal
                title={`Payment Details`}
                width={800}
                open={open.open}
                onOpenHandler={handleTakeTime}
                content={<PaymentForm selectedSlot={selectedSlot} doctorId={id} patientId={mine?.data?.userId} />}
            />
        </>
    );
};

export default List;



