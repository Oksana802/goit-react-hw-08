import AppBar from "./AppBar/AppBar";
import s from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={s.container}>
      <AppBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
