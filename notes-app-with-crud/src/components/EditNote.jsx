import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            noteTitle: this.props.myNotes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteTitle,
            noteDescription: this.props.myNotes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteDescription
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleNoteTitleChange = this.handleNoteTitleChange.bind(this);
        this.handleNoteDescriptionChange = this.handleNoteDescriptionChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleClickClose() {
        this.setState({
            open: false,
            noteTitle: '',
            noteDescription: '',
        });
        this.props.history.push('/home');
    }

    handleNoteTitleChange(event) {
        this.setState({ noteTitle: event.target.value });
    }

    handleNoteDescriptionChange(event) {
        this.setState({ noteDescription: event.target.value });
    }

    handleUpdateNote() {
        const updatedNote = {
            id: parseFloat(this.props.match.params.id),
            noteTitle: this.state.noteTitle,
            noteDescription: this.state.noteDescription,
        }
        this.props.handleUpdateNote(updatedNote);
        this.handleClickClose();
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClickClose}
                aria-labelledby="Edit Note Form"
            >
                <DialogTitle id="Edit Note Form">
                    Edit Note
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="note-title"
                        label="Note Title"
                        type="text"
                        fullWidth
                        onChange={this.handleNoteTitleChange}
                        value={this.state.noteTitle}
                    />
                    <TextField
                        margin="dense"
                        id="note-description"
                        label="Note Description"
                        type="text"
                        fullWidth
                        onChange={this.handleNoteDescriptionChange}
                        value={this.state.noteDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClickClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.handleUpdateNote} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditNote;