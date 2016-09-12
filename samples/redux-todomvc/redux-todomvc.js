define(["exports", "redux", "fable-core", "react", "react-dom"], function (exports, _redux, _fableCore, _react, _reactDom) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.store = exports.App = exports.AppProps = exports.MainSection = exports.MainSectionState = exports.MainSectionProps = exports.Footer = exports.HeaderProps = exports.TodoItem = exports.TodoItemState = exports.TodoTextInput = exports.TodoTextInputState = exports.classNames = exports.ENTER_KEY = exports.ESCAPE_KEY = exports.TodoFilter = exports.TodoAction = exports.Todo = exports.Redux = undefined;
    exports.Header = Header;
    exports.reducer = reducer;

    var react = _interopRequireWildcard(_react);

    var react_dom = _interopRequireWildcard(_reactDom);

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

    var Redux = exports.Redux = function ($exports) {
        var createStore = $exports.createStore = function createStore(reducer, initState) {
            var reducer_1 = function reducer_1(state) {
                return function (action) {
                    var matchValue = action.Case;

                    if (typeof matchValue === "string") {
                        return reducer(state)(action);
                    } else {
                        return state;
                    }
                };
            };

            return function () {
                var matchValue = window.devToolsExtension;

                if (matchValue == null) {
                    return (0, _redux.createStore)(function (delegateArg0, delegateArg1) {
                        return reducer_1(delegateArg0)(delegateArg1);
                    }, initState);
                } else {
                    return (0, _redux.createStore)(function (delegateArg0, delegateArg1) {
                        return reducer_1(delegateArg0)(delegateArg1);
                    }, initState, matchValue());
                }
            }();
        };

        var dispatch = $exports.dispatch = function dispatch(store, x) {
            var x_1 = _fableCore.Util.toPlainJsObj(x);

            x_1.type = x_1.Case;
            store.dispatch(x_1);
        };

        return $exports;
    }({});

    var Todo = exports.Todo = function () {
        function Todo(text, completed, id) {
            _classCallCheck(this, Todo);

            this.Text = text;
            this.Completed = completed;
            this.Id = id;
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

    _fableCore.Util.setInterfaces(Todo.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Redux-todomvc.Todo");

    var TodoAction = exports.TodoAction = function () {
        function TodoAction(caseName, fields) {
            _classCallCheck(this, TodoAction);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass(TodoAction, [{
            key: "Equals",
            value: function Equals(other) {
                return _fableCore.Util.equalsUnions(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return _fableCore.Util.compareUnions(this, other);
            }
        }]);

        return TodoAction;
    }();

    _fableCore.Util.setInterfaces(TodoAction.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Redux-todomvc.TodoAction");

    var TodoFilter = exports.TodoFilter = function TodoFilter() {
        _classCallCheck(this, TodoFilter);
    };

    _fableCore.Util.setInterfaces(TodoFilter.prototype, [], "Redux-todomvc.TodoFilter");

    var ESCAPE_KEY = exports.ESCAPE_KEY = 27;
    var ENTER_KEY = exports.ENTER_KEY = 13;

    var classNames = exports.classNames = function classNames($var1) {
        return _fableCore.String.join(" ", _fableCore.List.choose(function (tupledArg) {
            return tupledArg[1] ? tupledArg[0] : null;
        }, $var1));
    };

    var TodoTextInputState = exports.TodoTextInputState = function () {
        function TodoTextInputState(text) {
            _classCallCheck(this, TodoTextInputState);

            this.Text = text;
        }

        _createClass(TodoTextInputState, [{
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

        return TodoTextInputState;
    }();

    _fableCore.Util.setInterfaces(TodoTextInputState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Redux-todomvc.TodoTextInputState");

    var TodoTextInput = exports.TodoTextInput = function (_Component) {
        _inherits(TodoTextInput, _Component);

        function TodoTextInput(props, ctx) {
            _classCallCheck(this, TodoTextInput);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoTextInput).call(this, props, ctx));

            var _this = {
                contents: null
            };
            var _this_1 = _this2;
            _this2.contents = _this2;
            _this2["init@120"] = 1;
            _this2.contents.state = new TodoTextInputState(props.Text != null ? props.Text : "");
            return _this2;
        }

        _createClass(TodoTextInput, [{
            key: "HandleSubmit",
            value: function HandleSubmit(e) {
                if (e.which === 13) {
                    var text = _fableCore.String.trim(e.target.value, "both");

                    this.props.OnSave(text);

                    if (this.props.NewTodo) {
                        this.setState(new TodoTextInputState(""));
                    }
                }
            }
        }, {
            key: "HandleChange",
            value: function HandleChange(e) {
                this.setState(new TodoTextInputState(e.target.value));
            }
        }, {
            key: "HandleBlur",
            value: function HandleBlur(e) {
                if (!this.props.NewTodo) {
                    this.props.OnSave(e.target.value);
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                return react.createElement.apply(react, ["input", {
                    className: classNames(_fableCore.List.ofArray([["edit", this.props.Editing], ["new-todo", this.props.NewTodo]])),
                    type: "text",
                    onBlur: function onBlur(arg00) {
                        _this3.HandleBlur(arg00);
                    },
                    onChange: function onChange(arg00) {
                        _this3.HandleChange(arg00);
                    },
                    onKeyDown: function onKeyDown(arg00) {
                        _this3.HandleSubmit(arg00);
                    },
                    autoFocus: this.state.Text.length > 0,
                    placeholder: this.props.Placeholder
                }].concat([]));
            }
        }]);

        return TodoTextInput;
    }(_react.Component);

    _fableCore.Util.setInterfaces(TodoTextInput.prototype, [], "Redux-todomvc.TodoTextInput");

    var TodoItemState = exports.TodoItemState = function () {
        function TodoItemState(editing) {
            _classCallCheck(this, TodoItemState);

            this.Editing = editing;
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

    _fableCore.Util.setInterfaces(TodoItemState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Redux-todomvc.TodoItemState");

    var TodoItem = exports.TodoItem = function (_Component2) {
        _inherits(TodoItem, _Component2);

        function TodoItem(props, ctx) {
            _classCallCheck(this, TodoItem);

            var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoItem).call(this, props, ctx));

            var _this = {
                contents: null
            };
            var _this_1 = _this4;
            _this4.contents = _this4;
            _this4["init@161-1"] = 1;
            _this4.contents.state = new TodoItemState(false);
            return _this4;
        }

        _createClass(TodoItem, [{
            key: "HandleDoubleClick",
            value: function HandleDoubleClick(_arg1) {
                this.setState(new TodoItemState(true));
            }
        }, {
            key: "HandleSave",
            value: function HandleSave(id, text) {
                if (text.length === 0) {
                    this.props.DeleteTodo(id);
                } else {
                    this.props.EditTodo(id, text);
                }

                this.setState(new TodoItemState(false));
            }
        }, {
            key: "render",
            value: function render() {
                var _this5 = this;

                var element = this.state.Editing ? react.createElement.apply(react, [TodoTextInput, _fableCore.Util.toPlainJsObj(function () {
                    var _Editing, _Text, _Placeholder, _NewTodo, _ref, _mutatorMap;

                    var $var2 = _this5;
                    return _ref = {}, _defineProperty(_ref, _fableCore.Symbol.interfaces, ["Redux-todomvc.TodoTextInputProps"]), _defineProperty(_ref, "OnSave", function OnSave(text) {
                        $var2.HandleSave($var2.props.Todo.Id, text);
                    }), _Editing = "Editing", _mutatorMap = {}, _mutatorMap[_Editing] = _mutatorMap[_Editing] || {}, _mutatorMap[_Editing].get = function () {
                        return $var2.state.Editing;
                    }, _Text = "Text", _mutatorMap[_Text] = _mutatorMap[_Text] || {}, _mutatorMap[_Text].get = function () {
                        return $var2.props.Todo.Text;
                    }, _Placeholder = "Placeholder", _mutatorMap[_Placeholder] = _mutatorMap[_Placeholder] || {}, _mutatorMap[_Placeholder].get = function () {
                        return "";
                    }, _NewTodo = "NewTodo", _mutatorMap[_NewTodo] = _mutatorMap[_NewTodo] || {}, _mutatorMap[_NewTodo].get = function () {
                        return false;
                    }, _defineEnumerableProperties(_ref, _mutatorMap), _ref;
                }())].concat([])) : react.createElement.apply(react, ["div", {
                    className: "view"
                }].concat([react.createElement.apply(react, ["input", {
                    className: "toggle",
                    type: "checkbox",
                    checked: this.props.Todo.Completed,
                    onChange: function onChange(_arg1) {
                        _this5.props.CompleteTodo(_this5.props.Todo.Id);
                    }
                }].concat([])), react.createElement.apply(react, ["label", {
                    onDoubleClick: function onDoubleClick(arg00) {
                        _this5.HandleDoubleClick(arg00);
                    }
                }].concat([this.props.Todo.Text])), react.createElement.apply(react, ["div", {
                    className: "destroy",
                    onClick: function onClick(_arg2) {
                        _this5.props.DeleteTodo(_this5.props.Todo.Id);
                    }
                }].concat([]))]));
                return react.createElement.apply(react, ["li", {
                    className: classNames(_fableCore.List.ofArray([["completed", this.props.Todo.Completed], ["editing", this.state.Editing]]))
                }].concat([element]));
            }
        }]);

        return TodoItem;
    }(_react.Component);

    _fableCore.Util.setInterfaces(TodoItem.prototype, [], "Redux-todomvc.TodoItem");

    var HeaderProps = exports.HeaderProps = function HeaderProps(addTodo) {
        _classCallCheck(this, HeaderProps);

        this.AddTodo = addTodo;
    };

    _fableCore.Util.setInterfaces(HeaderProps.prototype, ["FSharpRecord"], "Redux-todomvc.HeaderProps");

    function Header(props) {
        var _Placeholder2, _NewTodo2, _Text2, _Editing2, _Util$toPlainJsObj, _mutatorMap2;

        return react.createElement.apply(react, ["header", {
            className: "header"
        }].concat([react.createElement.apply(react, ["h1", {}].concat(["todos"])), react.createElement.apply(react, [TodoTextInput, _fableCore.Util.toPlainJsObj((_Util$toPlainJsObj = {}, _defineProperty(_Util$toPlainJsObj, _fableCore.Symbol.interfaces, ["Redux-todomvc.TodoTextInputProps"]), _defineProperty(_Util$toPlainJsObj, "OnSave", function OnSave(text) {
            if (text.length !== 0) {
                props.AddTodo(text);
            }
        }), _Placeholder2 = "Placeholder", _mutatorMap2 = {}, _mutatorMap2[_Placeholder2] = _mutatorMap2[_Placeholder2] || {}, _mutatorMap2[_Placeholder2].get = function () {
            return "What needs to be done?";
        }, _NewTodo2 = "NewTodo", _mutatorMap2[_NewTodo2] = _mutatorMap2[_NewTodo2] || {}, _mutatorMap2[_NewTodo2].get = function () {
            return true;
        }, _Text2 = "Text", _mutatorMap2[_Text2] = _mutatorMap2[_Text2] || {}, _mutatorMap2[_Text2].get = function () {
            return null;
        }, _Editing2 = "Editing", _mutatorMap2[_Editing2] = _mutatorMap2[_Editing2] || {}, _mutatorMap2[_Editing2].get = function () {
            return false;
        }, _defineEnumerableProperties(_Util$toPlainJsObj, _mutatorMap2), _Util$toPlainJsObj))].concat([]))]));
    }

    var Footer = exports.Footer = function () {
        var filterTitles = new Map(_fableCore.List.ofArray([[0, "All"], [1, "Active"], [2, "Completed"]]));

        var renderTodoCount = function renderTodoCount(activeCount) {
            return react.createElement.apply(react, ["span", {
                className: "todo-count"
            }].concat([_fableCore.String.fsFormat("%s item%s left")(function (x) {
                return x;
            })(activeCount > 0 ? String(activeCount) : "No")(activeCount !== 1 ? "s" : "")]));
        };

        var renderFilterLink = function renderFilterLink(filter) {
            return function (selectedFilter) {
                return function (onShow) {
                    return react.createElement.apply(react, ["a", {
                        className: classNames(_fableCore.List.ofArray([["selected", filter === selectedFilter]])),
                        style: {
                            cursor: "pointer"
                        },
                        onClick: function onClick(_arg1) {
                            onShow(filter);
                        }
                    }].concat([filterTitles.get(filter)]));
                };
            };
        };

        var renderClearButton = function renderClearButton(completedCount) {
            return function (onClearCompleted) {
                return completedCount > 0 ? react.createElement.apply(react, ["button", {
                    className: "clear-completed",
                    onClick: onClearCompleted
                }].concat(["Clear completed"])) : null;
            };
        };

        return function (props) {
            var listItems = _fableCore.List.map(function (filter) {
                return react.createElement.apply(react, ["li", {
                    key: String(filter)
                }].concat([renderFilterLink(filter)(props.Filter)(function (arg00) {
                    props.OnShow(arg00);
                })]));
            }, _fableCore.List.ofArray([0, 1, 2]));

            return react.createElement.apply(react, ["footer", {
                className: "footer"
            }].concat([renderTodoCount(props.ActiveCount), react.createElement.apply(react, ["ul", {
                className: "filters"
            }].concat(_toConsumableArray(Array.from(listItems)))), renderClearButton(props.CompletedCount)(function (arg00) {
                props.OnClearCompleted(arg00);
            })]));
        };
    }();

    var MainSectionProps = exports.MainSectionProps = function MainSectionProps(todos, dispatch) {
        _classCallCheck(this, MainSectionProps);

        this.Todos = todos;
        this.Dispatch = dispatch;
    };

    _fableCore.Util.setInterfaces(MainSectionProps.prototype, ["FSharpRecord"], "Redux-todomvc.MainSectionProps");

    var MainSectionState = exports.MainSectionState = function () {
        function MainSectionState(filter) {
            _classCallCheck(this, MainSectionState);

            this.Filter = filter;
        }

        _createClass(MainSectionState, [{
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

        return MainSectionState;
    }();

    _fableCore.Util.setInterfaces(MainSectionState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Redux-todomvc.MainSectionState");

    var MainSection = exports.MainSection = function (_Component3) {
        _inherits(MainSection, _Component3);

        function MainSection(props, ctx) {
            _classCallCheck(this, MainSection);

            var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(MainSection).call(this, props, ctx));

            var _this = {
                contents: null
            };
            var _this_1 = _this6;
            _this6.contents = _this6;
            _this6.todoFilters = new Map(_fableCore.List.ofArray([[0, function (_arg1) {
                return true;
            }], [1, function (todo) {
                return !todo.Completed;
            }], [2, function (todo) {
                return todo.Completed;
            }]]));
            _this6["init@275-2"] = 1;
            _this6.contents.state = new MainSectionState(0);
            return _this6;
        }

        _createClass(MainSection, [{
            key: "HandleClearCompleted",
            value: function HandleClearCompleted() {
                this.props.Dispatch(new TodoAction("ClearCompleted", []));
            }
        }, {
            key: "HandleShow",
            value: function HandleShow(filter) {
                this.setState(new MainSectionState(filter));
            }
        }, {
            key: "renderToggleAll",
            value: function renderToggleAll(completedCount) {
                var _this7 = this;

                return this.props.Todos.length > 0 ? react.createElement.apply(react, ["input", {
                    className: "toggle-all",
                    type: "checkbox",
                    checked: completedCount === this.props.Todos.length,
                    onChange: function onChange(_arg2) {
                        _this7.props.Dispatch(new TodoAction("CompleteAll", []));
                    }
                }].concat([])) : null;
            }
        }, {
            key: "renderFooter",
            value: function renderFooter(completedCount) {
                var _this8 = this;

                return this.props.Todos.length > 0 ? react.createElement.apply(react, [Footer, _fableCore.Util.toPlainJsObj(function () {
                    var _ActiveCount, _CompletedCount, _Filter, _ref2, _mutatorMap3;

                    var $var3 = _this8;
                    return _ref2 = {}, _defineProperty(_ref2, _fableCore.Symbol.interfaces, ["Redux-todomvc.FooterProps"]), _ActiveCount = "ActiveCount", _mutatorMap3 = {}, _mutatorMap3[_ActiveCount] = _mutatorMap3[_ActiveCount] || {}, _mutatorMap3[_ActiveCount].get = function () {
                        return $var3.props.Todos.length - completedCount;
                    }, _CompletedCount = "CompletedCount", _mutatorMap3[_CompletedCount] = _mutatorMap3[_CompletedCount] || {}, _mutatorMap3[_CompletedCount].get = function () {
                        return completedCount;
                    }, _Filter = "Filter", _mutatorMap3[_Filter] = _mutatorMap3[_Filter] || {}, _mutatorMap3[_Filter].get = function () {
                        return $var3.state.Filter;
                    }, _defineProperty(_ref2, "OnShow", function OnShow(filter) {
                        $var3.HandleShow(filter);
                    }), _defineProperty(_ref2, "OnClearCompleted", function OnClearCompleted(_arg1) {
                        $var3.HandleClearCompleted();
                    }), _defineEnumerableProperties(_ref2, _mutatorMap3), _ref2;
                }())].concat([])) : null;
            }
        }, {
            key: "render",
            value: function render() {
                var _this9 = this;

                var filteredTodos = _fableCore.Seq.toList(this.props.Todos.filter(this.todoFilters.get(this.state.Filter)));

                var completedCount = _fableCore.Seq.fold(function (count, todo) {
                    return todo.Completed ? count + 1 : count;
                }, 0, this.props.Todos);

                return react.createElement.apply(react, ["section", {
                    className: "main"
                }].concat([this.renderToggleAll(completedCount), react.createElement.apply(react, ["ul", {
                    className: "todo-list"
                }].concat(_toConsumableArray(Array.from(_fableCore.List.map(function (todo) {
                    return react.createElement.apply(react, [TodoItem, _fableCore.Util.toPlainJsObj(function () {
                        var _Todo, _ref3, _mutatorMap4;

                        var $var4 = _this9;
                        return _ref3 = {}, _defineProperty(_ref3, _fableCore.Symbol.interfaces, ["Redux-todomvc.TodoItemProps"]), _Todo = "Todo", _mutatorMap4 = {}, _mutatorMap4[_Todo] = _mutatorMap4[_Todo] || {}, _mutatorMap4[_Todo].get = function () {
                            return todo;
                        }, _defineProperty(_ref3, "EditTodo", function EditTodo(id, text) {
                            $var4.props.Dispatch(new TodoAction("EditTodo", [id, text]));
                        }), _defineProperty(_ref3, "DeleteTodo", function DeleteTodo(id) {
                            $var4.props.Dispatch(new TodoAction("DeleteTodo", [id]));
                        }), _defineProperty(_ref3, "CompleteTodo", function CompleteTodo(id) {
                            $var4.props.Dispatch(new TodoAction("CompleteTodo", [id]));
                        }), _defineEnumerableProperties(_ref3, _mutatorMap4), _ref3;
                    }())].concat([]));
                }, filteredTodos))))), this.renderFooter(completedCount)]));
            }
        }]);

        return MainSection;
    }(_react.Component);

    _fableCore.Util.setInterfaces(MainSection.prototype, [], "Redux-todomvc.MainSection");

    var AppProps = exports.AppProps = function () {
        function AppProps(store) {
            _classCallCheck(this, AppProps);

            this.Store = store;
        }

        _createClass(AppProps, [{
            key: "Equals",
            value: function Equals(other) {
                return _fableCore.Util.equalsRecords(this, other);
            }
        }]);

        return AppProps;
    }();

    _fableCore.Util.setInterfaces(AppProps.prototype, ["FSharpRecord", "System.IEquatable"], "Redux-todomvc.AppProps");

    var App = exports.App = function (_Component4) {
        _inherits(App, _Component4);

        function App(props, ctx) {
            var _this11 = this;

            _classCallCheck(this, App);

            var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props, ctx));

            var _this = {
                contents: null
            };
            var _this_1 = _this10;
            _this10.props = props;
            _this10.contents = _this10;
            {
                (function () {
                    var store = _this10.props.Store;

                    _this10.dispatch = function (x) {
                        Redux.dispatch(store, x);
                    };
                })();
            }
            _this10["init@350-3"] = 1;
            _this10.contents.state = _this10.getState();

            _this10.props.Store.subscribe(function ($var5) {
                return function () {
                    return function () {
                        var objectArg = _this11.contents;
                        return function (arg00) {
                            objectArg.setState(arg00);
                        };
                    }();
                }()(function (arg10_) {
                    return _this11.getState(arg10_);
                }($var5));
            });

            return _this10;
        }

        _createClass(App, [{
            key: "render",
            value: function render() {
                var _this12 = this;

                return react.createElement.apply(react, ["div", {}].concat([react.createElement.apply(react, [function (props) {
                    return Header(props);
                }, _fableCore.Util.toPlainJsObj(new HeaderProps(function ($var6) {
                    return _this12.dispatch(function (arg0) {
                        return new TodoAction("AddTodo", [arg0]);
                    }($var6));
                }))].concat([])), react.createElement.apply(react, [MainSection, _fableCore.Util.toPlainJsObj(this.state)].concat([]))]));
            }
        }, {
            key: "getState",
            value: function getState() {
                return new MainSectionProps(this.props.Store.getState(), this.dispatch);
            }
        }]);

        return App;
    }(_react.Component);

    _fableCore.Util.setInterfaces(App.prototype, [], "Redux-todomvc.App");

    function reducer(state, _arg1) {
        return _arg1.Case === "DeleteTodo" ? state.filter(function (todo) {
            return todo.Id !== _arg1.Fields[0];
        }) : _arg1.Case === "EditTodo" ? state.map(function (todo) {
            return todo.Id === _arg1.Fields[0] ? new Todo(_arg1.Fields[1], todo.Completed, todo.Id) : todo;
        }) : _arg1.Case === "CompleteTodo" ? state.map(function (todo) {
            return todo.Id === _arg1.Fields[0] ? function () {
                var Completed = !todo.Completed;
                return new Todo(todo.Text, Completed, todo.Id);
            }() : todo;
        }) : _arg1.Case === "CompleteAll" ? function () {
            var areAllMarked = state.every(function (todo) {
                return todo.Completed;
            });
            return state.map(function (todo) {
                var Completed = !areAllMarked;
                return new Todo(todo.Text, Completed, todo.Id);
            });
        }() : _arg1.Case === "ClearCompleted" ? state.filter(function (todo) {
            return !todo.Completed;
        }) : function () {
            var id = 1 + _fableCore.Seq.fold(function (id, todo) {
                return id > todo.Id ? id : todo.Id;
            }, -1, state);

            return [function () {
                var Completed = false;
                return new Todo(_arg1.Fields[0], Completed, id);
            }()].concat(state);
        }();
    }

    var store = exports.store = function (initState) {
        return Redux.createStore(function (state) {
            return function (_arg1) {
                return reducer(state, _arg1);
            };
        }, initState);
    }(Array.from(_fableCore.Seq.singleton(new Todo("Use Fable + React + Redux", false, 0))));

    react_dom.render(react.createElement.apply(react, [App, _fableCore.Util.toPlainJsObj(new AppProps(store))].concat([])), document.getElementsByClassName("todoapp")[0]);
});
//# sourceMappingURL=redux-todomvc.js.map