import style from "./modal.module.css";

const Modal = ({ children, open = false }) => {
  return <div style={{display: open ? "flex" : "none"}} className={style.container}>{children}</div>;
};

export default Modal;
