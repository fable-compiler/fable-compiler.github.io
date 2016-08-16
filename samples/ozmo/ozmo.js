define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shrink = exports.grow = exports.Blob = exports.ctx = exports.canvas = exports.atmosHeight = exports.floorHeight = exports.height = exports.width = exports.Keyboard = undefined;
  exports.drawGrd = drawGrd;
  exports.drawBg = drawBg;
  exports.drawText = drawText;
  exports.drawBlob = drawBlob;
  exports.direct = direct;
  exports.gravity = gravity;
  exports.bounce = bounce;
  exports.move = move;
  exports.step = step;
  exports.collide = collide;
  exports.absorb = absorb;
  exports.newDrop = newDrop;
  exports.newGrow = newGrow;
  exports.newShrink = newShrink;
  exports.updateDrops = updateDrops;
  exports.countDrops = countDrops;
  exports.game = game;
  exports.completed = completed;
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

    var arrows = $exports.arrows = function arrows() {
      return [code(39) - code(37), code(38) - code(40)];
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

    var init = $exports.init = function init() {
      window.addEventListener('keydown', function (e) {
        return update(e, true);
      }, null);
      window.addEventListener('keyup', function (e) {
        return update(e, false);
      }, null);
    };

    return $exports;
  }({});

  var width = exports.width = 900;
  var height = exports.height = 668;
  var floorHeight = exports.floorHeight = 100;
  var atmosHeight = exports.atmosHeight = 300;
  Keyboard.init();
  var canvas = exports.canvas = document.getElementsByTagName('canvas')[0];
  var ctx = exports.ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  function drawGrd(ctx_1, canvas_1, y0, y1, c0, c1) {
    var grd = ctx_1.createLinearGradient(0, y0, 0, y1);
    grd.addColorStop(0, c0);
    grd.addColorStop(1, c1);
    ctx_1.fillStyle = grd;
    ctx_1.fillRect(0, y0, canvas_1.width, y1 - y0);
  }

  function drawBg(ctx_1, canvas_1) {
    drawGrd(ctx_1, canvas_1, 0, atmosHeight, "yellow", "orange");
    drawGrd(ctx_1, canvas_1, atmosHeight, canvas_1.height - floorHeight, "grey", "white");
    ctx_1.fillStyle = "black";
    ctx_1.fillRect(0, canvas_1.height - floorHeight, canvas_1.width, floorHeight);
  }

  function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "bold 40pt";
    ctx.fillText(text, x, y);
  }

  var Blob = exports.Blob = function () {
    function Blob(x, y, vx, vy, radius, color) {
      _classCallCheck(this, Blob);

      this.X = x;
      this.Y = y;
      this.vx = vx;
      this.vy = vy;
      this.Radius = radius;
      this.color = color;
    }

    _createClass(Blob, [{
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

    return Blob;
  }();

  _fableCore.Util.setInterfaces(Blob.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ozmo.Blob");

  function drawBlob(ctx_1, canvas_1, blob) {
    ctx_1.beginPath();
    ctx_1.arc(blob.X, canvas_1.height - (blob.Y + floorHeight + blob.Radius), blob.Radius, 0, 2 * 3.141592653589793, false);
    ctx_1.fillStyle = blob.color;
    ctx_1.fill();
    ctx_1.lineWidth = 3;
    ctx_1.strokeStyle = blob.color;
    ctx_1.stroke();
  }

  function direct(dx, dy, blob) {
    var vx = blob.vx + dx / 4;
    return new Blob(blob.X, blob.Y, vx, blob.vy, blob.Radius, blob.color);
  }

  function gravity(blob) {
    return blob.Y > 0 ? function () {
      var vy = blob.vy - 0.1;
      return new Blob(blob.X, blob.Y, blob.vx, vy, blob.Radius, blob.color);
    }() : blob;
  }

  function bounce(blob) {
    var n = width;

    if (blob.X < 0) {
      var X = -blob.X;
      var vx = -blob.vx;
      return new Blob(X, blob.Y, vx, blob.vy, blob.Radius, blob.color);
    } else {
      if (blob.X > n) {
        var X = n - (blob.X - n);
        var vx = -blob.vx;
        return new Blob(X, blob.Y, vx, blob.vy, blob.Radius, blob.color);
      } else {
        return blob;
      }
    }
  }

  function move(blob) {
    return new Blob(blob.X + blob.vx, 0 > blob.Y + blob.vy ? 0 : blob.Y + blob.vy, blob.vx, blob.vy, blob.Radius, blob.color);
  }

  function step(dir_0, dir_1, blob) {
    var dir = [dir_0, dir_1];
    return bounce(move(direct(dir[0], dir[1], blob)));
  }

  function collide(a, b) {
    var dx = (a.X - b.X) * (a.X - b.X);
    var dy = (a.Y - b.Y) * (a.Y - b.Y);
    var dist = Math.sqrt(dx + dy);
    return dist < Math.abs(a.Radius - b.Radius);
  }

  function absorb(blob, drops) {
    return _fableCore.List.filter(function (drop) {
      return !collide(blob, drop);
    }, drops);
  }

  var grow = exports.grow = "black";
  var shrink = exports.shrink = "white";

  function newDrop(color) {
    var X = Math.random() * width * 0.8 + width * 0.1;
    var Y = 600;
    var Radius = 10;
    return new Blob(X, Y, 0, 0, Radius, color);
  }

  function newGrow() {
    return newDrop(grow);
  }

  function newShrink() {
    return newDrop(shrink);
  }

  function updateDrops(drops, countdown) {
    return countdown > 0 ? [drops, countdown - 1] : Math.floor(Math.random() * 8) === 0 ? function () {
      var drop = Math.floor(Math.random() * 3) === 0 ? newGrow() : newShrink();
      return [_fableCore.List.ofArray([drop], drops), 8];
    }() : [drops, countdown];
  }

  function countDrops(drops) {
    var count = function count(color) {
      return _fableCore.List.filter(function (drop) {
        return drop.color === color;
      }, drops).length;
    };

    return [count(grow), count(shrink)];
  }

  function game() {
    return function (builder_) {
      return builder_.Delay(function (unitVar) {
        var blob = function () {
          var X = 300;
          var Y = 0;
          var Radius = 50;
          return new Blob(X, Y, 0, 0, Radius, "black");
        }();

        return builder_.ReturnFrom(update(blob, _fableCore.List.ofArray([newGrow()]), 0));
      });
    }(_fableCore.defaultAsyncBuilder);
  }

  function completed() {
    return function (builder_) {
      return builder_.Delay(function (unitVar) {
        drawText("COMPLETED", 320, 300);
        return builder_.Bind(_fableCore.Async.sleep(10000), function (_arg1) {
          return builder_.ReturnFrom(game());
        });
      });
    }(_fableCore.defaultAsyncBuilder);
  }

  function update(blob, drops, countdown) {
    return function (builder_) {
      return builder_.Delay(function (unitVar) {
        var patternInput = updateDrops(drops, countdown);
        var drops_1 = patternInput[0];
        var countdown_1 = patternInput[1];
        var patternInput_1 = countDrops(drops_1);
        var beforeShrink = patternInput_1[1];
        var beforeGrow = patternInput_1[0];

        var drops_2 = function (drops_2) {
          return absorb(blob, drops_2);
        }(_fableCore.List.map(function ($var1) {
          return move(gravity($var1));
        }, drops_1));

        var patternInput_2 = countDrops(drops_2);
        var afterShrink = patternInput_2[1];
        var afterGrow = patternInput_2[0];

        var drops_3 = _fableCore.List.filter(function (blob_1) {
          return blob_1.Y > 0;
        }, drops_2);

        var radius = blob.Radius + (beforeGrow - afterGrow) * 4;
        var radius_1 = radius - (beforeShrink - afterShrink) * 4;
        var radius_2 = 5 > radius_1 ? 5 : radius_1;
        var blob_1 = new Blob(blob.X, blob.Y, blob.vx, blob.vy, radius_2, blob.color);

        var blob_2 = function () {
          var tupledArg = Keyboard.arrows();
          var arg00_ = tupledArg[0];
          var arg01_ = tupledArg[1];
          return function (blob_2) {
            return step(arg00_, arg01_, blob_2);
          };
        }()(blob_1);

        drawBg(ctx, canvas);
        return builder_.Combine(builder_.For(drops_3, function (_arg2) {
          var drop = _arg2;
          drawBlob(ctx, canvas, drop);
          return builder_.Zero();
        }), builder_.Delay(function (unitVar_1) {
          drawBlob(ctx, canvas, blob_2);

          if (blob_2.Radius > 150) {
            return builder_.ReturnFrom(completed());
          } else {
            return builder_.Bind(_fableCore.Async.sleep(Math.floor(1000 / 60)), function (_arg3) {
              return builder_.ReturnFrom(update(blob_2, drops_3, countdown_1));
            });
          }
        }));
      });
    }(_fableCore.defaultAsyncBuilder);
  }

  (function (arg00) {
    _fableCore.Async.startImmediate(arg00);
  })(game());
});
//# sourceMappingURL=ozmo.js.map