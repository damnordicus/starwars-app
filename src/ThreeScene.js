import { waitFor } from '@testing-library/react';
import React, { useRef, useEffect, useState, createElement } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from 'tween';
import "./ThreeScene.css"

const ThreeScene = ({ onPlanetClick, planetDatas, planetNames }) => {
  const mountRef = useRef(null);
  const [planet, setPlanet] = useState(null);
  const [planetData, setPlanetData] = useState([]);
  const planets = [];
  const [sceneReady, setSceneReady] = useState(false);
  let secretCounter = 0;

  let planetIdCounter = 0;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedPlanet = null;
  let ring = null;
  let runOnce = 0;
  //

  // const planetTexture = planetInfo.texture;
  // const planetSize = planetInfo.radius;

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

    const ambientLight = new THREE.AmbientLight(0x404040, 2.75);
    scene.add(ambientLight);

    // Starfield setup
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      map: new THREE.TextureLoader().load(`${process.env.PUBLIC_URL}/textures/circle.png`),
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
    setSceneReady(true);
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
          moveCameraToPlanet(intersectObject);
          onPlanetClick(intersectObject.planetId);

        } else if (intersectObject.name === "") {
          secretCounter++;
          if (secretCounter === 5) {
            alert("HMM....nothing to see here....");
          }
        }
      }
    };

    function moveCameraToPlanet(planet) {

      const planetWorldPosition = new THREE.Vector3();
      planet.getWorldPosition(planetWorldPosition);
      // Calculate the direction vector from the camera to the planet
      const direction = new THREE.Vector3().subVectors(planetWorldPosition, camera.position).normalize();

      // Position the camera 100 units away from the planet
      const distance = 50 + planet.radius;
      const newCameraPosition = new THREE.Vector3().addVectors(planetWorldPosition, direction.multiplyScalar(-distance));

      new TWEEN.Tween(camera.position)
        .to({ x: newCameraPosition.x, y: newCameraPosition.y, z: newCameraPosition.z }, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          camera.lookAt(planetWorldPosition);
        })
        .onComplete(() => {
          controls.target.copy(planetWorldPosition);
          controls.update();
        })
        .start();

      new TWEEN.Tween(controls.target)
        .to({ x: planetWorldPosition.x, y: planetWorldPosition.y, z: planetWorldPosition.z }, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          controls.update();
        })
        .start();

      // Update the camera position and make it look at the planet
      camera.position.copy(newCameraPosition);
      camera.lookAt(planetWorldPosition);
      controls.target.copy(planetWorldPosition);  // Update OrbitControls target
      controls.update();
    }

    const planetTextureLoader = new THREE.TextureLoader();

    function createPlanet(id, texturePath, radius, widthSegments, heightSegments, position) {
      function checkSceneReady() {
        if (sceneReady) {
          const texture = planetTextureLoader.load(texturePath);
          const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
          const material = new THREE.MeshStandardMaterial({ map: texture });
          const planetMesh = new THREE.Mesh(geometry, material);

          planetMesh.planetId = id;//planetNames[planetIdCounter++];
          planetMesh.radius = radius;

          planetMesh.position.set(position.x, position.y, position.z);

          scene.add(planetMesh);
          planets.push(planetMesh);


          return planetMesh;
        } else {
          setTimeout(checkSceneReady, 100);
        }
      }
      checkSceneReady();
    }


    // You can create more planets dynamically in a loop if needed
    const numberOfPlanets = 10;
    if (runOnce === 0) {
      for (let i = 0; i < numberOfPlanets; i++) {
        let x = Math.random() * 500 - 50; // Random x position
        let y = Math.random() * 500 - 50; // Random y position
        let z = Math.random() * 500 - 100; // Random z position

        let radius = (parseInt(planetDatas[i].diameter) / 1000);

        x += radius;
        y += radius;
        z += radius;

        const planet = createPlanet(i + 1, `${process.env.PUBLIC_URL}/textures/${planetDatas[i].name}.jpg`, radius, 32, 32, { x, y, z });
        //const planet = createPlanet(planetTexture, planetSize, 32, 32, { x, y, z });
        //setPlanetData(prev => [...prev, planet]);
        setPlanet(planet);
      }
      runOnce++;
    }

    console.log(planetData);


    const ringGeometry = new THREE.RingGeometry(11.5, 12, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.visible = false;
    scene.add(ring);

    // DOM element for displaying planet ID
    const planetIdLabel = document.createElement('div');
    planetIdLabel.style.position = 'absolute';
    planetIdLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    planetIdLabel.style.padding = '5px';
    planetIdLabel.style.display = 'none';
    document.body.appendChild(planetIdLabel);

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Check if the intersected object is a planet
        if (intersectedObject.planetId !== undefined) {
          // Update ring position and visibility
          ring.position.copy(intersectedObject.position);

          const planetRadius = intersectedObject.radius;
          ring.geometry.dispose();
          ring.geometry = new THREE.RingGeometry(planetRadius * 1.1, planetRadius * 1.2, 100);

          ring.visible = true;

          // Display the planet ID
          planetIdLabel.style.display = 'block';
          planetIdLabel.style.left = `${event.clientX + 10}px`;
          planetIdLabel.style.top = `${event.clientY + 10}px`;

          planetIdLabel.innerHTML = `Planet ID: ${planetDatas[intersectedObject.planetId - 1].name}`;

          selectedPlanet = intersectedObject;
        } else {
          ring.visible = false;
          planetIdLabel.style.display = 'none';
          selectedPlanet = null;
        }
      } else {
        ring.visible = false;
        planetIdLabel.style.display = 'none';
        selectedPlanet = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
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
      for (let i = 0; i < planets.length; i++) {
        planets[i].rotation.y += 0.002;
      }
      if (ring.visible) {
        ring.lookAt(camera.position);
      }
      scene.rotation.y += 0.0001;
      controls.update();
      TWEEN.update();
      renderer.render(scene, camera);
    };

    const handleButtonClick = (planetId) => {
      const planet = planets.find(p => p.planetId === planetId);
      if (planet) {
        moveCameraToPlanet(planet);
      }
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [sceneReady]);


  return <div ref={mountRef} style={{ position: 'relative' }} >
    <div className="overlay"></div>
  </div>;
};
//update
export default ThreeScene;