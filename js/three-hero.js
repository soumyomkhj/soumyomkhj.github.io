/**
 * ThreeBackgroundExperience - Unified 3D Three.js particle canvas for soumyomkhj.github.io
 * Provides seamless continuity from the Hero fold down through Case Studies and Projects.
 * Replaces the isolated 2D dot grids with a continuous, responsive, interactive 3D particle field.
 */

(function () {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded.');
        return;
    }

    class ThreeGlobalExperience {
        constructor() {
            this.scrollWrapper = document.getElementById('scroll-wrapper');
            this.main = document.querySelector('main');
            if (!this.scrollWrapper || !this.main) return;

            // Dimensions
            this.width = this.scrollWrapper.clientWidth;
            this.height = this.scrollWrapper.clientHeight;

            // Interaction state
            this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
            this.mouseClient = { x: -1000, y: -1000, active: false };
            this.scrollOffset = 0;
            this.scrollVel = 0;
            this.lastScrollOffset = 0;
            this.clock = new THREE.Clock();
            this.ripples = [];

            this.initScene();
            this.createParticleUniverse();
            this.createOrbs();
            this.bindEvents();
            this.startLoop();
        }

        initScene() {
            this.scene = new THREE.Scene();

            // Background fog seamlessly matching --bg (#1a282c)
            this.scene.fog = new THREE.FogExp2(0x1a282c, 0.00075);

            this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 1, 4000);
            this.camera.position.set(0, 240, 560);
            this.camera.lookAt(0, -30, 0);

            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: window.devicePixelRatio < 2,
                powerPreference: 'high-performance'
            });
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            const canvas = this.renderer.domElement;
            canvas.className = 'three-global-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '0';

            // Insert into scrollWrapper behind content
            this.scrollWrapper.style.position = 'fixed';
            this.scrollWrapper.insertBefore(canvas, this.scrollWrapper.firstChild);

            // Make main sit properly above canvas
            if (this.main) {
                this.main.style.position = 'relative';
                this.main.style.zIndex = '1';
            }
        }

        createParticleUniverse() {
            const isMobile = window.innerWidth <= 768;

            // Continuous 3D field spanning the entire scroll journey
            this.cols = isMobile ? 60 : 100;
            this.rows = isMobile ? 80 : 140;
            const count = this.cols * this.rows;

            this.spacingX = isMobile ? 18 : 20;
            this.spacingZ = isMobile ? 24 : 30;

            const positions = new Float32Array(count * 3);
            const basePositions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            // Theme colors
            const cIvory = new THREE.Color(0xebd9cd);    // Core warm cream (#ebd9cd)
            const cCoral = new THREE.Color(0xf27d52);    // Coral accent highlight
            const cDark = new THREE.Color(0x2d464d);     // Deep teal tone

            const totalW = (this.cols - 1) * this.spacingX;
            const totalD = (this.rows - 1) * this.spacingZ;

            let idx = 0;
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    const x = (i * this.spacingX) - (totalW / 2);
                    // Extending down along Z as you scroll
                    const z = (j * this.spacingZ) - 300;
                    const y = 0;

                    const i3 = idx * 3;
                    positions[i3] = x;
                    positions[i3 + 1] = y;
                    positions[i3 + 2] = z;

                    basePositions[i3] = x;
                    basePositions[i3 + 1] = y;
                    basePositions[i3 + 2] = z;

                    // Color gradient & subtle accent distribution
                    const distRatio = Math.sqrt(x * x + (z + 200) * (z + 200)) / (totalW * 0.7);
                    const color = cIvory.clone().lerp(cDark, Math.min(1, Math.max(0, distRatio * 0.75)));
                    if (Math.random() > 0.93) {
                        color.lerp(cCoral, 0.55);
                    }

                    colors[i3] = color.r;
                    colors[i3 + 1] = color.g;
                    colors[i3 + 2] = color.b;

                    idx++;
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particleTexture = this.generateParticleTexture();

            const material = new THREE.PointsMaterial({
                size: isMobile ? 6 : 7.5,
                map: particleTexture,
                vertexColors: true,
                transparent: true,
                opacity: 0.82,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            this.particleSystem = new THREE.Points(geometry, material);
            this.scene.add(this.particleSystem);

            this.basePositions = basePositions;
            this.particleCount = count;

            // Ambient floating stardust across depth
            const dustCount = isMobile ? 50 : 120;
            const dustPositions = new Float32Array(dustCount * 3);
            const dustColors = new Float32Array(dustCount * 3);

            for (let d = 0; d < dustCount; d++) {
                const d3 = d * 3;
                dustPositions[d3] = (Math.random() - 0.5) * 1600;
                dustPositions[d3 + 1] = Math.random() * 500 - 80;
                dustPositions[d3 + 2] = (Math.random() - 0.2) * 3500;

                const c = Math.random() > 0.4 ? cIvory : cCoral;
                dustColors[d3] = c.r;
                dustColors[d3 + 1] = c.g;
                dustColors[d3 + 2] = c.b;
            }

            const dustGeometry = new THREE.BufferGeometry();
            dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
            dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

            const dustMaterial = new THREE.PointsMaterial({
                size: 4.5,
                map: particleTexture,
                vertexColors: true,
                transparent: true,
                opacity: 0.4,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            this.dustSystem = new THREE.Points(dustGeometry, dustMaterial);
            this.scene.add(this.dustSystem);
        }

        createOrbs() {
            // Elegant geometric structures marking milestones along the scroll path
            this.orbs = [];

            // Orb 1: Hero section (top right)
            this.orbs.push(this.buildGeometricNode(240, 90, -200, 75, 115));

            // Orb 2: Case Studies transition (mid depth)
            this.orbs.push(this.buildGeometricNode(-260, 60, 900, 65, 100));

            // Orb 3: Projects section
            this.orbs.push(this.buildGeometricNode(280, 50, 2000, 70, 110));
        }

        buildGeometricNode(x, y, z, innerR, outerR) {
            const group = new THREE.Group();

            const innerGeo = new THREE.IcosahedronGeometry(innerR, 2);
            const innerMat = new THREE.MeshBasicMaterial({
                color: 0xebd9cd,
                wireframe: true,
                transparent: true,
                opacity: 0.12
            });
            const inner = new THREE.Mesh(innerGeo, innerMat);
            group.add(inner);

            const outerGeo = new THREE.IcosahedronGeometry(outerR, 1);
            const outerMat = new THREE.MeshBasicMaterial({
                color: 0xf27d52,
                wireframe: true,
                transparent: true,
                opacity: 0.08
            });
            const outer = new THREE.Mesh(outerGeo, outerMat);
            group.add(outer);

            group.position.set(x, y, z);
            this.scene.add(group);

            return { group, inner, outer, baseX: x, baseY: y, baseZ: z };
        }

        generateParticleTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.25, 'rgba(235, 217, 205, 0.85)');
            gradient.addColorStop(0.6, 'rgba(235, 217, 205, 0.2)');
            gradient.addColorStop(1, 'rgba(235, 217, 205, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 64, 64);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        bindEvents() {
            this.onResize = this.onResize.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.onClick = this.onClick.bind(this);

            window.addEventListener('resize', this.onResize, { passive: true });
            window.addEventListener('mousemove', this.onMouseMove, { passive: true });

            this.scrollWrapper.addEventListener('scroll', this.onScroll, { passive: true });
            window.addEventListener('scroll', this.onScroll, { passive: true });

            document.addEventListener('click', this.onClick);

            // Gyroscope tracking for mobile tilt
            window.addEventListener('deviceorientation', (e) => {
                if (e.gamma !== null && e.beta !== null) {
                    this.mouse.targetX = (e.gamma / 30) * 0.8;
                    this.mouse.targetY = ((e.beta - 40) / 30) * 0.8;
                }
            }, { passive: true });
        }

        onMouseMove(e) {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = -(e.clientY / window.innerHeight) * 2 + 1;
            this.mouse.targetX = nx;
            this.mouse.targetY = ny;
            this.mouseClient.x = e.clientX;
            this.mouseClient.y = e.clientY;
            this.mouseClient.active = true;
        }

        onClick(e) {
            this.ripples.push({
                time: this.clock.getElapsedTime(),
                worldX: this.mouse.x * 400,
                worldZ: this.camera.position.z - 450,
                life: 1.0
            });
            if (this.ripples.length > 5) this.ripples.shift();
        }

        onScroll() {
            const currentY = this.scrollWrapper ? this.scrollWrapper.scrollTop : window.scrollY;
            const delta = currentY - this.lastScrollOffset;
            this.scrollVel = Math.max(-40, Math.min(40, delta * 0.15));
            this.lastScrollOffset = currentY;
            this.scrollOffset = currentY;
        }

        onResize() {
            if (!this.scrollWrapper) return;
            this.width = this.scrollWrapper.clientWidth;
            this.height = this.scrollWrapper.clientHeight;

            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(this.width, this.height);
        }

        startLoop() {
            const animate = () => {
                requestAnimationFrame(animate);

                const elapsed = this.clock.getElapsedTime();

                // Smooth mouse lerp
                this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.055;
                this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.055;

                // Decay scroll velocity for fluid slosh
                this.scrollVel *= 0.91;
                if (Math.abs(this.scrollVel) < 0.02) this.scrollVel = 0;

                // Camera journey: smoothly advances through the 3D particle universe as the user scrolls
                // Continuous transition from Hero -> Case Studies -> Projects
                const scrollProgress = this.scrollOffset;
                const targetCamZ = 560 + scrollProgress * 0.75;
                const targetCamY = 240 + this.mouse.y * 65 - (this.scrollVel * 1.8);
                const targetCamX = this.mouse.x * 130;

                this.camera.position.x += (targetCamX - this.camera.position.x) * 0.08;
                this.camera.position.y += (targetCamY - this.camera.position.y) * 0.08;
                this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.08;

                // Look slightly ahead down the path
                this.camera.lookAt(
                    this.camera.position.x * 0.3,
                    -20,
                    this.camera.position.z - 450
                );

                // Animate terrain vertices
                const pos = this.particleSystem.geometry.attributes.position.array;
                const base = this.basePositions;
                const count = this.particleCount;

                // Proximity center
                const mouseWorldX = this.camera.position.x + (this.mouse.x * 250);
                const mouseWorldZ = this.camera.position.z - 380 - (this.mouse.y * 180);

                for (let i = 0; i < count; i++) {
                    const i3 = i * 3;
                    const bx = base[i3];
                    const bz = base[i3 + 2];

                    // Multi-frequency undulating wave field
                    const wave1 = Math.sin((bx * 0.01) + (elapsed * 1.4)) * 16;
                    const wave2 = Math.cos((bz * 0.009) + (elapsed * 1.1)) * 15;
                    const wave3 = Math.sin(((bx + bz) * 0.007) + (elapsed * 1.8)) * 12;

                    // Mouse proximity interactive reaction
                    const dx = bx - mouseWorldX;
                    const dz = bz - mouseWorldZ;
                    const distSq = dx * dx + dz * dz;
                    let mouseWave = 0;
                    if (distSq < 75000) {
                        const dist = Math.sqrt(distSq);
                        const factor = (1 - dist / 273);
                        mouseWave = Math.sin(factor * Math.PI) * 42;
                    }

                    // Inertial scroll slosh
                    const slosh = Math.sin(bx * 0.02 + elapsed * 3) * (this.scrollVel * 0.7);

                    // Click ripples
                    let rippleWave = 0;
                    for (let r of this.ripples) {
                        const dt = elapsed - r.time;
                        if (dt > 0 && dt < 2.5) {
                            const rDist = Math.sqrt((bx - r.worldX) ** 2 + (bz - r.worldZ) ** 2);
                            const rTarget = dt * 380;
                            const diff = Math.abs(rDist - rTarget);
                            if (diff < 70) {
                                rippleWave += Math.cos((diff / 70) * (Math.PI / 2)) * 32 * (1 - dt / 2.5);
                            }
                        }
                    }

                    pos[i3 + 1] = wave1 + wave2 + wave3 + mouseWave + slosh + rippleWave;
                }
                this.particleSystem.geometry.attributes.position.needsUpdate = true;

                // Animate milestone geometric orbs
                for (let orb of this.orbs) {
                    orb.group.rotation.y = elapsed * 0.12;
                    orb.group.rotation.x = elapsed * 0.08;
                    orb.inner.rotation.z = -elapsed * 0.15;
                    orb.outer.rotation.y = -elapsed * 0.18;
                    orb.group.position.y = orb.baseY + Math.sin(elapsed * 0.8 + orb.baseZ * 0.002) * 16;
                }

                // Ambient dust float
                if (this.dustSystem) {
                    const dustPos = this.dustSystem.geometry.attributes.position.array;
                    for (let d = 0; d < dustPos.length; d += 3) {
                        dustPos[d + 1] += Math.sin(elapsed + d) * 0.25;
                    }
                    this.dustSystem.geometry.attributes.position.needsUpdate = true;
                    this.dustSystem.rotation.y = elapsed * 0.015;
                }

                this.renderer.render(this.scene, this.camera);
            };

            animate();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.threeGlobalExperience = new ThreeGlobalExperience();
        });
    } else {
        window.threeGlobalExperience = new ThreeGlobalExperience();
    }
})();
