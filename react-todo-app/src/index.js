// My app main component
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Todo Application',
            todoList: []
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnRemove = this.handleOnRemove.bind(this);
    }

    handleOnSubmit(todoValue) {
        // plave holder for new todo item
        const newTodo = [{
            id: Math.random() * 123456,
            value: todoValue
        }];
        // Go and update the state
        this.setState((currState) => ({
            todoList: currState.todoList.concat(newTodo)
        }));
    } 
    
    handleOnRemove(removeTodoId){
        // Check if the ID passed for remove is there in list and filter will create a new array excluding the matching data
        const data = this.state.todoList.filter(todo => todo.id != removeTodoId);

        this.setState((currState) => ({
            todoList: data
        }));
    }

    render(){
        return (
            <div>
                <Header title={this.state.title} />
                <AddTodo handleOnSubmit={this.handleOnSubmit} />
                <TodoList todoList={this.state.todoList} handleOnRemove={this.handleOnRemove}/>
            </div>
        )
    }
}


// Header Component
class Header extends React.Component {
    render() {
        return (<h1>{this.props.title}</h1>)
    }
}

// Add Todo Component
class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    // we are setting the input value so that parent (TodoApp) can get this value
    handleOnSubmit(e) {
        // prevents default loading
        e.preventDefault();
        this.props.handleOnSubmit(this.state.value);
        this.state.value = '';
    }

    // target is the field for which this method is invoked
    handleOnChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return (
            <div>
              <form onSubmit={this.handleOnSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleOnChange}></input>
                <button type="submit">Add</button>
              </form>
            </div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        let todoListLen = this.props.todoList.length;

        if (todoListLen == 0) {
            return (<h1>No Todos, please add todos to the list</h1>);
        }
        else {
            return (
                <ul>{this.props.todoList.map(todo => <Todo key={todo.id} todo={todo} handleOnRemove={this.props.handleOnRemove} />)}</ul>
            );
        }
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);          
        this.handleOnRemove = this.handleOnRemove.bind(this);        
    }

    // Pass the selected todo's ID as agr to delete that item from list
    handleOnRemove(e) {
        this.props.handleOnRemove(e.target.value);
    }

    render() {
        return (
            <li>
                {this.props.todo.value}
                <button onClick={this.handleOnRemove} value={this.props.todo.id}>Remove</button>
            </li>
        );
    }
}


// Root element where the content has to be showed in HTML
const appRoot = document.getElementById('app');

// Takes two args -- element to be dispalyed and where to display in HTML
ReactDOM.render(<TodoApp />, appRoot);

