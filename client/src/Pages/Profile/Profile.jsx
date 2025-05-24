import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";
import style from "./profile.module.css";
import leftArrowIcon from "../../assets/leftArrowIcon.svg";
import { editUserData, getUserData } from "../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(Context);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    phone: null,
    profileImg:
      "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0",
  });
  const [saveText, setSaveText] = useState("Save Changes");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleFetchUserData = async () => {
    try {
      const result = await getUserData();
      setUser((prev) => ({ ...prev, ...result?.data?.data }));
      setUserData((prev) => ({ ...prev, ...result?.data?.data }));
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!user?.email || !user?.username) {
      handleFetchUserData();
    } else {
      setUserData(user);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };

  /**
   * Converts a file to a Base64 string and updates user data with the result.
   *
   * Reads the file as a Base64 data URL and updates the `profileImg` field in user data.
   *
   * @function convertToBase64
   * @param {File} file - The file to convert. (Required)
   * @returns {void}
   */
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev) => ({ ...prev, profileImg: reader.result }));
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
    reader.readAsDataURL(file);
  };

  const handleValueChange = (e) => {
    setUserData((prev) => ({ ...prev, [e?.target?.name]: e?.target?.value }));
  };

  const handleEditUser = async () => {
    try {
      if (!userData?.username.trim()) return setErr("User name is required !");
      if (userData?.phone && `${userData?.phone}`.length !== 10)
        return setErr("Phone number should be 10 digits");
      const result = await editUserData(userData);
      setSaveText("Saved");
      setUser((prev) => ({ ...prev, ...result?.data?.data }));
      setUserData((prev) => ({ ...prev, ...result?.data?.data }));
      setTimeout(() => {
        setSaveText("Save Changes");
      }, 1000);
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.error);
    }
  };

  return (
    <div className={style.container}>
      <BreadCrumbs second={"Profile"} />
      <div className={style.headerWrapper}>
        <div className={style.header}>
          <img onClick={() => navigate(-1)} src={leftArrowIcon} />
          <h3>Account Settings</h3>
        </div>

        <button onClick={handleEditUser}>{saveText}</button>
      </div>
      <div className={style.profileWrapper}>
        <div className={style.imageWrapper}>
          <img
            src={
              userData?.profileImg ||
              "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0"
            }
          />
          <label htmlFor={"profileImg"}>Change Image</label>
          <input
            onChange={handleFileChange}
            id="profileImg"
            type="file"
            hidden
          />
        </div>

        <div className={style.contentContainer}>
          <div className={style.contentWrapper}>
            <div className={style.inputWrapper}>
              <label htmlFor="username">User Name</label>
              <input
                value={userData?.username}
                id="username"
                name="username"
                type="text"
                onChange={handleValueChange}
              />
            </div>
            <div className={style.inputWrapper}>
              <label>Email</label>
              <input
                readOnly
                value={user?.email}
                onChange={() => {}}
                type="text"
              />
            </div>
          </div>

          <div className={style.contentWrapper}>
            <div className={style.inputWrapper}>
              <label htmlFor="fName">First Name</label>
              <input
                value={userData?.fName}
                id="fName"
                type="text"
                name="fName"
                onChange={handleValueChange}
              />
            </div>
            <div className={style.inputWrapper}>
              <label htmlFor="lName">Last Name</label>
              <input
                name="lName"
                value={userData?.lName}
                id="lName"
                type="text"
                onChange={handleValueChange}
              />
            </div>
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="phone">Phone Number</label>
            <input
              value={userData?.phone}
              id="phone"
              type="number"
              name="phone"
              onChange={(e) => {
                const num = e?.target?.valueAsNumber;
                if (!num) {
                  setUserData((prev) => ({
                    ...prev,
                    phone: num,
                  }));
                } else if (!isNaN(num) && num <= 9999999999 && num >= 0) {
                  setUserData((prev) => ({
                    ...prev,
                    phone: e?.target?.valueAsNumber,
                  }));
                }
              }}
            />
            <p className={style.error}>{err}</p>
          </div>
        </div>
      </div>

      <div className={style.footerWrapper}>
        <h2>Subscriptions</h2>
        <div className={style.subWrapper}>
          <h3>
            Oops! You don’t have any active plans. <b> Upgrade now!</b>
          </h3>
          <button className={style.upgradeBtn}>Upgrade</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
