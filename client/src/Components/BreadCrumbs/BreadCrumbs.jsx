import HomeIcon from "../../assets/homeIcon.svg";
import bellIcon from "../../assets/bellIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import style from "./breadcrumbs.module.css";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Utils/Auth";

const BreadCrumbs = ({ first, second }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logOut(() => {
      navigate("/login");
    });
  };

  return (
    <main>
      <div className={style.container}>
        <img
          onClick={handleHomeClick}
          className={style.home}
          src={HomeIcon}
          alt=""
        />
        <h3>
          <div onClick={handleHomeClick} className={style.home}>
            Home Page{" "}
          </div>{" "}
          &nbsp; {first && `/ ${first}`}{" "}
          {second && (
            <>
              / &nbsp; <span>{second}</span>
            </>
          )}
        </h3>
      </div>

      <div className={style.rightWrapper}>
        <div className={style.iconWrapper}>
          <img src={bellIcon} alt="" />
        </div>
        <div onClick={handleLogout} className={style.iconWrapper}>
          <img src={logoutIcon} alt="" />
        </div>
      </div>
    </main>
  );
};

export default BreadCrumbs;
