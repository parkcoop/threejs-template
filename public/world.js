
import * as THREE from '/build/three.module.js';

import { PointerLockControls } from './assets/scripts/PointerLockControls.js';
import { Reflector } from './assets/scripts/Reflector.js';

let camera, scene, renderer, controls, textureLoader;

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

init();
animate();

function init() {
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
      "./assets/images/skybox/right.png",
      "./assets/images/skybox/left.png",
      "./assets/images/skybox/top.png",
      "./assets/images/skybox/bottom.png",
      "./assets/images/skybox/front.png",
      "./assets/images/skybox/back.png",
  ]);
  textureLoader = new THREE.TextureLoader();
  scene = new THREE.Scene();

  scene.background = texture;


  initiateControls()
  drawArtGallery()
}

// const floor = textureLoader.load('./assets/images/floor.jpg')

function drawArtGallery() {
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    new THREE.MeshBasicMaterial({
      // color: 0xffffff, 
      map: textureLoader.load('./assets/images/floor.jpg'),
      opacity: 0.75, 
      transparent: true 
  }))

  const rustamFrame = new THREE.Mesh(
    new THREE.BoxGeometry(16, 24, 0.1),
    new THREE.MeshStandardMaterial({
      // color: 0x000000,
      map: textureLoader.load('./assets/images/floor.jpg')
  }))

  const rustamImage = new THREE.Mesh(
    new THREE.BoxGeometry(13, 21, 0.15),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load('./assets/images/rustam.jpg')
  }))

  const mannyFrame = new THREE.Mesh(
    new THREE.BoxGeometry(21, 16, 0.1),
    new THREE.MeshStandardMaterial({
      // color: 0x000000,
      map: textureLoader.load('./assets/images/floor.jpg')
  }))

  const mannyImage = new THREE.Mesh(
    new THREE.BoxGeometry(18, 13, 0.15),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load('./assets/images/manny.png')
  }))

  const starryNightFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 16, -25),
    new THREE.MeshStandardMaterial({
      // color: 0x000000,
      map: textureLoader.load('./assets/images/floor.jpg')
  }))

  const starryNightImage = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 14, -23),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load('./assets/images/starrynight.jpg')
  }))

  const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 35, 1),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load('./assets/images/wall.jpg')
  }))
  const wall2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 35, 50),
    new THREE.MeshStandardMaterial({
      // color: 0x000000,
      map: textureLoader.load('./assets/images/wall.jpg')
  }))

  const wall3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 35, 50),
    new THREE.MeshStandardMaterial({
      // color: 0x000000,
      map: textureLoader.load('./assets/images/wall.jpg')
  }))

  const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(50, 1, 50),
    new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,

      // map: textureLoader.load('./assets/images/wall.jpg')
  }))
  ceiling.position.y = 35
  scene.add(ceiling)

  const fontLoader = new THREE.FontLoader();

  fontLoader.load( './assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
  
    const artGalleryText = new THREE.TextGeometry( 'ART GALLERY', {
      font: font,
      size: 12,
      height: 1,
    } );

    const mediaQueryText = new THREE.TextGeometry( 'by Media Query', {
      font: font,
      size: 4,
      height: 1,
    } );

    var artGalleryMeshText = new THREE.Mesh( artGalleryText, new THREE.MeshStandardMaterial({
      // color: 0xFFFFFF,
      map: textureLoader.load('./assets/images/floor.jpg')
    }));


    artGalleryMeshText.position.set(-30, 35, 25);
    artGalleryMeshText.rotation.y = -3.14

  scene.add(artGalleryMeshText)  

    var mediaQueryMeshText = new THREE.Mesh( mediaQueryText, new THREE.MeshStandardMaterial({
      // color: 0xFFFFFF,
      map: textureLoader.load('./assets/images/floor.jpg')
    }));


    mediaQueryMeshText.position.set(-100, 30, 25);
    mediaQueryMeshText.rotation.y = -3.14

  scene.add(mediaQueryMeshText)  

} );
  // const groundMirror = new Reflector( new THREE.BoxGeometry(20, 1, 20), {
  //   clipBias: 0.11,
  //   textureWidth: 500,
  //   textureHeight: 500,
  //   color: 0x777777
  // } );
  // groundMirror.position.y = -1;
  // groundMirror.rotateX( - Math.PI / 2 );
  // scene.add( groundMirror );

  
  // var map = new THREE.TextureLoader().load( "./assets/images/starrynight.jpg" );
  // var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
  // var sprite = new THREE.Sprite( material );
  // sprite.position.set(0, 5, 23)
  // scene.add( sprite );
  
  wall1.position.set(0, 17.5, 25);
  wall1.castShadow = true
  wall1.receiveShadow = true
  scene.add(wall1)

  wall2.position.set(25, 17.5, 0);
  wall2.castShadow = true
  wall2.receiveShadow = true
  scene.add(wall2)


  wall3.position.set(25, 17.5, 0);
  wall3.castShadow = true
  wall3.receiveShadow = true
  scene.add(wall3)

  rustamFrame.position.set(-20, 17.5, 24);
  rustamFrame.castShadow = true;

  rustamFrame.receiveShadow = true;
  scene.add(rustamFrame);

  rustamImage.position.set(-20, 17.5, 24);
  rustamImage.castShadow = true;

  rustamImage.receiveShadow = true;
  scene.add(rustamImage);

  mannyFrame.position.set(10, 17.5, 24);
  mannyFrame.castShadow = true;

  mannyFrame.receiveShadow = true;
  scene.add(mannyFrame);

  mannyImage.position.set(10, 17.5, 24);
  mannyImage.castShadow = true;

  mannyImage.receiveShadow = true;
  scene.add(mannyImage);
  
  starryNightFrame.position.set(24, 17.5, 0);
  starryNightFrame.castShadow = true;
  // starryNightFrame.rotat

  starryNightFrame.receiveShadow = true;
  scene.add(starryNightFrame);

  starryNightImage.position.set(23.5, 17.5, 0);
  starryNightImage.castShadow = true;

  starryNightImage.receiveShadow = true;
  scene.add(starryNightImage);
  
  plane.cashShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const pointLight = new THREE.PointLight( 0xFFFFFF, 1, 100 );
  pointLight.position.set( 0, 1, 0 );
  pointLight.intensity = 0.75
  scene.add( pointLight );

}







function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  const time = performance.now();

  if ( controls.isLocked === true ) {

    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects( objects );

    const onObject = intersections.length > 0;

    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    if ( onObject === true ) {

      velocity.y = Math.max( 0, velocity.y );
      canJump = true;

    }

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    controls.getObject().position.y += ( velocity.y * delta ); // new behavior

    if ( controls.getObject().position.y < 10 ) {

      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;

    }

  }

  prevTime = time;

  renderer.render( scene, camera );

}

function initiateControls() {



  // Camera, controls, movement

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = 10;

  // scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xffffff );
  scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

  const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );

  controls = new PointerLockControls( camera, document.body );

  const blocker = document.getElementById( 'blocker' );
  const instructions = document.getElementById( 'instructions' );

  instructions.addEventListener( 'click', function () {

    controls.lock();

  }, false );

  controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

  } );

  controls.addEventListener( 'unlock', function () {

    blocker.style.display = 'block';
    instructions.style.display = '';

  } );

  scene.add( controls.getObject() );

  const onKeyDown = function ( event ) {

    switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

      case 32: // space
        if ( canJump === true ) velocity.y += 350;
        canJump = false;
        break;

    }

  };

  const onKeyUp = function ( event ) {

    switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;

    }

  };

  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );

  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );
}
