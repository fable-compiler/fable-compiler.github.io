define(["exports", "fable-core", "react", "react-dom", "classnames"], function (exports, _fableCore, _react, _reactDom, _classnames) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.model = exports.TodoApp = exports.TodoAppState = exports.TodoAppProps = exports.TodoFooter = exports.TodoItem = exports.COMPLETED_TODOS = exports.ACTIVE_TODOS = exports.ALL_TODOS = exports.ENTER_KEY = exports.ESCAPE_KEY = exports.TodoItemState = exports.TodoModel = exports.Todo = exports.Util = undefined;
    exports.render = render;

    var react = _interopRequireWildcard(_react);

    var react_dom = _interopRequireWildcard(_reactDom);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _defineEnumerableProperties(obj, descs) {
        for (var key in descs) {
            var desc = descs[key];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, key, desc);
        }

        return obj;
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Util = exports.Util = function ($exports) {
        var load = $exports.load = function load(key) {
            var $var2 = localStorage.getItem(key);

            if ($var2 != null) {
                return function ($var1) {
                    return function (value) {
                        return value;
                    }(function (arg00) {
                        return JSON.parse(arg00);
                    }($var1));
                }($var2);
            } else {
                return $var2;
            }
        };

        var save = $exports.save = function save(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        };

        return $exports;
    }({});

    var Todo = exports.Todo = function () {
        function Todo(id, title, completed) {
            _classCallCheck(this, Todo);

            this.id = id;
            this.title = title;
            this.completed = completed;
        }

        _createClass(Todo, [{
            key: "Equals",
            value: function Equals(other) {
                return _fableCore.Util.equalsRecords(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return _fableCore.Util.compareRecords(this, other);
            }
        }]);

        return Todo;
    }();

    _fableCore.Util.setInterfaces(Todo.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "React-todomvc.Todo");

    var TodoModel = exports.TodoModel = function () {
        function TodoModel(key) {
            _classCallCheck(this, TodoModel);

            this["key@"] = key;

            if (Util.load(key) != null) {
                this["todos@"] = Util.load(key);
            } else {
                this["todos@"] = [];
            }

            this["onChanges@"] = [];
        }

        _createClass(TodoModel, [{
            key: "subscribe",
            value: function subscribe(onChange) {
                this.onChanges = [onChange];
            }
        }, {
            key: "inform",
            value: function inform() {
                Util.save(this.key, this.todos);

                _fableCore.Seq.iterate(function (cb) {
                    cb();
                }, this.onChanges);
            }
        }, {
            key: "addTodo",
            value: function addTodo(title) {
                this.todos = this.todos.concat([new Todo(_fableCore.String.newGuid(), title, false)]);
                this.inform();
            }
        }, {
            key: "toggleAll",
            value: function toggleAll(checked_) {
                this.todos = this.todos.map(function (todo) {
                    return new Todo(todo.id, todo.title, checked_);
                });
                this.inform();
            }
        }, {
            key: "toggle",
            value: function toggle(todoToToggle) {
                this.todos = this.todos.map(function (todo) {
                    return todo.id !== todoToToggle.id ? todo : function () {
                        var completed = !todo.completed;
                        return new Todo(todo.id, todo.title, completed);
                    }();
                });
                this.inform();
            }
        }, {
            key: "destroy",
            value: function destroy(todoToDestroy) {
                this.todos = this.todos.filter(function (todo) {
                    return todo.id !== todoToDestroy.id;
                });
                this.inform();
            }
        }, {
            key: "save",
            value: function save(todoToSave, text) {
                this.todos = this.todos.map(function (todo) {
                    return todo.id !== todoToSave.id ? todo : new Todo(todo.id, text, todo.completed);
                });
                this.inform();
            }
        }, {
            key: "clearCompleted",
            value: function clearCompleted() {
                this.todos = this.todos.filter(function (todo) {
                    return !todo.completed;
                });
                this.inform();
            }
        }, {
            key: "key",
            get: function get() {
                return this["key@"];
            }
        }, {
            key: "todos",
            get: function get() {
                return this["todos@"];
            },
            set: function set(v) {
                this["todos@"] = v;
            }
        }, {
            key: "onChanges",
            get: function get() {
                return this["onChanges@"];
            },
            set: function set(v) {
                this["onChanges@"] = v;
            }
        }]);

        return TodoModel;
    }();

    _fableCore.Util.setInterfaces(TodoModel.prototype, [], "React-todomvc.TodoModel");

    var TodoItemState = exports.TodoItemState = function () {
        function TodoItemState(editText) {
            _classCallCheck(this, TodoItemState);

            this.editText = editText;
        }

        _createClass(TodoItemState, [{
            key: "Equals",
            value: function Equals(other) {
                return _fableCore.Util.equalsRecords(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return _fableCore.Util.compareRecords(this, other);
            }
        }]);

        return TodoItemState;
    }();

    _fableCore.Util.setInterfaces(TodoItemState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "React-todomvc.TodoItemState");

    var ESCAPE_KEY = exports.ESCAPE_KEY = 27;
    var ENTER_KEY = exports.ENTER_KEY = 13;
    var ALL_TODOS = exports.ALL_TODOS = "all";
    var ACTIVE_TODOS = exports.ACTIVE_TODOS = "active";
    var COMPLETED_TODOS = exports.COMPLETED_TODOS = "completed";

    var TodoItem = exports.TodoItem = function (_Component) {
        _inherits(TodoItem, _Component);

        function TodoItem(props, ctx) {
            _classCallCheck(this, TodoItem);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoItem).call(this, props, ctx));

            var _this = {
                contents: null
            };
            var _this_1 = _this2;
            _this2.contents = _this2;
            _this2.contents.state = new TodoItemState(props.todo.title);
            _this2.editField = null;
            _this2["init@156"] = 1;
            return _this2;
        }

        _createClass(TodoItem, [{
            key: "handleSubmit",
            value: function handleSubmit(e) {
                var matchValue = _fableCore.String.trim(this.state.editText, "both");

                if (matchValue.length > 0) {
                    this.props.onSave(matchValue);
                    this.setState(new TodoItemState(matchValue));
                } else {
                    this.props.onDestroy(e);
                }
            }
        }, {
            key: "handleEdit",
            value: function handleEdit(ev) {
                this.props.onEdit(ev);
                this.setState(new TodoItemState(this.props.todo.title));
            }
        }, {
            key: "handleKeyDown",
            value: function handleKeyDown(e) {
                var matchValue = e.which;

                if (matchValue === 27) {
                    this.setState(new TodoItemState(this.props.todo.title));
                    this.props.onCancel(e);
                } else {
                    if (matchValue === 13) {
                        this.handleSubmit(e);
                    }
                }
            }
        }, {
            key: "handleChange",
            value: function handleChange(e) {
                if (this.props.editing) {
                    this.setState(new TodoItemState(_fableCore.Util.toString(e.target.value)));
                }
            }
        }, {
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps, nextState) {
                return (!(nextProps.todo === this.props.todo) ? true : nextProps.editing !== this.props.editing) ? true : nextState.editText !== this.state.editText;
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                if (!prevProps.editing ? this.props.editing : false) {
                    var node = react_dom.findDOMNode(this.editField);
                    node.focus();
                    node.setSelectionRange(node.value.length, node.value.length);
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var className = (0, _classnames2.default)({
                    completed: this.props.todo.completed,
                    editing: this.props.editing
                });
                return react.createElement.apply(react, ["li", {
                    className: className
                }].concat([react.createElement.apply(react, ["div", {
                    className: "view"
                }].concat([react.createElement.apply(react, ["input", {
                    className: "toggle",
                    type: "checkbox",
                    checked: this.props.todo.completed,
                    onChange: function () {
                        var objectArg = _this3.props;
                        return function (arg00) {
                            objectArg.onToggle(arg00);
                        };
                    }()
                }].concat([])), react.createElement.apply(react, ["label", {
                    onDoubleClick: function onDoubleClick(arg00) {
                        _this3.handleEdit(arg00);
                    }
                }].concat([this.props.todo.title])), react.createElement.apply(react, ["button", {
                    className: "destroy",
                    onClick: function () {
                        var objectArg = _this3.props;
                        return function (arg00) {
                            objectArg.onDestroy(arg00);
                        };
                    }()
                }].concat([]))])), react.createElement.apply(react, ["input", {
                    className: "edit",
                    ref: function ref(x) {
                        _this3.editField = x;
                    },
                    value: this.state.editText,
                    onBlur: function onBlur(arg00) {
                        _this3.handleSubmit(arg00);
                    },
                    onChange: function onChange(arg00) {
                        _this3.handleChange(arg00);
                    },
                    onKeyDown: function onKeyDown(arg00) {
                        _this3.handleKeyDown(arg00);
                    }
                }].concat([]))]));
            }
        }]);

        return TodoItem;
    }(_react.Component);

    _fableCore.Util.setInterfaces(TodoItem.prototype, [], "React-todomvc.TodoItem");

    var TodoFooter = exports.TodoFooter = function (_Component2) {
        _inherits(TodoFooter, _Component2);

        function TodoFooter(props, ctx) {
            _classCallCheck(this, TodoFooter);

            var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoFooter).call(this, props, ctx));

            return _this4;
        }

        _createClass(TodoFooter, [{
            key: "render",
            value: function render() {
                var _this5 = this;

                var activeTodoWord = "item" + (this.props.count === 1 ? "" : "s");
                var clearButton = this.props.completedCount > 0 ? react.createElement.apply(react, ["button", {
                    className: "clear-completed",
                    onClick: function () {
                        var objectArg = _this5.props;
                        return function (arg00) {
                            objectArg.onClearCompleted(arg00);
                        };
                    }()
                }].concat(["Clear completed"])) : null;

                var className = function className(category) {
                    return (0, _classnames2.default)({
                        selected: _this5.props.nowShowing === category
                    });
                };

                return react.createElement.apply(react, ["footer", {
                    className: "footer"
                }].concat([react.createElement.apply(react, ["span", {
                    className: "todo-count"
                }].concat([react.createElement.apply(react, ["strong", {}].concat([this.props.count])), " " + activeTodoWord + " left"])), react.createElement.apply(react, ["ul", {
                    className: "filters"
                }].concat([react.createElement.apply(react, ["li", {}].concat([react.createElement.apply(react, ["a", {
                    href: "#/",
                    className: className("all")
                }].concat(["All"]))])), " ", react.createElement.apply(react, ["li", {}].concat([react.createElement.apply(react, ["a", {
                    href: "#/active",
                    className: className("active")
                }].concat(["Active"]))])), " ", react.createElement.apply(react, ["li", {}].concat([react.createElement.apply(react, ["a", {
                    href: "#/completed",
                    className: className("completed")
                }].concat(["Completed"]))])), clearButton]))]));
            }
        }]);

        return TodoFooter;
    }(_react.Component);

    _fableCore.Util.setInterfaces(TodoFooter.prototype, [], "React-todomvc.TodoFooter");

    var TodoAppProps = exports.TodoAppProps = function () {
        function TodoAppProps(model) {
            _classCallCheck(this, TodoAppProps);

            this.model = model;
        }

        _createClass(TodoAppProps, [{
            key: "Equals",
            value: function Equals(other) {
                return _fableCore.Util.equalsRecords(this, other);
            }
        }]);

        return TodoAppProps;
    }();

    _fableCore.Util.setInterfaces(TodoAppProps.prototype, ["FSharpRecord", "System.IEquatable"], "React-todomvc.TodoAppProps");

    var TodoAppState = exports.TodoAppState = function () {
        function TodoAppState(nowShowing, editing, newTodo) {
            _classCallCheck(this, TodoAppState);

            this.nowShowing = nowShowing;
            this.editing = editing;
            this.newTodo = newTodo;
        }

        _createClass(TodoAppState, [{
            key: "Equals",
            value: function Equals(other) {
                return _fableCore.Util.equalsRecords(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return _fableCore.Util.compareRecords(this, other);
            }
        }]);

        return TodoAppState;
    }();

    _fableCore.Util.setInterfaces(TodoAppState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "React-todomvc.TodoAppState");

    var TodoApp = exports.TodoApp = function (_Component3) {
        _inherits(TodoApp, _Component3);

        function TodoApp(props, ctx) {
            _classCallCheck(this, TodoApp);

            var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoApp).call(this, props, ctx));

            var _this = {
                contents: null
            };
            var _this_1 = _this6;
            _this6.contents = _this6;
            _this6["init@285-1"] = 1;
            _this6.contents.state = new TodoAppState("all", null, "");
            return _this6;
        }

        _createClass(TodoApp, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this7 = this;

                var nowShowing = function nowShowing(category) {
                    return function (unitVar0) {
                        _this7.setState(function () {
                            var inputRecord = _this7.state;
                            return new TodoAppState(category, inputRecord.editing, inputRecord.newTodo);
                        }());
                    };
                };

                var router = Router({
                    "/": nowShowing("all"),
                    "/active": nowShowing("active"),
                    "/completed": nowShowing("completed")
                });
                return router.init("/");
            }
        }, {
            key: "handleChange",
            value: function handleChange(ev) {
                var _this8 = this;

                this.setState(function () {
                    var inputRecord = _this8.state;
                    var newTodo = ev.target.value;
                    return new TodoAppState(inputRecord.nowShowing, inputRecord.editing, newTodo);
                }());
            }
        }, {
            key: "handleNewTodoKeyDown",
            value: function handleNewTodoKeyDown(ev) {
                var _this9 = this;

                if (ev.keyCode === 13) {
                    ev.preventDefault();

                    var v = _fableCore.String.trim(this.state.newTodo, "both");

                    if (v.length > 0) {
                        this.props.model.addTodo(v);
                        this.setState(function () {
                            var inputRecord = _this9.state;
                            var newTodo = "";
                            return new TodoAppState(inputRecord.nowShowing, inputRecord.editing, newTodo);
                        }());
                    }
                }
            }
        }, {
            key: "toggleAll",
            value: function toggleAll(ev) {
                this.props.model.toggleAll(ev.target.checked);
            }
        }, {
            key: "toggle",
            value: function toggle(todoToToggle) {
                this.props.model.toggle(todoToToggle);
            }
        }, {
            key: "destroy",
            value: function destroy(todo) {
                this.props.model.destroy(todo);
            }
        }, {
            key: "edit",
            value: function edit(todo) {
                var _this10 = this;

                this.setState(function () {
                    var inputRecord = _this10.state;
                    var editing = todo.id;
                    return new TodoAppState(inputRecord.nowShowing, editing, inputRecord.newTodo);
                }());
            }
        }, {
            key: "save",
            value: function save(todoToSave, text) {
                var _this11 = this;

                this.props.model.save(todoToSave, text);
                this.setState(function () {
                    var inputRecord = _this11.state;
                    var editing = null;
                    return new TodoAppState(inputRecord.nowShowing, editing, inputRecord.newTodo);
                }());
            }
        }, {
            key: "cancel",
            value: function cancel() {
                var _this12 = this;

                this.setState(function () {
                    var inputRecord = _this12.state;
                    var editing = null;
                    return new TodoAppState(inputRecord.nowShowing, editing, inputRecord.newTodo);
                }());
            }
        }, {
            key: "clearCompleted",
            value: function clearCompleted() {
                this.props.model.clearCompleted();
            }
        }, {
            key: "render",
            value: function render() {
                var _this13 = this;

                var todos = this.props.model.todos;

                var todoItems = _fableCore.Seq.toList(_fableCore.Seq.map(function (todo) {
                    return react.createElement.apply(react, [TodoItem, _fableCore.Util.toPlainJsObj(function () {
                        var _key, _todo, _editing, _ref, _mutatorMap;

                        var $var3 = _this13;
                        return _ref = {}, _defineProperty(_ref, _fableCore.Symbol.interfaces, ["React-todomvc.TodoItemProps"]), _key = "key", _mutatorMap = {}, _mutatorMap[_key] = _mutatorMap[_key] || {}, _mutatorMap[_key].get = function () {
                            return todo.id;
                        }, _todo = "todo", _mutatorMap[_todo] = _mutatorMap[_todo] || {}, _mutatorMap[_todo].get = function () {
                            return todo;
                        }, _defineProperty(_ref, "onToggle", function onToggle(_arg1) {
                            $var3.toggle(todo);
                        }), _defineProperty(_ref, "onDestroy", function onDestroy(_arg2) {
                            $var3.destroy(todo);
                        }), _defineProperty(_ref, "onEdit", function onEdit(_arg3) {
                            $var3.edit(todo);
                        }), _editing = "editing", _mutatorMap[_editing] = _mutatorMap[_editing] || {}, _mutatorMap[_editing].get = function () {
                            var matchValue = $var3.state.editing;

                            if (matchValue == null) {
                                return false;
                            } else {
                                return matchValue === todo.id;
                            }
                        }, _defineProperty(_ref, "onSave", function onSave(text) {
                            $var3.save(todo, _fableCore.Util.toString(text));
                        }), _defineProperty(_ref, "onCancel", function onCancel(_arg4) {
                            $var3.cancel();
                        }), _defineEnumerableProperties(_ref, _mutatorMap), _ref;
                    }())].concat([]));
                }, _fableCore.Seq.filter(function (todo) {
                    var matchValue = _this13.state.nowShowing;

                    if (matchValue === "active") {
                        return !todo.completed;
                    } else {
                        if (matchValue === "completed") {
                            return todo.completed;
                        } else {
                            return true;
                        }
                    }
                }, todos)));

                var activeTodoCount = _fableCore.Seq.fold(function (accum, todo) {
                    return todo.completed ? accum : accum + 1;
                }, 0, todos);

                var completedCount = todos.length - activeTodoCount;
                var footer = (activeTodoCount > 0 ? true : completedCount > 0) ? react.createElement.apply(react, [TodoFooter, _fableCore.Util.toPlainJsObj(function () {
                    var _count, _completedCount, _nowShowing, _ref2, _mutatorMap2;

                    var $var4 = _this13;
                    return _ref2 = {}, _defineProperty(_ref2, _fableCore.Symbol.interfaces, ["React-todomvc.TodoFooterProps"]), _count = "count", _mutatorMap2 = {}, _mutatorMap2[_count] = _mutatorMap2[_count] || {}, _mutatorMap2[_count].get = function () {
                        return activeTodoCount;
                    }, _completedCount = "completedCount", _mutatorMap2[_completedCount] = _mutatorMap2[_completedCount] || {}, _mutatorMap2[_completedCount].get = function () {
                        return completedCount;
                    }, _nowShowing = "nowShowing", _mutatorMap2[_nowShowing] = _mutatorMap2[_nowShowing] || {}, _mutatorMap2[_nowShowing].get = function () {
                        return $var4.state.nowShowing;
                    }, _defineProperty(_ref2, "onClearCompleted", function onClearCompleted(_arg5) {
                        $var4.clearCompleted();
                    }), _defineEnumerableProperties(_ref2, _mutatorMap2), _ref2;
                }())].concat([])) : null;
                var main = todos.length > 0 ? react.createElement.apply(react, ["section", {
                    className: "main"
                }].concat([react.createElement.apply(react, ["input", {
                    className: "toggle-all",
                    type: "checkbox",
                    onChange: function onChange(arg00) {
                        _this13.toggleAll(arg00);
                    },
                    checked: activeTodoCount === 0
                }].concat([])), react.createElement.apply(react, ["ul", {
                    className: "todo-list"
                }].concat(_toConsumableArray(Array.from(todoItems))))])) : null;
                return react.createElement.apply(react, ["div", {}].concat([react.createElement.apply(react, ["header", {
                    className: "header"
                }].concat([react.createElement.apply(react, ["h1", {}].concat(["todos"])), react.createElement.apply(react, ["input", {
                    className: "new-todo",
                    placeholder: "What needs to be done?",
                    value: this.state.newTodo,
                    onKeyDown: function onKeyDown(arg00) {
                        _this13.handleNewTodoKeyDown(arg00);
                    },
                    onChange: function onChange(arg00) {
                        _this13.handleChange(arg00);
                    },
                    autoFocus: true
                }].concat([]))])), main, footer]));
            }
        }]);

        return TodoApp;
    }(_react.Component);

    _fableCore.Util.setInterfaces(TodoApp.prototype, [], "React-todomvc.TodoApp");

    var model = exports.model = new TodoModel("react-todos");

    function render() {
        react_dom.render(react.createElement.apply(react, [TodoApp, _fableCore.Util.toPlainJsObj(new TodoAppProps(model))].concat([])), document.getElementsByClassName("todoapp")[0]);
    }

    model.subscribe(function (arg00_) {
        render(arg00_);
    });
    render();
});
//# sourceMappingURL=react-todomvc.js.map