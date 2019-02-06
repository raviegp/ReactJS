import Note from './Note';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  paper: {
    height: 250,
    width: 250,
    margin: theme.spacing.unit * 1
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class GridView extends Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
  }

  deleteNote(noteId) {
    this.props.deleteNote(noteId);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.control} justify="center" spacing={8}>
        {this.props.myNotes.map(note => <Paper className={classes.paper} elevation={1}>
          <Grid key={note.id} item>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" key={note.id} >
                <DeleteIcon onClick={() => this.deleteNote(note.id)} />
              </IconButton>
            </Tooltip>
            <Note key={note.id} myNotes={note} />
          </Grid></Paper>)}
      </Grid>
    )
  }
}

export default withStyles(styles)(GridView);