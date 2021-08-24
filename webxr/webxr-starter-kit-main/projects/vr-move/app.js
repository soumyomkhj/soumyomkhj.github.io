import * as THREE from '../../libs/three/three.module.js';
import { GLTFLoader } from '../../libs/three/jsm/GLTFLoader.js';
import { DRACOLoader } from '../../libs/three/jsm/DRACOLoader.js';
import { RGBELoader } from '../../libs/three/jsm/RGBELoader.js';
import { Stats } from '../../libs/stats.module.js';
import { LoadingBar } from '../../libs/LoadingBar.js';
import { VRButton } from '../../libs/VRButton.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';


class App {
    constructor() {

        // Creates a <div> element and adds it to the HTML page.
        const container = document.createElement('div');
        document.body.appendChild(container);

        /*
         *   SCENE
         */

        // INITIALIZATION
        this.scene = new THREE.Scene();
        // Set the scene background color to a grey value.
        // 0x is the prefix to denote a Hexadecimal value.
        this.scene.background = new THREE.Color(0xFFFFFF);

        // LIGHTING
        // Create an ambient light and add it to the scene.
        // Parameters: Sky color, Ground color, intensity
        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5);
        this.scene.add(ambient);

        // Create a directional light and add it to the scene
        // Parameters: Light Color
        // The light target is the origin by default.
        const light = new THREE.DirectionalLight(0xffffff);

        // Moves the source of the light to a given position.
        light.position.set(1, 1, 1).normalize();
        this.scene.add(light);

        // OBJECTS
        // Define a Box Geometry
        const geometry = new THREE.BoxBufferGeometry();
        // Define a basic material with color Red
        const material = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
        // Create a new mesh using the geometry and material
        this.mesh = new THREE.Mesh(geometry, material);
        // Move the mesh to a new position
        this.mesh.position.set(0, 1, -3);
        // Add the mesh to the scene
        this.scene.add(this.mesh);

        /*
         *   CAMERA
         */

        // INITIALIZE
        // Create a new camera
        // Parameters: Field of View, Aspect Ratio, Inner Clipping Plane, Outer Clipping Plane
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        // Set the position of the camera
        this.camera.position.set(0, 1.6, 3);

        // DUMMY CAMERA FOR MOTION
        this.dolly = new THREE.Object3D(  );
        this.dolly.position.set(0, 0, 10);
        this.dolly.add( this.camera );
        this.dummyCam = new THREE.Object3D();
        this.camera.add( this.dummyCam );
        this.scene.add( this.dolly );


        /*
         *   RENDERER
         */

        // INITIALIZE
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // Add the renderer to the initial container that will display on the HTML page
        container.appendChild(this.renderer.domElement);

        /*
        *   ADDITIONAL TOOLS
        */


        // Utilities for movement
        this.clock = new THREE.Clock();
        this.up = new THREE.Vector3(0,1,0);
        this.origin = new THREE.Vector3();
        this.raycaster = new THREE.Raycaster();


        // ORBIT CONTROLS for non-XR view
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.target.set(0, 1.6, 0);
        // this.controls.update();

        // STATS for XR
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);

        /*
         *  MAIN FUNCTION CALL
         */

        // Initialize Scene from JSON
        this.initScene();
        this.setupXR();

        // Window resize handler
        window.addEventListener('resize', this.resize.bind(this));

    }

    initScene() {
        // Creates a loading bar
        this.loadingBar = new LoadingBar();
        // Starts the JSON loader        
        this.loadSceneFromJSON();
    }

 
    onMove( forward, turn ){
        if (this.dolly){
            this.dolly.userData.forward = forward;
            this.dolly.userData.turn = -turn;
        }
    }
    
    setupXR(){
        this.renderer.xr.enabled = true;

        const self = this;
 
        // Setup controller
        this.controller = this.renderer.xr.getController( 0 );
        this.controller.addEventListener( 'selectstart', onSelectStart );
        this.controller.addEventListener( 'selectend', onSelectEnd );

        // Set press event status holder
        function onSelectStart( event ) {

            this.userData.selectPressed = true;

        }

        function onSelectEnd( event ) {

            this.userData.selectPressed = false;

        }
        
        // Add controller to scene
        this.scene.add( this.controller );

        const btn = new VRButton( this.renderer );
        
        this.renderer.setAnimationLoop( this.render.bind(this) );
    }
    
    
    
    moveDolly(dt){        
        const speed = 2;
		let pos = this.dolly.position.clone();
        pos.y += 1;
        
		let dir = new THREE.Vector3();
        let quaternion, q = new THREE.Quaternion();
        
        //Store original dolly rotation
        quaternion = this.dolly.quaternion.clone();
        //Get rotation for movement from the headset pose
        this.dolly.quaternion.copy( this.dummyCam.getWorldQuaternion(q) );
        this.dolly.getWorldDirection(dir);
        dir.negate();

		this.raycaster.set(pos, dir);

        this.dolly.translateZ(-dt*speed);
        pos = this.dolly.getWorldPosition( this.origin );

        this.dolly.quaternion.copy( quaternion );
	}
		
    get selectPressed(){
        return ( this.controller !== undefined && this.controller.userData.selectPressed );    
    }

    render( timestamp, frame ){
        const dt = this.clock.getDelta();
        
        let moved = false;
        
        if (this.renderer.xr.isPresenting && this.selectPressed){
            this.moveDolly(dt);
            moved = true;
        } 
        
        // this.stats.update();
		this.renderer.render(this.scene, this.camera);
	}

    // Handles window resizing
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Load Scene from JSON
    // Create a scene over at three.js/editor
    // And export the scene as a JSON
    loadSceneFromJSON() {

        // Set the path of the folder containing the assets
        const loader = new THREE.ObjectLoader().setPath('../../assets/json/');;

        // Set a reference to the current app
        const self = this;

        loader.load(
            // Enter the name of the file here
            "testscene.json",

            // onLoad callback
            // Here the loaded data is assumed to be an object
            function (obj) {

                self.jsonscene = obj;

                // obj.position.set(0,1,-3);
                // obj.scale.set(1,1,1);

                // Add the object to the scene
                self.scene.add(obj);

                // Disable the loading bar
                self.loadingBar.visible = false;

            },

            // onProgress callback
            function (xhr) {
                // XHR gives us an estimate of the loading progress
                self.loadingBar.progress = (xhr.loaded / xhr.total);
            },

            // onError callback
            function (err) {
                console.error('An error happened');
            }
        );
    }
}

export { App };