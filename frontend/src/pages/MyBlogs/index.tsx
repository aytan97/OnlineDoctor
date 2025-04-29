import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import MyBlogsList from "../../shared/components/MyBlogsList/";

const MyBlogs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/writeblog");
  };
  return (
    <div className="container my-blogs">
      <div className="d-flex flex-column">
        <div className="mb-2">
          <Button onClick={handleClick} icon={<PlusOutlined />} size={"large"}>
            Write Blog
          </Button>
        </div>
        <div className=" my-blogs-list col-12">
          <h2 className="mb-2 ml-1" style={{ color: "var(--primary-color)" }}>
            My Blogs
          </h2>
          <div className="my-blogs-list">
            <MyBlogsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
