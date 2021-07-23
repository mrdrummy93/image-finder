import React from 'react';
import Image from "../Image/Image";
import s from "./Bookmarks.module.css";

function Bookmarks({ deleteFromBookmarks, bookmarks }) {
    return bookmarks.map(({ srcPath, id, title }) => {
        const handleClick = () => deleteFromBookmarks(id);
        return (
          <div className={s.bookmarksWrapper}>
            <Image url={srcPath} key={id} alt={title} handleClick={handleClick} isInBookmark={true} />
          </div>
        );
    });
}

export default Bookmarks;