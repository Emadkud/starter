import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {MeshPhongMaterial, MeshBasicMaterial} from "three";

export class GLTFModel{
    constructor(url, scene, scale = null ){
        this.model = null;
        this.url = url;
        this.scene = scene;
        this.scale = scale;

    }
    async init() {
        
        const loader = new GLTFLoader();
        let gltf = await loader.loadAsync(this.url);
            this.model = gltf.scene.children[0];
            gltf.scene.traverse((child) => {
                if (child.isMesh){
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    let prevMaterial = child.material;
                    child.material = new MeshPhongMaterial();
                    MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial);
                }
            })
            if (this.scale != null ){   
                let [x, y, z] = this.scale;
                this.model.scale.set(x, y, z);
            }
            this.scene.add(this.model);
      }
}