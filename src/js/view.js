class View {
    constructor(parent=document.body) {
        if (typeof parent === 'string') {
            // selector
            this.parent = document.querySelector(parent);
        }
        else {
            // node
            this.parent = parent;
        }
    }
    init(positions) {
        this.removeParticleSystem(); // in case we were initialized already
        this.WIDTH = this.parent.offsetWidth;
        this.HEIGHT = this.parent.offsetHeight;
        this.sizeDefault = 5;
        this.count = positions.length / 3;
        this.heightScale = Math.max(1, this.HEIGHT / 1000);
        this.widthScale = this.WIDTH / 1000;
        this.camera = new THREE.PerspectiveCamera( 40, this.WIDTH / this.HEIGHT, 1, 10000 );
        this.camera.position.z = 400;
        this.scene = new THREE.Scene();

        this.uniforms = {
            size:       { value: this.sizeDefault },
            color:      { value: new THREE.Color( 0xffffff ) },
            textureOn:  { value: new THREE.TextureLoader().load( "sprites/led-on.png" ) },
            textureOff: { value: new THREE.TextureLoader().load( "sprites/led-off.png" ) },
        };
        this.material = new THREE.ShaderMaterial( {
            uniforms:       this.uniforms,
            vertexShader:   document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true,
        });
        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array( this.count * 3 );
        this.colors = new Float32Array( this.count * 3 );
        this.positions.set(positions);
        this.geometry.addAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );
        this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( this.colors, 3 ) );
        this.particleSystem = new THREE.Points( this.geometry, this.material );
        this.scene.add( this.particleSystem );

        // calculate ideal camera distance
        this.geometry.computeBoundingBox();
        const width = this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x;
        const height = this.geometry.boundingBox.max.y - this.geometry.boundingBox.min.y;
        const depth = this.geometry.boundingBox.max.z - this.geometry.boundingBox.min.z;
        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const depthHalf = depth / 2;
        const cam_z_height = height / Math.tan( Math.PI * this.camera.fov / 360 ) * 0.6;
        const cam_z_width = width / Math.cos( Math.PI * this.camera.fov / 360 ) * 1.4;
        // Position camera to fit whichever dimension is larger
        // Add the depth to that the camera is not in the center of a 3D object
        this.camera.position.z =
            (((cam_z_height >= cam_z_width) ? cam_z_height : cam_z_width) + depth + 10)

        for ( let i = 0, i3 = 0; i < this.count; i ++, i3 = i3 + 3 ) {
            this.positions[ i3 + 0 ] -= widthHalf;
            this.positions[ i3 + 1 ] -= heightHalf;
            this.positions[ i3 + 2 ] -= depthHalf;

            this.colors[ i3 + 0 ] = 1;
            this.colors[ i3 + 1 ] = 1;
            this.colors[ i3 + 2 ] = 1;
        }

        this.adjustViewportFields();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.WIDTH, this.HEIGHT );
        this.parent.appendChild( this.renderer.domElement );
        //
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableZoom = true;

        // start animation loop
        this.animate();
    }
    render() {
        this.renderer.render( this.scene, this.camera );
    }
    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
    }
    /**
     * @param {Uint8Array} colors new LED colors
     */
    update(colors) {
        this.colors.set(colors);
        // for ( let i = 0, i3 = 0; i < this.count; i++, i3 = i3 + 3 ) {
        //     this.colors[ i3 + 0 ] = (Math.random() + 0.5);
        //     this.colors[ i3 + 1 ] = (Math.random() + 0.5);
        //     this.colors[ i3 + 2 ] = (Math.random() + 0.5);
        // }
        this.geometry.attributes.customColor.needsUpdate = true;
        this.particleSystem.rotation.y += Math.PI / 2048;
    }
    onWindowResize() {
        this.WIDTH = this.parent.offsetWidth;
        this.HEIGHT = this.parent.offsetHeight;
        this.widthScale = this.WIDTH / 1000;
        this.heightScale = Math.max(1, this.HEIGHT / 1000);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.WIDTH, this.HEIGHT );
        this.adjustViewportFields();
    }
    adjustViewportFields() {
        this.material.uniforms.size.value = this.sizeDefault * this.heightScale;
    }
    removeParticleSystem() {
        // this shouldbe enough to free all memory, making re-initialization
        // free of memory leaks

        // if we've been initialized before
        if (this.scene) {
            console.log(`removing old particle system`);
            this.scene.remove(this.particleSystem);
            this.particleSystem.geometry.dispose(); // free geometry
            this.particleSystem.material.uniforms.textureOn.value.dispose(); // free LED-on texture
            this.particleSystem.material.uniforms.textureOff.value.dispose(); // free LED-off texture
            this.particleSystem.material.dispose(); // free material
            this.renderer.dispose(); // free renderer
            this.renderer.domElement.remove(); // remove the canvas
        }
    }
    destroy() {
        console.log(`destroying`);
        this.removeParticleSystem();
    }
}
