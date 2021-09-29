function main() {
    /**
     * @type {HTMLCanvasElement} canvas
     */
    var canvas = document.getElementById("myCanvas");

    /**
     * @type {WebGLRenderingContext} gl
     */
    var gl = canvas.getContext('webgl')

    // Define vertices data for three points

    // var vertices = [
    //    (5.200,2.200), (5.000,4.700), (4.600,5.000), (4.200,5.400), (4.000,6.000), (4.200,6.600), (3.300,6.500), (3.000,6.200), (4.400,4.800), (2.000,2.500), (0.500,4.000), (2.500,6.000), (3.200,6.600), (4.700,6.800), (5.600,6.800), (6.200,6.500), (6.300,5.900), (6.100,5.200), (5.600,4.700), (5.500,2.200)  
    // ];

    var vertices = [
        0.47, 0.68, 0.0, 1.0, 1.0,
        0.56, 0.68, 0.0, 1.0, 1.0,
        0.62, 0.65, 0.0, 1.0, 1.0,
        0.63, 0.59, 0.0, 1.0, 1.0,
        0.61, 0.52, 0.0, 1.0, 1.0,
        0.56, 0.47, 0.0, 1.0, 1.0,
        0.55, 0.22, 0.0, 1.0, 1.0,
        0.52, 0.22, 0.0, 1.0, 1.0,
        0.5, 0.47, 0.0, 1.0, 1.0,
        0.46, 0.5, 0.0, 1.0, 1.0,
        0.42, 0.54, 0.0, 1.0, 1.0,
        0.4, 0.6, 0.0, 1.0, 1.0,
        0.42, 0.66, 0.0, 1.0, 1.0,
        0.33, 0.65, 0.0, 1.0, 1.0,
        0.3, 0.62, 0.0, 1.0, 1.0,
        0.44, 0.48, 0.0, 1.0, 1.0,
        0.2, 0.25, 0.0, 1.0, 1.0,
        0.05, 0.4, 0.0, 1.0, 1.0,
        0.25, 0.6, 0.0, 1.0, 1.0,
        0.32, 0.66, 0.0, 1.0, 1.0,
    ]

    /**
     * @type {WebGLBuffer} buffer
     */
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    /**
     * @type {WebGLShader} vertexShader
     */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);

    /**
     * @type {WebGLShader} vertexShader
     */
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    
    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    /**
     * @type {WebGLProgram} shaderProgram
     */
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
    }
    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    var speedRaw = 1;
    var speed = speedRaw / 600;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    function render() {
        if (!freeze) {  // If it is not freezing, then animate the rectangle
            if (change >= 0.25 || change <= -0.25) speed = -speed;
            change = change + speed;
            gl.uniform1f(uChange, change);
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.LINE_LOOP;
        var offset = 0;
        var nVertex = 20;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}