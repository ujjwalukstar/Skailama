import { useNavigate, useParams } from "react-router-dom";
import style from "./episode.module.css";
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";
import { deleteEpisode, getEpisodeById, updateEpisode } from "../../Api/Api";
import leftArrowIcon from "../../assets/leftArrowIcon.svg";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../../Utils/config";

const Episode = () => {
  const { episodeId, projectId } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [episode, setEpisode] = useState({ content: "", name: "" });
  const [editText, setEditText] = useState({ content: "", name: "" });
  const [edit, setEdit] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleFetchEpisodeData = async () => {
    try {
      const result = await getEpisodeById(episodeId);
      if (!result?.data?.data) return navigate("/");
      setProjectName(result?.data?.data?.projectName);
      setEpisode({
        content: result?.data?.data?.content,
        name: result?.data?.data?.name,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleContentChange = (html) => {
    setEditText((prev) => ({ ...prev, content: html }));
  };

  const handleEditTrue = () => {
    setEdit(true);
    setEditText(episode);
  };

  const handleDiscard = () => {
    setEditText(episode);
    setEdit(false);
  };

  const handleSave = async () => {
    try {
      if (!episodeId) throw "Episode Id is required";
      if (!editText?.name) throw "Episode name is required";
      await updateEpisode(episodeId, projectId, editText);
      handleDiscard();
      setRefetch((prev) => !prev);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleNameChange = (e) => {
    setEditText((prev) => ({ ...prev, name: e?.target?.value }));
  };

  useEffect(() => {
    handleFetchEpisodeData();
  }, [refetch]);

  return (
    <div className={style.container}>
      <BreadCrumbs first={projectName} second={"View Transcript"} />

      <div className={style.topWrapper}>
        <div className={style.leftWrapper}>
          <img
            onClick={() => {
              if (edit) {
                handleDiscard();
              } else {
                navigate(`/podcast/${projectId}/add-podcast`);
              }
            }}
            src={leftArrowIcon}
            alt=""
          />
          <h3>{edit ? "Edit" : "View"} Transcript</h3>
        </div>
        {edit ? (
          <div className={style.buttonWrapper}>
            <button onClick={handleDiscard} className={style.discardButton}>
              Discard
            </button>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button onClick={handleEditTrue} className={style.editIcon}>
            Edit
          </button>
        )}
      </div>

      <div className={style.contentContainer}>
        {edit ? (
          <>
            <input
              value={editText?.name}
              onChange={handleNameChange}
              type="text"
            />
            <ReactQuill
              modules={modules}
              theme="snow"
              formats={formats}
              value={editText?.content}
              onChange={handleContentChange}
              style={{
                height: "100%",
                border: "1px solid #8d8d8d",
                fontWeight: 400,
                borderRadius: "5px",
              }}
              placeholder="Enter your Transcript..."
            />
          </>
        ) : (
          <>
            <h4>{episode?.name}</h4>
            <div
              style={{ display: "flex", flexWrap: "wrap" }}
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Episode;
