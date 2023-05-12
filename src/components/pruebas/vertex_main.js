const vertex_main = /*glsl*/`

    /*uniform float uIntensity;
    uniform float uTime;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;*/


    vec3 coords = normal;
    coords += uTime;
    vec3 noisePattern = vec3(noise(coords));
    float pattern = wave(noisePattern);
    
    //varying 
    //vPosition = position;
    //vNormal = normal;
    //vUv = uv;

    //patron tutorial
    vDisplacement = pattern;

    //patron machas
    //vDisplacement = noise(position + vec3(8.0 * coords));

    //patron machas v2
    //vDisplacement = noise(position + vec3(1.0 * coords));

    //patron con con las lineas
    //vDisplacement = smoothMod(coords.x * 4.0, 0.8, 1.0);  

    float displacement = vDisplacement / 2.0;


`;
export default vertex_main;