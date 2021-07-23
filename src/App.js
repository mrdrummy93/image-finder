import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmarks from './components/Bookmarks/Bookmarks';
import styles from './App.css'

import { BOOKMARKS_KEY } from './constatnts';

class App extends React.Component {
    constructor(props) {
        super(props);
        const rawBookmarksData = window.localStorage.getItem(BOOKMARKS_KEY);
        let bookmarks;
        if (!rawBookmarksData) {
            bookmarks = [];
        } else {
            bookmarks = JSON.parse(rawBookmarksData);
        }
        this.state = {
            bookmarks,
        };
    }

    saveBookmarks = () => {
        window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(this.state.bookmarks));
    }

    addToBookmarks = (imageData) => {
        this.setState((prevState) => ({
            bookmarks: [
                ...prevState.bookmarks,
                imageData,
            ],
        }), this.saveBookmarks);
    }

    deleteFromBookmarks = (idToDelete) => {
        this.setState((prevState) => ({
            bookmarks: prevState.bookmarks.filter(({ id }) => idToDelete !== id),
        }), this.saveBookmarks);
    }

    render() {
        return (
          <BrowserRouter>
              <div className='app-wrapper'>
                  <Header />
                  <div className='app-wrapper-content'>
                      <Sidebar />
                      <Route
                        path="/search"
                        render={() => (
                          <Search
                            bookmarks={this.state.bookmarks}
                            addToBookmarks={this.addToBookmarks}
                            deleteFromBookmarks={this.deleteFromBookmarks}
                          />
                        )}
                      />
                      <Route path="/bookmarks" render={() => <Bookmarks bookmarks={this.state.bookmarks} deleteFromBookmarks={this.deleteFromBookmarks} />} />
                  </div>
                  <Footer />
              </div>
          </BrowserRouter>
        );
    }
}

export default App;