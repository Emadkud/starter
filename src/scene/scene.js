import { Color, Scene as THREEScene } from "three";

const CANVAS_SELECTOR = 'canvas.webgl';




export class Scene{
    constructor(){
        this.s = new THREEScene(); //scene Three JS
        this.canvas = document.querySelector(CANVAS_SELECTOR);
    }

    get scene(){
        return this._s;
    }

    set scene(v){
        return this._s = v;
    }
    add(objet){
        this.s.add(objet)
    }
    render(){
        return this.s;
    }
    background(value){
        this.s.background = new Color(value)
    }
    getCanvas(){
        return this.canvas;
    }
   
}