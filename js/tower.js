import * as THREE from "three";
// import { TWEEN } from 'https://unpkg.com/three@0.142.0/examples/jsm/libs/tween.module.min.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.142.0/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.142.0/examples/jsm/controls/OrbitControls.js';
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 7000 );

function main(z_coord, y_coord, activateAnimation) {
    const canvas = document.querySelector('#tower-canvas');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0 );
    
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x1e1e1e );
    
    const ambientLight = new THREE.AmbientLight( 0x404040, 2.3 );
    scene.add( ambientLight );
    // const axesHelper = new THREE.AxesHelper( 1000 );
    // scene.add( axesHelper );

    // Tower model loading section
    const loader = new GLTFLoader();
    let tower;
    loader.load( './model/tower_origin.gltf', function ( gltf ) {
        // console.log(gltf)
        tower = gltf.scene;
        tower.position.setZ(z_coord)
        tower.position.setY(y_coord)
        scene.add( tower );
    }, function(xhr) {
        // console.log((xhr.loaded/xhr.total * 100) + "% loaded")
    }, function ( error ) {
        console.error( error );
    } );
    
    // Light section
    const light = new THREE.DirectionalLight(0xffffff, 0.4)
    light.position.set(2,2,5);
    scene.add(light);
    
    // // Animation section
    function lerp(x, y, a){
        return (1 - a) * x + a * y
    }
    function scalePercent(start, end) {
        return (scrollPercent - start) / (end - start);
    }
    
    const animationScripts = [];
    //add an animation that moves the cube through 100 percent of scroll
    animationScripts.push({
        start: 0,
        end: 101,
        func: () => {
            if (tower) tower.rotation.y += 0.0025;
        },
    })
    //add an animation that moves the cube through first 3 percent of scroll
    animationScripts.push({
        start: 0,
        end: 3,
        func: () => {
            camera.lookAt(new THREE.Vector3(0,250,500))
            gotoGSAP0();
            if(tower) tower.rotation.x = lerp(0, 0.25, scalePercent(0, 10))
        },
    })
    
    //add an animation that rotates the cube between 3-100 percent of scroll
    animationScripts.push({
        start: 3,
        end: 6,
        func: () => {
            if(activateAnimation){
                // console.log("act 1")
                gotoGSAP1();
            }
        }
    })

    animationScripts.push({
        start: 6,
        end: 9,
        func: () => {
            if(activateAnimation){
                // console.log("act 2")
                gotoGSAP2();
            }
        }
    })

    animationScripts.push({
        start: 9,
        end: 14,
        func: () => {
            if(activateAnimation){
                // console.log("act 3")
                gotoGSAP3();
            }
        }
    })

    animationScripts.push({
        start: 14,
        end: 17,
        func: () => {
            if(activateAnimation){
                // console.log("act 4")
                gotoGSAP4();
            }
        }
    })

    animationScripts.push({
        start: 17,
        end: 22,
        func: () => {
            if(activateAnimation){
                // console.log("act 5")
                gotoGSAP5();
            }
        }
    })

    animationScripts.push({
        start: 22,
        end: 28,
        func: () => {
            if(activateAnimation){
                // console.log("act 6")
                gotoGSAP6();
            }
        }
    })

    animationScripts.push({
        start: 28,
        end: 33,
        func: () => {
            if(activateAnimation){
                // console.log("act 7")
                gotoGSAP7();
            }
        }
    })

    animationScripts.push({
        start: 33,
        end: 38,
        func: () => {
            if(activateAnimation){
                // console.log("act 8")
                gotoGSAP8();
            }
        }
    })

    animationScripts.push({
        start: 38,
        end: 55,
        func: () => {
            if(activateAnimation){
                // console.log("act 9")
                gotoGSAP9();
            }
        }
    })

    animationScripts.push({
        start: 55,
        end: 60,
        func: () => {
            if(activateAnimation){
                // console.log("act 10")
                gotoGSAP10();
            }
        }
    })

    animationScripts.push({
        start: 60,
        end: 65,
        func: () => {
            if(activateAnimation){
                // console.log("act 11")
                gotoGSAP11();
            }
        }
    })

    animationScripts.push({
        start: 65,
        end: 76,
        func: () => {
            if(activateAnimation){
                // console.log("act 12")
                gotoGSAP12();
            }
        }
    })

    animationScripts.push({
        start: 76,
        end: 86,
        func: () => {
            if(activateAnimation){
                // console.log("act 13")
                gotoGSAP13();
            }
        }
    })

    animationScripts.push({
        start: 86,
        end: 101,
        func: () => {
            if(activateAnimation){
                // console.log("act 14")
                gotoGSAP14();
            }
        }
    })

    function playScrollAnimations() {
        animationScripts.forEach((a) => {
            if (scrollPercent >= a.start && scrollPercent < a.end) {
                a.func()
            }
        })
    }

    let scrollPercent = 0

    document.body.onscroll = () => {
        //calculate the current scroll progress as a percentage
        scrollPercent =
            ((document.documentElement.scrollTop || document.body.scrollTop) /
                ((document.documentElement.scrollHeight ||
                    document.body.scrollHeight) -
                    document.documentElement.clientHeight)) * 100;
        // console.log(scrollPercent.toFixed(2))
    }

    function animate() {
        requestAnimationFrame(animate);
        playScrollAnimations();
        renderer.render(scene, camera);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    animate();

}

function gotoGSAP0() {
    var tween = gsap.to(camera.position, {x:850, y:350, z:550, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP1() {
    var tween = gsap.to(camera.position, {x:70.53, y:258.04, z:682.54, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP2() {
    var tween = gsap.to(camera.position, {x:103.55, y:202.82, z:695.56, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP3() {
    var tween = gsap.to(camera.position, {x:159.81, y:216.71, z:625.73, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP4() {
    var tween = gsap.to(camera.position, {x:130.72, y:181.65, z:618.38, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP5() {
    var tween = gsap.to(camera.position, {x:115.95, y:164.3, z:707.38, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP6() {
    var tween = gsap.to(camera.position, {x:60.7, y:116.93, z:719.22, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP7() {
    var tween = gsap.to(camera.position, {x:87.81, y:90.933, z:735.6, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP8() {
    var tween = gsap.to(camera.position, {x:202.69, y:116.93, z:694.32, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP9() {
    var tween = gsap.to(camera.position, {x:130, y:182.58, z:623.83, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP10() {
    var tween = gsap.to(camera.position, {x:127.85, y:242.56, z:729.69, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP11() {
    var tween = gsap.to(camera.position, {x:107.88, y:182.58, z:887.47, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP12() {
    var tween = gsap.to(camera.position, {x:138.63, y:104.01, z:717.06, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP13() {
    var tween = gsap.to(camera.position, {x:242.98, y:362.73, z:705.7, duration: 2.2, ease: 'power4' });
    tween.play();
}
function gotoGSAP14() {
    var tween = gsap.to(camera.position, {x:526.19, y:295.91, z:661.98, duration: 2.2, ease: 'power4' });
    tween.play();
}

export { main }

