import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { myProfileSchema } from "../../../validation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchCategories } from "../../../redux/features/categories/categorySlice";
import { Button, Popconfirm, Select } from "antd";
import { LANGUAGES } from "../../constants/BlogTags";
import { MyProfileFormInput } from "../../../types/FormTypes";
import arrowdropdown from "../../media/images/arrow-drop-down.svg";
import { CategoryType } from "../../../redux/features/categories/types";
import { getMe } from "../../../redux/features/auth/getMeSlice";
import { updateDoctor } from "../../../redux/features/register/DoctorSlice";
import { updatePatient } from "../../../redux/features/register/PatientSlice";
import useImageUpload from "../../custom/ImageUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import logoicon from "../../media/images/logoicon.png";
import { deleteUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
for (let i = 23; i < 36; i++) {
  LANGUAGES.push(i.toString(36) + i);
}

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.categories.list);
  const { result } = useAppSelector((state) => state.auth);
  const getMyProfile = useAppSelector((state) => state.getMe.user);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { imageBase64, handleFileUpload } = useImageUpload();
  const [storedImage, setStoredImage] = useState<string | null>(null);
  const { logoutAuth } = useAuth();
  const selectRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLInputElement | null>(null);

  const image = localStorage.getItem("profileImage");
  const updatedImage = localStorage.getItem("updatedProfileImage");

  useEffect(() => {
    if (image) {
      setStoredImage(image);
    }

    if (updatedImage) {
      setStoredImage(updatedImage);
    }
  }, [setStoredImage, image, updatedImage]);

  const {
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
    setError,
  } = useForm<MyProfileFormInput>({ resolver: yupResolver(myProfileSchema) });

  const handleBeforeUnload = (event: any) => {
    if (isDirty) {
      event.preventDefault();
      event.returnValue = "";
      localStorage.removeItem("updatedProfileImage");
      localStorage.removeItem("updatedBlogImage");
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    if (result.token) {
      dispatch(getMe());
    }
    dispatch(fetchCategories());
  }, [dispatch, result]);

  useEffect(() => {
    if (getMyProfile?.data) {
      const {
        firstname,
        lastname,
        categories,
        languageSkills,
        age,
        phoneNumber,
        workExperience,
        currentWorkHospital,
        biography,
      } = getMyProfile.data;

      reset({
        firstname: firstname,
        lastname: lastname,
        languageSkills: languageSkills || [],
        age: age || 18,
        phoneNumber: phoneNumber || "",
        workExperience: workExperience || "",
        currentWorkHospital: currentWorkHospital || "",
        biography: biography || "",
      });

      setSelectedCategories(categories || []);
    }
  }, [getMyProfile, reset, setSelectedCategories]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryValue = e.target.value;
    if (selectedCategories.includes(categoryValue)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== categoryValue)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryValue]);
    }
  };
  const handleSubmitBtn = async (formResult: any) => {
    if (getMyProfile?.data?.userId) {
      console.log(formResult);
      const _id = getMyProfile?.data?.userId;
      if (imageBase64) {
        formResult.image = imageBase64;
      }

      if (getMyProfile?.data?.role === "doctor") {
        if (!selectedCategories.length) {
          setError("categories", {
            type: "manual",
            message: "Categories",
          });
          return;
        }
        formResult.categories = selectedCategories;
        dispatch(updateDoctor({ _id, ...formResult })).then(() =>
          dispatch(getMe())
        );

        toast.success("Changes updated successfully!", {
          autoClose: 3000,
          position: "top-right",
        });
      } else {
        dispatch(updatePatient({ _id, ...formResult })).then(() =>
          dispatch(getMe())
        );
        localStorage.removeItem("updatedProfileImage");
        localStorage.removeItem("updatedBlogImage");
      }
    }
    reset();
  };

  const handleDeleteAccount = () => {
    const id = getMyProfile?.data?.userId;
    dispatch(deleteUser(id))
      .then(() => logoutAuth())
      .then(() => {
        navigate("/login");
        location.reload();
      });
  };

  const handleImageUpload = () => {
    if (selectRef.current) {
      selectRef.current.click();
    }
  };
  const handleCancel = async () => {
    // setImageBase64(`${}`)
    localStorage.removeItem("updatedProfileImage");
    localStorage.removeItem("updatedBlogImage");
    reset();
  };

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>My Profile</title>
        <link rel="icon" href={logoicon} />
      </Helmet>
      <div className="blog-details d-flex justify-center align-items-center pb-4 ">
        <form
          onSubmit={handleSubmit(handleSubmitBtn)}
          className="editor  d-flex flex-column justify-space-between align-items-center"
        >
          <div className="my-profile">
            <div className="profile-item">
              <div className="select-photo">
                <div className="profile-picture">
                  {storedImage && <img src={storedImage} alt="prof-avatar" />}
                  <div className="add-profile">
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="image"
                        render={({ field }) => (
                          <div
                            className="hide-image"
                            onClick={handleImageUpload}
                          >
                            Select photo
                            <input
                              {...field}
                              // variant="filled"
                              type="file"
                              ref={selectRef}
                              placeholder="Choose image"
                              onChange={(e) => {
                                field.onChange(e);
                                handleFileUpload(e);
                              }}
                              value={""}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ color: "var(--input-color)" }}>
                  {getMyProfile?.data?.email}
                </div>
              </div>
            </div>
            <div className="profile d-flex flex-column  container justify-space-between align-items-center">
              <div className="d-flex flex-row  justify-space-between mb-3 media">
                <div className="form-group mr-2">
                  <Controller
                    defaultValue=""
                    control={control}
                    name="firstname"
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          // variant="filled"
                          type="text"
                          placeholder="First name"
                        />{" "}
                      </>
                    )}
                  />
                  {errors?.firstname && (
                    <p className="error mt-1">{errors?.firstname?.message}</p>
                  )}
                </div>
                <div className="form-group mr-2">
                  <Controller
                    defaultValue=""
                    control={control}
                    name="lastname"
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          // variant="filled"
                          type="text"
                          placeholder="Last name"
                        />{" "}
                      </>
                    )}
                  />
                  {errors.lastname && (
                    <p className="error mt-1">{errors?.lastname?.message}</p>
                  )}
                </div>
              </div>

              <div className="d-flex flex-row  justify-space-between mb-3 media">
                <div className="form-group mr-2">
                  <Controller
                    defaultValue=""
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          // variant="filled"
                          type="text"
                          placeholder="Phone number"
                        />{" "}
                      </>
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="error mt-1">{errors?.phoneNumber?.message}</p>
                  )}
                </div>
                <div className="form-group mr-2">
                  <Controller
                    defaultValue={18}
                    control={control}
                    name="age"
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          // variant="filled"
                          type="number"
                          placeholder="Age"
                        />{" "}
                      </>
                    )}
                  />
                  {errors.age && (
                    <p className="error mt-1">{errors?.age?.message}</p>
                  )}
                </div>
              </div>

              {getMyProfile?.data?.role === "doctor" && (
                <div className="d-flex flex-row w-100  mb-2 media lang-tags">
                  <div className="form-group mr-2">
                    <Controller
                      control={control}
                      name="languageSkills"
                      render={({ field }) => (
                        <Select
                          {...field}
                          mode="tags"
                          options={LANGUAGES?.map((language) => ({
                            value: language,
                          }))}
                          placeholder="Add language skills"
                        />
                      )}
                    />
                    {errors.languageSkills && (
                      <p className="error mt-1">
                        {errors?.languageSkills?.message}
                      </p>
                    )}
                  </div>

                  <div className="form-group media-800 mr-2">
                    <Controller
                      control={control}
                      name="categories"
                      render={({ field }) => (
                        <div
                          className={`dropdown ${isDropdownOpen ? "show" : ""}`}
                          ref={dropdownRef}
                        >
                          <div
                            className="toggle-btn dropdown-toggle"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <div> Update your Specialities</div>
                            <div className="accordion-icon">
                              {isDropdownOpen ? (
                                <img
                                  src={arrowdropdown}
                                  alt="dropdownicon"
                                  className="turn-180"
                                />
                              ) : (
                                <img src={arrowdropdown} alt="dropdownicon" />
                              )}
                            </div>
                          </div>
                          <div
                            className={`dropdown-menu ${isDropdownOpen ? "show" : ""
                              }`}
                          >
                            <div
                              className="close-btn dropdown-toggle"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                              Close
                            </div>
                            {categories.map((category: CategoryType) => (
                              <div className="form-check" key={category._id}>
                                <input
                                  {...field}
                                  className="form-check-input"
                                  type="checkbox"
                                  value={category._id}
                                  id={`category-${category._id}`}
                                  onChange={handleCategoryChange}
                                  checked={selectedCategories.includes(
                                    category._id
                                  )}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`category-${category._id}`}
                                >
                                  {category.categoryName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  {errors.categories && (
                    <p className="error-message">{errors.categories.message}</p>
                  )}
                </div>
              )}

              <div className="d-flex flex-row  justify-space-between mb-3 media">
                {getMyProfile?.data?.role === "doctor" && (
                  <div className="form-group mr-2">
                    <Controller
                      defaultValue=""
                      control={control}
                      name="currentWorkHospital"
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            // variant="filled"
                            type="text"
                            placeholder="Current work place"
                          />{" "}
                        </>
                      )}
                    />
                    {errors.currentWorkHospital && (
                      <p className="error mt-1">
                        {errors.currentWorkHospital.message}
                      </p>
                    )}
                  </div>
                )}

                {getMyProfile?.data?.role === "doctor" && (
                  <div className="form-group mr-2">
                    <Controller
                      defaultValue=""
                      control={control}
                      name="workExperience"
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            // variant="filled"
                            type="text"
                            placeholder="Work experience"
                          />{" "}
                        </>
                      )}
                    />
                    {errors.workExperience && (
                      <p className="error mt-1">
                        {errors.workExperience.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {getMyProfile?.data?.role === "doctor" && (
                <div className="form-group media">
                  <Controller
                    defaultValue=""
                    control={control}
                    name="biography"
                    render={({ field }) => (
                      <>
                        <textarea
                          {...field}
                          // variant="filled"
                          className="bio"
                          placeholder="Introduce yourself to patients..."
                        />{" "}
                      </>
                    )}
                  />
                  {errors.biography && (
                    <p className="error">{errors.biography.message}</p>
                  )}
                </div>
              )}
            </div>
            <div className="btns w-100 d-flex justify-flex-end align-items-end ">
              <Popconfirm
                title="Are you sure to delete account?"
                description="Your data and account will be permanently deleted!!!"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={handleDeleteAccount}
              >
                <Button danger className="mr-2" aria-label="delete-account">
                  Delete Account
                </Button>
              </Popconfirm>
              <Button htmlType="submit" className="mr-2">
                Update
              </Button>
              <Popconfirm
                title="Cancel the changes"
                description="Are you sure to cancel the made changes?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleCancel}
                className="mr-2"
              >
                <Button danger>Cancel</Button>
              </Popconfirm>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
export default MyProfile;
