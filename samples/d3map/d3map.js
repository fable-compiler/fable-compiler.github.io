define(["exports", "queue", "topojson", "d3", "fable-core"], function (exports, _queue, _topojson, _d, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.title = exports.path = exports.projection = exports.ctx = exports.canvas = exports.height = exports.width = exports.topojson = exports.queue = undefined;
  exports.dataLoaded = dataLoaded;

  var _queue2 = _interopRequireDefault(_queue);

  var topojson_1 = _interopRequireWildcard(_topojson);

  var d3 = _interopRequireWildcard(_d);

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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var queue = exports.queue = _queue2.default;
  var topojson = exports.topojson = topojson_1;
  var patternInput_52 = [500, 500];
  var width = exports.width = patternInput_52[0];
  var height = exports.height = patternInput_52[1];
  var canvas = exports.canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = width;
  canvas.height = height;
  var ctx = exports.ctx = canvas.getContext('2d');

  var projection = exports.projection = _d.geo.orthographic().translate([width / 2, height / 2]).scale(width / 2 - 20).clipAngle(90).precision(0.6);

  var path = exports.path = _d.geo.path().projection(projection).context(ctx);

  var title = exports.title = d3.select(".country-name");

  function dataLoaded(world, names) {
    var globe = {
      type: "Sphere"
    };
    var landFeature = topojson.feature(world, world.objects.land);
    var borders = topojson.mesh(world, world.objects.countries, function (x, y) {
      return x !== y;
    });
    var countries = Array.from(_fableCore.Seq.sortWith(function (a, b) {
      return _fableCore.Util.compare(_fableCore.Util.toString(a.name), _fableCore.Util.toString(b.name));
    }, topojson.feature(world, world.objects.countries).features.filter(function (d) {
      return _fableCore.Seq.exists(function (n) {
        return _fableCore.Util.toString(d.id) === _fableCore.Util.toString(n.id) ? function () {
          d.name = n.name;
          return true;
        }() : false;
      }, names);
    })));

    var draw = function draw(color) {
      return function (width_1) {
        return function (line) {
          return function (fill) {
            if (fill) {
              ctx.fillStyle = color;
            } else {
              ctx.strokeStyle = color;
            }

            ctx.lineWidth = width_1;
            ctx.beginPath();
            path(line);

            if (fill) {
              ctx.fill();
            } else {
              ctx.stroke();
            }
          };
        };
      };
    };

    var render = function render(country) {
      return function (angle) {
        projection.rotate(angle);
        ctx.clearRect(0, 0, width, height);
        draw("#ACA2AD")(0)(landFeature)(true);
        draw("#9E4078")(0)(country)(true);
        draw("#EAF1F7")(0.5)(borders)(false);
        draw("#726B72")(2)(globe)(false);
        return null;
      };
    };

    var transition = function transition(i) {
      return d3.transition().duration(1250).each("start", function (_arg2, _arg1) {
        var name = countries[i].name;
        return title.text(name);
      }).tween("rotate", function (_arg3) {
        var patternInput = _d.geo.centroid(countries[i]);

        var r = d3.interpolate(projection.rotate(), [-patternInput[0], -patternInput[1]]);
        return function (t) {
          return render(countries[i])(r(t));
        };
      }).transition().each("end", function (_arg5, _arg4) {
        return transition((i + 1) % countries.length);
      });
    };

    return transition(0);
  }

  queue().defer(function (url, callback) {
    return d3.json(url, callback);
  }, "data/world-110m.json").defer(d3.tsv, "data/world-country-names.tsv").await(function (error, world, names) {
    if (error) {
      throw error;
    }

    return dataLoaded(world, names);
  });
});
//# sourceMappingURL=d3map.js.map