// Three.js 3D scenes for AgriFlow platform

class ThreeSceneManager {
    constructor() {
        this.scenes = new Map();
        this.activeScene = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createFarmScene();
        this.createGlobeScene();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.scenes.forEach(scene => {
                scene.handleResize();
            });
        });

        // Pause animations when page is hidden
        document.addEventListener('visibilitychange', () => {
            this.scenes.forEach(scene => {
                if (document.hidden) {
                    scene.pause();
                } else {
                    scene.resume();
                }
            });
        });
    }

    createFarmScene() {
        const canvas = document.getElementById('farm-scene');
        if (!canvas) return;

        const scene = new FarmScene(canvas);
        this.scenes.set('farm', scene);
        this.activeScene = scene;
    }

    createGlobeScene() {
        const canvas = document.getElementById('globe-canvas');
        if (!canvas) return;

        const scene = new GlobeScene(canvas);
        this.scenes.set('globe', scene);
    }
}

class BaseScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true,
            alpha: true 
        });
        
        this.clock = new THREE.Clock();
        this.animationId = null;
        this.isPaused = false;
        
        this.setupRenderer();
        this.setupLighting();
        this.createScene();
        this.animate();
    }

    setupRenderer() {
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 25);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight);

        // Point light for additional illumination
        const pointLight = new THREE.PointLight(0x98FB98, 0.5, 100);
        pointLight.position.set(-25, 25, 25);
        this.scene.add(pointLight);
    }

    animate() {
        if (this.isPaused) return;

        this.animationId = requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        this.update(elapsedTime);
        this.renderer.render(this.scene, this.camera);
    }

    update(elapsedTime) {
        // Override in subclasses
    }

    handleResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    pause() {
        this.isPaused = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    resume() {
        this.isPaused = false;
        this.animate();
    }

    createScene() {
        // Override in subclasses
    }
}

const ENABLE_3D_SPARKLES = false;

class FarmScene extends BaseScene {
    constructor(canvas) {
        super(canvas);
        this.camera.position.set(0, 20, 30);
        this.camera.lookAt(0, 0, 0);
        
        this.trucks = [];
        this.crops = [];
        this.mill = null;
        
        this.createFarmLandscape();
        this.createMovingTrucks();
        this.createCrops();
        this.createMill();
        if (ENABLE_3D_SPARKLES) {
            this.createParticleSystem();
        }
    }

