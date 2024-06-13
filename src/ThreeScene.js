import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = ({ onPlanetClick }) => {
  const mountRef = useRef(null);
  const [planet, setPlanet] = useState(null);
  const planets = [];

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      map: new THREE.TextureLoader().load('circle.png'),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const planetTextureLoader = new THREE.TextureLoader();

    // CHANGED: Added 'id' parameter to the createPlanet function
    // NOTE - Make key value pair with the ID being the key and the uri to the fetched planet data as the value for easy access
    function createPlanet(id, texturePath, radius, widthSegments, heightSegments, position) {
      const texture = planetTextureLoader.load(texturePath);
      const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const planetMesh = new THREE.Mesh(geometry, material);

      // CHANGED: Set the planetId to the provided 'id' parameter
      planetMesh.planetId = id;

      planetMesh.position.set(position.x, position.y, position.z);
      scene.add(planetMesh);
      planets.push(planetMesh);

      return planetMesh;
    }

    const numberOfPlanets = 5;
    for (let i = 0; i < numberOfPlanets; i++) {
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() * 200 - 100;
      // CHANGED: Pass 'i + 1' as the ID to createPlanet function to ensure IDs start from 1
      const planet = createPlanet(i + 1, '../dirt.jpg', 10, 32, 32, { x, y, z });
      setPlanet(planet);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectObject = intersects[0].object;
        if (intersectObject.planetId !== undefined) {
          onPlanetClick(intersectObject.planetId);
        }
      }
    };

    window.addEventListener('click', onMouseClick, false);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      requestAnimationFrame(animate);
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

export default ThreeScene;
