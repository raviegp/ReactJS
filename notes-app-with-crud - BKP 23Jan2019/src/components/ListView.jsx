import Note from './Note';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 5,
        marginTop: theme.spacing.unit * 1,
        width: "60%",
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 1,
        backgroundColor: theme.palette.background.paper,
        border: "1px solid gray",
        borderRadius: 5,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    listItemSecondaryAction: {
        visibility: "hidden",
        "&:hover": {
            visibility: "inherit"
        }
    },
});

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        }
        this.deleteNote = this.deleteNote.bind(this);
    }

    deleteNote(noteId) {
        this.props.deleteNote(noteId);
    }

    handleListItemMouseover = (value) => {
        this.setState({ hovered: value })
    }

    handleListItemMouseout = (value) => {
        if (this.state.hovered === value) {
            this.setState({ hovered: null })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.control} justify="center" spacing={16}>
                <List subheader={<ListSubheader component="div"><h2>Notes</h2></ListSubheader>} className={classes.root} >
                    {this.props.myNotes.map(note => {
                        const secondaryActionClassName = this.state.hovered !== note.id ? classes.listItemSecondaryAction : null;
                        return (
                            <ListItem elevation={1}
                                key={note.id}
                                button
                                onMouseOver={this.handleListItemMouseover.bind(null, note.id)}
                                onMouseOut={this.handleListItemMouseout.bind(null, note.id)}
                                className={classes.listItem}
                            >
                                <ListItemText >
                                    <Note key={note.id} myNotes={note} />
                                </ListItemText>
                                <ListItemSecondaryAction className={secondaryActionClassName}>
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon onClick={() => this.deleteNote(note.id)} />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        )
    }
}

export default withStyles(styles)(ListView);