    createFarmLandscape() {
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513,
            transparent: true,
            opacity: 0.8
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Farm fields
        for (let i = 0; i < 6; i++) {
            const fieldGeometry = new THREE.PlaneGeometry(30, 20);
            const fieldMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL(0.3, 0.6, 0.4 + Math.random() * 0.2)
            });
            const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
            field.rotation.x = -Math.PI / 2;
            field.position.x = (Math.random() - 0.5) * 150;
            field.position.z = (Math.random() - 0.5) * 150;
            field.receiveShadow = true;
            this.scene.add(field);
        }

        // Hills in background
        for (let i = 0; i < 3; i++) {
            const hillGeometry = new THREE.ConeGeometry(40, 20, 8);
            const hillMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x4A7C59 
            });
            const hill = new THREE.Mesh(hillGeometry, hillMaterial);
            hill.position.x = (Math.random() - 0.5) * 300;
            hill.position.z = -80 + Math.random() * 40;
            hill.position.y = 10;
            hill.castShadow = true;
            this.scene.add(hill);
        }
    }

    createMovingTrucks() {
        for (let i = 0; i < 3; i++) {
            const truck = this.createTruck();
            truck.position.x = -60 + i * 40;
            truck.position.z = -20 + Math.random() * 40;
            truck.position.y = 2;
            
            // Set random destination
            truck.userData = {
                destination: new THREE.Vector3(
                    60 + Math.random() * 40,
                    2,
                    -20 + Math.random() * 40
                ),
                speed: 0.5 + Math.random() * 0.5,
                direction: 1
            };
            
            this.trucks.push(truck);
            this.scene.add(truck);
        }
    }

    createTruck() {
        const group = new THREE.Group();

        // Truck body
        const bodyGeometry = new THREE.BoxGeometry(8, 3, 4);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x2D5A27 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1.5;
        body.castShadow = true;
        group.add(body);

        // Truck cab
        const cabGeometry = new THREE.BoxGeometry(3, 2.5, 4);
        const cabMaterial = new THREE.MeshLambertMaterial({ color: 0x1A3D1A });
        const cab = new THREE.Mesh(cabGeometry, cabMaterial);
        cab.position.x = -1.5;
        cab.position.y = 2.25;
        cab.castShadow = true;
        group.add(cab);

        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 8);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        
        const wheelPositions = [
            { x: -2.5, z: -2 },
            { x: -2.5, z: 2 },
            { x: 2.5, z: -2 },
            { x: 2.5, z: 2 }
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.x = pos.x;
            wheel.position.z = pos.z;
            wheel.position.y = 0.5;
            wheel.castShadow = true;
            group.add(wheel);
        });

        // Cargo (crops)
        const cargoGeometry = new THREE.BoxGeometry(6, 2, 3);
        const cargoMaterial = new THREE.MeshLambertMaterial({ color: 0x9ACD32 });
        const cargo = new THREE.Mesh(cargoGeometry, cargoMaterial);
        cargo.position.x = 1;
        cargo.position.y = 3;
        cargo.castShadow = true;
        group.add(cargo);

        return group;
    }

    createCrops() {
        const cropTypes = [
            { color: 0x9ACD32, height: 2 }, // Wheat
            { color: 0x8B4513, height: 1.5 }, // Corn
            { color: 0x228B22, height: 1.8 } // Soy
        ];

        for (let i = 0; i < 50; i++) {
            const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
            const crop = this.createCrop(cropType);
            
            crop.position.x = (Math.random() - 0.5) * 180;
            crop.position.z = (Math.random() - 0.5) * 180;
            crop.position.y = cropType.height / 2;
            
            this.crops.push(crop);
            this.scene.add(crop);
        }
    }

    createCrop(cropType) {
        const group = new THREE.Group();

        // Stalk
        const stalkGeometry = new THREE.CylinderGeometry(0.1, 0.1, cropType.height, 6);
        const stalkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const stalk = new THREE.Mesh(stalkGeometry, stalkMaterial);
        stalk.position.y = cropType.height / 2;
        stalk.castShadow = true;
        group.add(stalk);

        // Leaves
        const leafGeometry = new THREE.SphereGeometry(0.3, 6, 4);
        const leafMaterial = new THREE.MeshLambertMaterial({ color: cropType.color });
        
        for (let i = 0; i < 3; i++) {
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.position.y = cropType.height * 0.7 + i * 0.3;
            leaf.position.x = (Math.random() - 0.5) * 0.4;
            leaf.position.z = (Math.random() - 0.5) * 0.4;
            leaf.scale.y = 0.5;
            leaf.castShadow = true;
            group.add(leaf);
        }

        return group;
    }

    createMill() {
        const group = new THREE.Group();

        // Main building
        const buildingGeometry = new THREE.BoxGeometry(15, 20, 15);
        const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x6B8E23 });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.y = 10;
        building.castShadow = true;
        group.add(building);

        // Silo
        const siloGeometry = new THREE.CylinderGeometry(3, 3, 25, 8);
        const siloMaterial = new THREE.MeshLambertMaterial({ color: 0x4A7C59 });
        const silo = new THREE.Mesh(siloGeometry, siloMaterial);
        silo.position.x = 8;
        silo.position.y = 12.5;
        silo.castShadow = true;
        group.add(silo);

        // Conveyor belt
        const conveyorGeometry = new THREE.BoxGeometry(20, 1, 3);
        const conveyorMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const conveyor = new THREE.Mesh(conveyorGeometry, conveyorMaterial);
        conveyor.position.x = 10;
        conveyor.position.y = 2;
        conveyor.position.z = 5;
        conveyor.rotation.y = Math.PI / 4;
        conveyor.castShadow = true;
        group.add(conveyor);

        group.position.set(60, 0, 0);
        this.mill = group;
        this.scene.add(group);
    }

    createParticleSystem() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions around the scene
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = Math.random() * 30 + 5;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;

            // Random colors (green tones)
            const color = new THREE.Color().setHSL(0.3, 0.6, 0.4 + Math.random() * 0.3);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    update(elapsedTime) {
        // Animate trucks
        this.trucks.forEach(truck => {
            const data = truck.userData;
            const direction = data.destination.clone().sub(truck.position).normalize();
            
            truck.position.add(direction.multiplyScalar(data.speed));
            
            // Rotate truck to face movement direction
            truck.rotation.y = Math.atan2(direction.x, direction.z);
            
            // Check if reached destination
            if (truck.position.distanceTo(data.destination) < 2) {
                // Set new random destination
                data.destination.set(
                    60 + Math.random() * 40,
                    2,
                    -20 + Math.random() * 40
                );
            }
        });

        // Animate crops (gentle swaying)
        this.crops.forEach(crop => {
            crop.rotation.z = Math.sin(elapsedTime + crop.position.x * 0.01) * 0.1;
        });

        // Animate particles (disabled when sparkles are off)
        if (ENABLE_3D_SPARKLES && this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] += Math.sin(elapsedTime + positions[i-1] * 0.01) * 0.01;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Rotate mill conveyor
        if (this.mill) {
            const conveyor = this.mill.children[2]; // Conveyor belt
            if (conveyor) {
                conveyor.rotation.x += 0.02;
            }
        }
    }
}

