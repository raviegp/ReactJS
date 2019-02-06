import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import NotesApp from '../components/NotesApp';
import EditNote from '../components/EditNote';
import createHistory from 'history/createBrowserHistory';
import WelcomePage from '../components/WelcomePage';
import { green, pink } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Header from '../components/Header';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: pink
    },
    typography: {
        useNextVariants: true,
    },
});

export const history = createHistory();

// function to handle routes which are protected,
// Component is difened to handle such components to be rendered, which takes rest {...rest} of the properties sent and all other props
// this passes all the props which we are sendiong in the ProtectedRoute tag which loads the actual component
function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                (localStorage.getItem('isLoggedIn') || false) ? (
                    <MuiThemeProvider theme={theme}>
                        <Component
                            {...rest}
                            {...props}
                        />
                    </MuiThemeProvider >
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filteredNotes: []
        };
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
    }

    componendDidMount() {
        // Get all the notes
    }

    handleAddNote(note) {
        this.setState((currState) => ({
            notes: currState.notes.concat([note]),
            filteredNotes: currState.notes.concat(note)
        }));

        // Post a new note
    }

    handleRemoveNote(noteId) {
        const noteIndexToRemove = this.state.notes.findIndex(note => note.id === noteId);
        this.setState((currState) => ({
            notes: [...currState.notes.slice(0, noteIndexToRemove), ...currState.notes.slice(noteIndexToRemove + 1)],
            filteredNotes: [...currState.notes.slice(0, noteIndexToRemove), ...currState.notes.slice(noteIndexToRemove + 1)]
        }));

        // Delete the note
    }

    // ...updateNote ... is spread operator which ebentually passes the value in the object / variable used along with it.
    handleUpdateNote(updatedNote) {
        const noteIndexToUpdate = this.state.notes.findIndex(note => note.id === updatedNote.id);
        this.setState((currState) => ({
            notes: [...currState.notes.slice(0, noteIndexToUpdate), { ...updatedNote }, ...currState.notes.slice(noteIndexToUpdate + 1)],
            filteredNotes: [...currState.notes.slice(0, noteIndexToUpdate), { ...updatedNote }, ...currState.notes.slice(noteIndexToUpdate + 1)]
        }));

        // Update the note
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

    render() {
        return (
            <Fragment><MuiThemeProvider theme={theme}><Header filterNotes={this.filterNotes}/></MuiThemeProvider>
                <Router history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => <MuiThemeProvider theme={theme}>
                                <WelcomePage />
                            </MuiThemeProvider>}
                        />
                        <ProtectedRoute
                            path="/home"
                            exact
                            component={NotesApp}
                            notes={this.state.filteredNotes}
                            handleAddNote={this.handleAddNote}
                            handleRemoveNote={this.handleRemoveNote}                            
                        />
                        <ProtectedRoute
                            path="/edit-note/:id"
                            component={EditNote}
                            notes={this.state.filteredNotes}
                            handleUpdateNote={this.handleUpdateNote}
                        />
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}

export default AppRouter;