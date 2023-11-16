import { Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/Login";
import RegisterPage from "../../pages/Register";
import "./style.scss";

const SignLayout = () => {
  return (
    <div id="sign__layout">
      <Switch>
        <Route path="/auth/login">
          <LoginPage />
        </Route>
        <Route path="/auth/register">
          <RegisterPage />
        </Route>
      </Switch>
    </div>
  );
};

export default SignLayout;