class GlobeScene extends BaseScene {
    constructor(canvas) {
        super(canvas);
        this.camera.position.set(0, 0, 5);
        
        this.globe = null;
        this.hotspots = [];
        this.rotationSpeed = 0.005;
        
        this.createGlobe();
        this.createHotspots();
        this.createAtmosphere();
    }

    createGlobe() {
        // Earth geometry
        const geometry = new THREE.SphereGeometry(2, 64, 64);
        
        // Create earth-like texture
        const material = new THREE.MeshPhongMaterial({
            color: 0x4A7C59,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.globe.castShadow = true;
        this.scene.add(this.globe);

        // Add wireframe for tech look
        const wireframeGeometry = new THREE.SphereGeometry(2.01, 32, 32);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x2D5A27,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        this.scene.add(wireframe);
    }

    createHotspots() {
        const hotspotCount = 8;
        
        for (let i = 0; i < hotspotCount; i++) {
            const hotspot = this.createHotspot();
            
            // Random position on sphere surface
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            
            hotspot.position.x = 2.1 * Math.sin(phi) * Math.cos(theta);
            hotspot.position.y = 2.1 * Math.cos(phi);
            hotspot.position.z = 2.1 * Math.sin(phi) * Math.sin(theta);
            
            hotspot.userData = {
                phi: phi,
                theta: theta,
                pulseSpeed: 0.02 + Math.random() * 0.02
            };
            
            this.hotspots.push(hotspot);
            this.scene.add(hotspot);
        }
    }

    createHotspot() {
        const group = new THREE.Group();

        // Main hotspot
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x9ACD32,
            transparent: true,
            opacity: 0.8
        });
        const hotspot = new THREE.Mesh(geometry, material);
        group.add(hotspot);

        // Pulse ring
        const ringGeometry = new THREE.RingGeometry(0.1, 0.2, 16);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x9ACD32,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);

        return group;
    }

    createAtmosphere() {
        const geometry = new THREE.SphereGeometry(2.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x98FB98,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const atmosphere = new THREE.Mesh(geometry, material);
        this.scene.add(atmosphere);
    }

    update(elapsedTime) {
        // Rotate globe
        if (this.globe) {
            this.globe.rotation.y += this.rotationSpeed;
        }

        // Animate hotspots
        this.hotspots.forEach(hotspot => {
            const data = hotspot.userData;
            const scale = 1 + Math.sin(elapsedTime * data.pulseSpeed) * 0.3;
            hotspot.scale.setScalar(scale);
            
            // Update ring opacity
            const ring = hotspot.children[1];
            if (ring) {
                ring.material.opacity = 0.3 + Math.sin(elapsedTime * data.pulseSpeed) * 0.2;
            }
        });
    }
}

// Initialize Three.js scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        window.threeSceneManager = new ThreeSceneManager();
    } else {
        console.warn('Three.js not loaded. 3D scenes will not be available.');
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThreeSceneManager, FarmScene, GlobeScene };
}





















