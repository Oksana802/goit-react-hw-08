import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <div className={s.nav}>
      <NavLink className={s.linkHeader} to="/">
        Home
      </NavLink>
      <NavLink className={s.linkHeader} to="/contacts">
        Contacts
      </NavLink>
    </div>
  );
};

export default Navigation;
