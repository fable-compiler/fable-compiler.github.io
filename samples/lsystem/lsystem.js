define(["exports", "fable-core", "./html"], function (exports, _fableCore, _html) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.turtle = exports.width = exports.angle = exports.iters = exports.input = exports.cont = exports.defaultLength = exports.LSystem = exports.chaos = exports.LTurtle = exports.LogoCommand = exports.LineSegment = exports.Color = exports.Point = exports.$5B$5D$601$2Ejoin = exports.$5B$5D$601$2Epush = undefined;
  exports.render = render;
  exports.randomColor = randomColor;
  exports.processTurtle = processTurtle;
  exports.processLsystem = processLsystem;
  exports.convertToTurtle = convertToTurtle;
  exports.error = error;
  exports.parse = parse;
  exports.run = run;

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

  function ___1_push(v) {
    return this.push(v);
  }

  exports.$5B$5D$601$2Epush = ___1_push;

  function ___1_join(s) {
    return this.join(s);
  }

  exports.$5B$5D$601$2Ejoin = ___1_join;

  var Point = exports.Point = function () {
    function Point(x, y) {
      _classCallCheck(this, Point);

      this.x = x;
      this.y = y;
    }

    _createClass(Point, [{
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

    return Point;
  }();

  _fableCore.Util.setInterfaces(Point.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Lsystem.Point");

  var Color = exports.Color = function () {
    function Color(r, g, b) {
      _classCallCheck(this, Color);

      this.r = r;
      this.g = g;
      this.b = b;
    }

    _createClass(Color, [{
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

    return Color;
  }();

  _fableCore.Util.setInterfaces(Color.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Lsystem.Color");

  var LineSegment = exports.LineSegment = function () {
    function LineSegment(startPoint, endPoint, color) {
      _classCallCheck(this, LineSegment);

      this.startPoint = startPoint;
      this.endPoint = endPoint;
      this.color = color;
    }

    _createClass(LineSegment, [{
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

    return LineSegment;
  }();

  _fableCore.Util.setInterfaces(LineSegment.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Lsystem.LineSegment");

  function render(lineWidth, lines) {
    var xs = _fableCore.Seq.collect(function (l) {
      return _fableCore.List.ofArray([l.startPoint.x, l.endPoint.x]);
    }, lines);

    var ys = _fableCore.Seq.collect(function (l) {
      return _fableCore.List.ofArray([l.startPoint.y, l.endPoint.y]);
    }, lines);

    var patternInput = [_fableCore.Seq.reduce(function (x, y) {
      return Math.min(x, y);
    }, xs), _fableCore.Seq.reduce(function (x, y) {
      return Math.max(x, y);
    }, xs)];
    var minx = patternInput[0];
    var maxx = patternInput[1];
    var patternInput_1 = [_fableCore.Seq.reduce(function (x, y) {
      return Math.min(x, y);
    }, ys), _fableCore.Seq.reduce(function (x, y) {
      return Math.max(x, y);
    }, ys)];
    var miny = patternInput_1[0];
    var maxy = patternInput_1[1];

    var convx = function convx(x) {
      return (x - minx) / (maxx - minx) * 600;
    };

    var convy = function convy(y) {
      return (y - miny) / (maxy - miny) * 600;
    };

    return function (arg0) {
      return function (arg1) {
        return _html.El.op_Dynamic(arg0, arg1);
      };
    }(_html.s)("svg")(_fableCore.List.ofArray([(0, _html.op_EqualsGreater)("width", 600), (0, _html.op_EqualsGreater)("height", 600)]))(_fableCore.Seq.toList(_fableCore.Seq.delay(function (unitVar) {
      return _fableCore.Seq.map(function (line) {
        return function (arg0) {
          return function (arg1) {
            return _html.El.op_Dynamic(arg0, arg1);
          };
        }(_html.s)("line")(_fableCore.List.ofArray([(0, _html.op_EqualsGreater)("x1", convx(line.startPoint.x)), (0, _html.op_EqualsGreater)("y1", convy(line.startPoint.y)), (0, _html.op_EqualsGreater)("x2", convx(line.endPoint.x)), (0, _html.op_EqualsGreater)("y2", convy(line.endPoint.y)), (0, _html.op_EqualsGreater)("style", _fableCore.String.fsFormat("stroke:rgb(%i,%i,%i);stroke-width:%i")(function (x) {
          return x;
        })(line.color.r)(line.color.g)(line.color.b)(lineWidth))]))(new _fableCore.List());
      }, lines);
    })));
  }

  var LogoCommand = exports.LogoCommand = function () {
    function LogoCommand(caseName, fields) {
      _classCallCheck(this, LogoCommand);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(LogoCommand, [{
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

    return LogoCommand;
  }();

  _fableCore.Util.setInterfaces(LogoCommand.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Lsystem.LogoCommand");

  var LTurtle = exports.LTurtle = function () {
    function LTurtle(angle, x, y, c) {
      _classCallCheck(this, LTurtle);

      this.angle = angle;
      this.x = x;
      this.y = y;
      this.c = c;
    }

    _createClass(LTurtle, [{
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

    return LTurtle;
  }();

  _fableCore.Util.setInterfaces(LTurtle.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Lsystem.LTurtle");

  var chaos = exports.chaos = {};

  function randomColor() {
    return new Color(Math.floor(Math.random() * (256 - 0)) + 0, Math.floor(Math.random() * (256 - 0)) + 0, Math.floor(Math.random() * (256 - 0)) + 0);
  }

  function processTurtle(turtle, program) {
    var phono = function phono(stack) {
      return function (output) {
        return function (turtle_1) {
          return function (_arg1) {
            var $target4 = function $target4() {
              var $target3 = function $target3() {
                throw ["/Users/alfonsogarciacaronunez/Documents/Github/Fable/samples/browser/lsystem/lsystem.fsx", 112, 38];
              };

              if (_arg1.tail != null) {
                if (_arg1.head.Case === "Pop") {
                  var t = _arg1.tail;
                  return phono(stack.tail)(output)(stack.head)(t);
                } else {
                  if (_arg1.head.Case === "DrawForward") {
                    var d = _arg1.head.Fields[0];
                    var t = _arg1.tail;
                    {
                      var rads = turtle_1.angle * (3.141592653589793 / 180);
                      var x = turtle_1.x + d * Math.cos(rads);
                      var y = turtle_1.y + d * Math.sin(rads);
                      var newTurtle = new LTurtle(turtle_1.angle, x, y, turtle_1.c);
                      var seg = new LineSegment(new Point(turtle_1.x, turtle_1.y), new Point(x, y), turtle_1.c);
                      return phono(stack)(_fableCore.List.ofArray([seg], output))(newTurtle)(t);
                    }
                  } else {
                    if (_arg1.head.Case === "Turn") {
                      var delta = _arg1.head.Fields[0];
                      var t = _arg1.tail;
                      {
                        var d = turtle_1.angle + delta;
                        var d_1 = (delta > 0 ? d > 360 : false) ? d - 360 : (delta < 0 ? d < 0 : false) ? 360 + d : d;
                        return phono(stack)(output)(new LTurtle(d_1, turtle_1.x, turtle_1.y, turtle_1.c))(t);
                      }
                    } else {
                      return $target3();
                    }
                  }
                }
              } else {
                return $target3();
              }
            };

            if (_arg1.tail != null) {
              if (_arg1.head.Case === "RandomColor") {
                var t = _arg1.tail;
                return phono(stack)(output)(function () {
                  var c = randomColor();
                  return new LTurtle(turtle_1.angle, turtle_1.x, turtle_1.y, c);
                }())(t);
              } else {
                if (_arg1.head.Case === "Push") {
                  var t = _arg1.tail;
                  return phono(_fableCore.List.ofArray([turtle_1], stack))(output)(turtle_1)(t);
                } else {
                  if (_arg1.head.Case === "Pop") {
                    if (function () {
                      var t = _arg1.tail;
                      return stack.tail == null;
                    }()) {
                      var t = _arg1.tail;
                      return phono(stack)(output)(turtle_1)(t);
                    } else {
                      return $target4();
                    }
                  } else {
                    return $target4();
                  }
                }
              }
            } else {
              return output;
            }
          };
        };
      };
    };

    return _fableCore.List.reverse(phono(new _fableCore.List())(new _fableCore.List())(turtle)(program));
  }

  var LSystem = exports.LSystem = function LSystem(axiom, productions) {
    _classCallCheck(this, LSystem);

    this.Axiom = axiom;
    this.Productions = productions;
  };

  _fableCore.Util.setInterfaces(LSystem.prototype, ["FSharpRecord"], "Lsystem.LSystem");

  function processLsystem(max, lsystem) {
    var gen = function gen(current) {
      return function (iteration) {
        return iteration === max ? current : function () {
          var sb = [];
          {
            var arr = current.split("");

            for (var idx = 0; idx <= arr.length - 1; idx++) {
              var x = arr[idx];

              ___1_push.bind(sb)(lsystem.Productions(x));
            }
          }
          return gen(___1_join.bind(sb)(""))(iteration + 1);
        }();
      };
    };

    return gen(lsystem.Axiom)(0);
  }

  var defaultLength = exports.defaultLength = 10;

  function convertToTurtle(angle, lSystemString) {
    var defaultAngle = 1 * angle;
    return _fableCore.Seq.toList(lSystemString.split("").map(function (_arg1) {
      return _arg1 === "!" ? new LogoCommand("RandomColor", []) : _arg1 === "+" ? new LogoCommand("Turn", [defaultAngle]) : _arg1 === "-" ? new LogoCommand("Turn", [-defaultAngle]) : _arg1 === "[" ? new LogoCommand("Push", []) : _arg1 === "]" ? new LogoCommand("Pop", []) : new LogoCommand("DrawForward", [defaultLength]);
    }));
  }

  function error(msg) {
    (0, _html.renderTo)(document.getElementById("errors"), function (arg0) {
      return function (arg1) {
        return _html.El.op_Dynamic(arg0, arg1);
      };
    }(_html.h)("p")(new _fableCore.List())(_fableCore.List.ofArray([function (arg0) {
      return function (arg1) {
        return _html.El.op_Dynamic(arg0, arg1);
      };
    }(_html.h)("strong")(new _fableCore.List())(_fableCore.List.ofArray([(0, _html.text)("Error: ")])), (0, _html.text)(msg)])));
  }

  function parse(s) {
    (0, _html.renderTo)(document.getElementById("errors"), function (arg0) {
      return function (arg1) {
        return _html.El.op_Dynamic(arg0, arg1);
      };
    }(_html.h)("div")(new _fableCore.List())(new _fableCore.List()));

    var patternInput = _fableCore.Array.partition(function (s_1) {
      return s_1.indexOf("->") >= 0;
    }, _fableCore.String.trim(s, "both").split("\n"));

    var prods = patternInput[0];
    var ax = patternInput[1];
    var axiom = ax.length !== 1 ? function () {
      error("There should be exactly one axiom");
      return "A";
    }() : _fableCore.String.trim(ax[0], "both");
    var prods_1 = prods.map(function (s_1) {
      var i = s_1.indexOf("->");

      var c = _fableCore.String.trim(s_1.substr(0, i), "both");

      var c_1 = c.length === 1 ? c.split("")[0] : function () {
        error("Production rule should have one thing on the left");
        return "A";
      }();

      var t = _fableCore.String.trim(s_1.substr(i + 2), "both");

      return [c_1, t];
    });
    return new LSystem(axiom, function (c) {
      var matchValue = _fableCore.Seq.tryFind(function (tupledArg) {
        var k = tupledArg[0];
        var _arg1 = tupledArg[1];
        return k === c;
      }, prods_1);

      if (matchValue != null) {
        var r = matchValue[1];
        return r;
      } else {
        return c;
      }
    });
  }

  var cont = exports.cont = document.getElementById("output");
  var input = exports.input = document.getElementById("input");
  var iters = exports.iters = document.getElementById("iterations");
  var angle = exports.angle = document.getElementById("angle");
  var width = exports.width = document.getElementById("width");
  var turtle = exports.turtle = new LTurtle(0, 0, 0, new Color(255, 0, 0));

  function run() {
    (function (dom) {
      (0, _html.renderTo)(cont, dom);
    })(render(Number.parseInt(width.value), function (program) {
      return processTurtle(turtle, program);
    }(convertToTurtle(Number.parseFloat(angle.value), processLsystem(Number.parseInt(iters.value), parse(input.value))))));
  }

  input.addEventListener('keyup', function (_arg1) {
    run();
    return null;
  }, null);
  iters.addEventListener('change', function (_arg2) {
    run();
    return null;
  }, null);
  angle.addEventListener('change', function (_arg3) {
    run();
    return null;
  }, null);
  width.addEventListener('change', function (_arg4) {
    run();
    return null;
  }, null);
  run();
});
//# sourceMappingURL=lsystem.js.map