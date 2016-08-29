define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mario = exports.h = exports.w = exports.Mario = exports.Win = exports.Keyboard = undefined;
  exports.max = max;
  exports.jump = jump;
  exports.gravity = gravity;
  exports.physics = physics;
  exports.walk = walk;
  exports.step = step;
  exports.render = render;
  exports.update = update;

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

  function max(a, b) {
    return _fableCore.Util.compare(a, b) > 0 ? a : b;
  }

  var Keyboard = exports.Keyboard = function ($exports) {
    var keysPressed = (Object.defineProperty($exports, 'keysPressed', {
      get: function get() {
        return keysPressed;
      },
      set: function set(x) {
        return keysPressed = x;
      }
    }), _fableCore.Set.create(null, new _fableCore.GenericComparer(function (x, y) {
      return x < y ? -1 : x > y ? 1 : 0;
    })));

    var code = $exports.code = function code(x) {
      return keysPressed.has(x) ? 1 : 0;
    };

    var update = $exports.update = function update(e, pressed) {
      var keyCode = Math.floor(e.keyCode);
      var op = pressed ? function (value) {
        return function (set) {
          return _fableCore.Set.add(value, set);
        };
      } : function (value) {
        return function (set) {
          return _fableCore.Set.remove(value, set);
        };
      };
      keysPressed = op(keyCode)(keysPressed);
      return null;
    };

    var arrows = $exports.arrows = function arrows() {
      return [code(39) - code(37), code(38) - code(40)];
    };

    var init = $exports.init = function init() {
      document.addEventListener('keydown', function (e) {
        return update(e, true);
      });
      document.addEventListener('keyup', function (e) {
        return update(e, false);
      });
    };

    return $exports;
  }({});

  var Win = exports.Win = function ($exports) {
    var canvas = $exports.canvas = document.getElementsByTagName('canvas')[0];
    var context = $exports.context = canvas.getContext('2d');

    var op_Dollar = $exports.op_Dollar = function op_Dollar(s, n) {
      return s + _fableCore.Util.toString(n);
    };

    var rgb = $exports.rgb = function rgb(r, g, b) {
      return op_Dollar(op_Dollar(op_Dollar(op_Dollar(op_Dollar(op_Dollar("rgb(", r), ","), g), ","), b), ")");
    };

    var filled = $exports.filled = function filled(color, rect_0, rect_1, rect_2, rect_3) {
      var rect = [rect_0, rect_1, rect_2, rect_3];
      var ctx = context;
      ctx.fillStyle = color;

      (function (tupledArg) {
        ctx.fillRect(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
      })(rect);
    };

    var position = $exports.position = function position(x, y, img) {
      img.style.left = _fableCore.Util.toString(x) + "px";

      img.style.top = function () {
        var copyOfStruct = canvas.offsetTop + y;
        return String(copyOfStruct);
      }() + "px";
    };

    var dimensions = $exports.dimensions = function dimensions() {
      return [canvas.width, canvas.height];
    };

    var image = $exports.image = function image(src) {
      var image = document.getElementsByTagName('img')[0];

      if (image.src.indexOf(src) === -1) {
        image.src = src;
      }

      return image;
    };

    return $exports;
  }({});

  var Mario = exports.Mario = function () {
    function Mario(x, y, vx, vy, dir) {
      _classCallCheck(this, Mario);

      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.dir = dir;
    }

    _createClass(Mario, [{
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

    return Mario;
  }();

  _fableCore.Util.setInterfaces(Mario.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Mario.Mario");

  function jump(_arg1, y, m) {
    return (y > 0 ? m.y === 0 : false) ? function () {
      var vy = 5;
      return new Mario(m.x, m.y, m.vx, vy, m.dir);
    }() : m;
  }

  function gravity(m) {
    return m.y > 0 ? function () {
      var vy = m.vy - 0.1;
      return new Mario(m.x, m.y, m.vx, vy, m.dir);
    }() : m;
  }

  function physics(m) {
    return new Mario(m.x + m.vx, max(0, m.y + m.vy), m.vx, m.vy, m.dir);
  }

  function walk(x, _arg1, m) {
    var dir = x < 0 ? "left" : x > 0 ? "right" : m.dir;
    var vx = x;
    return new Mario(m.x, m.y, vx, m.vy, dir);
  }

  function step(dir_0, dir_1, mario) {
    var dir = [dir_0, dir_1];
    return jump(dir[0], dir[1], gravity(walk(dir[0], dir[1], physics(mario))));
  }

  function render(w, h, mario) {
    (function () {
      var color = Win.rgb(174, 238, 238);
      return function (tupledArg) {
        Win.filled(color, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
      };
    })()([0, 0, w, h]);
    (function () {
      var color = Win.rgb(74, 163, 41);
      return function (tupledArg) {
        Win.filled(color, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
      };
    })()([0, h - 50, w, 50]);
    var verb = mario.y > 0 ? "jump" : mario.vx !== 0 ? "walk" : "stand";
    (function () {
      var tupledArg = [w / 2 - 16 + mario.x, h - 50 - 31 - mario.y];
      return function (img) {
        Win.position(tupledArg[0], tupledArg[1], img);
      };
    })()(Win.image("images/mario" + verb + mario.dir + ".gif"));
  }

  Keyboard.init();
  var patternInput_169 = Win.dimensions();
  var w = exports.w = patternInput_169[0];
  var h = exports.h = patternInput_169[1];

  function update(mario, unitVar1) {
    var mario_1 = function () {
      var tupledArg = Keyboard.arrows();
      return function (mario_1) {
        return step(tupledArg[0], tupledArg[1], mario_1);
      };
    }()(mario);

    render(w, h, mario_1);
    window.setTimeout(function (arg10_) {
      update(mario_1, arg10_);
    }, 1000 / 60);
  }

  var mario = exports.mario = new Mario(0, 0, 0, 0, "right");
  update(mario);
});
//# sourceMappingURL=mario.js.map