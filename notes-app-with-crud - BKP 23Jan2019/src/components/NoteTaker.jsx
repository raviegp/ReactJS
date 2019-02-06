import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
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
};

class NoteTaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            bottomValue: 'close'
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleDescChange(event) {
        this.setState({ description: event.target.value });
    }

    handleAddNote(event) {
        event.preventDefault();
        this.props.handleAddNote(this.state.title, this.state.description);
        this.setState({ title: '', description: '' });
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
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
                        </CardContent>
                        <Typography className={classes.card} component={'span'} >
                            <CardActions className={classes.actions} >
                                <Tooltip title="Add Note">
                                    <IconButton aria-label="Add Note">
                                        <DoneIcon onClick={this.handleAddNote} />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Typography>
                    </Card>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(styles)(NoteTaker);