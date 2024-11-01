import { useDispatch } from "react-redux";
import s from "./Header.module.css";
import { toggleSidebar } from "../../redux/sidebar/slice.js";
import SvgIcon from "../../hooks/SvgIcon.jsx";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={s.header}>
      <button
        className={s.burger_menu}
        onClick={() => dispatch(toggleSidebar())}
      >
        <SvgIcon
          name="icon-menu-01"
          width="32"
          height="32"
          className={s.header_menu}
        />
      </button>
      <div>profile</div>
    </header>
  );
};

export default Header;
