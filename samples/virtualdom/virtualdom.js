define(["exports", "fable-core", "./fable_external/Fable.Helpers.Virtualdom-1273792215"], function (exports, _fableCore, _FableHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initModel = exports.initList = exports.Storage = exports.TodoAction = exports.TodoModel = exports.Item = exports.Filter = exports.NestedAction = exports.NestedModel = exports.CounterAction = exports.initCounter = undefined;
    exports.fakeAjaxCall = fakeAjaxCall;
    exports.counterUpdate = counterUpdate;
    exports.counterView = counterView;
    exports.nestedUpdate = nestedUpdate;
    exports.nestedView = nestedView;
    exports.resetEveryTenth = resetEveryTenth;
    exports.todoUpdate = todoUpdate;
    exports.filterToTextAndUrl = filterToTextAndUrl;
    exports.filter = filter;
    exports.filters = filters;
    exports.todoFooter = todoFooter;
    exports.onEnter = onEnter;
    exports.todoHeader = todoHeader;
    exports.listItem = listItem;
    exports.itemList = itemList;
    exports.todoMain = todoMain;
    exports.todoView = todoView;

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

    var initCounter = exports.initCounter = 0;

    var CounterAction = exports.CounterAction = function () {
        function CounterAction(caseName, fields) {
            _classCallCheck(this, CounterAction);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass(CounterAction, [{
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

        return CounterAction;
    }();

    _fableCore.Util.setInterfaces(CounterAction.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Virtualdom.CounterAction");

    function fakeAjaxCall(model, h) {
        var message = model < 30 ? new CounterAction("Increment", [10]) : new CounterAction("Decrement", [5]);

        if (model > 30 ? model < 60 : false) {} else {
            window.setTimeout(function (_arg1) {
                h(message);
            }, 2000);
        }
    }

    function counterUpdate(model, command) {
        return function (m) {
            return [m, _FableHelpers.App.toActionList(function (h) {
                fakeAjaxCall(model, h);
            })];
        }(command.Case === "Increment" ? model + command.Fields[0] : model - command.Fields[0]);
    }

    function counterView(model) {
        var bgColor = model > 10 ? "red" : model < 0 ? "blue" : "green";
        return function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["width", "120px"], ["height", "120px"]])])])], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "svg";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([_FableHelpers.Html.Svg.svgNS()], _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["width", "120"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["height", "120"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["viewBox", "0 0 100 100"]])]))], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "rect";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([_FableHelpers.Html.Svg.svgNS()], _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["width", "110"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["height", "110"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["fill", bgColor]])]))], children]);
            };
        }()(new _fableCore.List())]))])), function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["border", "1px solid blue"]])]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (x) {
                    return new CounterAction("Increment", [1]);
                }]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["ondblclick", function (x) {
                    return new CounterAction("Increment", [10]);
                }]])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Increment"])])), function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["background-color", bgColor], ["color", "white"]])])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", [String(model)])])), function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["border", "1px solid green"], ["height", String(7 + model) + "px"]])]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (x) {
                    return new CounterAction("Decrement", [1]);
                }]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["ondblclick", function (x) {
                    return new CounterAction("Decrement", [5]);
                }]])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Decrement"])]))]));
    }

    _FableHelpers.App.start((0, _FableHelpers.renderer)(), _FableHelpers.App.withStartNodeSelector("#counter", _FableHelpers.App.withInitMessage(function (h) {
        fakeAjaxCall(initCounter, h);
    }, _FableHelpers.App.createApp(initCounter, function (model) {
        return counterView(model);
    }, function (model) {
        return function (command) {
            return counterUpdate(model, command);
        };
    }))));

    var NestedModel = exports.NestedModel = function () {
        function NestedModel(top, bottom) {
            _classCallCheck(this, NestedModel);

            this.Top = top;
            this.Bottom = bottom;
        }

        _createClass(NestedModel, [{
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

        return NestedModel;
    }();

    _fableCore.Util.setInterfaces(NestedModel.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Virtualdom.NestedModel");

    var NestedAction = exports.NestedAction = function () {
        function NestedAction(caseName, fields) {
            _classCallCheck(this, NestedAction);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass(NestedAction, [{
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

        return NestedAction;
    }();

    _fableCore.Util.setInterfaces(NestedAction.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Virtualdom.NestedAction");

    function nestedUpdate(model, action) {
        return action.Case === "Top" ? function () {
            var patternInput = counterUpdate(model.Top, action.Fields[0]);

            var action_ = _FableHelpers.App.mapActions(function (arg0) {
                return new NestedAction("Top", [arg0]);
            })(patternInput[1]);

            return [new NestedModel(patternInput[0], model.Bottom), action_];
        }() : action.Case === "Bottom" ? function () {
            var patternInput = counterUpdate(model.Bottom, action.Fields[0]);

            var action_ = _FableHelpers.App.mapActions(function (arg0) {
                return new NestedAction("Bottom", [arg0]);
            })(patternInput[1]);

            return [new NestedModel(model.Top, patternInput[0]), action_];
        }() : [new NestedModel(0, 0), new _fableCore.List()];
    }

    function nestedView(model) {
        return function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
            };
        }()(_fableCore.List.ofArray([_FableHelpers.Html.map(function (arg0) {
            return new NestedAction("Top", [arg0]);
        }, counterView(model.Top)), _FableHelpers.Html.map(function (arg0) {
            return new NestedAction("Bottom", [arg0]);
        }, counterView(model.Bottom))]));
    }

    function resetEveryTenth(h) {
        window.setInterval(function (_arg1) {
            return h(new NestedAction("Reset", []));
        }, 10000);
    }

    _FableHelpers.App.start((0, _FableHelpers.renderer)(), _FableHelpers.App.withProducer(function (h) {
        resetEveryTenth(h);
    }, _FableHelpers.App.withStartNodeSelector("#nested-counter", _FableHelpers.App.createApp(new NestedModel(0, 0), function (model) {
        return nestedView(model);
    }, function (model) {
        return function (action) {
            return nestedUpdate(model, action);
        };
    }))));

    var Filter = exports.Filter = function () {
        function Filter(caseName, fields) {
            _classCallCheck(this, Filter);

            this.Case = caseName;
            this.Fields = fields;
        }

        _createClass(Filter, [{
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

        return Filter;
    }();

    _fableCore.Util.setInterfaces(Filter.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Virtualdom.Filter");

    var Item = exports.Item = function () {
        function Item(name, done, id, isEditing) {
            _classCallCheck(this, Item);

            this.Name = name;
            this.Done = done;
            this.Id = id;
            this.IsEditing = isEditing;
        }

        _createClass(Item, [{
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

        return Item;
    }();

    _fableCore.Util.setInterfaces(Item.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Virtualdom.Item");

    var TodoModel = exports.TodoModel = function () {
        function TodoModel(items, input, filter) {
            _classCallCheck(this, TodoModel);

            this.Items = items;
            this.Input = input;
            this.Filter = filter;
        }

        _createClass(TodoModel, [{
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

        return TodoModel;
    }();

    _fableCore.Util.setInterfaces(TodoModel.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Virtualdom.TodoModel");

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

    _fableCore.Util.setInterfaces(TodoAction.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Virtualdom.TodoAction");

    function todoUpdate(model, msg) {
        var updateItems = function updateItems(model_1) {
            return function (f) {
                var items_ = f(model_1.Items);
                return new TodoModel(items_, model_1.Input, model_1.Filter);
            };
        };

        var checkAllWith = function checkAllWith(v) {
            return updateItems(model)(function () {
                var mapping = function mapping(i) {
                    return new Item(i.Name, v, i.Id, i.IsEditing);
                };

                return function (list) {
                    return _fableCore.List.map(mapping, list);
                };
            }());
        };

        var updateItem = function updateItem(i) {
            return function (model_1) {
                return updateItems(model_1)(function () {
                    var mapping = function mapping(i_) {
                        return i_.Id !== i.Id ? i_ : i;
                    };

                    return function (list) {
                        return _fableCore.List.map(mapping, list);
                    };
                }());
            };
        };

        var model_ = msg.Case === "AddItem" ? function () {
            var maxId = model.Items.tail == null ? 1 : _fableCore.Seq.reduce(function (x, y) {
                return Math.max(x, y);
            }, _fableCore.List.map(function (x) {
                return x.Id;
            }, model.Items));
            return updateItems(function () {
                var Input = "";
                return new TodoModel(model.Items, Input, model.Filter);
            }())(function (items) {
                return _fableCore.List.append(items, _fableCore.List.ofArray([function () {
                    var Id = maxId + 1;
                    return new Item(model.Input, false, Id, false);
                }()]));
            });
        }() : msg.Case === "ChangeInput" ? new TodoModel(model.Items, msg.Fields[0], model.Filter) : msg.Case === "MarkAsDone" ? updateItem(function () {
            var Done = true;
            return new Item(msg.Fields[0].Name, Done, msg.Fields[0].Id, msg.Fields[0].IsEditing);
        }())(model) : msg.Case === "CheckAll" ? checkAllWith(true) : msg.Case === "UnCheckAll" ? checkAllWith(false) : msg.Case === "Destroy" ? updateItems(model)(function () {
            var predicate = function predicate(i_) {
                return i_.Id !== msg.Fields[0].Id;
            };

            return function (list) {
                return _fableCore.List.filter(predicate, list);
            };
        }()) : msg.Case === "ToggleItem" ? updateItem(function () {
            var Done = !msg.Fields[0].Done;
            return new Item(msg.Fields[0].Name, Done, msg.Fields[0].Id, msg.Fields[0].IsEditing);
        }())(model) : msg.Case === "SetActiveFilter" ? new TodoModel(model.Items, model.Input, msg.Fields[0]) : msg.Case === "ClearCompleted" ? updateItems(model)(function () {
            var predicate = function predicate(i) {
                return !i.Done;
            };

            return function (list) {
                return _fableCore.List.filter(predicate, list);
            };
        }()) : msg.Case === "EditItem" ? updateItem(function () {
            var IsEditing = true;
            return new Item(msg.Fields[0].Name, msg.Fields[0].Done, msg.Fields[0].Id, IsEditing);
        }())(model) : msg.Case === "SaveItem" ? updateItem(function () {
            var IsEditing = false;
            return new Item(msg.Fields[1], msg.Fields[0].Done, msg.Fields[0].Id, IsEditing);
        }())(model) : model;
        var jsCall = msg.Case === "EditItem" ? _FableHelpers.App.toActionList(function (x) {
            document.getElementById("item-" + String(msg.Fields[0].Id)).focus();
        }) : new _fableCore.List();
        return [model_, jsCall];
    }

    function filterToTextAndUrl(_arg1) {
        return _arg1.Case === "Completed" ? ["Completed", "completed"] : _arg1.Case === "Active" ? ["Active", "active"] : ["All", ""];
    }

    function filter(activeFilter, f) {
        var linkClass = f.Equals(activeFilter) ? "selected" : "";
        var patternInput = filterToTextAndUrl(f);
        return function () {
            var tagName = "li";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (_arg1) {
                    return new TodoAction("SetActiveFilter", [f]);
                }]])])], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "a";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["href", "#/" + patternInput[1]]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["class", linkClass]])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", [patternInput[0]])]))]));
    }

    function filters(model) {
        return function () {
            var tagName = "ul";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "filters"]])])], children]);
            };
        }()(_fableCore.List.map(function (f) {
            return filter(model.Filter, f);
        }, _fableCore.List.ofArray([new Filter("All", []), new Filter("Active", []), new Filter("Completed", [])])));
    }

    function todoFooter(model) {
        var clearVisibility = _fableCore.Seq.exists(function (i) {
            return i.Done;
        }, model.Items) ? "" : "none";
        var activeCount = String(_fableCore.List.filter(function (i) {
            return !i.Done;
        }, model.Items).length);
        return function () {
            var tagName = "footer";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "footer"]]), new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["display", "block"]])])])], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "span";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "todo-count"]])])], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "strong";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", [activeCount])])), new _FableHelpers.Html.Types.DomNode("Text", [" items left"])])), filters(model), function () {
            var tagName = "button";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "clear-completed"]]), new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["display", clearVisibility]])]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (_arg1) {
                    return new TodoAction("ClearCompleted", []);
                }]])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Clear completed"])]))]));
    }

    function onEnter(succ, nop) {
        return new _FableHelpers.Html.Types.Attribute("EventHandler", [["onkeyup", function (x) {
            return x.keyCode === 13 ? succ : nop;
        }]]);
    }

    function todoHeader(model) {
        return function () {
            var tagName = "header";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "header"]])])], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "h1";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["todos"])])), new _FableHelpers.Html.Types.DomNode("VoidElement", [["input", _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "new-todo"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["id", "new-todo"]]), new _FableHelpers.Html.Types.Attribute("Property", [["value", model]]), new _FableHelpers.Html.Types.Attribute("Property", [["placeholder", "What needs to be done?"]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["oninput", function (e) {
            return function (x) {
                return new TodoAction("ChangeInput", [x]);
            }(e.target.value);
        }]]), onEnter(new TodoAction("AddItem", []), new TodoAction("NoOp", []))])]])]));
    }

    function listItem(item) {
        var itemChecked = item.Done ? "true" : "";
        var editClass = item.IsEditing ? "editing" : "";
        return function () {
            var tagName = "li";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", (item.Done ? "completed " : " ") + editClass]])])], children]);
            };
        }()(_fableCore.List.ofArray([function () {
            var tagName = "div";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "view"]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["ondblclick", function (x) {
                    return new TodoAction("EditItem", [item]);
                }]])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("VoidElement", [["input", _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Property", [["className", "toggle"]]), new _FableHelpers.Html.Types.Attribute("Property", [["type", "checkbox"]]), new _FableHelpers.Html.Types.Attribute("Property", [["checked", itemChecked]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (e) {
            return new TodoAction("ToggleItem", [item]);
        }]])])]]), function () {
            var tagName = "label";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, new _fableCore.List()], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", [item.Name])])), function () {
            var tagName = "button";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "destroy"]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (e) {
                    return new TodoAction("Destroy", [item]);
                }]])])], children]);
            };
        }()(new _fableCore.List())])), new _FableHelpers.Html.Types.DomNode("VoidElement", [["input", _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "edit"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["value", item.Name]]), new _FableHelpers.Html.Types.Attribute("Property", [["id", "item-" + String(item.Id)]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onblur", function (e) {
            return new TodoAction("SaveItem", [item, e.target.value]);
        }]])])]])]));
    }

    function itemList(items, activeFilter) {
        var filterItems = function filterItems(i) {
            return activeFilter.Case === "Completed" ? i.Done : activeFilter.Case === "Active" ? !i.Done : true;
        };

        return function () {
            var tagName = "ul";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "todo-list"]])])], children]);
            };
        }()(function (list) {
            return _fableCore.List.map(function (item) {
                return listItem(item);
            }, list);
        }(function (list) {
            return _fableCore.List.filter(filterItems, list);
        }(items)));
    }

    function todoMain(model) {
        var allChecked = _fableCore.Seq.exists(function (i) {
            return !i.Done;
        }, model.Items);

        return function () {
            var tagName = "section";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "main"]]), new _FableHelpers.Html.Types.Attribute("Style", [_fableCore.List.ofArray([["style", "block"]])])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("VoidElement", [["input", _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Property", [["id", "toggle-all"]]), new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "toggle-all"]]), new _FableHelpers.Html.Types.Attribute("Property", [["type", "checkbox"]]), new _FableHelpers.Html.Types.Attribute("Property", [["checked", !allChecked ? "true" : ""]]), new _FableHelpers.Html.Types.Attribute("EventHandler", [["onclick", function (e) {
            return allChecked ? new TodoAction("CheckAll", []) : new TodoAction("UnCheckAll", []);
        }]])])]]), function () {
            var tagName = "label";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["for", "toggle-all"]])])], children]);
            };
        }()(_fableCore.List.ofArray([new _FableHelpers.Html.Types.DomNode("Text", ["Mark all as complete"])])), itemList(model.Items, model.Filter)]));
    }

    function todoView(model) {
        return function () {
            var tagName = "section";
            return function (children) {
                return new _FableHelpers.Html.Types.DomNode("Element", [[tagName, _fableCore.List.ofArray([new _FableHelpers.Html.Types.Attribute("Attribute", [["class", "todoapp"]])])], children]);
            };
        }()(_fableCore.List.ofArray([todoHeader(model.Input)], model.Items.tail == null ? new _fableCore.List() : _fableCore.List.ofArray([todoMain(model), todoFooter(model)])));
    }

    var Storage = exports.Storage = function ($exports) {
        var STORAGE_KEY = "vdom-storage";

        var fetch = $exports.fetch = function fetch() {
            return function (arg00) {
                return JSON.parse(arg00);
            }(function (_arg1) {
                return _arg1 == null ? "[]" : _arg1;
            }(localStorage.getItem(STORAGE_KEY)));
        };

        var save = $exports.save = function save(todos) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        };

        return $exports;
    }({});

    var initList = exports.initList = _fableCore.List.ofArray(Storage.fetch());

    var initModel = exports.initModel = function () {
        var Filter_1 = new Filter("All", []);
        return new TodoModel(initList, "", Filter_1);
    }();

    _FableHelpers.App.start((0, _FableHelpers.renderer)(), _FableHelpers.App.withStartNodeSelector("#todo", _FableHelpers.App.withSubscriber("modellogger", _fableCore.String.fsFormat("%A")(function (x) {
        console.log(x);
    }), _FableHelpers.App.withSubscriber("storagesub", function (_arg1) {
        if (_arg1.Case === "ModelChanged") {
            Storage.save(Array.from(_arg1.Fields[0].Items));
        }
    }, _FableHelpers.App.createApp(initModel, function (model) {
        return todoView(model);
    }, function (model) {
        return function (msg) {
            return todoUpdate(model, msg);
        };
    })))));
});
//# sourceMappingURL=virtualdom.js.map