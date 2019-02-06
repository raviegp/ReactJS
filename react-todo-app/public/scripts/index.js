'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// My app main component
var TodoApp = function (_React$Component) {
    _inherits(TodoApp, _React$Component);

    function TodoApp(props) {
        _classCallCheck(this, TodoApp);

        var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

        _this.state = {
            title: 'Todo Application',
            todoList: []
        };

        _this.handleOnSubmit = _this.handleOnSubmit.bind(_this);
        _this.handleOnRemove = _this.handleOnRemove.bind(_this);
        return _this;
    }

    _createClass(TodoApp, [{
        key: 'handleOnSubmit',
        value: function handleOnSubmit(todoValue) {
            // plave holder for new todo item
            var newTodo = [{
                id: Math.random() * 123456,
                value: todoValue
            }];
            // Go and update the state
            this.setState(function (currState) {
                return {
                    todoList: currState.todoList.concat(newTodo)
                };
            });
        }
    }, {
        key: 'handleOnRemove',
        value: function handleOnRemove(removeTodoId) {
            // Check if the ID passed for remove is there in list and filter will create a new array excluding the matching data
            var data = this.state.todoList.filter(function (todo) {
                return todo.id != removeTodoId;
            });

            this.setState(function (currState) {
                return {
                    todoList: data
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: this.state.title }),
                React.createElement(AddTodo, { handleOnSubmit: this.handleOnSubmit }),
                React.createElement(TodoList, { todoList: this.state.todoList, handleOnRemove: this.handleOnRemove })
            );
        }
    }]);

    return TodoApp;
}(React.Component);

// Header Component


var Header = function (_React$Component2) {
    _inherits(Header, _React$Component2);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'h1',
                null,
                this.props.title
            );
        }
    }]);

    return Header;
}(React.Component);

// Add Todo Component


var AddTodo = function (_React$Component3) {
    _inherits(AddTodo, _React$Component3);

    function AddTodo(props) {
        _classCallCheck(this, AddTodo);

        var _this3 = _possibleConstructorReturn(this, (AddTodo.__proto__ || Object.getPrototypeOf(AddTodo)).call(this, props));

        _this3.state = {
            value: ''
        };

        _this3.handleOnSubmit = _this3.handleOnSubmit.bind(_this3);
        _this3.handleOnChange = _this3.handleOnChange.bind(_this3);
        return _this3;
    }

    // we are setting the input value so that parent (TodoApp) can get this value


    _createClass(AddTodo, [{
        key: 'handleOnSubmit',
        value: function handleOnSubmit(e) {
            // prevents default loading
            e.preventDefault();
            this.props.handleOnSubmit(this.state.value);
            this.state.value = '';
        }

        // target is the field for which this method is invoked

    }, {
        key: 'handleOnChange',
        value: function handleOnChange(e) {
            this.setState({
                value: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleOnSubmit },
                    React.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleOnChange }),
                    React.createElement(
                        'button',
                        { type: 'submit' },
                        'Add'
                    )
                )
            );
        }
    }]);

    return AddTodo;
}(React.Component);

var TodoList = function (_React$Component4) {
    _inherits(TodoList, _React$Component4);

    function TodoList() {
        _classCallCheck(this, TodoList);

        return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).apply(this, arguments));
    }

    _createClass(TodoList, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            var todoListLen = this.props.todoList.length;

            if (todoListLen == 0) {
                return React.createElement(
                    'h1',
                    null,
                    'No Todos, please add todos to the list'
                );
            } else {
                return React.createElement(
                    'ul',
                    null,
                    this.props.todoList.map(function (todo) {
                        return React.createElement(Todo, { key: todo.id, todo: todo, handleOnRemove: _this5.props.handleOnRemove });
                    })
                );
            }
        }
    }]);

    return TodoList;
}(React.Component);

var Todo = function (_React$Component5) {
    _inherits(Todo, _React$Component5);

    function Todo(props) {
        _classCallCheck(this, Todo);

        var _this6 = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));

        _this6.handleOnRemove = _this6.handleOnRemove.bind(_this6);
        return _this6;
    }

    // Pass the selected todo's ID as agr to delete that item from list


    _createClass(Todo, [{
        key: 'handleOnRemove',
        value: function handleOnRemove(e) {
            this.props.handleOnRemove(e.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                this.props.todo.value,
                React.createElement(
                    'button',
                    { onClick: this.handleOnRemove, value: this.props.todo.id },
                    'Remove'
                )
            );
        }
    }]);

    return Todo;
}(React.Component);

// Root element where the content has to be showed in HTML


var appRoot = document.getElementById('app');

// Takes two args -- element to be dispalyed and where to display in HTML
ReactDOM.render(React.createElement(TodoApp, null), appRoot);
