/**
 * Potensic Atom - Premium Interactive Experience
 * Senior WebGL Engineer Implementation
 */

class DroneExperience {
    constructor() {
        this.container = document.querySelector('.experience-container');
        this.canvas = document.getElementById('drone-canvas');
        this.scene = new THREE.Scene();
        this.setupCamera();
        this.setupLights();
        this.init();
        this.addParticles();
        this.bindEvents();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        const directional = new THREE.DirectionalLight(0x44aaff, 2);
        directional.position.set(5, 5, 5);
        this.scene.add(ambient, directional);
        
        // Rim light for that "premium" metallic look
        const rimLight = new THREE.PointLight(0xffffff, 1);
        rimLight.position.set(-5, -2, -5);
        this.scene.add(rimLight);
    }

    addParticles() {
        // Simulates air dust/floating particles
        const geo = new THREE.BufferGeometry();
        const count = 1000;
        const pos = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) pos[i] = (Math.random() - 0.5) * 20;
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ size: 0.02, color: 0xaaaaaa, transparent: true, opacity: 0.5 });
        this.particles = new THREE.Points(geo, mat);
        this.scene.add(this.particles);
    }

    init() {
        // Placeholder for the actual drone model
        // In production: loader.load('/assets/models/potensic-atom.glb')
        const geometry = new THREE.BoxGeometry(2, 0.5, 1.5);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x222222, 
            metalness: 0.9, 
            roughness: 0.1 
        });
        this.drone = new THREE.Mesh(geometry, material);
        this.scene.add(this.drone);

        this.animate();
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Timeline for drone flight
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".experience-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        tl.to(this.drone.rotation, { y: Math.PI * 2, z: 0.2 })
          .to(this.camera.position, { z: 3, y: 1 }, 0)
          .to(this.particles.rotation, { y: 1 }, 0);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Floating idle animation
        if(this.drone) {
            this.drone.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Mouse move parallax
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            gsap.to(this.drone.rotation, { x: y * 0.5, y: x * 0.5, duration: 2 });
        });
    }
}

new DroneExperience();