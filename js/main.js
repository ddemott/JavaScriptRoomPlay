$(function () {

    var scene = new THREE.Scene();

    var camera = createCamera(scene);
    var renderer = createRenderer();

    var grid = new THREE.GridHelper(250, 100, {color: 0x000000}, {color: 0xffffff});
    scene.add(grid);
    grid.position.y = -.5;

    // var axis = new THREE.AxisHelper(10);
    // scene.add(axis);
    //
    var planeFloor = createPlane();
    scene.add(planeFloor);

    var planeWall_1 = createPlane();
    preparePlaneForScene(planeWall_1, .5, null, (.5 * Math.PI), null, -25, 12.5, null);
    scene.add(planeWall_1);

    var planeWall_2 = createPlane();
    preparePlaneForScene(planeWall_2, .5, null, (-.5 * Math.PI), null, 25, 12.5, null);
    scene.add(planeWall_2);

    var planeWall_3 = createPlane();
    preparePlaneForScene(planeWall_3, .5, (0), null, (.5 * Math.PI), null, 12.5, -25);
    scene.add(planeWall_3);

    var planeWall_4 = createPlane();
    preparePlaneForScene(planeWall_4, .5, (Math.PI), null, (.5 * Math.PI), null, 12.5, 25);
    scene.add(planeWall_4);

    createRuns(scene);

    var spotLight = createSpotLight();
    scene.add(spotLight);

    var controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);

    animate();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

    renderer.render(scene, camera);
    $("#webGL-container").append(renderer.domElement);

});

function preparePlaneForScene(plane, scale, xRotation, yRotation, zRotation, xPosition, yPosition, zPosition) {
    plane.scale.x = scale;
    if (xRotation != null) {
        plane.rotation.x = xRotation;
    }
    if (yRotation != null) {
        plane.rotation.y = yRotation;
    }

    if (zRotation != null) {
        plane.rotation.z = zRotation;
    }

    if (xPosition != null) {
        plane.position.x = xPosition;
    }

    if (yPosition != null) {
        plane.position.y = yPosition;
    }

    if (zPosition != null) {
        plane.position.z = zPosition;
    }

    return plane;
}

function createRenderer() {
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xdddddd);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    return renderer;
}

function createCamera(scene) {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;

    camera.lookAt(scene.position);
    return camera;
}

function createPlane() {
    var planeGeometry = new THREE.PlaneGeometry(50, 50, 50);
    var material = new THREE.MeshStandardMaterial({opacity:1,transparent:false});
    var textureLoader = new THREE.TextureLoader();

    //load image onto for mapping hardwood
    textureLoader.load("textures/hardwood2_diffuse.jpg", function (map){
        map.anisotropy = 8;
        material.map = map;
        material.needsUpdate = true;
    });

    //load bump map for mapping hardwood
    textureLoader.load("textures/hardwood2_roughness.jpg", function (map){
        map.anisotropy = 8;
        material.roughnessMap = map;
        material.needsUpdate = true;
    });

    // var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
     var plane = new THREE.Mesh(planeGeometry, material);

    plane.rotation.x = -.5 * Math.PI;
    plane.receiveShadow = true;

    return plane;
}

function createCube(hexColor) {
    var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: hexColor});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = 2.5;
    cube.position.y = 4;
    cube.position.z = 2.5;
    cube.castShadow = true;

    return cube;
}

function createSpotLight() {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set(15, 30, 50);
    return spotLight;
}

function createRuns(scene) {
    var floorLevel_Y = 2.5;

    var red = 0xff3300;
    var yellow = 0xffff00;
    var green = 0x00ff00;

    var run_1 = createCube(red);
    run_1.scale.x = 2;
    run_1.position.y = floorLevel_Y;
    run_1.position.x = 20;
    run_1.position.z = -22.5;
    scene.add(run_1);

    var run_2 = createCube(yellow);
    run_2.scale.x = 2;
    run_2.position.y = floorLevel_Y;
    run_2.position.x = 5;
    run_2.position.z = -22.5;
    scene.add(run_2);

    var run_3 = createCube(green);
    run_3.scale.x = 2;
    run_3.position.y = floorLevel_Y;
    run_3.position.x = -20;
    run_3.position.z = -22.5;
    scene.add(run_3);

    var run_4 = createCube(green);
    run_4.scale.x = 1;
    run_4.position.y = floorLevel_Y;
    run_4.position.x = -7;
    run_4.position.z = -22.5;
    scene.add(run_4);

    var run_5 = createCube(red);
    run_5.scale.x = 2;
    run_5.scale.z = 2;
    run_5.position.y = floorLevel_Y;
    run_5.position.x = -20;
    run_5.position.z = -5;
    scene.add(run_5);

    var run_6 = createCube(green);
    run_6.scale.x = 1;
    run_6.scale.z = 2;
    run_6.position.y = floorLevel_Y;
    run_6.position.x = -7.5;
    run_6.position.z = -5;
    scene.add(run_6);

    var run_7 = createCube(yellow);
    run_7.scale.x = 4;
    run_7.scale.z = 2;

    run_7.position.y = floorLevel_Y;
    run_7.position.x = 10;
    run_7.position.z = -5;
    scene.add(run_7);

    var run_8 = createCube(green);
    run_8.scale.x = 2;
    run_8.position.y = floorLevel_Y;
    run_8.position.x = 20;
    run_8.position.z = 12.5;
    scene.add(run_8);

    var run_9 = createCube(red);
    run_9.scale.x = 2;
    run_9.position.y = floorLevel_Y;
    run_9.position.x = 5;
    run_9.position.z = 12.5;
    scene.add(run_9);

    var run_10 = createCube(yellow);
    run_10.scale.x = 2;
    run_10.position.y = floorLevel_Y;
    run_10.position.x = -20;
    run_10.position.z = 12.5;
    scene.add(run_10);

    var run_11 = createCube(yellow);
    run_11.scale.x = 1;
    run_11.position.y = floorLevel_Y;
    run_11.position.x = -7;
    run_11.position.z = 12.5;
    scene.add(run_11);

}



