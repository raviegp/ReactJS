import React, { Component, Fragment } from 'react';
import GridView from './GridView';
import ListView from './ListView';
import NoteTaker from './NoteTaker';

class NotesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: '',
            notes: []
        }
        this.handleAddNote = this.handleAddNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    // React Life cycle method called by default while loading
    componentDidMount() {
        fetch('http://localhost:8080/notes')
            .then(response => response.json())
            .then(notesResponse => {
                this.setState({
                    notes: notesResponse
                });
            });
    }

    handleAddNote(myTitle, myDescription) {
        const newNote = { noteTitle: myTitle, noteDescription: myDescription };

        //Fetch POST
        fetch('http://localhost:8080/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 404) {
                return Promise.reject(new Error('Invalid URL'))
            }
            else if (response.status === 401) {
                return Promise.reject(new Error('UnAuthorized User...'));
            }
            else {
                return Promise.reject(new Error('Some internal error occured...'));
            }
        }).then(addedNote => {
            this.setState((currState) => ({
                notes: currState.notes.concat(addedNote)
            }));
        }).catch(error => {
            const errorMsg = `<h2 style='color:red'>${error.message}</h2>`;
            return errorMsg;
        })
    }

    deleteNote(noteId) {
        const filteredNotes = this.state.notes.filter(note => note.id !== noteId);
        this.setState({
            notes: filteredNotes
        });
        fetch(`http://localhost:8080/notes/${noteId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(note => console.log(`deleted note: ${note}`));
    }

    render() {
        return (
            <Fragment>
                <NoteTaker handleAddNote={this.handleAddNote} />
                {(this.state.notes.length > 0) ?
                    ((this.props.viewType === 'gridView') ?
                        (<GridView myNotes={this.state.notes} deleteNote={this.deleteNote} />) : (<ListView myNotes={this.state.notes} deleteNote={this.deleteNote}/>))
                    : (<p>No Notes To Display</p>)}
            </Fragment>
        );
    }
}

export default NotesContainer;