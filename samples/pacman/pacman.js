define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pacman = exports.Keyboard = exports.route_home = exports.Ghost = exports.tileChars = exports.tileColors = exports.blank = exports.tileBits = exports.maze = exports.Images = undefined;
  exports.createImage = createImage;
  exports.isWall = isWall;
  exports.tileAt = tileAt;
  exports.isWallAt = isWallAt;
  exports.verticallyAligned = verticallyAligned;
  exports.horizontallyAligned = horizontallyAligned;
  exports.isAligned = isAligned;
  exports.noWall = noWall;
  exports.canGoUp = canGoUp;
  exports.canGoDown = canGoDown;
  exports.canGoLeft = canGoLeft;
  exports.canGoRight = canGoRight;
  exports.toTile = toTile;
  exports.draw = draw;
  exports.createBrush = createBrush;
  exports.createBackground = createBackground;
  exports.clearCell = clearCell;
  exports.wrap = wrap;
  exports.createGhosts = createGhosts;
  exports.flood = flood;
  exports.fillValue = fillValue;
  exports.fillUp = fillUp;
  exports.fillDown = fillDown;
  exports.fillLeft = fillLeft;
  exports.fillRight = fillRight;
  exports.chooseDirection = chooseDirection;
  exports.countDots = countDots;
  exports.playLevel = playLevel;
  exports.game = game;

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

  var Images = exports.Images = function ($exports) {
    var cyand = $exports.cyand = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAiUlEQVQoU8WSURKAIAhE8Sh6Fc/tVfQoJdqiMDTVV4wfufAAmw3kxEHUz4pA1I8OJVjAKZZ6+XiC0ATTB/gW2mEFtlpHLqaktrQ6TxUQSRCAPX2AWPMLyM0VmPOcV8palxt6uoAMpDjfWJt+o6cr0DPDnfYjyL94NwIcYjXcR/FuYklcxrZ3OO0Ep4dJ/3dR5jcAAAAASUVORK5CYII=";
    var oranged = $exports.oranged = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAgklEQVQoU8WS0RGAIAxDZRRYhblZBUZBsBSaUk/9kj9CXlru4g7r1FxBdsFpGwoa2NwrYIFPEIeM6QS+hQQMYC70EjzuuOlt6gT5kRGGTf0Cx5qfwJYOYIw0L6W1bg+09Al2wAcCS8Y/WjqAZhluxD/B3ghZBO6n1sadzLLEbNSg8pzXIVLvbNvPwAAAAABJRU5ErkJggg==";
    var pinkd = $exports.pinkd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAj0lEQVQoU8WSsRWAIAxEZRQpXITGVZzIVWxYxAJHwRfwMInxqZV0XPIvgXeuM05eUuayG73TbULQwKWZGTTwCYIJphfwLcRhAW5DLfWrXFLrNLWBKAIBbOkFxJpfQDIXYAh1XoznumRo6Q0kwE8VTLN8o6UL0ArDnfYjSF/Mg4CEaA330sxD3ApHLvUdSdsBdgNkr9L8gxYAAAAASUVORK5CYII=";
    var redd = $exports.redd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAkklEQVQoU8WSvRWAIAyEZRQtXIRCV3EiVtGCRSx0FHxBD5MYn1pJl0u+/PDOVcZLY5e47PrJ6TIhaOBSzBoU8AlCE0zP4FuIwwJc25Bz9TyILbVOUwuIJAjAlp5BrPkFpOYC9H6fF+O5LjW09AIS0Az7jUuQN1q6AC0z3Gk/gvTF3AhwiNYQ52Ju4pI4fKljOG0DA3tp97vN6C8AAAAASUVORK5CYII=";
    var pu1 = $exports.pu1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAWElEQVQoU62SUQoAIAhD9f6HNiYYolYi9VfzuXIxDRYbI0LCTHsfe3ldi3BgRRUY9Rnku1Rupf4NgiPeVjVU7STckphBceSvrHHtNPI21HWz4NO3eUUAgwVpmjX/zwK8KQAAAABJRU5ErkJggg==";
    var pu2 = $exports.pu2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAW0lEQVQoU8WSwQoAIAhD9f8/2lIwdKRIl7o1e010THBESJiJXca76qnoDxFC3SD9LRpWkLnsLt4gdImtlLX/EK4iDapqr4VuI2+BauQjaOrmSz8xillDp5gQrS054jv/0fkNVAAAAABJRU5ErkJggg==";
    var pd1 = $exports.pd1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAXElEQVQoU62SUQoAIAhD9f6HNgyMWpMs6k/XU5mqwDMTw5yq6JwbAfucwR2qAFHAu75BN11Gt6+Qz54VpMJsMV3BaS9UR8txkUzfLC9DUY0BYbOPGfpyU3g2WdwAOvU1/9KZsT4AAAAASUVORK5CYII=";
    var pd2 = $exports.pd2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAU0lEQVQoU62SUQoAIAhD9f6HNgwUGw4s6q/pc6KqwDMTQ01VtGr56ZIZvKEJEAXc9Q26cUm3r5D3zgrywHeoG3ldJrZIRz6C0I1BoR83FTBCeHsLIlw7/wOkQycAAAAASUVORK5CYII=";
    var pl1 = $exports.pl1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAVUlEQVQoU62S2woAIAhD9f8/2jAwvGRMyDfF49iQKZUISZ4xE/vZaW7LHbwhBLADqjpSUjBAdglRDQa9hxfcQi+vf5RGnpDlkB4KlMgR0N6pBIH83gIPFCb/N+MLCwAAAABJRU5ErkJggg==";
    var pl2 = $exports.pl2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAUklEQVQoU52SUQoAIAhD3f0PbRQoZgnT/hyttYeQdFRFswYIoubD73JlPibGYA/s1Jmpk+JpDIinWxbiXP3iQslCwbhTxzhHbsWZNFsnCkTevQW2bCb/VRTuVwAAAABJRU5ErkJggg==";
    var pr1 = $exports.pr1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAWElEQVQoU52S4Q4AIASE3fs/tKalSTHyL/O5CyAXzMQ+BxBsbj9exRE8oQqgDUS1BalNVFSuP2WQL94WIygCBEzttZWOvbz2VBnGtLXg1sgV/L8I679yewN9sScO5wcxLQAAAABJRU5ErkJggg==";
    var pr2 = $exports.pr2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAVElEQVQoU62SWwoAIAgE9f6HNgqU3BK2R3+J48KoCjwzMaypis61+OyaK3hADOADeuoddJISaQy0iKggbEz2viah7mVPTNq7cp/ApLmcdFPVdaDJBnWdJwjk629HAAAAAElFTkSuQmCC";
    var blue = $exports.blue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAeklEQVQoU62S0Q3AIAhEyyi6UcfoRB2jG+koNkeCoVcaTaw/huMeEkS24KTUmpdrFWHbQ2CAzb5AB0eQFTFYwVnIw/+B5by0cD52vTmGhnaF25wBAb/A6HsibR0ctch5fRHi1zCigvCut4oR+wnbhrBmsZr9DlqCQfbcnfZjDyiZqCEAAAAASUVORK5CYII=";
    var eyed = $exports.eyed = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAUElEQVQoU2NkIBMwkqmPYYA13rt37z/I6UpKSiguwSYOVwCThPkZphmXOHU0OjtD7Nu7F+FckI3YxFH8oqgI8eP9+6h+xCY+wNFBSiqiv1MBDgYsD185vj8AAAAASUVORK5CYII=";

    var _200 = $exports._200 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAS0lEQVQoU2NkIBMwkqmPYYA0vpVR+Q9zsvCTO4yE+CC1KE4FaYBpxEfDNWKzgWiNIIUw5xKyGa+N+PyM4UdS4nSA4pEUJ8LUku1UAMC0VA8iscBNAAAAAElFTkSuQmCC";

    var _400 = $exports._400 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAASElEQVQoU2NkIBMwkqmPYYA0vpVR+S/85A4jMg3zAkwcmQ9ig52KTSO6Qch8FI3oNhClEaaJWJvhNmLTSJQfyYnLAYpHujoVAChTXA9pVJi5AAAAAElFTkSuQmCC";

    var _800 = $exports._800 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAQElEQVQoU2NkIBMwkqmPYYA0vpVR+Q9zsvCTO4yE+CC1YKeCFMI0EEOjaES3EZ8BtLERn5/hNpITlwMUj3R1KgCe5lwPHtUmcwAAAABJRU5ErkJggg==";

    var _1600 = $exports._1600 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAQ0lEQVQoU2NkIBMwkqmPYQA0vpVR+S/85A4jiIY5mxg+WANMIYiGaUYXR+ejaES3EdlAvBrxKSTJRnx+HoDoGDopBwDHLGwPAhDgRQAAAABJRU5ErkJggg==";

    return $exports;
  }({});

  function createImage(data) {
    var img = document.createElement('img');
    img.src = data;
    return img;
  }

  var maze = exports.maze = "##/------------7/------------7##,##|............|!............|##,##|./__7./___7.|!./___7./__7.|##,##|o|  !.|   !.|!.|   !.|  !o|##,##|.L--J.L---J.LJ.L---J.L--J.|##,##|..........................|##,##|./__7./7./______7./7./__7.|##,##|.L--J.|!.L--7/--J.|!.L--J.|##,##|......|!....|!....|!......|##,##L____7.|L__7 |! /__J!./____J##,#######!.|/--J LJ L--7!.|#######,#######!.|!          |!.|#######,#######!.|! /__==__7 |!.|#######,-------J.LJ |      ! LJ.L-------,########.   | **** !   .########,_______7./7 |      ! /7./_______,#######!.|! L______J |!.|#######,#######!.|!          |!.|#######,#######!.|! /______7 |!.|#######,##/----J.LJ L--7/--J LJ.L----7##,##|............|!............|##,##|./__7./___7.|!./___7./__7.|##,##|.L-7!.L---J.LJ.L---J.|/-J.|##,##|o..|!.......<>.......|!..o|##,##L_7.|!./7./______7./7.|!./_J##,##/-J.LJ.|!.L--7/--J.|!.LJ.L-7##,##|......|!....|!....|!......|##,##|./____JL__7.|!./__JL____7.|##,##|.L--------J.LJ.L--------J.|##,##|..........................|##,##L--------------------------J##".split(",");
  var tileBits = exports.tileBits = [new Int32Array([0, 0, 0, 0, 3, 4, 8, 8]), new Int32Array([0, 0, 0, 0, 255, 0, 0, 0]), new Int32Array([0, 0, 0, 0, 192, 32, 16, 16]), new Int32Array([8, 8, 8, 8, 8, 8, 8, 8]), new Int32Array([16, 16, 16, 16, 16, 16, 16, 16]), new Int32Array([8, 8, 4, 3, 0, 0, 0, 0]), new Int32Array([0, 0, 0, 255, 0, 0, 0, 0]), new Int32Array([16, 16, 32, 192, 0, 0, 0, 0]), new Int32Array([0, 0, 0, 0, 255, 0, 0, 0]), new Int32Array([0, 0, 0, 24, 24, 0, 0, 0]), new Int32Array([0, 24, 60, 126, 126, 60, 24, 0])];
  var blank = exports.blank = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0]);

  function isWall(c) {
    return "_|!/7LJ-".indexOf(c) !== -1;
  }

  function tileAt(x, y) {
    return (x < 0 ? true : x > 30) ? " " : maze[y][x];
  }

  function isWallAt(x, y) {
    return isWall(tileAt(x, y));
  }

  function verticallyAligned(x, y) {
    return x % 8 === 5;
  }

  function horizontallyAligned(x, y) {
    return y % 8 === 5;
  }

  function isAligned(n) {
    return n % 8 === 5;
  }

  function noWall(x, y, ex, ey) {
    var patternInput = [x + 6 + ex >> 3, y + 6 + ey >> 3];
    var by = patternInput[1];
    var bx = patternInput[0];
    return !isWallAt(bx, by);
  }

  function canGoUp(x, y) {
    return isAligned(x) ? noWall(x, y, 0, -4) : false;
  }

  function canGoDown(x, y) {
    return isAligned(x) ? noWall(x, y, 0, 5) : false;
  }

  function canGoLeft(x, y) {
    return isAligned(y) ? noWall(x, y, -4, 0) : false;
  }

  function canGoRight(x, y) {
    return isAligned(y) ? noWall(x, y, 5, 0) : false;
  }

  var tileColors = exports.tileColors = "BBBBBBBBBYY";
  var tileChars = exports.tileChars = "/_7|!L-J=.o";

  function toTile(c) {
    var i = tileChars.indexOf(c);

    if (i === -1) {
      return [blank, "B"];
    } else {
      return [tileBits[i], tileColors[i]];
    }
  }

  function draw(f, lines) {
    var width = 8;

    _fableCore.Seq.iterateIndexed(function (y, line) {
      for (var x = 0; x <= width - 1; x++) {
        var bit = 1 << width - 1 - x;
        var pattern = line & bit;

        if (pattern !== 0) {
          f([x, y]);
        }
      }
    }, lines);
  }

  function createBrush(context, r, g, b, a) {
    var id = context.createImageData(1, 1);
    var d = id.data;
    d[0] = r;
    d[1] = g;
    d[2] = b;
    d[3] = a;
    return id;
  }

  function createBackground() {
    var background = document.createElement('canvas');
    background.width = 256;
    background.height = 256;
    var context = background.getContext('2d');
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, 256, 256);
    var blue = createBrush(context, 63, 63, 255, 255);
    var yellow = createBrush(context, 255, 255, 0, 255);
    var lines = maze;

    for (var y = 0; y <= lines.length - 1; y++) {
      var line = lines[y];

      for (var x = 0; x <= line.length - 1; x++) {
        var c = line[x];
        var patternInput = toTile(c);
        var tile = patternInput[0];
        var color = patternInput[1];
        var brush = color === "Y" ? yellow : blue;

        var f = function f(tupledArg) {
          var x_ = tupledArg[0];
          var y_ = tupledArg[1];
          context.putImageData(brush, x * 8 + x_, y * 8 + y_);
        };

        draw(f, tile);
      }
    }

    return background;
  }

  function clearCell(background, x, y) {
    var context = background.getContext('2d');
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(x * 8, y * 8, 8, 8);
  }

  function wrap(x, y, dx, dy) {
    var x_1 = (dx === -1 ? x === 0 : false) ? 30 * 8 : (dx === 1 ? x === 30 * 8 : false) ? 0 : x;
    return [x_1 + dx, y + dy];
  }

  var Ghost = exports.Ghost = function () {
    function Ghost(image, x, y, v) {
      _classCallCheck(this, Ghost);

      this.x = x;
      this.y = y;
      this["x'"] = this.x;
      this["y'"] = this.y;
      this["v'"] = v;
      this["Image@"] = image;
      this["IsReturning@"] = false;
    }

    _createClass(Ghost, [{
      key: "Reset",
      value: function Reset() {
        this["x'"] = this.x;
        this["y'"] = this.y;
      }
    }, {
      key: "Move",
      value: function Move(v) {
        this["v'"] = v;
        var dy = v[1];
        var dx = v[0];
        var patternInput = wrap(this["x'"], this["y'"], dx, dy);
        var y = patternInput[1];
        var x = patternInput[0];
        this["x'"] = x;
        this["y'"] = y;
      }
    }, {
      key: "Image",
      get: function get() {
        return this["Image@"];
      }
    }, {
      key: "IsReturning",
      get: function get() {
        return this["IsReturning@"];
      },
      set: function set(v) {
        this["IsReturning@"] = v;
      }
    }, {
      key: "X",
      get: function get() {
        return this["x'"];
      }
    }, {
      key: "Y",
      get: function get() {
        return this["y'"];
      }
    }, {
      key: "V",
      get: function get() {
        return this["v'"];
      }
    }]);

    return Ghost;
  }();

  _fableCore.Util.setInterfaces(Ghost.prototype, [], "Pacman.Ghost");

  function createGhosts(context) {
    return [[Images.redd, [16, 11], [1, 0]], [Images.cyand, [14, 15], [1, 0]], [Images.pinkd, [16, 13], [0, -1]], [Images.oranged, [18, 15], [-1, 0]]].map(function (tupledArg) {
      var data = tupledArg[0];
      var _arg1 = tupledArg[1];
      var v = tupledArg[2];
      var y = _arg1[1];
      var x = _arg1[0];
      return new Ghost(createImage(data), x * 8 - 7, y * 8 - 3, v);
    });
  }

  function flood(canFill, fill, x, y) {
    var f = function f(n) {
      return function (_arg1) {
        if (_arg1.tail == null) {} else {
          var ps = _arg1;

          var ps_1 = _fableCore.List.filter(function (tupledArg) {
            var x_1 = tupledArg[0];
            var y_1 = tupledArg[1];
            return canFill([x_1, y_1]);
          }, ps);

          _fableCore.Seq.iterate(function (tupledArg) {
            var x_1 = tupledArg[0];
            var y_1 = tupledArg[1];
            fill([x_1, y_1, n]);
          }, ps_1);

          f(n + 1)(_fableCore.List.collect(function (tupledArg) {
            var x_1 = tupledArg[0];
            var y_1 = tupledArg[1];
            return _fableCore.List.ofArray([[x_1 - 1, y_1], [x_1 + 1, y_1], [x_1, y_1 - 1], [x_1, y_1 + 1]]);
          }, ps_1));
        }
      };
    };

    f(0)(_fableCore.List.ofArray([[x, y]]));
  }

  var route_home = exports.route_home = function () {
    var numbers = maze.map(function (line) {
      return Int32Array.from(_fableCore.Seq.map(function (c) {
        return isWall(c) ? 999 : -1;
      }, line.split("")));
    });

    var canFill = function canFill(tupledArg) {
      var x = tupledArg[0];
      var y = tupledArg[1];

      if (((y >= 0 ? y < numbers.length - 1 : false) ? x >= 0 : false) ? x < numbers[y].length - 1 : false) {
        return numbers[y][x] === -1;
      } else {
        return false;
      }
    };

    var fill = function fill(tupledArg) {
      var x = tupledArg[0];
      var y = tupledArg[1];
      var n = tupledArg[2];
      numbers[y][x] = n;
    };

    flood(canFill, fill, 16, 15);
    return numbers;
  }();

  function fillValue(x, y, ex, ey) {
    var bx = Math.floor(Math.floor(~~((x + 6 + ex) / 8)));
    var by = Math.floor(Math.floor(~~((y + 6 + ey) / 8)));
    return route_home[by][bx];
  }

  function fillUp(x, y) {
    return fillValue(x, y, 0, -4);
  }

  function fillDown(x, y) {
    return fillValue(x, y, 0, 5);
  }

  function fillLeft(x, y) {
    return fillValue(x, y, -4, 0);
  }

  function fillRight(x, y) {
    return fillValue(x, y, 5, 0);
  }

  function chooseDirection(ghost) {
    var patternInput = [ghost.X, ghost.Y];
    var y = patternInput[1];
    var x = patternInput[0];
    var patternInput_1 = ghost.V;
    var dy = patternInput_1[1];
    var dx = patternInput_1[0];

    var isBackwards = function isBackwards(tupledArg) {
      var a = tupledArg[0];
      var b = tupledArg[1];

      if (a !== 0 ? a === -dx : false) {
        return true;
      } else {
        if (b !== 0) {
          return b === -dy;
        } else {
          return false;
        }
      }
    };

    var directions = Array.from(_fableCore.Seq.delay(function (unitVar) {
      return _fableCore.Seq.append(canGoLeft(x, y) ? _fableCore.Seq.singleton([[-1, 0], fillLeft(x, y)]) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_1) {
        return _fableCore.Seq.append(canGoDown(x, y) ? _fableCore.Seq.singleton([[0, 1], fillDown(x, y)]) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_2) {
          return _fableCore.Seq.append(canGoRight(x, y) ? _fableCore.Seq.singleton([[1, 0], fillRight(x, y)]) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_3) {
            return canGoUp(x, y) ? _fableCore.Seq.singleton([[0, -1], fillUp(x, y)]) : _fableCore.Seq.empty();
          }));
        }));
      }));
    }));

    if (ghost.IsReturning) {
      var xs = Array.from(_fableCore.Seq.sortWith(function (x, y) {
        return _fableCore.Util.compare(function (tuple) {
          return tuple[1];
        }(x), function (tuple) {
          return tuple[1];
        }(y));
      }, directions));
      var patternInput_2 = xs[0];
      var v = patternInput_2[0];
      var n = patternInput_2[1];

      if (n === 0) {
        ghost.IsReturning = false;
      }

      return v;
    } else {
      var xs = directions.map(function (tuple) {
        return tuple[0];
      }).filter(function ($var1) {
        return function (value) {
          return !value;
        }(isBackwards($var1));
      });

      if (xs.length === 0) {
        return [0, 0];
      } else {
        var i = Math.random() * xs.length;
        return xs[Math.floor(Math.floor(i))];
      }
    }
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

    var reset = $exports.reset = function reset() {
      keysPressed = _fableCore.Set.create(null, new _fableCore.GenericComparer(function (x, y) {
        return x < y ? -1 : x > y ? 1 : 0;
      }));
    };

    var isPressed = $exports.isPressed = function isPressed(keyCode) {
      return keysPressed.has(keyCode);
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

  var Pacman = exports.Pacman = function ($exports) {
    var patternInput_396 = [createImage(Images.pu1), createImage(Images.pu2)];
    var pu2 = $exports.pu2 = patternInput_396[1];
    var pu1 = patternInput_396[0];
    var patternInput_398_1 = [createImage(Images.pd1), createImage(Images.pd2)];
    var pd2 = $exports.pd2 = patternInput_398_1[1];
    var pd1 = patternInput_398_1[0];
    var patternInput_400_2 = [createImage(Images.pl1), createImage(Images.pl2)];
    var pl2 = $exports.pl2 = patternInput_400_2[1];
    var pl1 = patternInput_400_2[0];
    var patternInput_402_3 = [createImage(Images.pr1), createImage(Images.pr2)];
    var pr2 = $exports.pr2 = patternInput_402_3[1];
    var pr1 = patternInput_402_3[0];
    var lastp = {
      contents: pr1
    };

    var imageAt = $exports.imageAt = function imageAt(x, y, v) {
      var patternInput = function () {
        var matchValue = v.contents;

        var $target4 = function $target4() {
          return [lastp.contents, lastp.contents];
        };

        if (matchValue[0] === -1) {
          if (matchValue[1] === 0) {
            return [pl1, pl2];
          } else {
            return $target4();
          }
        } else {
          if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
              return [pu1, pu2];
            } else {
              if (matchValue[1] === 1) {
                return [pd1, pd2];
              } else {
                return $target4();
              }
            }
          } else {
            if (matchValue[0] === 1) {
              if (matchValue[1] === 0) {
                return [pr1, pr2];
              } else {
                return $target4();
              }
            } else {
              return $target4();
            }
          }
        }
      }();

      var p2 = patternInput[1];
      var p1 = patternInput[0];
      var x_ = Math.floor(Math.floor(x.contents / 6));
      var y_ = Math.floor(Math.floor(y.contents / 6));
      var p = (x_ + y_) % 2 === 0 ? p1 : p2;
      lastp.contents = p;
      return p;
    };

    return $exports;
  }({});

  function countDots() {
    return _fableCore.Seq.sumBy(function (line) {
      return _fableCore.Seq.sumBy(function (_arg1) {
        return _arg1 === "." ? 1 : _arg1 === "o" ? 1 : 0;
      }, line.split(""));
    }, maze);
  }

  function playLevel(onLevelCompleted, onGameOver) {
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = 256;
    canvas.height = 256;
    var context = canvas.getContext('2d');
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, 256, 256);
    var bonusImages = [createImage(Images._200), createImage(Images._400), createImage(Images._800), createImage(Images._1600)];
    var background = createBackground();
    var ghosts = createGhosts(context);
    var patternInput = [createImage(Images.blue), createImage(Images.eyed)];
    var eyed = patternInput[1];
    var blue = patternInput[0];
    var pills = maze.map(function (line) {
      return line.split("").map(function (c) {
        return c;
      });
    });
    var dotsLeft = {
      contents: countDots()
    };
    var score = {
      contents: 0
    };
    var bonus = {
      contents: 0
    };
    var bonuses = {
      contents: new _fableCore.List()
    };
    var energy = {
      contents: 128
    };
    var flashCountdown = {
      contents: 0
    };
    var powerCountdown = {
      contents: 0
    };
    var patternInput_1 = [{
      contents: 16 * 8 - 7
    }, {
      contents: 23 * 8 - 3
    }];
    var y = patternInput_1[1];
    var x = patternInput_1[0];
    var v = {
      contents: [0, 0]
    };

    var moveGhosts = function moveGhosts(unitVar0) {
      ghosts.forEach(function (ghost) {
        ghost.Move(chooseDirection(ghost));
      });
    };

    var movePacman = function movePacman(unitVar0) {
      var inputs = Array.from(_fableCore.Seq.delay(function (unitVar) {
        return _fableCore.Seq.append(Keyboard.isPressed(81) ? _fableCore.Seq.singleton([canGoUp(x.contents, y.contents), [0, -1]]) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_1) {
          return _fableCore.Seq.append(Keyboard.isPressed(65) ? _fableCore.Seq.singleton([canGoDown(x.contents, y.contents), [0, 1]]) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_2) {
            return _fableCore.Seq.append(Keyboard.isPressed(90) ? _fableCore.Seq.singleton([canGoLeft(x.contents, y.contents), [-1, 0]]) : _fableCore.Seq.empty(), _fableCore.Seq.delay(function (unitVar_3) {
              return Keyboard.isPressed(88) ? _fableCore.Seq.singleton([canGoRight(x.contents, y.contents), [1, 0]]) : _fableCore.Seq.empty();
            }));
          }));
        }));
      }));

      var canGoForward = function () {
        var matchValue = v.contents;

        var $target4 = function $target4() {
          return false;
        };

        if (matchValue[0] === -1) {
          if (matchValue[1] === 0) {
            return canGoLeft(x.contents, y.contents);
          } else {
            return $target4();
          }
        } else {
          if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
              return canGoUp(x.contents, y.contents);
            } else {
              if (matchValue[1] === 1) {
                return canGoDown(x.contents, y.contents);
              } else {
                return $target4();
              }
            }
          } else {
            if (matchValue[0] === 1) {
              if (matchValue[1] === 0) {
                return canGoRight(x.contents, y.contents);
              } else {
                return $target4();
              }
            } else {
              return $target4();
            }
          }
        }
      }();

      var availableDirections = Array.from(_fableCore.Seq.sortWith(function (x, y) {
        return _fableCore.Util.compare(function (v_) {
          return _fableCore.Util.equals(v_, v.contents);
        }(x), function (v_) {
          return _fableCore.Util.equals(v_, v.contents);
        }(y));
      }, inputs.filter(function (tuple) {
        return tuple[0];
      }).map(function (tuple) {
        return tuple[1];
      })));

      if (availableDirections.length > 0) {
        v.contents = availableDirections[0];
      } else {
        if (inputs.length === 0 ? true : !canGoForward) {
          v.contents = [0, 0];
        }
      }

      var patternInput_2 = function () {
        var tupledArg = [x.contents, y.contents];
        var tupledArg_1 = v.contents;
        var x_1 = tupledArg[0];
        var y_1 = tupledArg[1];
        var dx = tupledArg_1[0];
        var dy = tupledArg_1[1];
        return wrap(x_1, y_1, dx, dy);
      }();

      var y_ = patternInput_2[1];
      var x_ = patternInput_2[0];
      x.contents = x_;
      y.contents = y_;
    };

    var eatPills = function eatPills(unitVar0) {
      var tx = Math.floor(Math.floor(~~((x.contents + 6) / 8)));
      var ty = Math.floor(Math.floor(~~((y.contents + 6) / 8)));
      var c = pills[ty][tx];

      if (c === ".") {
        pills[ty][tx] = " ";
        clearCell(background, tx, ty);
        score.contents = score.contents + 10;
        void dotsLeft.contents--;
        new Audio("./fx/Dot5.wav").play();
      }

      if (c === "o") {
        pills[ty][tx] = " ";
        clearCell(background, tx, ty);
        bonus.contents = 0;
        score.contents = score.contents + 50;
        powerCountdown.contents = 250;
        void dotsLeft.contents--;
        new Audio("./fx/Powerup.wav").play();
      }
    };

    var touchingGhosts = function touchingGhosts(unitVar0) {
      var patternInput_2 = [x.contents, y.contents];
      var py = patternInput_2[1];
      var px = patternInput_2[0];
      return ghosts.filter(function (ghost) {
        var patternInput_3 = [ghost.X, ghost.Y];
        var y_1 = patternInput_3[1];
        var x_1 = patternInput_3[0];

        if ((px >= x_1 ? px < x_1 + 13 : false) ? true : x_1 < px + 13 ? x_1 >= px : false) {
          if (py >= y_1 ? py < y_1 + 13 : false) {
            return true;
          } else {
            if (y_1 < py + 13) {
              return y_1 >= py;
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      });
    };

    var collisionDetection = function collisionDetection(unitVar0) {
      var touched = touchingGhosts();

      if (touched.length > 0) {
        if (powerCountdown.contents > 0) {
          touched.forEach(function (ghost) {
            if (!ghost.IsReturning) {
              new Audio("./fx/EatGhost.wav").play();
              ghost.IsReturning = true;
              var added = Math.floor(Math.pow(2, bonus.contents));
              score.contents = score.contents + added * 200;
              var image = bonusImages[bonus.contents];
              bonuses.contents = _fableCore.List.ofArray([[100, [image, ghost.X, ghost.Y]]], bonuses.contents);

              if (3 < bonus.contents + 1) {
                bonus.contents = 3;
              } else {
                bonus.contents = bonus.contents + 1;
              }
            }
          });
        } else {
          void energy.contents--;

          if (flashCountdown.contents === 0) {
            new Audio("./fx/Hurt.wav").play();
          }

          flashCountdown.contents = 30;
        }
      }

      if (flashCountdown.contents > 0) {
        void flashCountdown.contents--;
      }
    };

    var updateBonus = function updateBonus(unitVar0) {
      var patternInput_2 = _fableCore.List.partition(function ($var2) {
        return 0 === $var2[0];
      }, _fableCore.List.map(function (tupledArg) {
        var count = tupledArg[0];
        var x_1 = tupledArg[1];
        return [count - 1, x_1];
      }, bonuses.contents));

      var removals = patternInput_2[0];
      var remainders = patternInput_2[1];
      bonuses.contents = remainders;
    };

    var logic = function logic(unitVar0) {
      moveGhosts();
      movePacman();
      eatPills();

      if (powerCountdown.contents > 0) {
        void powerCountdown.contents--;
      }

      collisionDetection();
      updateBonus();
    };

    var renderPacman = function renderPacman(unitVar0) {
      var p = Pacman.imageAt(x, y, v);

      if ((flashCountdown.contents >> 1) % 2 === 0) {
        context.drawImage(p, x.contents, y.contents);
      }
    };

    var renderEnergy = function renderEnergy(unitVar0) {
      context.fillStyle = "yellow";
      context.fillRect(120, 250, energy.contents, 2);
    };

    var renderGhosts = function renderGhosts(unitVar0) {
      ghosts.forEach(function (ghost) {
        var image = ghost.IsReturning ? eyed : powerCountdown.contents === 0 ? ghost.Image : (powerCountdown.contents > 100 ? true : (powerCountdown.contents >> 3) % 2 !== 0) ? blue : ghost.Image;
        context.drawImage(image, ghost.X, ghost.Y);
      });
    };

    var renderScore = function renderScore(unitVar0) {
      context.fillStyle = "white";
      context.font = "bold 8px";
      context.fillText("Score " + function () {
        var copyOfStruct = score.contents;
        return _fableCore.Util.toString(copyOfStruct);
      }(), 0, 255);
    };

    var renderBonus = function renderBonus(unitVar0) {
      _fableCore.Seq.iterate(function (tupledArg) {
        var _arg1 = tupledArg[0];
        var _arg2 = tupledArg[1];
        var y_1 = _arg2[2];
        var x_1 = _arg2[1];
        var image = _arg2[0];
        context.drawImage(image, x_1, y_1);
      }, bonuses.contents);
    };

    var render = function render(unitVar0) {
      context.drawImage(background, 0, 0);
      renderScore();
      renderEnergy();
      renderPacman();
      renderGhosts();
      renderBonus();
    };

    var update = function update(unitVar0) {
      logic();
      render();

      if (dotsLeft.contents === 0) {
        onLevelCompleted();
      } else {
        if (energy.contents <= 0) {
          onGameOver();
        } else {
          window.setTimeout(update, 1000 / 60);
        }
      }
    };

    update();
  }

  function game() {
    Keyboard.reset();
    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');

    var drawText = function drawText(tupledArg) {
      var text = tupledArg[0];
      var x = tupledArg[1];
      var y = tupledArg[2];
      context.fillStyle = "white";
      context.font = "bold 8px";
      context.fillText(text, x, y);
    };

    var levelCompleted = function levelCompleted(unitVar0) {
      drawText(["COMPLETED", 96, 96]);
      window.setTimeout(function (unitVar0_1) {
        game();
      }, 5000);
    };

    var gameOver = function gameOver(unitVar0) {
      drawText(["GAME OVER", 96, 96]);
      window.setTimeout(function (unitVar0_1) {
        game();
      }, 5000);
    };

    var start = function start(unitVar0) {
      var background = createBackground();
      context.drawImage(background, 0, 0);
      context.fillStyle = "white";
      context.font = "bold 8px";
      drawText(["CLICK TO START", 88, 96]);

      canvas.onclick = function (e) {
        canvas.onclick = null;
        playLevel(levelCompleted, gameOver);
        return true;
      };
    };

    var canvas_1 = document.getElementsByTagName('canvas')[0];
    canvas_1.width = 256;
    canvas_1.height = 256;
    start();
  }

  Keyboard.init();
  game();
});
//# sourceMappingURL=pacman.js.map