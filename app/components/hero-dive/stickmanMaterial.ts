import { Mesh, ShaderMaterial, SkinnedMesh, Texture, Vector3, type Material, type Object3D } from "three";

const INK_RGB: [number, number, number] = [17 / 255, 18 / 255, 13 / 255];
const PAPER_RGB: [number, number, number] = [1, 1, 1];
const LIGHT_DIR: [number, number, number] = [-0.55, 0.75, 0.6];

export type StickmanPalette = {
  ink: [number, number, number];
  paper: [number, number, number];
};

const VERTEX = /* glsl */ `
  varying vec3 vNormal;
  #include <common>
  #include <skinning_pars_vertex>
  void main() {
    #include <beginnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
    vNormal = transformedNormal;
    #include <begin_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uPaper;
  uniform vec3 uLight;
  varying vec3 vNormal;

  void main() {
    vec3 n = normalize(vNormal);
    if (!gl_FrontFacing) n = -n;
    vec3 light = normalize(mat3(viewMatrix) * uLight);
    float amount = dot(n, light);
    vec3 shade = amount > 0.38 ? uPaper : uInk;
    float silhouette = 1.0 - smoothstep(0.17, 0.32, n.z);
    gl_FragColor = vec4(mix(shade, uInk, silhouette), 1.0);
  }
`;

export function createStickmanMaterial(pixelRatio: number, palette?: StickmanPalette) {
  return new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: {
      uInk: { value: new Vector3(...(palette?.ink ?? INK_RGB)) },
      uPaper: { value: new Vector3(...(palette?.paper ?? PAPER_RGB)) },
      uLight: { value: new Vector3(...LIGHT_DIR).normalize() },
      uPx: { value: pixelRatio },
      uGap: { value: 6 },
      uOutline: { value: 0.3 },
      uSeed: { value: 0 },
    },
  });
}

function disposeMaterial(material: Material) {
  Object.values(material).forEach((value) => {
    if (value instanceof Texture) value.dispose();
  });
  material.dispose();
}

export function disposeStickmanModel(root: Object3D) {
  root.traverse((object) => {
    if (object instanceof Mesh) {
      object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(disposeMaterial);
      if (object instanceof SkinnedMesh) object.skeleton.dispose();
    }
  });
}
