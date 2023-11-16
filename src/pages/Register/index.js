import { Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  // const history = useHistory()

  const redirect = (path) => {
    // history.push(path)
  };

  return (
    <div id="sign-page">
      <div className="back-to-home-logo">
        <Link to="/">
          <div className="logo__wrapper">
            <img alt="Back to home" src="/images/logo.png" />
          </div>
        </Link>
      </div>
      <div id="register-page">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
