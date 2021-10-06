function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

let canvas = document.getElementById('myCanvas');
let gl = canvas.getContext('experimental-webgl');

let vertices = [
	...k2_badan, ...k2_bawah,...k2_ujung, ...k2_ujung_bawah, ...k2_kotak, ...k2_kotak_bawah, ...k2_hubung, 
	...k1_badan, ...k1_bawah, ...k1_ujung, ...k1_ujung_2, ...k1_kotak,...k1_kotak_bawah, ...k1_hubung
];

let vertexShaderCode = `
	attribute vec2 a_position;
	attribute vec4 a_color;
	varying vec4 v_color;
	uniform mat4 u_matrix;

	void main() {
		gl_Position = u_matrix * vec4(a_position, 0, 1.65);
		v_color = a_color;
	}
`;
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);


let fragmentShaderCode = `
	precision mediump float;
	varying vec4 v_color;

	void main() {
		gl_FragColor = v_color;
	}
`;
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

let coords = gl.getAttribLocation(shaderProgram, "a_position");
var colorLocation = gl.getAttribLocation(shaderProgram, "a_color");

var color = [];

function makeColor(item, r, g, b) {
	for (let i = 0; i < item.length/2; i++) {
		color.push(r);
		color.push(g);
		color.push(b);
		color.push(1);
	}
}

// Kunci 2
makeColor(k2_badan, 0.60, 0.60, 0.60);
makeColor(k2_bawah, 0.45, 0.45, 0.45);
makeColor(k2_ujung, 0.85, 0.85, 0.85);
makeColor(k2_ujung_bawah, 0.65, 0.65, 0.65);
makeColor(k2_kotak, 0.87, 0.65, 0.47);
makeColor(k2_kotak_bawah, 0.80, 0.60, 0.37);
makeColor(k2_hubung, 0.85, 0.85, 0.85);

// Kunci 1
makeColor(k1_badan, 0.65, 0.65, 0.65);
makeColor(k1_bawah, 0.45, 0.45, 0.45);
makeColor(k1_ujung, 0.85, 0.85, 0.85);
makeColor(k1_ujung_2, 0.85, 0.85, 0.85);
makeColor(k1_kotak, 0.87, 0.65, 0.47);
makeColor(k1_kotak_bawah, 0.80, 0.60, 0.37);
makeColor(k1_hubung, 0.85, 0.85, 0.85);

let colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colorLocation);

let vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coords);

let dy = 0;
let speed = 0.0082;

let kunci2 = (k2_badan.length + k2_bawah.length + k2_ujung.length + k2_ujung_bawah.length + k2_kotak.length + k2_kotak_bawah.length + k2_hubung.length)/2;
let kunci1 = (k1_badan.length + k1_bawah.length + k1_ujung.length + k1_ujung_2.length + k1_kotak.length + k1_kotak_bawah.length + k1_hubung.length)/2;

function drawScene() {
	dy >= 0.4 ? speed = -speed : speed = speed;
	dy <= -1 ? speed = -speed : speed = speed;
	dy += speed;
	gl.useProgram(shaderProgram);
	const leftObject = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		-0.60, 0.0, 0.0, 1.0,
	]
		
	const rightObject = [
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.45, dy, 0.0, 1.0,
	]
		
	gl.clearColor(0.15, 0.15, 0.15, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	const u_matrix = gl.getUniformLocation(shaderProgram, 'u_matrix');
	gl.uniformMatrix4fv(u_matrix, false, rightObject);
    
    gl.drawArrays(
		gl.TRIANGLES, 
		0, 
		kunci2
	);
		
	gl.uniformMatrix4fv(u_matrix, false, leftObject);
    gl.drawArrays(
		gl.TRIANGLES, 
		kunci2, 
		kunci1
	);
	requestAnimationFrame(drawScene);
}

drawScene();