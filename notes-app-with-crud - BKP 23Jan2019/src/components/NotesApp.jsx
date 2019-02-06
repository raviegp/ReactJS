import React, { Component, Fragment } from 'react';
import Header from './Header';
import NotesContainer from './NotesContainer';

class NotesApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 'gridView'
        }
        this.toggleView = this.toggleView.bind(this);
    }

    toggleView(viewType) {
        this.setState({
            view: viewType
        });
    }

    render() {
        return (
            <Fragment>
                <Header toggleView={this.toggleView} viewType={this.state.view} />
                <NotesContainer viewType={this.state.view} />
            </Fragment>
        )
    }
}

export default NotesApp;