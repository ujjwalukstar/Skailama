import style from "./sidebar.module.css";
import Logo from "../../assets/Logo.svg";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  HelpIcon,
  PenIcon,
  PlusIcon,
  PodcastIcon,
  UpgradeIcon,
} from "../../Utils/Icons";
import caretLeftIcon from "../../assets/caretLeftIcon.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { getUserData } from "../../Api/Api";

const SideBar = ({ children }) => {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const { user, setUser } = useContext(Context);

  const [width, setWidth] = useState(window.innerWidth);

  const [sideBarShrink, setSideBarShrink] = useState("");

  /**
   * Updates the sidebar style based on the window width.
   *
   * If the width is 992 pixels or less, applies the `"sideBarShrink"` class; otherwise, clears it.
   *
   */
  const handleResize = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 992) {
      setSideBarShrink("sideBarShrink");
    } else {
      setSideBarShrink("");
    }
  };

  useEffect(() => {
    handleResize();

    if (window) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFetchUserData = async () => {
    try {
      const result = await getUserData();
      const data = result?.data?.data;
      if (!data?.image) {
        data.image = user?.image;
      }
      setUser((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSideBarAction = () => {
    setSideBarShrink((prev) => (prev ? "" : "sideBarShrink"));
  };

  useEffect(() => {
    handleFetchUserData();
  }, []);

  return (
    <div className={style.container}>
      <aside className={style?.[sideBarShrink]}>
        <div className={style.topContainer}>
          <div className={style.LogoWrapper}>
            <img src={Logo} className={style.Logo} alt="Logo" />
            <h3>Ques.AI</h3>
          </div>

          <div>
            <div className={style.itemsWrapper}>
              <Link to={projectId ? `/podcast/${projectId}/add-podcast` : "/"}>
                <PlusIcon />
                <h4>Add your Podcast(s)</h4>
              </Link>
              <Link to={`/podcast/${projectId}/create`}>
                <PenIcon />
                <h4>Create & Repurpose</h4>
              </Link>
              <Link to={`/podcast/${projectId}/widget`}>
                <PodcastIcon />
                <h4>Podcast Widget</h4>
              </Link>
              <Link to={`/podcast/${projectId}/upgrade`}>
                <UpgradeIcon />
                <h4>Upgrade</h4>
              </Link>
            </div>
          </div>
          <hr />
        </div>
        <div className={style.elapseWrapper}>
          <div onClick={handleSideBarAction} className={style.caretWrapper}>
            <img src={caretLeftIcon} />
          </div>
        </div>
        <div>
          <div className={style.itemsWrapper}>
            <Link to={`/podcast/${projectId}/help`}>
              <HelpIcon />
              <h4>Help</h4>
            </Link>
          </div>
          <hr />
          <br />
          <div
            onClick={() => navigate("/profile")}
            className={style.userContainer}
          >
            <img
              src={
                user?.profileImg ||
                "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0"
              }
            />
            <div className={style.userDataContainer}>
              <h4>{user?.username}</h4>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
      <div className={style.outletContainer}>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

function Link({ children, to }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${style.item} ${isActive ? style.active : ""}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default SideBar;
