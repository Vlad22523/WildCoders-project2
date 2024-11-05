import { useDispatch, useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import { selectIsOpenSidebar } from "../../redux/sidebar/selectors";
import { useEffect, useRef } from "react";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import { closeSidebar } from "../../redux/sidebar/slice.js";
import { NavLink } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/operations.js";
import arr from "./BoardsArr.js";
import clsx from "clsx";

const Sidebar = () => {
  const isOpen = useSelector(selectIsOpenSidebar);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch(closeSidebar());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <>
      {isOpen && (
        <div className={s.overlay} onClick={() => dispatch(closeSidebar())} />
      )}
      <aside ref={sidebarRef} className={`${s.side} ${isOpen ? s.open : ""}`}>
        <div className={s.side_container}>
          <a className={s.logo_link} href="/home">
            <div className={s.logo_container}>
              <SvgIcon
                name="icon-logo"
                width="15"
                height="16"
                className={s.svg_logo}
              />
            </div>
            Task Pro
          </a>
          <h3 className={s.under_logo}>My boards</h3>
          <div className={s.create_top_container}>
            <div className={s.create_container}>
              <h2 className={s.create_title}>Create a new board</h2>
              <button className={s.create_button}>
                <SvgIcon
                  name="icon-plus"
                  width="20"
                  height="20"
                  className={s.icon}
                />
              </button>
            </div>
          </div>

          <ul className={s.board_list}>
            {arr.map((board) => (
              <li key={board.boardId} className={s.board_item}>
                <NavLink
                  to={`/board/${board.boardId}`}
                  className={buildLinkClass}
                >
                  <div className={s.board_list_container}>
                    <div className={s.board_title_container}>
                      <SvgIcon
                        name={board.icon}
                        width="18"
                        height="18"
                        className={s.board_item_svg}
                      />
                      <span className={s.board_item_title}>{board.title}</span>
                    </div>
                    <div className={s.board_svg_container}>
                      <SvgIcon
                        name="icon-pencil"
                        width="16"
                        height="16"
                        className={s.board_svg}
                      />
                      <SvgIcon
                        name="icon-trash"
                        width="16"
                        height="16"
                        className={s.board_svg}
                      />
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={s.side_help}>
            <div className={s.side_help_span}>
              <img src="/src/images/plant.png" width="57" height="78" alt="" />
              <p>
                If you need help with <span>TaskPro</span>, check out our
                support resources or reach out to our customer support team.
              </p>
            </div>
            <div className={s.side_help_text}>
              <SvgIcon name="icon-help-circle" width="20" height="20" />
              Need help?
            </div>
          </div>
          <button
            onClick={() => dispatch(logoutThunk())}
            className={s.side_logout_btn}
          >
            <SvgIcon
              name="icon-logout"
              width="32"
              height="32"
              className={s.side_logout_svg}
            />
            <h2>Log out</h2>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
