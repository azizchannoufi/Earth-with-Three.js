import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('img/earthmap1k.jpg');

const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const transparentTextureLoader = new THREE.TextureLoader();
const transparentTexture = transparentTextureLoader.load('img/earthlights1k.jpg');

const transparentMaterial = new THREE.MeshBasicMaterial({
    map: transparentTexture,
    transparent: true,
    opacity: 0.5
});

const transparentSphere = new THREE.Mesh(geometry, transparentMaterial);
scene.add(transparentSphere);

const transparentTextureLoader2 = new THREE.TextureLoader();
const transparentTexture2 = transparentTextureLoader2.load('img/earthcloudmap.jpg');

const transparentMaterial2 = new THREE.MeshBasicMaterial({
    map: transparentTexture2,
    transparent: true,
    opacity: 0.2
});

const transparentSphere2 = new THREE.Mesh(geometry, transparentMaterial2);
scene.add(transparentSphere2);

// Création de la flèche
const arrowGeometry = new THREE.CylinderGeometry(0, 0.1, 1, 8);
const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
scene.add(arrow);

// Fonction pour animer la rotation de la flèche
function animateArrowRotation() {
    new TWEEN.Tween({ rotation: 0 })
        .to({ rotation: Math.PI * 2 }, 2000) // Une rotation complète en 2 secondes
        .onUpdate(({ rotation }) => {
            arrow.rotation.y = rotation; // Met à jour la rotation de la flèche
        })
        .repeat(Infinity) // Répète l'animation indéfiniment
        .start(); // Démarrer l'animation
}

animateArrowRotation(); // Appeler la fonction pour démarrer l'animation de rotation de la flèche

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update(); // Mettre à jour les animations Tween.js
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// Création de la géométrie d'un demi-cercle
const radius = 1; // Rayon du demi-cercle
const segments = 1 // Nombre de segments pour le cercle
const arcAngle = 1; // Angle de l'arc (demi-cercle)
const circleGeometry = new THREE.CircleGeometry(radius, segments, 5, arcAngle);

// Création du matériau du demi-cercle
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

// Création du demi-cercle
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.rotation.x = Math.PI / 2; // Pour le placer dans le plan XY
scene.add(circle);

// Fonction pour animer le déplacement du cercle autour de la sphère
function animateCircleMovement() {
    new TWEEN.Tween({ angle: 2 })
        .to({ angle: Math.PI * 2 }, 10000) // Un tour complet en 10 secondes
        .onUpdate(({ angle }) => {
            const radius = 2.2; // Rayon du cercle
            const x = Math.cos(angle) * radius; // Calcul de la nouvelle position en X
            const y = Math.sin(angle) * radius; // Calcul de la nouvelle position en Y
            circle.position.set(x, y, 0); // Définition de la nouvelle position du cercle
        })
        .repeat(Infinity) // Répéter l'animation indéfiniment
        .start(); // Démarrer l'animation
}

animateCircleMovement(); // Appeler la fonction pour démarrer l'animation de déplacement du cercle
