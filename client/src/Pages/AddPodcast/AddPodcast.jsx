import style from "./addPodcast.module.css";
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";
import rssIcon from "../../assets/rssIcon.svg";
import ytIcon from "../../assets/ytIcon.svg";
import uploadIcon from "../../assets/uploadIcon.svg";
import closeIcon from "../../assets/closeIcon.svg";
import cloudUploadIcon from "../../assets/cloudUploadIcon.svg";
import { useState } from "react";
import Modal from "../../Components/Modal/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createEpisode, deleteEpisode, getEpisodes } from "../../Api/Api";
import { formats, modules } from "../../Utils/config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingItem from "../../Components/Loading/Loading";

const AddPodcast = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    content: "",
  });
  const [err, setErr] = useState("");
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState("");

  const navigate = useNavigate();

  const nameError = "Episode name is required";

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setData({
      content: "",
      name: "",
    });
  };

  const handleContentChange = (html) => {
    setData((prev) => ({ ...prev, content: html }));
  };

  const handleNameChange = (e) => {
    setData((prev) => ({ ...prev, name: e?.target?.value }));
    if (err === nameError) {
      setErr("");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!data?.name.trim()) throw nameError;
      setSubmitLoading(true);
      await createEpisode({ ...data, projectId });
      handleModalClose();
      setRefetch((prev) => !prev);
    } catch (error) {
      setErr(error);
      console.log(error?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const result = await getEpisodes(projectId);
      setProjectName(result?.data?.data?.projectName);
      setEpisodes(result?.data?.data?.episodes || []);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error === "Project is not exist") {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Formats a date string into a readable format.
   *
   * Converts the input date string into a format: "DD Mon YYYY | HH:MM".
   *
   * @function formatDate
   * @param {string} timeString - The date string to format. (Required)
   * @returns {string} The formatted date string.
   */
  const formatDate = (timeString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[new Date(timeString).getMonth()];
    const date = new Date(timeString).getDate();
    const year = new Date(timeString).getFullYear();
    const hour = new Date(timeString).getHours();
    const minute = new Date(timeString).getMinutes();
    return `${date} ${month} ${year} | ${hour}:${minute}`;
  };

  const handleDeleteEpisode = async () => {
    await deleteEpisode(deleteModal, projectId);
    setDeleteModal("");
    setRefetch((prev) => !prev);
  };

  useEffect(() => {
    handleFetchData();
  }, [refetch]);

  return (
    <div className={style.container}>
      <BreadCrumbs second={"Add your podcast"} first={projectName} />
      <br />
      <h1 className={style.heading}>Add Podcast</h1>

      <div className={style.cardWrapper}>
        <Card
          title="RSS Feed"
          onClick={handleModalOpen}
          icon={rssIcon}
          desc={"Lorem ipsum dolor sit. Dolor lorem sit."}
        />
        <Card
          title="Youtube Video"
          onClick={handleModalOpen}
          icon={ytIcon}
          desc={"Lorem ipsum dolor sit. Dolor lorem sit."}
        />
        <Card
          title="Upload Files"
          onClick={handleModalOpen}
          icon={uploadIcon}
          desc={"Lorem ipsum dolor sit. Dolor lorem sit."}
        />
      </div>

      <div className={style.tableContainer}>
        {loading ? (
          <LoadingItem height="40vh" />
        ) : !!episodes?.length ? (
          <>
            <h3>Your Files</h3>
            <table>
              <thead>
                <th>No.</th>
                <th>Name</th>
                <th>Upload Date & Time</th>
                <th>Action</th>
              </thead>

              <tbody>
                {episodes.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{formatDate(item?.date)}</td>
                    <td>
                      <div className={style.buttonContainer}>
                        <div
                          onClick={() =>
                            navigate(`/podcast/${projectId}/episode/${item.id}`)
                          }
                          className={style.viewBtn}
                        >
                          View
                        </div>
                        <div
                          onClick={() => {
                            setDeleteModal(item.id);
                          }}
                          className={style.deleteBtn}
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div onClick={handleModalOpen} className={style.uploadContainer}>
            <img src={cloudUploadIcon} alt="" />
            <h3>
              Select a file or drag and drop here (Podcast Media or
              Transcription Text)
            </h3>
            <h4>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </h4>
            <button>Select File</button>
          </div>
        )}
      </div>

      <Modal open={modalOpen}>
        <div className={style.modalContainer}>
          <div className={style.modalHeader}>
            <div className={style.wrapper}>
              <img src={uploadIcon} alt="" />
              <h3>Upload Episode</h3>
            </div>
            <img
              onClick={handleModalClose}
              className={style.closeIcon}
              src={closeIcon}
              alt="x"
            />
          </div>

          <div className={style.contentWrapper}>
            <div className={style.inputWrapper}>
              <label htmlFor="episode-name">Name</label>
              <input
                placeholder="Enter Name..."
                type="text"
                onChange={handleNameChange}
                value={data?.name}
                id="episode-name"
                className={
                  err === "Episode name is required" ? style.error : ""
                }
              />
            </div>

            <div className={style.inputWrapper}>
              <label htmlFor="Transcript">Transcript</label>
              <ReactQuill
                id="Transcript"
                modules={modules}
                theme="snow"
                formats={formats}
                value={data?.content}
                onChange={handleContentChange}
                style={{
                  height: "100%",
                  border: "1px solid #8d8d8d",
                  fontWeight: 400,
                  borderRadius: "5px",
                }}
                placeholder="Enter your Transcript..."
              />
            </div>
            <div className={style.buttonWrapper}>
              <p className={style.error}>{err}</p>
              <button disabled={submitLoading} onClick={handleSubmit}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteModal}>
        <div className={style.deleteModal}>
          <div className={style.header}>
            <h3>Are you sure ?</h3>
          </div>
          <p>
            Are you sure you want to delete this episode? This action cannot be
            undone and the episode will be permanently removed.{" "}
          </p>

          <div className={style.footerWrapper}>
            <div className={style.btnWrapper}>
              <button
                onClick={() => setDeleteModal("")}
                className={style.cancelBtn}
              >
                Cancel
              </button>
              <button onClick={handleDeleteEpisode} className={style.dltBtn}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

function Card({ title, desc, icon, onClick }) {
  return (
    <div onClick={onClick} className={style.card}>
      <div className={style.content}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div>
        <img src={icon} alt="icon" />
      </div>
    </div>
  );
}

export default AddPodcast;
