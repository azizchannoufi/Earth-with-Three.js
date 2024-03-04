import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('img/earthspec1k.jpg');

const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

function onMouseMove(event) {
    const deltaMove = {
        x: event.offsetX - previousMousePosition.x,
        y: event.offsetY - previousMousePosition.y
    };

    if (isDragging) {
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        sphere.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphere.quaternion);
    }

    previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY
    };
}

function onMouseDown(event) {
    isDragging = true;
}

function onMouseUp(event) {
    isDragging = false;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();
