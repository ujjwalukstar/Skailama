import style from "./loading.module.css";

const Loading = ({ height = "auto" }) => {
  return (
    <div style={{ height: height }} className={`${style.loadContainer}`}>
      <span class={style.loader}></span>
    </div>
  );
};

export default Loading;
