

class BasicWorldDemo {
    constructor() {
        this._Initialize();
    }
    camera, scene, renderer, controls;

    const objects = [];

    raycaster;

    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    canJump = false;

    prevTime = performance.now();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const vertex = new THREE.Vector3();
    const color = new THREE.Color();

    _Initialize() {
        this._threejs = new THREE.WebGLRenderer();
        this._threejs.shadowMap.enabled = true;
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        window.addEventListener(
            "resize",
            () => {
                this._OnWindowResize();
            },
            false,
        );

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				this._camera.position.y = 10;

        this._scene = new THREE.Scene();

        // let light = new THREE.DirectionalLight(0xffffff);
        // light.position.set(100, 100, 100);
        // light.target.position.set(0, 0, 0);
        // light.castShadow = true;
        // light.shadow.bias = 0.01;
        // light.shadow.mapSize.width = 2048;
        // light.shadow.mapSize.width = 2048;
        // light.shadow.camera.near = 1.0;
        // light.shadow.camera.far = 1.0;
        // light.shadow.camera.left = 1.0;
        // light.shadow.camera.right = 1.0;
        // light.shadow.camera.top = 1.0;
        // light.shadow.camera.bottom = 1.0;
        // this._scene.add(light);

        const controls = new THREE.OrbitControls(
            this._camera,
            this._threejs.domElement,
        );
        controls.target.set(5, 5, 0);
        controls.update();

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            "./assets/images/sky.png",
            "./assets/images/sky.png",
            "./assets/images/sky.png",
            "./assets/images/sky.png",
            "./assets/images/sky.png",
            "./assets/images/sky.png",
        ]);
        this._scene.background = texture;

        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(250, 250, 1, 1),
          new THREE.MeshStandardMaterial({
            color: 0xFFFFFF
        }))

        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(5, 5, 0.1),
          new THREE.MeshStandardMaterial({
            color: 0x000000
        }))

        const image = new THREE.Mesh(
          new THREE.BoxGeometry(4, 4, 0.15),
          new THREE.MeshStandardMaterial({
            color: 0xFFFFFF
        }))

        const wall1 = new THREE.Mesh(
          new THREE.BoxGeometry(100, 25, 1),
          new THREE.MeshStandardMaterial({
            color: 0xCDCDCD
        }))
        const wall2 = new THREE.Mesh(
          new THREE.BoxGeometry(1, 25, 50),
          new THREE.MeshStandardMaterial({
            color: 0xCDCDCD
        }))

        var map = new THREE.TextureLoader().load( "./assets/images/starrynight.jpg" );
        var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
        var sprite = new THREE.Sprite( material );
        sprite.position.set(0, 5, 23)
        this._scene.add( sprite );
        
        wall1.position.set(0, 12.5, 25);
        wall1.castShadow = true
        wall1.receiveShadow = true
        this._scene.add(wall1)

        wall2.position.set(25, 12.5, 0);
        wall2.castShadow = true
        wall2.receiveShadow = true
        this._scene.add(wall2)

        frame.position.set(0, 5, 24);
        frame.castShadow = true;

        frame.receiveShadow = true;
        this._scene.add(frame);

        image.position.set(0, 5, 24);
        image.castShadow = true;

        image.receiveShadow = true;
        this._scene.add(image);
        
        plane.cashShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);

        const pointLight = new THREE.PointLight( 0xFFFFFF, 1, 100 );
        pointLight.position.set( 0, 1, 0 );
        pointLight.intensity = 0.75
        this._scene.add( pointLight );


        const spotLight = new THREE.SpotLight( 0xffffff );


        // spotLight.position.set( 5, 10, 5 );

        // spotLight.castShadow = true;

        // spotLight.shadow.mapSize.width = 5;
        // spotLight.shadow.mapSize.height = 5;

        // spotLight.shadow.camera.near = 50;
        // spotLight.shadow.camera.far = 5;
        // spotLight.shadow.camera.fov = 3;

        // this._scene.add( spotLight );

        const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.5 );
        this._scene.add( directionalLight );

        const width = 20;
        const height = 20;
        const intensity = 0.5;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 0, 12.5, 0 );
        rectLight.lookAt( 0, 0, 0 );
        this._scene.add( rectLight )
        // THREE.RectAreaLightHelper.init()
        // const rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this._RAF();
    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    _RAF() {
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
        requestAnimationFrame(() => {
            this._threejs.render(this._scene, this._camera);
            this._RAF();
        });
    }
}
let lol = new BasicWorldDemo();
