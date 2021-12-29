import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNote from "./components/add-note.component";
import NotesList from "./components/notes-list.component";
import NotesInfo from "./components/note-info.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/notes" className="navbar-brand">
            小猪猪不知道
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/notes"} className="nav-link">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>React Firebase Database CRUD</h2>
          <Switch>
            <Route exact path={["/", "/notes"]} component={NotesList} />
            <Route exact path="/add" component={AddNote} />
            <Route exact path="/note/:noteId" component={NotesInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
