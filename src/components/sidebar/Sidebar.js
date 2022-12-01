import React from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";

const Sidebar = ({ tabs, handleNavigate }) => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        {/* logo */}
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.jpg"}
            alt="logo"
            className="logo__image"
          />
          <h1 className="logo__title">Online Asset Management</h1>
        </div>
        {/* menu */}
        <div className="menu">
          {
            tabs.map(tab => {
              return (
                <div className="menu__item" key={tab.id}>
                  <NavLink
                    to={tab.link}
                    className={({ isActive }) =>
                      isActive ? "menu__item--active menu-navlink" : "menu-navlink"
                    }
                    onClick={() => handleNavigate(tab.name)}
                  >
                    {tab.name}
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Sidebar;
