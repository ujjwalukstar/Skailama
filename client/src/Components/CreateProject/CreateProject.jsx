import style from "./createProject.module.css";
import placeholder from "../../assets/placeholder-img-1.svg";
import plusIcon from "../../assets/plusIcon.svg";

const CreateProject = ({
  modalOpen,
  handleModalOpen,
}) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Create a New Project</h1>
      <img className={style.placeholder} src={placeholder} alt="" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </p>
      {!modalOpen && (
        <button className={style.createBtn} onClick={handleModalOpen}>
          <img src={plusIcon} alt="+" />
          Create New Project
        </button>
      )}
    </div>
  );
};

export default CreateProject;
