class View {
    init(positions) {
        let WIDTH = window.innerWidth;
        let HEIGHT = window.innerHeight;
        this.sizeDefault = 6;
        this.count = positions.length / 3;
        this.heightScale = HEIGHT / 1000;
        this.widthScale = WIDTH / 1000;
        this.camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
        this.camera.position.z = 260;
        this.scene = new THREE.Scene();

        this.uniforms = {
            size:      { value: this.sizeDefault },
            color:     { value: new THREE.Color( 0xffffff ) },
            texture:   { value: new THREE.TextureLoader().load( "sprites/led.png" ) }
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
        const height = this.geometry.boundingBox.max.y - this.geometry.boundingBox.min.y;
        const width = this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x;
        const depth = this.geometry.boundingBox.max.z - this.geometry.boundingBox.min.z;
        const heightHalf = height / 2;
        const widthHalf = width / 2;
        const depthHalf = depth / 2;
        const cam_z_height = height / Math.tan( Math.PI * this.camera.fov / 360 ) - 14;
        const cam_z_width = width / Math.cos( Math.PI * this.camera.fov / 360 ) - 14
        // Position camera to fit whichever dimension is larger
        // Add the depth to that the camera is not in the center of a 3D object
        this.camera.position.z =
            (((cam_z_height >= cam_z_width) ? cam_z_height : cam_z_width) + depth)

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
        this.renderer.setSize( WIDTH, HEIGHT );
        document.body.appendChild( this.renderer.domElement );
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
    }
    onWindowResize() {
        this.heightScale = window.innerHeight / 1000;
        this.widthScale = window.innerWidth / 1000;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.adjustViewportFields();
    }
    adjustViewportFields() {
        this.material.uniforms.size.value = this.sizeDefault * this.heightScale;
    }
    destroy() {
        console.error('View.destroy NOT IMPLEMENTED');
    }
}
