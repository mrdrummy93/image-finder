import React from "react";
import s from "./Header.module.css"

class Header extends React.Component {
    render() {
        return(
          <div className={s.headerWrapper}>
            <div className={s.appName}>
                <h2>Image Finder</h2>
            </div>
            <div className={s.profileIcon}>
                <img src='https://image.flaticon.com/icons/png/512/64/64572.png' alt='profile'/>
            </div>
          </div>
        )
    }
}

export default Header;