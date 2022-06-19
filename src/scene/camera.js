import { PerspectiveCamera } from "three";


export class Camera{
    constructor(fov, aspect, near, far){
        this.c = new PerspectiveCamera(fov, aspect, near, far);
    }

    get camera(){
        return this.c;
    }
    set camera(value){
        return this.c = value;
    }
    get position(){
        console.log(this.c.position);
        return this.c.position;
    }
    
    set position(p){
        console.log('%c⧭', 'color: #00b300', p);
        // return this.c.position = p;
    }
}