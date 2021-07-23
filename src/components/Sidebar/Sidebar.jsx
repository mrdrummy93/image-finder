import React from "react";
import s from './Sidebar.module.css'
import cloud from "../../images/cloud-icon-12863.png"
import book from "../../images/book_icon-icons.com_73655.png"
import {NavLink} from "react-router-dom";

class Sidebar extends React.Component {
    render() {
        return (
          <div className={s.sidebarWrapper}>
              <div className={s.finderIcon}>
                  <NavLink to='/search'><img src={cloud} alt="search" style={{width: 40}}/></NavLink>
              </div>
              <div className={s.bookmarksIcon}>
                  <NavLink to='bookmarks'><img src={book} alt="bookmarks" style={{width: 40}}/></NavLink>
              </div>
          </div>
        );
    }
}

export default Sidebar;