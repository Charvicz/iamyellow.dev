// Import Three.js modules (assuming bundler or ES modules)
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

class DroneShowcase {
    constructor() {
        this.container = document.getElementById('canvas-container');
        if (!this.container) return;

        // Configuration
        this.config = {
            modelUrl: '/assets/models/potensic_atom.glb', // YOU NEED TO PROVIDE THIS
            pixelRatio: Math.min(window.devicePixelRatio, 2), // Cap at 2 for performance
        };

        // State
        this.scrollY = 0;
        this.targetScrollY = 0;
        this.scrollProgress = 0; // 0 to 1 across the whole page
        this.mouse = new THREE.Vector2();
        this.targetMouse = new THREE.Vector2();

        this.init();
    }

    init() {
        // 1. Setup Scene, Camera, Renderer
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x050505, 0.05); // Cinematic depth

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 0, 5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.config.pixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // Premium cinematic lighting
        this.renderer.toneMappingExposure = 1.2;
        this.container.appendChild(this.renderer.domElement);

        // 2. Lighting (Crucial for premium metallic look)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2);
        dirLight.position.set(5, 5, 5);
        this.scene.add(dirLight);

        const rimLight = new THREE.DirectionalLight(0x88ccff, 3); // Cool blue edge light
        rimLight.position.set(-5, 5, -5);
        this.scene.add(rimLight);

        // 3. Environment Particles (Dust/Air)
        this.createParticles();

        // 4. Load Model
        this.loadModel();

        // 5. Events
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Touch events for mobile fallback
        window.addEventListener('touchmove', (e) => {
            this.targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        });

        // Setup Intersection Observer for text fading
        this.setupObservers();

        // 6. Start Loop
        this.clock = new THREE.Clock();
        this.tick();
    }

    createParticles() {
        const particleCount = window.innerWidth > 768 ? 2000 : 500; // Performance scaling
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for(let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20; // Spread in 3D space
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    loadModel() {
        // Optimization: Use Draco compression if available
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/assets/js/draco/'); // Provide path to draco decoder

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            this.config.modelUrl,
            (gltf) => {
                this.droneGroup = new THREE.Group();
                this.droneModel = gltf.scene;
                
                // Center model mathematically
                const box = new THREE.Box3().setFromObject(this.droneModel);
                const center = box.getCenter(new THREE.Vector3());
                this.droneModel.position.sub(center);
                
                this.droneGroup.add(this.droneModel);
                this.scene.add(this.droneGroup);

                // Initial position (hidden / angled)
                this.droneGroup.position.set(0, -2, -2);
                this.droneGroup.rotation.set(0.5, -Math.PI / 4, 0);
            },
            undefined, // Progress callback can go here
            (error) => console.error('Error loading model', error)
        );
    }

    setupObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Check if we are in interactive phase
                    if(entry.target.parentElement.dataset.phase === "3") {
                         this.container.classList.add('is-interactive');
                    } else {
                         this.container.classList.remove('is-interactive');
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.content').forEach(el => observer.observe(el));
    }

    onScroll() {
        this.targetScrollY = window.scrollY;
        // Calculate scroll progress (0 to 1)
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        this.scrollProgress = Math.max(0, Math.min(1, this.targetScrollY / maxScroll));
    }

    onMouseMove(event) {
        // Normalized device coordinates (-1 to +1)
        this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Adjust particle count on resize dynamically if needed
    }

    tick() {
        const deltaTime = this.clock.getDelta();

        // 1. Smooth scroll interpolation (Lerp)
        // Lerp makes the animation feel heavy and premium, not rigid.
        this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;
        this.mouse.lerp(this.targetMouse, 0.05);

        // 2. Animate Drone based on scroll
        if (this.droneGroup) {
            // Base hover animation
            const hoverY = Math.sin(this.clock.elapsedTime * 2) * 0.1;

            // Phase logic based on scroll progress (0.0 to 1.0)
            // THESE ARE THE KEYFRAMES - Adjust values based on your model size
            
            // Phase 0: Hero (Bottom to center)
            let targetX = 0;
            let targetY = hoverY;
            let targetZ = 0;
            let targetRotX = 0;
            let targetRotY = this.mouse.x * 0.5; // Slight rotation mapped to mouse
            let targetRotZ = -this.mouse.x * 0.2; // Slight bank

            if (this.scrollProgress > 0.1 && this.scrollProgress <= 0.3) {
                // Phase 1: Stabilization (Drone flies forward, camera follows)
                targetX = 2; // Move right
                targetY = hoverY;
                targetZ = 2; // Closer to camera
                targetRotY = -Math.PI / 6;
            } else if (this.scrollProgress > 0.3 && this.scrollProgress <= 0.6) {
                 // Phase 2: Camera detail
                 targetX = -1.5;
                 targetZ = 3.5; // Very close to camera lens
                 targetRotX = 0.2;
                 targetRotY = Math.PI / 4; 
            } else if (this.scrollProgress > 0.6) {
                 // Phase 3 & 4: Interactive / Outro
                 targetX = 0;
                 targetZ = 0;
                 targetRotY = this.clock.elapsedTime * 0.2; // Auto rotate slowly
            }

            // Apply Lerp to position and rotation for buttery smoothness
            this.droneGroup.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
            
            // Quaternion slerp for safe rotation without gimbal lock
            const targetRotation = new THREE.Euler(targetRotX, targetRotY, targetRotZ);
            const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);
            this.droneGroup.quaternion.slerp(targetQuaternion, 0.05);
        }

        // 3. Animate Particles (Parallax effect)
        if (this.particles) {
            this.particles.rotation.y = this.scrollY * 0.0005;
            this.particles.position.y = this.scrollY * 0.001;
            // Mouse parallax on particles
            this.particles.position.x = -this.mouse.x * 0.5;
        }

        // 4. Render
        this.renderer.render(this.scene, this.camera);

        // 5. Loop
        requestAnimationFrame(this.tick.bind(this));
    }
}

// Initialize only when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DroneShowcase();
});