import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div>
      <label className={s.filter}>
        <span className={s.span}>Find contacts by name</span>
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};

export default SearchBox;
