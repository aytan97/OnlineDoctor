import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchBlog } from "../../../redux/features/blogs/blogSlice";
import { fetchCategories } from "../../../redux/features/categories/categorySlice";
import { Helmet } from "react-helmet-async";
import logoicon from "../../media/images/logoicon.png";
import LoadingSpinner from "../../layout/ReactSpinner";
import { Image } from "antd";
import { formattedDate } from "../../models";
import { fetchUsers } from "../../../redux/features/auth/authSlice";
import parse from "html-react-parser";
import starIcon from "../../media/images/star-svgrepo-com.svg";
import DoctorFeedback from "../DoctorDetails/DoctorFeedback";
import DoctorBlogs from "../DoctorDetails/DoctorBlogs";
import Footer from "../../layout/Footer";
import { TUser } from "../../../redux/features/auth/type";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const categories = useAppSelector((state) => state.categories.list);
  const blog = useAppSelector((state) => state.blog.selected);
  const users = useAppSelector((state) => state.auth.list);
  const [tab, setTab] = useState("feedback");

  useEffect(() => {
    if (id) {
      dispatch(fetchBlog(id)).then(() => setLoading(false));
    }
    dispatch(fetchCategories());
    dispatch(fetchUsers());
  }, [dispatch, id]);

  if (!Array.isArray(users)) {
    return (
      <div>
        <LoadingSpinner />{" "}
      </div>
    );
  }
  const author: TUser | undefined = users.find(
    (user) => user?._id === blog?.authorId
  );

  return (
    <>
      <div className="container ">
        <Helmet>
          <title>{blog?.title}</title>
          <link rel="icon" href={logoicon} />
        </Helmet>
        <div
          className="mt-3 d-flex align-items-center justify-space-between"
          style={{ width: "150px" }}
        >
          <Link
            to="/blogs"
            style={{ textDecoration: "none", color: "var(--dark-text)" }}
          >
            <i
              className="fa-solid fa-chevron-left"
              style={{ fontSize: "20px" }}
            ></i>{" "}
            Back to Blogs
          </Link>
        </div>

        <div className="doctor-detailed-info  container">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {" "}
              <div className="row mt-5 mb-5">
                <div className="blog-container col-10">
                  <h1 className="blog-title">{blog?.title}</h1>
                  <div>
                    <div className="mb-3">
                      {blog &&
                        (() => {
                          const category = categories?.find(
                            (category) => category._id === blog?.categoryId
                          );
                          const categoryName = category
                            ? category?.departmentName
                            : "";
                          return (
                            <p>
                              <i>{categoryName}</i>
                            </p>
                          );
                        })()}
                    </div>

                    {blog &&
                      (() => {
                        const username = author
                          ? `${author.firstname} ${author.lastname}`
                          : "Unknown";
                        const bufferr = author?.image?.data;
                        const binary = bufferr
                          ? bufferr.reduce(
                              (acc: string, byte: number) =>
                                acc + String.fromCharCode(byte),
                              ""
                            )
                          : "";
                        const base64Image = binary ? btoa(binary) : "";
                        return (
                          <div className="d-flex justify-space-between author-info align-items-center">
                            <div
                              style={{ width: "220px", height: "100px" }}
                              className="blog-author"
                            >
                              <div className="author-img">
                                <Link to={`/doctordetails/${blog?.authorId}`}>
                                  <img
                                    src={`data:image/jpeg;base64, ${base64Image}`}
                                    alt="doctor-photo"
                                  />
                                </Link>
                              </div>
                              <div className="d-flex flex-column ">
                                <h3>{username}</h3>
                                <span className="review-date mt-1">
                                  <i>{formattedDate(blog?.createdAt)}</i>
                                </span>
                              </div>
                            </div>
                            <div className="d-flex  align-items-center">
                              <img src={starIcon} alt="" />{" "}
                              <span style={{ fontSize: "20px" }}>(0)</span>
                            </div>
                          </div>
                        );
                      })()}
                  </div>
                  <div className="blog-image mt-4">
                    {blog?.image &&
                      blog?.image?.data &&
                      Array.isArray(blog?.image?.data) &&
                      (() => {
                        const bufferr = blog?.image?.data;
                        const binary = bufferr?.reduce(
                          (acc: string, byte: number) =>
                            acc + String.fromCharCode(byte),
                          ""
                        );
                        const base64Image = btoa(binary);
                        return (
                          <Image
                            src={`data:image/jpeg;base64, ${base64Image}`}
                            alt="blog-image"
                            style={{ width: "90%" }}
                            preview={false}
                          />
                        );
                      })()}
                  </div>

                  <p className="desc mt-3 ml-2">
                    <i>{blog?.description}</i>
                  </p>
                  <div className="body mb-4">{parse(`${blog?.body}`)}</div>
                </div>
              </div>
              <div className="long-details">
                <div className="mt-5 border pb-2">
                  <span
                    className={`${
                      tab === "feedback" && "border-b"
                    } py-2 px-2 feedback-btn `}
                    onClick={() => setTab("feedback")}
                  >
                    Feedback
                  </span>
                  <span
                    className={`${
                      tab === "blogs" && "border-b"
                    } py-2 px-2 feedback-btn `}
                    onClick={() => setTab("blogs")}
                  >
                    Related Blogs
                  </span>
                </div>

                <div className="feedback-details mt-5 pb-4">
                  {tab === "feedback" && <DoctorFeedback id={id} />}
                  {tab === "blogs" && (
                    <DoctorBlogs blogId={blog?._id} tagss={blog?.tags} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
