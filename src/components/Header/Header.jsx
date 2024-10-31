import s from "./Header.module.css";

const Header = ({ toggleSidebar }) => {
  return (
    <header className={s.header}>
      <button className={s.burger_menu} onClick={toggleSidebar}>
        Menu
      </button>
    </header>
  );
};

export default Header;
