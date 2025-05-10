import { Link, useLocation } from "react-router-dom";
import HeaderUser from "../HeaderUser/headerUserModal";
import { useEffect, useRef, useState } from "react";
import HeaderNotification from "../HeaderUser/notificationModal";
import logo2 from "/src/shared/media/images/logo2.png";
import ContactDetails from "../Contacts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import menuIcon from "../../media/images/menu.svg";
import { getMe } from "../../../redux/features/auth/getMeSlice";
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { result } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.getMe.user);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [isUserHeaderModalOpen, setIsUserHeaderModalOpen] = useState(false);
  const [isNotifctnModalOpen, setNotifctnModalOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (result.token) {
      dispatch(getMe());
    }
  }, [dispatch, result]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserHeaderModalOpen(false);
        setNotifctnModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHeaderUserModal = () => {
    setIsUserHeaderModalOpen(!isUserHeaderModalOpen);
  };
  const handleNotifctnModal = () => {
    setNotifctnModalOpen(!isNotifctnModalOpen);
  };

  return (
    <div className="header-items " ref={dropdownRef}>
      {isHome && <ContactDetails />}
      <header className="header d-flex justify-space-around">
        <div className="nav-logo col-md-4 col-lg-6 col-xl-7 col-xxl-7 col-xs-6 col-sm-3">
          <Link to="/">
            <img src={logo2} className="img-fluid " />
          </Link>
        </div>
        <div className="nav col-md-8 col-lg-6 col-xl-5 col-xxl-5 col-xs-6 col-sm-9  d-flex justify-flex-end ">
          <div className="nav-items pr-3">
            <div>
              {isSmallScreen ? (
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={menuIcon} alt="menu" />
                  </div>

                  <div className="dropdown-menu">
                    <div className="d-flex flex-column ">
                      <Link
                        to="/"
                        className="pb-2 dropdown-item nav-item text-decoration "
                      >
                        Home
                      </Link>
                      <Link
                        to={`${result?.token ? "/talkToDoctor" : "/login"}`}
                        className="pb-2 dropdown-item nav-item text-decoration"
                      >
                        Talk to Doctor
                      </Link>
                      <Link
                        to="/faq"
                        className="pb-2 dropdown-item nav-item text-decoration"
                      >
                        FAQ
                      </Link>
                      <Link
                        to={`${result?.token ? "/blogs" : "/login"}`}
                        className="pb-2 dropdown-item nav-item text-decoration"
                      >
                        Blogs
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="navbar-nav">
                  <Link to="/" className="nav-item text-decoration pr-2">
                    Home
                  </Link>
                  <Link
                    to={`${result?.token ? "/talkToDoctor" : "/login"}`}
                    className="nav-item text-decoration  pr-2"
                  >
                    Talk to Doctor
                  </Link>
                  <Link to="/faq" className="nav-item text-decoration  pr-2">
                    FAQ
                  </Link>
                  <Link
                    to={`${result?.token ? "/blogs" : "/login"}`}
                    className="nav-item text-decoration  pr-2"
                  >
                    Blogs
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="nav-utils ">
            {result?.token && (
              <div className="App">
                <div className="content">
                  <div className="notification" onClick={handleNotifctnModal}>
                    <i className="fa-solid fa-bell notif"></i>
                  </div>
                </div>
                {isNotifctnModalOpen && (
                  <div className="popup-container">
                    <HeaderNotification onClose={handleNotifctnModal} />
                  </div>
                )}
              </div>
            )}

            {result?.token && user ? (
              <div className="App">
                <div className="content">
                  <div
                    className="profile d-flex justify-center align-items-center"
                    onClick={handleHeaderUserModal}
                  >
                    <span style={{ fontSize: "14px" }}>
                      {result?.token &&
                        user &&
                        `${user?.data?.firstname?.substr(
                          0,
                          1
                        )} ${user?.data?.lastname?.substr(0, 1)}`}
                    </span>
                  </div>
                </div>

                {isUserHeaderModalOpen && (
                  <div className="popup-container">
                    <HeaderUser onClose={handleHeaderUserModal} />
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-decoration">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
