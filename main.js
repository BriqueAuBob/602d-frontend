import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const platformRadius = 5;
const platformGeometry = new THREE.CylinderGeometry(
  platformRadius,
  platformRadius,
  0.5,
  32
);
const platformMaterial = new THREE.MeshStandardMaterial({ color: 0x009900 });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.set(0, -0.25, 0);
scene.add(platform);

const playerGeometry = new THREE.SphereGeometry(0.75, 16, 16);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 0.5, 0);
scene.add(player);

let isGameOver = false;
let rocks = [];
const speed = 0.03;
let playerVelocity = { x: 0, z: 0 };

function createRock() {
  if (isGameOver) return;

  const geometry = new THREE.DodecahedronGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const rock = new THREE.Mesh(geometry, material);

  rock.position.set((Math.random() - 0.5) * 5, 8, (Math.random() - 0.5) * 5);
  scene.add(rock);
  rocks.push(rock);
}

function updateRocks() {
  rocks.forEach((rock, index) => {
    rock.position.y -= 0.1;

    if (
      rock.position.y <= 1 &&
      rock.position.distanceTo(player.position) < 0.7
    ) {
      scene.remove(rock);
      rocks.splice(index, 1);
    } else if (rock.position.y < 0) {
      gameOver();
    }
  });
}

// Game over function
function gameOver() {
  isGameOver = true;
  alert("Game Over! Reload to play again.");
}

// Smooth player movement
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    playerVelocity.x = -speed * 10;
  } else if (event.code === "ArrowRight") {
    playerVelocity.x = speed * 10;
  } else if (event.code === "ArrowUp") {
    playerVelocity.z = -speed * 10;
  } else if (event.code === "ArrowDown") {
    playerVelocity.z = speed * 10;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    playerVelocity.x = 0;
  } else if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    playerVelocity.z = 0;
  }
});

setInterval(createRock, 1000);

function animate() {
  if (!isGameOver) {
    updateRocks();

    let newX = player.position.x + playerVelocity.x;
    let newZ = player.position.z + playerVelocity.z;

    let distance = Math.sqrt(newX * newX + newZ * newZ);
    if (distance < platformRadius - 0.5) {
      gsap.to(player.position, {
        x: newX,
        z: newZ,
        duration: 0.1,
        ease: "power1.out",
      });
    }
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
