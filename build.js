const path = require('path');
var fs = require('fs');

const ASSETS = [
    'three/build/three.module.js',
    'three/examples/js/controls/OrbitControls.js',
    'three/examples/js/controls/FirstPersonControls.js',
    'three/examples/js/lights/RectAreaLightUniformsLib.js',
];

if (!fs.existsSync('./public/assets')){
    fs.mkdirSync('./public/assets');
}

ASSETS.map(asset => {
    let filename = asset.substring(asset.lastIndexOf("/") + 1);
    let from = path.resolve(__dirname, `./node_modules/${asset}`)
    let to = path.resolve(__dirname, `./public/assets/scripts/${filename}`)
    if (fs.existsSync(from)) {
        fs.createReadStream(from).pipe(fs.createWriteStream(to));
     } else {
        console.log(`${from} does not exist.\nUpdate the build.js script with the correct file paths.`)
        process.exit(1)
    }
});
