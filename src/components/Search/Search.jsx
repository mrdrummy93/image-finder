import React from "react";
import { Pagination } from "react-bootstrap";
import s from "./Search.module.css";
import { apiKey } from "../../api/config";
import Image from "../Image/Image";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            textInput: '',
            pagesCount: 0,
            perPage: 9,
            currentPage: 1,
        };
    }

    componentDidMount() {
        this.fetchImageFromServer();
    }

    fetchImageFromServer = () => {
        const { textInput, perPage, currentPage } = this.state;
        if (!textInput) {
            return;
        }

        fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${textInput}&per_page=${perPage}&page=${currentPage}&format=json&nojsoncallback=1`,
        )
          .then((rawResponse) => rawResponse.json())
          .then(({ photos: { photo, pages } }) => {
              this.setState({
                  pagesCount: pages,
                  pictures: photo.map((pic) => {
                      const {
                          farm,
                          server,
                          id,
                          secret,
                          title,
                      } = pic;
                      const srcPath = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
                      return {
                          srcPath, id, title,
                      };
                  }),
              });
          })
          .catch((error) => {
              console.log('Data error', error);
          });
    }

    renderImages = () => this.props.bookmarks.map(({ srcPath, id, title }) => {
        const { deleteFromBookmarks } = this.props;
        const handleClick = () => deleteFromBookmarks(id);

        return (
          <Image url={srcPath} key={id} alt={title} handleClick={handleClick} isInBookmark={true} />
        );
    })

    renderImages = () => this.state.pictures.map(({ srcPath, id, title }) => {
        const { addToBookmarks, deleteFromBookmarks, bookmarks } = this.props;
        const isInBookmark = !!bookmarks.find((bookmark) => bookmark.id === id);
        const handleClick = () => {
            if (isInBookmark) {
                return deleteFromBookmarks(id);
            }

            addToBookmarks({ srcPath, id, title });
        };

        return (
          <Image url={srcPath} key={id} alt={title} handleClick={handleClick} isInBookmark={isInBookmark} />
        );
    })

    renderPagination = () => {
        const { pagesCount, currentPage } = this.state;
        const pages = [];
        const pagesToRender = pagesCount > 20 ? 20 : pagesCount;

        for (let i = 1; i <= pagesToRender; i++) {
            pages.push(
              <Pagination.Item key={i} onClick={() => this.handlePageChange(i)} active={currentPage === i} activeLabel="">
                  {i}
              </Pagination.Item>,
            );
        }

        return (
          <div className={s.pagination}>
              <Pagination size="sm">
                  {pages}
              </Pagination>
          </div>
        );
    }

    renderInput = () => (
      <input
        size={153}
        placeholder="Find images"
        value={this.state.textInput}
        onChange={this.handleChange}
      />
    )

    handleChange = (e) => {
        this.setState({ textInput: e.target.value }, this.debounceFetchImages());
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.fetchImageFromServer);
    }

    debounceFetchImages = () => {
        this.Debounce(
          () => {
              this.fetchImageFromServer();
          },
          1000,
        );
    }

    Debounce = (function () {
        let timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    }());

    render() {
        return (
          <div className={s.searchWrapper}>
              <div className={s.searchField}>
                  {this.renderInput()}
              </div>
              {this.renderPagination()}
              <div className={s.results}>
                  {this.renderImages()}
              </div>
          </div>
        );
    }
}

export default Search;