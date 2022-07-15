const fs = require("fs");
const loader = require("@assemblyscript/loader");
const imports = { /* imports go here */ };
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/release.wasm"), imports);

function squareArray(array) {
	const { __newArray, __getInt32Array, Int32Array_ID, squareArray: wasmSquareArray } = wasmModule.exports;
	const typedArray = __newArray(Int32Array_ID, array);
	return __getInt32Array(wasmSquareArray(typedArray));
}

function squareArrayGen(len) {
	const { __getInt32Array, squareArrayGen } = wasmModule.exports;
	return __getInt32Array(squareArrayGen(len));
}

module.exports = {
	...wasmModule.exports,
	squareArray,
	squareArrayGen
}