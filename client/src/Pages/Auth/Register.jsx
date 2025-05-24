import style from "./auth.module.css";
import waveImg from "../../assets/Wave.svg";
import LogoWhite from "../../assets/LogoWhite.svg";
import Logo from "../../assets/Logo.svg";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../Api/Api";
import { isLogin } from "../../Utils/Auth";

const Register = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    msg: "",
    fields: [],
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleValueChange = ({ target: { name, value } }) => {
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
    if (err?.fields?.includes(name)) {
      setErr((prev) => {
        return {
          ...prev,
          fields: prev.fields?.filter((x) => x !== name),
        };
      });
    }
  };

  const validate = () => {
    try {
      if (!userCredentials?.username) throw "username is required !";
      if (!userCredentials?.email) throw "email is required !";
      if (!userCredentials?.password) throw "password is required !";

      return true;
    } catch (error) {
      setErr({ msg: "", fields: [error?.split(" ")[0]] });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (validate()) {
        const result = await register(userCredentials);
        const token = result?.data?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setErr({ msg: error?.response?.data?.message, fields: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin()) {
      navigate("/");
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <img src={waveImg} className={style.waveImg} alt="waveImg" />
        <div className={style.contentWrapper}>
          <div className={style.LogoWrapper}>
            <img src={LogoWhite} className={style.LogoWhite} alt="LogoWhite" />
            <h3 className={style.logoText}>
              <b>Ques.</b>AI
            </h3>
          </div>
          <br />

          <h5>
            Your podcast <br /> will no longer <br /> be just a hobby.
          </h5>
          <h3 className={style.subText}>
            Supercharge Your Distribution <br /> using our AI assistant!
          </h3>
        </div>
      </div>

      <section>
        <img className={style.logo} src={Logo} alt="Logo" />

        <h4>
          Welcome to <br /> <b>Ques.AI</b>
        </h4>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            value={userCredentials?.username}
            type="text"
            name="username"
            className={`${
              err?.fields?.includes("username") ? style.error : ""
            }`}
            placeholder="Username"
            onChange={handleValueChange}
          />
          <input
            value={userCredentials?.email}
            type="email"
            name="email"
            className={`${err?.fields?.includes("email") ? style.error : ""}`}
            placeholder="Email Address"
            onChange={handleValueChange}
          />
          <input
            value={userCredentials?.password}
            type="password"
            name="password"
            className={`${
              err?.fields?.includes("password") ? style.error : ""
            }`}
            placeholder="Password"
            onChange={handleValueChange}
          />
          <p className={style.error}>{err?.msg}</p>
          <button type="submit" disabled={loading}>
            Register
          </button>
          <p>
            Already have an account?{" "}
            <b
              onClick={() => {
                startTransition(() => {
                  navigate("/login");
                });
              }}
            >
              Login
            </b>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
