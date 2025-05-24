import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Error;
