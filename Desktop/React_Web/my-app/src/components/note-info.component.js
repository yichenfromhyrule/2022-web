import React, { Component } from "react";
import NoteDataService from "../services/note.service";

import Note from "./note.component";

export default class NotesInfo extends Component {
    constructor(props) {
        super(props);
        this.onDataChange = this.onDataChange.bind(this);
    
        this.state = {
          notes: [],
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

      
    
      
    
      


  render() {
    //  var currentNote = {currentNote};
    const { notes } = this.state;
    const currentIndex = this.props.match.params.noteId - 1;
    const currentNote = notes[currentIndex];
    console.log(currentIndex);
    console.log(typeof currentNote);
    
    
    //const entries = Object.entries(currentNote);
    
    //console.log(currentN.title);
    //var c_title = currentN.title;
    return (
      <div>
        <h1>HIIIIII</h1>
        <h2>{currentIndex}</h2>
        
       
        
      </div>
    );
  }
}
