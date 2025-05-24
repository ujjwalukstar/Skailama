import Logo from "../../assets/Logo.svg";
import Settings from "../../assets/Settings.svg";
import Notification from "../../assets/Notification.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import style from "./home.module.css";
import CreateProject from "../../Components/CreateProject/CreateProject";
import { useEffect, useState } from "react";
import plusIcon from "../../assets/plusIcon.svg";
import Modal from "../../Components/Modal/Modal";
import { createProject, getProjects } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Utils/Auth";
import LoadingItem from "../../Components/Loading/Loading";

const Home = () => {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e?.target?.value);
    if (err) {
      setErr("");
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      if (!projectName.trim()) {
        setErr("Project Name Can't be empty");
      } else {
        const result = await createProject({ title: projectName });
        if (result) {
          handleModalClose();
          setRefetch((prev) => !prev);
          setProjectName("");
        }
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleFetchProjectList = async () => {
    try {
      setLoading(true);

      const result = await getProjects();
      if (result?.data?.data) {
        setProjects(result?.data?.data);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logOut(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    handleFetchProjectList();
  }, [refetch]);

  return (
    <div className={style.mainContainer}>
      <div className={style.container}>
        <nav>
          <div className={style.LogoWrapper}>
            <img src={Logo} className={style.Logo} alt="Logo" />
            <h3>Ques.AI</h3>
          </div>

          <div className={style.iconWrapper}>
            <img className={style.icon} src={Settings} alt="Settings" />
            <img className={style.icon} src={Notification} alt="Notification" />
            <div onClick={handleLogout} className={style.logOutIconWrapper}>
              <img src={logoutIcon} alt="" />
            </div>
          </div>
        </nav>
        {loading ? (
          <div>
            <LoadingItem height="80vh" />
          </div>
        ) : !!projects?.length ? (
          <div className={style.wrapper}>
            <div className={style.header}>
              <h4>Projects</h4>
              <button className={style.createBtn} onClick={handleModalOpen}>
                <img src={plusIcon} alt="+" />
                Create New Project
              </button>
            </div>
            <div className={style.cardWrapper}>
              {projects.map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className={style.createProjectWrapper}>
            <CreateProject
              handleModalClose={handleModalClose}
              handleSubmit={handleSubmit}
              handleProjectNameChange={handleProjectNameChange}
              modalOpen={modalOpen}
              handleModalOpen={handleModalOpen}
              err={err}
            />
          </div>
        )}
      </div>
      <Modal open={modalOpen}>
        <div className={style.modalWrapper}>
          <h2>Create Project</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="project-name">Enter Project Name:</label>
            <input
              value={projectName}
              onChange={handleProjectNameChange}
              placeholder="Type here"
              type="text"
              id="project-name"
            />
            <p>{err}</p>

            <footer>
              <div className={style.buttonWrapper}>
                <button
                  onClick={handleModalClose}
                  type="button"
                  className={style.cancelButton}
                >
                  Cancel
                </button>
                <button type="submit" className={style.createButton}>
                  Create
                </button>
              </div>
            </footer>
          </form>
        </div>
      </Modal>
    </div>
  );
};

function Card({ item }) {
  const navigate = useNavigate();

  const formateTitle = (title) => {
    const firstLetter = title.split(" ")?.[0]?.[0] || "";
    const secondLetter = title.split(" ")?.[1]?.[0] || "";
    return `${firstLetter}${secondLetter}`;
  };

  const calculateTime = (date) => {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
      return "just now";
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 604800) {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 2592000) {
      const weeksAgo = Math.floor(secondsAgo / 604800);
      return `${weeksAgo} week${weeksAgo !== 1 ? "s" : ""} ago`;
    } else {
      const monthsAgo = Math.floor(secondsAgo / 2592000);
      return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
    }
  };

  const formateDate = (createdAt, updatedAt) => {
    let result = "Last edited";
    if (createdAt === updatedAt) {
      result = "Created ";
    }
    const text = calculateTime(new Date(updatedAt));
    return `${result} ${text}`;
  };

  return (
    <div
      className={style.card}
      onClick={() => navigate(`/podcast/${item?._id}/add-podcast`)}
    >
      <div className={style.icon}>{formateTitle(item.title)}</div>
      <div className={style.content}>
        <h4 className={style.projectTitle}>{item?.title}</h4>
        <p className={style.epiCount}>{item?.episodeCount || 0} Episodes</p>
        <br />
        <p className={style.time}>
          {formateDate(item?.createdAt, item?.updatedAt)}
        </p>
      </div>
    </div>
  );
}

export default Home;
