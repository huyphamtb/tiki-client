// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div id="sign-page">
      <div className="back-to-home-logo">
        <Link to="/">
          <div className="logo__wrapper">
            <img alt="Back to home" src="/images/logo.png" />
          </div>
        </Link>
      </div>
      <div id="login-page">
        <LoginForm isHome={false} />
      </div>
    </div>
  );
};

export default LoginPage;
