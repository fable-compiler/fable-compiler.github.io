define(["exports", "three"], function (exports, _three) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.camera = exports.controls = exports.renderer = exports.scene = exports.clock = exports.worldHalfDepth = exports.worldHalfWidth = exports.worldDepth = exports.worldWidth = undefined;
    exports.generateHeight = generateHeight;
    exports.generateTexture = generateTexture;
    exports.init = init;
    exports.render = render;
    exports.animate = animate;

    var three = _interopRequireWildcard(_three);

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

    var worldWidth = exports.worldWidth = 256;
    var worldDepth = exports.worldDepth = 256;
    var worldHalfWidth = exports.worldHalfWidth = ~~(worldWidth / 2);
    var worldHalfDepth = exports.worldHalfDepth = ~~(worldDepth / 2);
    var clock = exports.clock = new _three.Clock();

    function generateHeight(width, height) {
        var size = width * height;
        var data = new Float64Array(size);
        var perlin = ImprovedNoise();
        var quality = 1;
        var z = Math.random() * 100;

        for (var j = 0; j <= 3; j++) {
            for (var i = 0; i <= size - 1; i++) {
                var x = i % width;
                var y = ~~(i / width);
                var noise = perlin.noise(x / quality, y / quality, z) * quality * 1.75;
                data[i] = data[i] + Math.abs(noise);
            }

            quality = quality * 5;
        }

        return data;
    }

    function generateTexture(data, width, height) {
        var vector3 = new _three.Vector3(0, 0, 0);
        var sun = new _three.Vector3(1, 1, 1).normalize();
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.fillStyle = "#000";
        context.fillRect(0, 0, width, height);
        var image = context.getImageData(0, 0, canvas.width, canvas.height);
        var imageData = image.data;
        var i = 0;
        var j = 0;
        var l = Math.floor(imageData.length);

        while (i < l) {
            vector3.x = data[j - 2] - data[j + 2];
            vector3.y = 2;
            vector3.z = data[j - width * 2] - data[j + width * 2];
            vector3.normalize();
            var shade = vector3.dot(sun);
            imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
            imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
            imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
            i = i + 4;
            j = j + 1;
        }

        context.putImageData(image, 0, 0);
        var canvasScaled = document.createElement('canvas');
        canvasScaled.width = width * 4;
        canvasScaled.height = height * 4;
        var context_1 = canvasScaled.getContext('2d');
        context_1.scale(4, 4);
        context_1.drawImage(canvas, 0, 0);
        var image_1 = context_1.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
        var imageData_1 = image_1.data;
        var i_1 = 0;
        var l_1 = Math.floor(imageData_1.length);

        while (i_1 < l_1) {
            var v = ~~Math.floor(Math.random() * 5);
            imageData_1[i_1] = imageData_1[i_1] + v;
            imageData_1[i_1 + 1] = imageData_1[i_1 + 1] + v;
            imageData_1[i_1 + 2] = imageData_1[i_1 + 2] + v;
            i_1 = i_1 + 4;
        }

        context_1.putImageData(image_1, 0, 0);
        return canvasScaled;
    }

    function init() {
        var getWidth = function getWidth(unitVar0) {
            return 800;
        };

        var getHeight = function getHeight(unitVar0) {
            return 450;
        };

        var container = document.getElementById("container");
        var camera = new _three.PerspectiveCamera(60, getWidth() / getHeight(), 1, 20000);
        var scene = new _three.Scene();
        var renderer = new _three.WebGLRenderer();
        renderer.setClearColor("#bfd1e5");
        renderer.setSize(getWidth(), getHeight());
        var domElement = renderer.domElement;
        container.innerHTML = "";
        container.appendChild(domElement);
        var controls = new THREE.FirstPersonControls(camera, domElement);
        controls.movementSpeed = 1000;
        controls.lookSpeed = 0.1;
        var data = generateHeight(worldWidth, worldDepth);
        camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
        var geometry = new _three.PlaneBufferGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
        geometry.applyMatrix(new _three.Matrix4().makeRotationX(-Math.PI / 2));
        var vertices = geometry.getAttribute("position");
        var vertices_1 = vertices.array;
        var l = Math.floor(vertices_1.length);
        var i = 0;
        var j = 0;

        while (i < l) {
            vertices_1[j + 1] = data[i] * 10;
            i = i + 1;
            j = j + 3;
        }

        var texCanvas = generateTexture(data, worldWidth, worldDepth);
        var texture = new _three.Texture(texCanvas, three.UVMapping, three.ClampToEdgeWrapping, three.ClampToEdgeWrapping);
        texture.needsUpdate = true;
        var matProps = {};
        matProps.map = texture;
        var mesh = new _three.Mesh(geometry, new _three.MeshBasicMaterial(matProps));
        scene.add(mesh);

        var onWindowResize = function onWindowResize(e) {
            camera.aspect = getWidth() / getHeight();
            camera.updateProjectionMatrix();
            renderer.setSize(getWidth(), getHeight());
            controls.handleResize();
            return null;
        };

        window.addEventListener('resize', function (delegateArg0) {
            return onWindowResize(delegateArg0);
        }, false);
        return [renderer, scene, camera, controls];
    }

    var patternInput_267 = init();
    var scene = exports.scene = patternInput_267[1];
    var renderer = exports.renderer = patternInput_267[0];
    var controls = exports.controls = patternInput_267[3];
    var camera = exports.camera = patternInput_267[2];

    function render() {
        controls.update(clock.getDelta());
        renderer.render(scene, camera);
    }

    function animate(dt) {
        window.requestAnimationFrame(function (delegateArg0) {
            animate(delegateArg0);
        });
        render();
    }

    animate(0);
});
//# sourceMappingURL=webGLTerrain.js.map