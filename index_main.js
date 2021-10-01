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
let mode = 0;
let gl = canvas.getContext('experimental-webgl');

// let vertices = [...c2_belakang, ...c2_alas, ...c2_badan, ...c1_lingkaran, ...c1_badan];
let vertices = [...k2_badan, ...k2_bawah,...k2_ujung, ...k2_ujung_bawah, ...k2_kotak, ...k2_kotak_bawah, ...k2_hubung, ...k1_badan, ...k1_bawah, ...k1_ujung, ...k1_ujung_2, ...k1_kotak,...k1_kotak_bawah, ...k1_hubung];

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

for (let i = 0; i < k2_badan.length/2; i++) {
	let r = 0.60;
	let g = 0.60;
	let b = 0.60;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k2_bawah.length/2; i++) {
	let r = 0.45;
	let g = 0.45;
	let b = 0.45;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k2_ujung.length/2; i++) {
	let r = 0.85;
	let g = 0.85;
	let b = 0.85;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k2_ujung_bawah.length/2; i++) {
	let r = 0.65;
	let g = 0.65;
	let b = 0.65;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k2_kotak.length/2; i++) {
	let r = 0.87;
	let g = 0.65;
	let b = 0.47;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k2_kotak_bawah.length/2; i++) {
	let r = 0.8;
	let g = 0.6;
	let b = 0.37;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k2_hubung.length/2; i++) {
	let r = 0.85;
	let g = 0.85;
	let b = 0.85;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_badan.length/2; i++) {
	let r = 0.65;
	let g = 0.65;
	let b = 0.65;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_bawah.length/2; i++) {
	let r = 0.45;
	let g = 0.45;
	let b = 0.45;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_ujung.length/2; i++) {
	let r = 0.85;
	let g = 0.85;
	let b = 0.85;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_ujung_2.length/2; i++) {
	let r = 0.85;
	let g = 0.85;
	let b = 0.85;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_kotak.length/2; i++) {
	let r = 0.87;
	let g = 0.65;
	let b = 0.47;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_kotak_bawah.length/2; i++) {
	let r = 0.8;
	let g = 0.6;
	let b = 0.37;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}
for (let i = 0; i < k1_hubung.length/2; i++) {
	let r = 0.85;
	let g = 0.85;
	let b = 0.85;
	color.push(r);
	color.push(g);
	color.push(b);
	color.push(1);
}

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
function drawScene() {
		dy >= 0.5 ? speed = -speed : speed = speed;
		dy <= -1 ? speed = -speed : speed = speed;
		dy += speed;
		gl.useProgram(shaderProgram);
		const leftObject = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-0.5, 0.0, 0.0, 1.0,
		]
		
		const rightObject = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.5, dy, 0.0, 1.0,
		]
		
		gl.clearColor(0.15, 0.15, 0.15, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);

		const u_matrix = gl.getUniformLocation(shaderProgram, 'u_matrix');
		gl.uniformMatrix4fv(u_matrix, false, rightObject);
    
    gl.drawArrays(gl.TRIANGLES, 0, (k2_badan.length + k2_bawah.length + k2_ujung.length + k2_ujung_bawah.length + k2_kotak.length + k2_kotak_bawah.length + k2_hubung.length)/2);
		
		gl.uniformMatrix4fv(u_matrix, false, leftObject);
    gl.drawArrays(gl.TRIANGLES, (k2_badan.length + k2_bawah.length + k2_ujung.length + k2_ujung_bawah.length + k2_kotak.length + k2_kotak_bawah.length + k2_hubung.length)/2, (k1_badan.length + k1_bawah.length + k1_ujung.length + k1_ujung_2.length + k1_kotak.length + k1_kotak_bawah.length + k1_hubung.length)/2);
		requestAnimationFrame(drawScene);
}

drawScene();