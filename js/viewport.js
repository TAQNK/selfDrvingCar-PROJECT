class Viewport{
    constructor(canvas2D){
        this.canvas2D = canvas2D;
        this.ctx = canvas2D.getContext("2d");

        this.zoom = 1 ;

        this.#addEventListeners();
    }

    getMouse(evt){
        return new Point(
            evt.offsetX * this.zoom,
            evt.offsetY * this.zoom
        )
    };
    #addEventListeners(){
        this.canvas2D.addEventListener("mousewheel" ,this.#handleMouseWheel.bind(this));
    }

    #handleMouseWheel(evt){
        const dir = Math.sign(evt.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom  = Math.max(1, Math.min(5, this.zoom)); // having th vlaues to be in range of 1 - 5
        
    }
}