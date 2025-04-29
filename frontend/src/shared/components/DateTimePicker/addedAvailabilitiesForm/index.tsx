import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Popconfirm, Row, Table } from "antd";
import Card from "antd/es/card/Card";
import React, { useCallback, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../../../redux/hooks";
const AvailabilityList: React.FC = () => {
  const myslots = [
    {
      key: "1",
      date: "2024-04-30",
      time: "12:00-12:30",
    },
    {
      key: "2",
      date: "2024-04-30",
      time: "12:00-12:30",
    },
    {
      key: "3",
      date: "2024-04-30",
      time: "12:00-12:30",
    },
    {
      key: "4",
      date: "2024-04-30",
      time: "12:00-12:30",
    },
  ];

  const dispatch = useAppDispatch();
  //   const [loading, setLoading] = useState(false);

  const onDeleteHandle = useCallback(() => {
    // dispatch(deleteBlog(key));
    toast.success("Removed successfully!", {
      autoClose: 3000,
      position: "top-right",
    });
  }, [dispatch]);

  const columns = useMemo(
    () => [
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
        render: (_: any) => (
          <Dropdown
            trigger={["click"]}
            dropdownRender={() => (
              <Menu>
                <Menu.Item key={`delete_${_}`} icon={<DeleteOutlined />} danger>
                  <Popconfirm
                    title="Delete the blog"
                    description="Are you sure to delete this blog?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDeleteHandle()}
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
    ],
    [onDeleteHandle]
  );

  return (
    <>
      <Card>
        <Row>
          <Col span={24}>
            {!columns ? (
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

export default AvailabilityList;
