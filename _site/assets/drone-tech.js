/**
 * Potensic Atom - AeroCore Engine
 * Author: iamyellow (Senior Interactive Director mode)
 */

class AeroCore {
    constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        this.scene = new THREE.Scene();
        this.setupCamera();
        this.createAbstractDrone();
        this.addBackgroundParticles();
        this.initLights();
        this.bindScroll();
        this.animate();
        
        window.addEventListener('resize', () => this.onResize());
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createAbstractDrone() {
        // Skupina pro celý "objekt" dronu
        this.droneGroup = new THREE.Group();

        // Jádro (reprezentuje engine/AI)
        const coreGeo = new THREE.IcosahedronGeometry(0.8, 0);
        const coreMat = new THREE.MeshStandardMaterial({ 
            color: 0x00f2ff, 
            wireframe: true,
            emissive: 0x00f2ff,
            emissiveIntensity: 2
        });
        this.core = new THREE.Mesh(coreGeo, coreMat);
        this.droneGroup.add(this.core);

        // Prstence (reprezentují rotory/stabilitu)
        this.rings = [];
        for(let i=0; i<3; i++) {
            const ringGeo = new THREE.TorusGeometry(1.2 + (i*0.3), 0.01, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            this.droneGroup.add(ring);
            this.rings.push(ring);
        }

        this.scene.add(this.droneGroup);
    }

    addBackgroundParticles() {
        const pGeo = new THREE.BufferGeometry();
        const pCount = 1500;
        const pos = new Float32Array(pCount * 3);
        for(let i=0; i<pCount*3; i++) pos[i] = (Math.random() - 0.5) * 15;
        pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.02, color: 0x555555 });
        this.particles = new THREE.Points(pGeo, pMat);
        this.scene.add(this.particles);
    }

    initLights() {
        const point = new THREE.PointLight(0x00f2ff, 2, 10);
        point.position.set(2, 2, 2);
        this.scene.add(point, new THREE.AmbientLight(0xffffff, 0.2));
    }

    bindScroll() {
        gsap.registerPlugin(ScrollTrigger);

        // Animace při scrollu
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });

        tl.to(this.droneGroup.rotation, { y: Math.PI * 4, x: Math.PI * 0.5 })
          .to(this.core.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0.5)
          .to(this.camera.position, { z: 4, y: 0.5 }, 0);
        
        // Reakce na myš
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
            const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
            gsap.to(this.droneGroup.rotation, { x: y, y: x, duration: 2 });
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Neustálá jemná rotace
        this.core.rotation.y += 0.01;
        this.rings.forEach((r, i) => {
            r.rotation.z += 0.005 * (i + 1);
            r.rotation.x += 0.002 * (i + 1);
        });

        // "Dýchání" částic
        this.particles.rotation.y += 0.0005;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Spuštění po načtení DOMu
window.addEventListener('DOMContentLoaded', () => {
    new AeroCore();
});