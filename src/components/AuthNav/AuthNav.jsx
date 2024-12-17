import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div>
      <ul className={s.list}>
        <NavLink className={s.linkAuth} to="/register">
          Register
        </NavLink>
        <NavLink className={s.linkAuth} to="/login">
          Login
        </NavLink>
      </ul>
    </div>
  );
};

export default AuthNav;
