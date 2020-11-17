

class BasicWorldDemo {
    constructor() {
        this._Initialize();
    }

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
            color: 0x808080
        }))

        const wall1 = new THREE.Mesh(
          new THREE.BoxGeometry(25, 25, 1),
          new THREE.MeshStandardMaterial({
            color: 0xCDCDCD
        }))
        const wall2 = new THREE.Mesh(
          new THREE.BoxGeometry(1, 25, 25),
          new THREE.MeshStandardMaterial({
            color: 0xCDCDCD
        }))
        
        wall1.position.set(0, 12.5, 10);
        wall1.castShadow = true
        wall1.receiveShadow = true
        this._scene.add(wall1)

        wall2.position.set(10, 12.5, 0);
        wall2.castShadow = true
        wall2.receiveShadow = true
        this._scene.add(wall2)

        frame.position.set(0, 5, 9);
        frame.castShadow = true;

        frame.receiveShadow = true;
        this._scene.add(frame);
        
        plane.cashShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);

        const pointLight = new THREE.PointLight( 0xFFFFF0, 1, 100 );
        pointLight.position.set( 0, 1, 0 );
        this._scene.add( pointLight );

        // const spotLight = new THREE.SpotLight( 0xffffff );
        // spotLight.position.set( 100, 1000, 100 );

        // spotLight.castShadow = true;

        // spotLight.shadow.mapSize.width = 1024;
        // spotLight.shadow.mapSize.height = 1024;

        // spotLight.shadow.camera.near = 500;
        // spotLight.shadow.camera.far = 4000;
        // spotLight.shadow.camera.fov = 30;

        // this._scene.add( spotLight );

        // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        // scene.add( directionalLight );

        const width = 25;
        const height = 25;
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
        requestAnimationFrame(() => {
            this._threejs.render(this._scene, this._camera);
            this._RAF();
        });
    }
}
let lol = new BasicWorldDemo();
