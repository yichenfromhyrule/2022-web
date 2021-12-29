import React, { Component } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NoteDataService from "../services/note.service";

import Note from "./note.component";

export default class NotesList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNote = this.setActiveNote.bind(this);
    this.removeAllNotes = this.removeAllNotes.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      notes: [],
      currentNote: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    NoteDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    NoteDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let notes = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      notes.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      notes: notes,
    });
  }

  refreshList() {
    this.setState({
      currentNote: null,
      currentIndex: -1,
    });
  }

  setActiveNote(note, index) {
    this.setState({
      currentNote: note,
      currentIndex: index,
    });
  }

  removeAllNotes() {
    NoteDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { notes, currentNote, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Notes List</h4>

          <ul className="list-group">
            {notes &&
              notes.map((note, index) => (
                <div>
                <h5 key = {index}>
                  <Link to={`/note/${index + 1}`}>{index}'s Page</Link>
                </h5>
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNote(note, index)}
                  key={index}
                >
                  {note.title}
                </li>
                </div>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNotes}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentNote ? (
            <Note
              note={currentNote}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Note...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
