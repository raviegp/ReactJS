import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditNote from '../components/EditNote';
import NotesApp from '../components/NotesApp';

class NotesAppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            view: 'gridView',
            filteredNotes: [],
        };
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.changeDisplayView = this.changeDisplayView.bind(this);
    }

    // React Life cycle method called by default while loading
    componentDidMount() {
        fetch('http://localhost:8080/notes')
            .then(response => response.json())
            .then(notesResponse => {
                this.setState({
                    notes: notesResponse,
                    filteredNotes: notesResponse
                });
            });
    }

    handleAddNote(note) {
        this.setState(currState => ({
            notes: currState.notes.concat(note),
            filteredNotes: currState.notes.concat(note)
        })
        )
    }

    handleUpdateNote(updatedNote) {
        fetch(`http://localhost:8080/notes/${updatedNote.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedNote)
        }).then(response => response.json())
            .then(notesResponse => {
                const noteIndex = this.state.notes.findIndex(note => note.id === updatedNote.id);
                this.setState((currState) => ({
                    notes: [...currState.notes.slice(0, noteIndex), { ...updatedNote }, ...currState.notes.slice(noteIndex + 1)],
                    filteredNotes: [...currState.notes.slice(0, noteIndex), { ...updatedNote }, ...currState.notes.slice(noteIndex + 1)]
                }));
            });
    }

    handleDeleteNote(noteId) {
        // filter gives an array back with all original data except the matching consition .. filtering the matched ID
        const notesAfterDeleteNote = this.state.notes.filter(note => note.id !== noteId);
        this.setState({
            notes: notesAfterDeleteNote,
            filteredNotes: notesAfterDeleteNote
        });
        fetch(`http://localhost:8080/notes/${noteId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(notesResponse => console.log(`deleted note: ${notesResponse}`));
    }

    // Filter based on Search string
    filterNotes = (searchFilter) => {
        const searchString = searchFilter.target.value
        if (searchString) {
            let filteredNotes = this.state.notes.filter(filterNote => filterNote.noteTitle.toLowerCase().indexOf(searchString.toLowerCase()) > -1)
            // set the filetered notes matching given string to the state to show in Notes Container
            this.setState({
                filteredNotes
            })
        } else {
            this.setState(currState => ({
                filteredNotes: currState.notes
            }));
        }
    }

    changeDisplayView(view) {
        this.setState({ view })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/home"
                        exact
                        render={(props) => (<NotesApp
                            {...props}
                            myNotes={this.state.filteredNotes}
                            displayView={this.state.view}
                            changeDisplayView={this.changeDisplayView}
                            handleAddNote={this.handleAddNote}
                            handleDeleteNote={this.handleDeleteNote}
                            filterNotes={this.filterNotes}
                        />)}
                    />
                    <Route
                        path="/edit-note/:id"
                        render={(props) => <EditNote
                            {...props}
                            myNotes={this.state.filteredNotes}
                            handleUpdateNote={this.handleUpdateNote}
                        />}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default NotesAppRouter;