import s from "./HomePage.module.css";
import car from "../../assets/bg-1.jpg";
const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>🎄Don't forget to spread the holiday cheer!🎄</h1>
      <ul>
        <li className={s.text}>
          Save your contacts in our app, create a festive list, and make sure
          everyone gets their Christmas wishes!
        </li>
        <li className={s.text}>
          ✨ Stay organized, make the season magical! ✨
        </li>
      </ul>
      <img src={car} alt="Santa and his friends" />
    </div>
  );
};

export default HomePage;
