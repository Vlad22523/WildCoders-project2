import { useDispatch } from "react-redux";
import s from "./Header.module.css";
import { toggleSidebar } from "../../redux/sidebar/slice.js";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={s.header}>
      <button
        className={s.burger_menu}
        onClick={() => dispatch(toggleSidebar())}
      >
        Menu
      </button>
    </header>
  );
};

export default Header;
