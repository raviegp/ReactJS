import React, { Component } from 'react';
import Header from './Header';
import NotesContainer from './NotesContainer';
import { blue, pink } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NoteTaker from './NoteTaker';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
    typography: {
        useNextVariants: true,
    },
});

class NotesApp extends Component {
    constructor(props) {
        super(props);
        this.toggleView = this.toggleView.bind(this);
    }

    toggleView(viewType) {
        this.props.changeDisplayView(viewType);
    }

    render() {
        const { myNotes, handleAddNote, handleDeleteNote, displayView, filterNotes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Header toggleView={this.toggleView} viewType={displayView} filterNotes={filterNotes} />
                    </Grid>
                    {<Grid item xs={12}>
                        <NoteTaker handleAddNote={handleAddNote} />
                    </Grid>}
                    <Grid item xs={12}>
                        <NotesContainer viewType={displayView} myNotes={myNotes} handleDeleteNote={handleDeleteNote} />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        )
    }
}

export default NotesApp;