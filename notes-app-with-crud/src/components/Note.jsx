import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

const Note = (props) => (
    <Fragment>
        <Typography variant="h5" component="h3">
            {props.myNotes.noteTitle}
        </Typography>
        <Typography component="p">
            {props.myNotes.noteDescription}
        </Typography>
    </Fragment>
);

export default Note;