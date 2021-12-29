import React, { Component } from "react";
import NoteDataService from "../services/note.service";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      currentNote: {
        key: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { note } = nextProps;
    if (prevState.currentNote.key !== note.key) {
      return {
        currentNote: note,
        message: ""
      };
    }

    return prevState.currentNote;
  }

  componentDidMount() {
    this.setState({
      currentNote: this.props.note,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentNote: {
          ...prevState.currentNote,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentNote: {
        ...prevState.currentNote,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    NoteDataService.update(this.state.currentNote.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentNote: {
            ...prevState.currentNote,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateNote() {
    const data = {
      title: this.state.currentNote.title,
      description: this.state.currentNote.description,
    };

    NoteDataService.update(this.state.currentNote.key, data)
      .then(() => {
        this.setState({
          message: "The note was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteNote() {
    NoteDataService.delete(this.state.currentNote.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { currentNote } = this.state;

    return (
      <div>
        <h4>Note</h4>
        {currentNote ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNote.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentNote.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentNote.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentNote.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNote}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success mr-2"
              onClick={this.updateNote}
            >
              Update
            </button>

            <button
              type="submit"
              className="badge badge-info"
              onClick={this.infoNote}
            >
              Details
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Note...</p>
          </div>
        )}
      </div>
    );
  }
}
