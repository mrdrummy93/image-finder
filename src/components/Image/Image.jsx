import React from "react";
import s from "./Image.module.css";

const Image = ({ url, title, handleClick, isInBookmark }) => (
  <div className={s.imageCard}>
      <img className={s.image} src={url} alt={title}/>
      <button
        className={s.imageButton}
        onClick={handleClick}
        type="button"
      >
          {isInBookmark ? 'Remove from bookmarks' : 'Bookmark It'}
      </button>
      <input className={s.inputTags} type="text" placeholder="some tags?"/>
  </div>
);

export default Image;