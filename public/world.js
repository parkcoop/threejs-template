
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

                document.body.appendChild(this._threejs.domElement)

                window.addEventListener('resize', () => {
                        this._OnWindowResize();
                }, false);

                const fov = 60;
                const aspect = 1920 / 1080;
                const near = 1.0
                const far = 1000.0
                this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

                this._scene = new THREE.Scene()

                let light = new THREE.DirectionalLight(0xFFFFFF);
                light.position.set(100, 100, 100);
                light.target.position.set(0, 0, 0);
                light.castShadow = true;
                light.shadow.bias = 0.01;
                light.shadow.mapSize.width = 2048
                light.shadow.mapSize.width = 2048
                light.shadow.camera.near = 1.0
                light.shadow.camera.far = 1.0
                light.shadow.camera.left = 1.0
                light.shadow.camera.right = 1.0
                light.shadow.camera.top = 1.0
                light.shadow.camera.bottom = 1.0
                this._scene.add(light);

                const controls = new THREE.OrbitControls(
                        this._camera, this._threejs.domElement);
                controls.target.set(5, 5, 0);
                controls.update()

                const loader = new THREE.CubeTextureLoader();
                const texture = loader.load([
                        './assets/images/bottom.png',
                        './assets/images/front.png',
                        './assets/images/center.png',
                        './assets/images/left.png',
                        './assets/images/otherfront.png',
                        './assets/images/top.png',
                ])
                this._scene.background = texture;

                this._RAF()
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
                })
        }


}
let lol = new BasicWorldDemo()