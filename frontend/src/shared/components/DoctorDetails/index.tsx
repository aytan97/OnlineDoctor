import { Image } from "antd";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { fetchUser } from "../../../redux/features/auth/authSlice";
import { fetchCategories } from "../../../redux/features/categories/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Footer from "../../layout/Footer";
import LoadingSpinner from "../../layout/ReactSpinner";
import logoicon from "../../media/images/logoicon.png";
import starIcon from "../../media/images/star-svgrepo-com.svg";
import DoctorAbout from "./DoctorAbout";
import DoctorAvailabilities from "./DoctorAvailabilities";
import DoctorBlogs from "./DoctorBlogs";
import DoctorFeedback from "./DoctorFeedback";

const DoctorDetails = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { list } = useAppSelector((state) => state.auth);
  const categories = useAppSelector((state) => state.categories.list);
  const { id } = useParams();
  const [tab, setTab] = useState("about");
  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id))
        .then(() => setLoading(false))
        .catch((error) => console.error("Error fetching user:", error));
    }
    dispatch(fetchCategories()).catch((error) =>
      console.error("Error fetching categories:", error)
    );
  }, [dispatch, id]);

  return (
    <>
      <div className="container">
        <Helmet>
          <title>{`Dr. ${list?.firstname} ${list?.lastname}`}</title>
          <link rel="icon" href={logoicon} />
        </Helmet>
        <div
          className="mt-3 d-flex align-items-center justify-space-between"
          style={{ width: "150px" }}
        >
          <Link
            to="/talkToDoctor"
            style={{ textDecoration: "none", color: "var(--dark-text)" }}
          >
            <i
              className="fa-solid fa-chevron-left"
              style={{ fontSize: "20px" }}
            ></i>{" "}
            <span>Back Doctors List</span>
          </Link>
        </div>
        <div className="doctor-detailed-info mt-5 mb-4 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="container ">
              <div className=" row ">
                <div className=" col-lg-8 ">
                  <div className=" short-details ">
                    <div className="doctor-image">
                      {list &&
                        list?.image &&
                        list?.image.data &&
                        Array.isArray(list?.image.data) &&
                        (() => {
                          const buffer = list?.image?.data;
                          const binary = buffer?.reduce(
                            (acc: string, byte: number) =>
                              acc + String.fromCharCode(byte),
                            ""
                          );
                          const base64Image = btoa(binary);
                          return (
                            <Image
                              src={`data:image/jpeg;base64, ${base64Image}`}
                              alt="blog-image"
                              style={{ width: "100%" }}
                            />
                          );
                        })()}
                    </div>

                    <div className="short-info">
                      <div className="speciality mb-2">
                        {list &&
                          Array.isArray(list) &&
                          list?.categories?.map(
                            (catId: string, index: number) => {
                              const category = categories?.find(
                                (category) => category._id === catId
                              );
                              return category ? (
                                <span key={index} className="category-name">
                                  {`${category?.categoryName?.toLowerCase()} `}
                                </span>
                              ) : null;
                            }
                          )}
                      </div>
                      <h3>{`${list?.firstname} ${list?.lastname}`}</h3>
                      <div className="d-flex align-items-center mt-1">
                        <span className="stars">
                          <img src={starIcon} alt="stars" />{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {list?.avgRating || "0"}
                          </span>
                        </span>
                        <span className="rating">
                          ({list?.totalRating || "0"})
                        </span>
                      </div>
                      <p className="hospital mt-2">
                        {list?.currentWorkHospital}
                      </p>
                    </div>
                  </div>
                  <div className="long-details">
                    <div className="mt-5 border pb-2">
                      <span
                        className={`${tab === "about" && "border-b"
                          } py-2 px-2 about-btn`}
                        onClick={() => setTab("about")}
                      >
                        About
                      </span>
                      <span
                        className={`${tab === "feedback" && "border-b"
                          } py-2 px-2 feedback-btn `}
                        onClick={() => setTab("feedback")}
                      >
                        Feedback
                      </span>
                      <span
                        className={`${tab === "blogs" && "border-b"
                          } py-2 px-2 feedback-btn `}
                        onClick={() => setTab("blogs")}
                      >
                        Blogs
                      </span>
                    </div>

                    <div className="seperated-details mt-5">
                      {tab === "about" && <DoctorAbout id={id} />}
                      {tab === "feedback" && <DoctorFeedback id={id} />}
                      {tab === "blogs" && <DoctorBlogs id={id} />}
                    </div>
                  </div>
                </div>
                <div className=" col-lg-4">
                  <DoctorAvailabilities id={id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorDetails;
