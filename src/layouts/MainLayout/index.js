import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import Private from "../PrivateLayout";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="main_layout">
      <Header />
      <div className="layout_content__wrap">
        <Switch>
          {routes.map((route) => {
            if (!route.private)
              return <Route key={route.name} exact {...route} />;
            return <Private {...route} key={route.name} />;
          })}
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
