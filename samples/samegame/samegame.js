define(["exports", "fable-core"], function (exports, _fableCore) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.selectColors = exports.selectHeight = exports.selectWidth = exports.selectGame = exports.buttonNewGame = exports.defaultConfig = exports.api = exports.SameGameDomain = exports.SameGameTypes = exports.PresetGames = undefined;
    exports.renderBoardToHtmlString = renderBoardToHtmlString;
    exports.getById = getById;
    exports.updateUi = updateUi;
    exports.rndColorGtor = rndColorGtor;
    exports.config = config;
    exports.newGameOnClick = newGameOnClick;
    exports.selectGameOnChange = selectGameOnChange;

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

    var PresetGames = exports.PresetGames = function ($exports) {
        var games = $exports.games = _fableCore.List.ofArray([_fableCore.List.ofArray([5, 3, 3, 4, 2, 3, 4, 2, 3, 3, 2, 5, 3, 2, 3, 4, 5, 5, 5, 5, 1, 1, 3, 5, 4, 1, 3, 1, 2, 3, 1, 3, 1, 3, 2, 1, 2, 3, 4, 3, 2, 2, 1, 4, 5, 5, 3, 3, 3, 2, 3, 3, 1, 1, 5, 5, 5, 4, 5, 1, 1, 3, 5, 5, 3, 4, 4, 5, 5, 2, 2, 3, 1, 2, 3, 4, 1, 5, 1, 4, 4, 5, 4, 1, 1, 3, 3, 1, 4, 3, 2, 4, 3, 3, 3, 5, 3, 1, 2, 1, 2, 3, 3, 2, 5, 1, 2, 4, 3, 1, 4, 1, 3, 1, 3, 1, 5, 5, 5, 5, 2, 4, 2, 3, 1, 3, 5, 4, 5, 4, 2, 1, 4, 1, 3, 1, 3, 3, 1, 5, 2, 4, 3, 3, 4, 1, 1, 2, 1, 2, 5, 4, 1, 2, 4, 3, 2, 1, 1, 2, 1, 4, 5, 4, 5, 4, 3, 3, 4, 2, 4, 3, 4, 5, 4, 4, 1, 4, 4, 5, 3, 3, 4, 4, 5, 4, 5, 2, 2, 5, 5, 3, 2, 5, 5, 3, 5, 4, 4, 1, 4, 4, 4, 4, 4, 2, 1, 1, 4, 1, 3, 4, 2, 1, 5, 3, 5, 2, 5, 2, 4, 1, 2, 4, 3]), _fableCore.List.ofArray([4, 1, 3, 4, 4, 2, 5, 3, 2, 5, 2, 3, 2, 3, 3, 5, 4, 5, 5, 1, 4, 1, 1, 4, 3, 5, 4, 1, 2, 5, 1, 5, 1, 3, 4, 3, 3, 3, 4, 1, 3, 1, 1, 1, 2, 3, 4, 4, 5, 1, 1, 1, 4, 1, 1, 3, 1, 5, 1, 5, 4, 4, 2, 2, 5, 3, 3, 5, 5, 5, 3, 1, 1, 4, 4, 3, 5, 5, 2, 1, 1, 1, 1, 1, 5, 5, 1, 5, 2, 1, 2, 3, 3, 5, 3, 4, 5, 5, 2, 5, 5, 4, 5, 1, 4, 5, 5, 1, 3, 4, 4, 2, 4, 1, 4, 4, 4, 1, 2, 5, 3, 4, 4, 4, 3, 1, 4, 2, 1, 1, 3, 5, 4, 2, 1, 3, 1, 1, 2, 5, 1, 5, 2, 3, 2, 1, 4, 2, 1, 5, 5, 4, 3, 2, 3, 2, 5, 1, 3, 4, 1, 3, 5, 3, 2, 4, 4, 2, 1, 1, 3, 4, 4, 3, 5, 3, 2, 2, 3, 3, 2, 2, 2, 2, 1, 4, 3, 2, 5, 4, 4, 1, 3, 4, 5, 3, 1, 5, 2, 3, 3, 3, 2, 5, 2, 2, 5, 1, 2, 1, 1, 4, 4, 1, 2, 5, 2, 4, 3, 3, 2, 2, 3, 2, 3]), _fableCore.List.ofArray([4, 2, 3, 1, 5, 4, 1, 4, 4, 4, 4, 2, 1, 4, 5, 5, 3, 4, 1, 3, 5, 3, 5, 4, 2, 1, 4, 2, 2, 5, 2, 2, 4, 4, 4, 4, 3, 2, 5, 4, 5, 5, 2, 4, 2, 1, 1, 2, 1, 5, 4, 5, 1, 1, 5, 2, 2, 5, 5, 4, 1, 5, 3, 5, 3, 3, 4, 3, 5, 2, 2, 1, 4, 2, 3, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 3, 1, 4, 4, 3, 2, 4, 3, 1, 3, 1, 2, 2, 1, 4, 3, 4, 2, 5, 3, 3, 1, 4, 3, 5, 1, 5, 3, 4, 4, 5, 4, 1, 4, 5, 3, 1, 4, 3, 5, 4, 4, 3, 5, 3, 4, 5, 2, 4, 4, 3, 5, 1, 5, 4, 3, 2, 1, 5, 2, 2, 1, 4, 3, 4, 2, 1, 3, 1, 1, 3, 5, 4, 1, 4, 5, 3, 5, 1, 1, 2, 4, 5, 1, 2, 5, 4, 2, 1, 3, 2, 5, 5, 2, 4, 4, 5, 1, 2, 1, 3, 2, 1, 3, 2, 3, 2, 1, 2, 4, 5, 2, 1, 4, 1, 3, 2, 4, 2, 5, 3, 5, 2, 4, 5, 3, 1, 3, 2, 1, 1, 2, 4, 5, 4, 5, 4, 2, 5, 4]), _fableCore.List.ofArray([2, 2, 4, 1, 1, 4, 3, 5, 4, 2, 5, 5, 1, 5, 3, 3, 4, 4, 2, 3, 1, 1, 1, 5, 2, 3, 4, 4, 3, 2, 3, 3, 5, 1, 3, 1, 2, 1, 3, 2, 1, 4, 4, 5, 1, 4, 5, 2, 3, 4, 5, 3, 5, 2, 3, 1, 1, 5, 5, 3, 1, 4, 2, 3, 5, 3, 5, 1, 3, 2, 2, 4, 1, 1, 3, 2, 2, 2, 5, 3, 4, 2, 2, 5, 2, 5, 3, 4, 4, 2, 1, 2, 1, 1, 1, 2, 3, 2, 5, 4, 4, 5, 4, 1, 2, 2, 3, 5, 4, 1, 5, 4, 1, 2, 5, 4, 2, 3, 1, 5, 5, 2, 3, 2, 2, 5, 3, 5, 5, 1, 5, 1, 2, 1, 4, 4, 4, 1, 3, 1, 3, 4, 1, 3, 3, 2, 2, 5, 2, 2, 5, 5, 1, 1, 4, 3, 3, 2, 5, 2, 4, 4, 5, 3, 1, 4, 2, 5, 3, 1, 1, 2, 5, 1, 3, 2, 2, 5, 5, 5, 4, 4, 4, 4, 1, 1, 5, 2, 2, 2, 2, 3, 1, 2, 3, 4, 5, 3, 2, 4, 5, 2, 2, 2, 2, 4, 1, 1, 3, 3, 2, 4, 2, 1, 4, 5, 5, 1, 3, 1, 4, 5, 3, 2, 5]), _fableCore.List.ofArray([5, 3, 5, 3, 4, 4, 3, 3, 5, 5, 3, 2, 2, 5, 1, 2, 3, 2, 3, 2, 5, 1, 4, 5, 2, 1, 4, 1, 2, 4, 1, 2, 2, 3, 1, 3, 3, 4, 1, 4, 4, 4, 1, 1, 3, 4, 2, 4, 3, 1, 4, 3, 5, 5, 4, 4, 4, 5, 1, 3, 1, 2, 2, 1, 4, 1, 5, 5, 4, 4, 4, 4, 1, 4, 4, 1, 5, 4, 2, 3, 5, 1, 4, 1, 1, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 2, 3, 1, 2, 2, 5, 3, 5, 4, 2, 5, 2, 1, 2, 4, 4, 1, 4, 3, 4, 1, 4, 1, 5, 2, 4, 3, 1, 2, 5, 1, 2, 3, 2, 3, 4, 5, 2, 1, 4, 2, 1, 1, 5, 2, 1, 2, 1, 1, 4, 3, 5, 5, 5, 2, 3, 3, 1, 5, 4, 2, 3, 4, 4, 1, 4, 5, 5, 5, 1, 5, 5, 3, 5, 3, 1, 4, 2, 4, 1, 2, 2, 5, 4, 3, 1, 2, 4, 5, 5, 1, 5, 2, 2, 3, 4, 3, 2, 4, 4, 2, 3, 2, 1, 5, 4, 3, 1, 3, 2, 5, 1, 3, 4, 2, 5, 4, 1, 2, 1, 2, 2, 5, 1, 5, 1, 3, 1, 3, 5]), _fableCore.List.ofArray([3, 3, 3, 4, 5, 5, 2, 4, 4, 3, 4, 2, 2, 2, 1, 1, 4, 4, 3, 4, 2, 2, 1, 1, 4, 5, 3, 2, 4, 2, 3, 2, 4, 3, 4, 3, 4, 3, 1, 5, 4, 4, 1, 2, 1, 4, 1, 3, 3, 3, 4, 3, 2, 3, 4, 2, 2, 3, 1, 5, 2, 5, 5, 3, 5, 3, 4, 4, 4, 3, 2, 1, 4, 4, 5, 4, 1, 5, 5, 5, 4, 1, 5, 2, 4, 1, 1, 1, 5, 3, 1, 2, 2, 1, 3, 5, 4, 4, 2, 4, 1, 2, 5, 5, 2, 3, 4, 3, 4, 1, 1, 3, 3, 2, 2, 2, 5, 4, 5, 5, 2, 4, 5, 1, 2, 1, 5, 3, 1, 5, 5, 3, 3, 2, 4, 3, 1, 1, 1, 1, 2, 3, 3, 5, 3, 4, 5, 1, 5, 2, 5, 1, 5, 3, 2, 2, 2, 5, 3, 1, 4, 2, 2, 4, 1, 3, 5, 1, 3, 4, 1, 5, 4, 4, 4, 5, 2, 1, 4, 4, 1, 4, 3, 5, 1, 4, 3, 1, 5, 2, 1, 2, 3, 5, 2, 5, 1, 4, 4, 5, 5, 4, 3, 1, 1, 5, 3, 1, 5, 3, 1, 2, 1, 5, 5, 5, 4, 3, 3, 2, 1, 5, 2, 1, 4]), _fableCore.List.ofArray([4, 1, 1, 4, 1, 1, 2, 3, 5, 5, 3, 4, 2, 2, 5, 1, 3, 1, 1, 4, 2, 4, 2, 2, 3, 3, 1, 4, 5, 2, 3, 5, 1, 1, 1, 1, 2, 3, 1, 4, 3, 2, 2, 3, 5, 4, 2, 4, 1, 4, 1, 5, 4, 4, 2, 1, 4, 5, 2, 3, 5, 3, 4, 4, 2, 3, 4, 2, 1, 5, 4, 1, 1, 3, 1, 5, 3, 5, 3, 4, 2, 3, 4, 1, 1, 3, 2, 3, 4, 1, 2, 3, 2, 4, 4, 1, 4, 3, 1, 2, 1, 1, 4, 2, 1, 1, 5, 2, 3, 2, 3, 4, 2, 3, 1, 3, 5, 4, 3, 5, 2, 1, 3, 1, 3, 1, 5, 3, 4, 1, 2, 5, 5, 2, 4, 2, 4, 3, 5, 1, 4, 5, 1, 3, 3, 3, 2, 4, 3, 1, 2, 5, 5, 1, 5, 1, 3, 3, 4, 5, 2, 2, 3, 2, 5, 3, 5, 1, 5, 5, 5, 2, 4, 3, 1, 2, 5, 1, 4, 1, 5, 1, 5, 4, 5, 2, 1, 4, 2, 4, 4, 2, 5, 1, 4, 2, 3, 4, 3, 5, 4, 1, 4, 4, 2, 5, 2, 2, 5, 4, 1, 2, 5, 4, 5, 1, 3, 5, 3, 4, 3, 1, 5, 1, 1]), _fableCore.List.ofArray([3, 4, 1, 3, 1, 3, 3, 1, 4, 2, 3, 5, 5, 4, 5, 2, 2, 3, 1, 1, 3, 5, 2, 5, 5, 4, 3, 3, 4, 3, 5, 4, 2, 2, 5, 3, 5, 3, 2, 2, 4, 5, 2, 4, 2, 3, 3, 1, 4, 3, 2, 1, 4, 4, 2, 3, 3, 1, 4, 3, 1, 5, 2, 2, 3, 4, 4, 4, 4, 3, 2, 4, 2, 5, 3, 4, 3, 4, 3, 2, 2, 3, 5, 2, 1, 4, 1, 3, 1, 3, 5, 5, 5, 4, 2, 5, 3, 5, 1, 4, 5, 5, 3, 2, 1, 3, 5, 4, 2, 4, 1, 5, 3, 2, 2, 4, 1, 1, 1, 5, 3, 1, 4, 2, 3, 3, 5, 3, 4, 3, 1, 3, 3, 5, 2, 3, 1, 3, 2, 4, 4, 2, 2, 2, 2, 5, 2, 3, 3, 3, 4, 3, 4, 2, 1, 4, 1, 1, 5, 3, 4, 3, 1, 4, 3, 3, 2, 4, 5, 5, 4, 4, 5, 3, 1, 2, 5, 2, 5, 3, 2, 2, 5, 1, 5, 4, 4, 2, 5, 4, 2, 5, 4, 4, 5, 1, 1, 3, 4, 5, 4, 4, 3, 4, 5, 1, 3, 2, 1, 4, 5, 5, 1, 2, 2, 3, 3, 1, 5, 5, 4, 1, 4, 2, 4]), _fableCore.List.ofArray([2, 1, 1, 5, 1, 5, 3, 5, 1, 2, 2, 3, 3, 1, 2, 4, 3, 5, 5, 1, 1, 1, 1, 2, 3, 4, 3, 1, 5, 5, 4, 4, 2, 2, 5, 2, 5, 4, 5, 4, 4, 5, 5, 1, 3, 4, 5, 3, 3, 1, 5, 4, 2, 3, 3, 2, 1, 4, 3, 2, 3, 3, 5, 1, 4, 3, 2, 1, 1, 5, 5, 4, 5, 2, 3, 1, 1, 5, 5, 4, 5, 1, 3, 4, 1, 1, 2, 5, 5, 4, 1, 2, 2, 4, 2, 1, 1, 5, 2, 5, 2, 4, 2, 3, 2, 1, 4, 1, 5, 2, 1, 1, 4, 4, 2, 2, 5, 2, 5, 4, 1, 3, 1, 3, 5, 3, 3, 2, 1, 2, 1, 2, 3, 5, 2, 1, 5, 5, 3, 5, 3, 2, 5, 4, 4, 1, 3, 3, 2, 5, 2, 4, 5, 4, 5, 5, 3, 5, 4, 4, 3, 2, 5, 4, 1, 4, 3, 5, 2, 2, 3, 5, 4, 5, 2, 5, 4, 3, 4, 5, 1, 1, 5, 1, 1, 2, 2, 5, 1, 3, 3, 5, 1, 4, 3, 1, 2, 1, 3, 5, 3, 3, 1, 1, 3, 2, 1, 1, 3, 5, 2, 1, 1, 5, 4, 3, 2, 5, 3, 4, 3, 4, 5, 5, 4]), _fableCore.List.ofArray([5, 3, 1, 1, 5, 5, 1, 2, 4, 2, 5, 5, 5, 5, 2, 2, 5, 5, 1, 2, 1, 1, 2, 3, 4, 1, 5, 3, 5, 2, 1, 4, 2, 1, 1, 4, 4, 4, 5, 3, 3, 2, 3, 4, 1, 1, 3, 4, 5, 1, 4, 1, 1, 4, 4, 5, 2, 3, 2, 5, 5, 4, 3, 2, 2, 1, 3, 4, 4, 4, 3, 2, 1, 4, 4, 5, 4, 4, 2, 3, 3, 2, 4, 5, 4, 1, 4, 3, 2, 2, 2, 1, 2, 1, 3, 5, 5, 1, 3, 1, 4, 5, 5, 2, 3, 3, 1, 2, 1, 5, 1, 4, 1, 4, 2, 4, 5, 3, 4, 2, 3, 5, 2, 3, 2, 2, 5, 1, 2, 4, 1, 3, 1, 2, 5, 4, 2, 3, 2, 1, 1, 2, 3, 3, 1, 4, 5, 3, 4, 4, 5, 2, 2, 2, 4, 4, 3, 2, 5, 1, 3, 5, 1, 3, 4, 4, 3, 5, 5, 4, 2, 3, 2, 4, 2, 1, 3, 4, 3, 3, 2, 2, 3, 3, 4, 5, 2, 5, 3, 2, 1, 1, 3, 1, 4, 1, 1, 5, 5, 3, 1, 1, 4, 1, 2, 3, 1, 4, 1, 3, 1, 5, 5, 3, 4, 2, 2, 4, 5, 5, 3, 3, 2, 3, 4])]);

        return $exports;
    }({});

    var SameGameTypes = exports.SameGameTypes = function ($exports) {
        var Position = $exports.Position = function () {
            function Position(col, row) {
                _classCallCheck(this, Position);

                this.Col = col;
                this.Row = row;
            }

            _createClass(Position, [{
                key: "Equals",
                value: function Equals(other) {
                    return _fableCore.Util.equalsRecords(this, other);
                }
            }, {
                key: "CompareTo",
                value: function CompareTo(other) {
                    return _fableCore.Util.compareRecords(this, other);
                }
            }, {
                key: "Left",
                get: function get() {
                    return new Position(this.Col - 1, this.Row);
                }
            }, {
                key: "Right",
                get: function get() {
                    return new Position(this.Col + 1, this.Row);
                }
            }, {
                key: "Up",
                get: function get() {
                    var Row = this.Row + 1;
                    return new Position(this.Col, Row);
                }
            }, {
                key: "Down",
                get: function get() {
                    var Row = this.Row - 1;
                    return new Position(this.Col, Row);
                }
            }]);

            return Position;
        }();

        _fableCore.Util.setInterfaces(Position.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.Position");

        var Color = $exports.Color = function () {
            function Color(caseName, fields) {
                _classCallCheck(this, Color);

                this.Case = caseName;
                this.Fields = fields;
            }

            _createClass(Color, [{
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

            return Color;
        }();

        _fableCore.Util.setInterfaces(Color.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.Color");

        var CellState = $exports.CellState = function () {
            function CellState(caseName, fields) {
                _classCallCheck(this, CellState);

                this.Case = caseName;
                this.Fields = fields;
            }

            _createClass(CellState, [{
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

            return CellState;
        }();

        _fableCore.Util.setInterfaces(CellState.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.CellState");

        var Cell = $exports.Cell = function () {
            function Cell(position, state) {
                _classCallCheck(this, Cell);

                this.Position = position;
                this.State = state;
            }

            _createClass(Cell, [{
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

            return Cell;
        }();

        _fableCore.Util.setInterfaces(Cell.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.Cell");

        var Group = $exports.Group = function () {
            function Group(color, positions) {
                _classCallCheck(this, Group);

                this.Color = color;
                this.Positions = positions;
            }

            _createClass(Group, [{
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

            return Group;
        }();

        _fableCore.Util.setInterfaces(Group.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.Group");

        var Game = $exports.Game = function () {
            function Game(caseName, fields) {
                _classCallCheck(this, Game);

                this.Case = caseName;
                this.Fields = fields;
            }

            _createClass(Game, [{
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

            return Game;
        }();

        _fableCore.Util.setInterfaces(Game.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.Game");

        var GameState = $exports.GameState = function () {
            function GameState(board, score) {
                _classCallCheck(this, GameState);

                this.Board = board;
                this.Score = score;
            }

            _createClass(GameState, [{
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

            return GameState;
        }();

        _fableCore.Util.setInterfaces(GameState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Samegame.SameGameTypes.GameState");

        var GameConfig = $exports.GameConfig = function GameConfig(numberOfColumns, numberOfRows, stoneGenerator) {
            _classCallCheck(this, GameConfig);

            this.NumberOfColumns = numberOfColumns;
            this.NumberOfRows = numberOfRows;
            this.StoneGenerator = stoneGenerator;
        };

        _fableCore.Util.setInterfaces(GameConfig.prototype, ["FSharpRecord"], "Samegame.SameGameTypes.GameConfig");

        var SameGameApi = $exports.SameGameApi = function SameGameApi(newGame, play) {
            _classCallCheck(this, SameGameApi);

            this.NewGame = newGame;
            this.Play = play;
        };

        _fableCore.Util.setInterfaces(SameGameApi.prototype, ["FSharpRecord"], "Samegame.SameGameTypes.SameGameApi");

        return $exports;
    }({});

    var SameGameDomain = exports.SameGameDomain = function ($exports) {
        var square = function square(x) {
            return x * x;
        };

        var bonus = 1000;

        var calcScore = function calcScore(groupSize) {
            return square(groupSize - 2);
        };

        var penalty = function penalty(stonesLeft) {
            return -square(stonesLeft - 2);
        };

        var getCellState = function getCellState(board, pos) {
            var colCount = board.length;

            if (((pos.Col < colCount ? pos.Col >= 0 : false) ? pos.Row < _fableCore.Seq.item(pos.Col, board).length : false) ? pos.Row >= 0 : false) {
                return _fableCore.Seq.item(pos.Row, _fableCore.Seq.item(pos.Col, board));
            } else {
                return new SameGameTypes.CellState("Empty", []);
            }
        };

        var findAdjacentWithSameColor = function findAdjacentWithSameColor(board, col, pos) {
            return _fableCore.List.map(function (tuple) {
                return tuple[1];
            }, _fableCore.List.filter(function (cell) {
                return cell[0].Equals(new SameGameTypes.CellState("Stone", [col]));
            }, _fableCore.List.map(function (p) {
                return [getCellState(board, p), p];
            }, _fableCore.List.ofArray([pos.Up, pos.Right, pos.Down, pos.Left]))));
        };

        var hasValidMoves = function hasValidMoves(board) {
            return _fableCore.Seq.exists(function (col) {
                return _fableCore.Seq.exists(function (cell) {
                    return cell.State.Case === "Stone" ? function ($var1) {
                        return !($var1.tail == null);
                    }(function (pos) {
                        return findAdjacentWithSameColor(board, cell.State.Fields[0], pos);
                    }(cell.Position)) : false;
                }, col);
            }, _fableCore.Seq.mapIndexed(function (i, col) {
                return _fableCore.Seq.mapIndexed(function (j, cell) {
                    return new SameGameTypes.Cell(new SameGameTypes.Position(i, j), cell);
                }, col);
            }, board));
        };

        var numberOfStones = function numberOfStones(board) {
            var numOfStonesInCol = function () {
                var projection = function projection(_arg1) {
                    return _arg1.Case === "Empty" ? 0 : 1;
                };

                return function (list) {
                    return _fableCore.Seq.sumBy(projection, list);
                };
            }();

            return _fableCore.Seq.sum(function (list) {
                return _fableCore.List.map(numOfStonesInCol, list);
            }(board));
        };

        var isEmpty = function isEmpty(board) {
            return _fableCore.Seq.forAll(function ($var2) {
                return new SameGameTypes.CellState("Empty", []).Equals($var2.head);
            }, board);
        };

        var evaluateGameState = function evaluateGameState(gameState) {
            return hasValidMoves(gameState.Board) ? new SameGameTypes.Game("InProgress", [gameState]) : isEmpty(gameState.Board) ? new SameGameTypes.Game("Finished", [function () {
                var Score = gameState.Score + bonus;
                return new SameGameTypes.GameState(gameState.Board, Score);
            }()]) : function () {
                var score = gameState.Score + penalty(numberOfStones(gameState.Board));
                return new SameGameTypes.Game("Finished", [new SameGameTypes.GameState(gameState.Board, score)]);
            }();
        };

        var getGroup = function getGroup(board, position) {
            var find = function find(ps) {
                return function (col) {
                    return function (group) {
                        return ps.tail != null ? function () {
                            var cells = _fableCore.List.filter(function (pos) {
                                return !_fableCore.Seq.exists(function (y) {
                                    return pos.Equals(y);
                                }, _fableCore.List.append(ps.tail, group));
                            }, function (pos) {
                                return findAdjacentWithSameColor(board, col, pos);
                            }(ps.head));

                            return find(_fableCore.List.append(cells, ps.tail))(col)(_fableCore.List.ofArray([ps.head], group));
                        }() : group;
                    };
                };
            };

            return function (_arg1) {
                return _arg1.Case === "Stone" ? function () {
                    var positions = find(_fableCore.List.ofArray([position]))(_arg1.Fields[0])(new _fableCore.List());

                    if (positions.length > 1) {
                        return new SameGameTypes.Group(_arg1.Fields[0], positions);
                    }
                }() : null;
            }(getCellState(board, position));
        };

        var removeGroup = function removeGroup(group, board) {
            return function (cols) {
                return _fableCore.List.append(cols, _fableCore.List.replicate(board.length - cols.length, _fableCore.List.replicate(_fableCore.Seq.item(0, board).length, new SameGameTypes.CellState("Empty", []))));
            }(_fableCore.List.filter(function ($var3) {
                return !new SameGameTypes.CellState("Empty", []).Equals($var3.head);
            }, _fableCore.List.mapIndexed(function (i, col) {
                return function (col_) {
                    return _fableCore.List.append(col_, _fableCore.List.replicate(col.length - col_.length, new SameGameTypes.CellState("Empty", [])));
                }(_fableCore.List.map(function (cell) {
                    return cell.State;
                }, _fableCore.List.filter(function (cell) {
                    return function ($var4) {
                        return !_fableCore.Seq.exists(function (y) {
                            return cell.Position.Equals(y);
                        }, $var4);
                    }(group.Positions);
                }, _fableCore.List.mapIndexed(function (j, cell) {
                    return new SameGameTypes.Cell(new SameGameTypes.Position(i, j), cell);
                }, col))));
            }, board)));
        };

        var play = function play(gameState, pos) {
            return function (_arg1) {
                return _arg1 != null ? function () {
                    var newBoard = function (board) {
                        return removeGroup(_arg1, board);
                    }(gameState.Board);

                    return new SameGameTypes.GameState(newBoard, gameState.Score + calcScore(_arg1.Positions.length));
                }() : gameState;
            }(getGroup(gameState.Board, pos));
        };

        var playIfRunning = function playIfRunning(game, pos) {
            return game.Case === "InProgress" ? evaluateGameState(play(game.Fields[0], pos)) : game;
        };

        var isValid = function isValid(conf) {
            return (conf.NumberOfColumns < 3 ? true : conf.NumberOfColumns > 15) ? false : (conf.NumberOfRows < 3 ? true : conf.NumberOfRows > 15) ? false : true;
        };

        var newGame = function newGame(config) {
            var createBoard = function createBoard(config_1) {
                return evaluateGameState(function (board) {
                    return new SameGameTypes.GameState(board, 0);
                }(_fableCore.List.initialize(config_1.NumberOfColumns, function (_arg2) {
                    return _fableCore.List.initialize(config_1.NumberOfRows, function (_arg1) {
                        return config_1.StoneGenerator();
                    });
                })));
            };

            if (isValid(config)) {
                return createBoard(config);
            }
        };

        var api = $exports.api = new SameGameTypes.SameGameApi(function (config) {
            return newGame(config);
        }, function (game) {
            return function (pos) {
                return playIfRunning(game, pos);
            };
        });
        return $exports;
    }({});

    var api = exports.api = SameGameDomain.api;

    function renderBoardToHtmlString(board) {
        var renderCell = function renderCell(x) {
            return function (y) {
                return function (col) {
                    return "<td class='sg-td'>" + _fableCore.String.fsFormat("<a href='javaScript:void(0);' id='cell-%d-%d'>")(function (x) {
                        return x;
                    })(x)(y) + _fableCore.String.fsFormat("<div class='sg-cell sg-color%d'>")(function (x) {
                        return x;
                    })(col) + "</div></a></td>";
                };
            };
        };

        var makeBoard = function makeBoard(board_1) {
            return "<table class='sg-table horiz-centered'>" + _fableCore.String.join("", _fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
                return _fableCore.Seq.map(function (y) {
                    return "<tr class='sg-tr'>" + _fableCore.String.join("", _fableCore.List.map(function (x) {
                        return renderCell(x)(y)(_fableCore.Seq.item(y, _fableCore.Seq.item(x, board_1)));
                    }, _fableCore.Seq.toList(_fableCore.Seq.range(0, board_1.length - 1)))) + "</tr>";
                }, _fableCore.Seq.toList(_fableCore.Seq.rangeStep(_fableCore.Seq.item(0, board_1).length - 1, -1, 0)));
            }))) + "</table>";
        };

        return makeBoard(_fableCore.List.map(function (col) {
            return _fableCore.List.map(function (_arg1) {
                return _arg1.Case === "Empty" ? 0 : function () {
                    var c = _arg1.Fields[0].Fields[0];
                    return c;
                }();
            }, col);
        }, board));
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function updateUi(game) {
        var boardElement = getById("sg-board");
        var scoreElement = getById("sg-score");

        var play = function play(game_1) {
            return function (tupledArg) {
                updateUi(function () {
                    var $var5 = game_1;

                    if ($var5 != null) {
                        return function (g) {
                            return api.Play(g)(new SameGameTypes.Position(tupledArg[0], tupledArg[1]));
                        }($var5);
                    } else {
                        return $var5;
                    }
                }());
            };
        };

        var addListeners = function addListeners(maxColIndex) {
            return function (maxRowIndex) {
                _fableCore.Seq.iterate(function (x) {
                    _fableCore.Seq.iterate(function (y) {
                        var cellId = _fableCore.String.fsFormat("cell-%d-%d")(function (x) {
                            return x;
                        })(x)(y);

                        var el = getById(cellId);
                        el.addEventListener('click', function (_arg1) {
                            play(game)([x, y]);
                            return null;
                        });
                    }, _fableCore.Seq.toList(_fableCore.Seq.range(0, maxRowIndex)));
                }, _fableCore.Seq.toList(_fableCore.Seq.range(0, maxColIndex)));
            };
        };

        if (game != null) {
            if (game.Case === "Finished") {
                var gs = game.Fields[0];
                var board = renderBoardToHtmlString(gs.Board);
                boardElement.innerHTML = board;
                scoreElement.innerText = "No more moves. " + _fableCore.String.fsFormat("Your final score is %i point(s).")(function (x) {
                    return x;
                })(gs.Score);
            } else {
                var gs = game.Fields[0];
                var board = renderBoardToHtmlString(gs.Board);
                boardElement.innerHTML = board;
                addListeners(gs.Board.length - 1)(_fableCore.Seq.item(0, gs.Board).length - 1);
                scoreElement.innerText = _fableCore.String.fsFormat("%i point(s).")(function (x) {
                    return x;
                })(gs.Score);
            }
        } else {
            boardElement.innerText = "Sorry, an error occurred while rendering the board.";
        }
    }

    function rndColorGtor(i) {
        var rnd = {};
        return function (unitVar0) {
            return new SameGameTypes.CellState("Stone", [new SameGameTypes.Color("Color", [Math.floor(Math.random() * (i - 0)) + 0 + 1])]);
        };
    }

    var defaultConfig = exports.defaultConfig = function (arr) {
        return new SameGameTypes.GameConfig(arr[0], arr[1], rndColorGtor(arr[2]));
    }(Int32Array.from(_fableCore.Seq.map(function (value) {
        return Number.parseInt(value);
    }, function (className) {
        return className.split("-");
    }(getById("sg-board").className))));

    var buttonNewGame = exports.buttonNewGame = getById("new-game");
    var selectGame = exports.selectGame = getById("sg-select-game");
    var selectWidth = exports.selectWidth = getById("sg-select-w");
    var selectHeight = exports.selectHeight = getById("sg-select-h");
    var selectColors = exports.selectColors = getById("sg-select-col");

    function config() {
        return new SameGameTypes.GameConfig(Number.parseInt(selectWidth.value), Number.parseInt(selectHeight.value), rndColorGtor(Number.parseInt(selectColors.value)));
    }

    function newGameOnClick() {
        var game = api.NewGame(config());
        selectGame.selectedIndex = 0;
        updateUi(game);
    }

    function selectGameOnChange() {
        var presetGtor = function presetGtor(gameNum) {
            var index = 0;

            var game = _fableCore.Seq.item(gameNum, PresetGames.games);

            return function (unitVar0) {
                index = index + 1;
                return new SameGameTypes.CellState("Stone", [new SameGameTypes.Color("Color", [_fableCore.Seq.item(index - 1, game)])]);
            };
        };

        var gameIndex = Number.parseInt(selectGame.value);

        if (gameIndex >= 0) {
            updateUi(api.NewGame(function () {
                var inputRecord = config();
                var StoneGenerator = presetGtor(gameIndex);
                return new SameGameTypes.GameConfig(inputRecord.NumberOfColumns, inputRecord.NumberOfRows, StoneGenerator);
            }()));
        }
    }

    selectGame.addEventListener('change', function (_arg1) {
        selectGameOnChange();
        return null;
    });
    buttonNewGame.addEventListener('click', function (_arg2) {
        newGameOnClick();
        return null;
    });
    updateUi(api.NewGame(defaultConfig));
});
//# sourceMappingURL=samegame.js.map