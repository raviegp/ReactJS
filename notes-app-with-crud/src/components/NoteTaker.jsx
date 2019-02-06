import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    card: {
        width: "50%",
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '1em',
        marginRight: '1em',
        width: 400,
        marginBottom: '1.5em',
    },
    control: {
        paddingTop: 20
    },
    error: {
        color: 'red'
    }
};

class NoteTaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            error: ''
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value, error: '' });
    }

    handleDescChange(event) {
        this.setState({ description: event.target.value });
    }

    handleAddNote(event) {
        event.preventDefault();
        if (!this.state.title) {
            this.setState({ error: 'Title is needed to add note' });
            return;
        }
        const addedNote = {
            noteTitle: this.state.title,
            noteDescription: this.state.description
        }
        fetch('http://localhost:8080/notes', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addedNote)
        }).then(response => response.json())
            .then(notesResponse => {
                this.props.handleAddNote(notesResponse);
            });
        this.setState({ title: '', description: '', error: '' });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.control} alignItems="center" justify="center" >
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component={'span'} >
                            <TextField id="title" label="Note Title" type="text" value={this.state.title} onChange={this.handleTitleChange}
                                className={classes.textField} />
                        </Typography>
                        <Typography component={'span'} >
                            <TextField id="desc" label="Note Description" type="text" value={this.state.description} onChange={this.handleDescChange}
                                className={classes.textField} />
                        </Typography>
                        <Typography className={classes.error} component={'span'} >
                            {this.state.error}
                        </Typography>
                    </CardContent>
                    <Typography className={classes.card} component={'span'} >
                        <CardActions className={classes.actions} >
                            <Tooltip title="Add Note">
                                <IconButton aria-label="Add Note">
                                    <DoneAllIcon onClick={this.handleAddNote} />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Typography>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(NoteTaker);