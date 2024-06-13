import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const ThreeScene = ({ onPlanetClick }) => {
  const mountRef = useRef(null);
  const [planet, setPlanet] = useState(null);
  const planets = [];
  let planetIdCounter = 0;

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 20);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting setup
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Starfield setup
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      map: new THREE.TextureLoader().load('circle.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });//({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }

    // Load a Star Wars Model (e.g., X-Wing)
    // const loader = new OBJLoader();
    // loader.load('starwars_model.obj', (object) => {
    //     object.position.set(0,0,0);
    //     scene.add(object);
    // },(xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    //   },
    //   (error) => {
    //     console.error('An error happened', error);
    //   }
    // );
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Planet setup

    // Raycaster setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {//&& intersects[0].object === typeof(Mesh)) {
        const intersectObject = intersects[0].object;

        if (intersectObject.planetId !== undefined) {
          onPlanetClick(intersectObject.planetId);
        }
      }
    };

    const planetTextureLoader = new THREE.TextureLoader();

    function createPlanet(texturePath, radius, widthSegments, heightSegments, position) {
      const texture = planetTextureLoader.load(texturePath);
      const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const planetMesh = new THREE.Mesh(geometry, material);

      planetMesh.planetId = planetIdCounter++;

      planetMesh.position.set(position.x, position.y, position.z);
      scene.add(planetMesh);
      planets.push(planetMesh);

      return planetMesh;
    }

    // Example usage:
    // const planet1 = createPlanet('../dirt.jpg', 10, 32, 32, { x: 0, y: 0, z: -50 });
    // setPlanet(planet1);


    // You can create more planets dynamically in a loop if needed
    const numberOfPlanets = 5;
    for (let i = 0; i < numberOfPlanets; i++) {
      const x = Math.random() * 100 - 50; // Random x position
      const y = Math.random() * 100 - 50; // Random y position
      const z = Math.random() * 200 - 100; // Random z position
      const planet = createPlanet('../dirt.jpg', 10, 32, 32, { x, y, z });
      setPlanet(planet);
    }

    window.addEventListener('click', onMouseClick, false);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // planetMesh.rotation.y += 0.001;
      scene.rotation.y += 0.0001;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};
//update
export default ThreeScene;