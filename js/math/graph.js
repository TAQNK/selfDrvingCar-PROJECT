class Graph{
    constructor(points = [] ,segments =[]){
        this.points = points;
        this.segments = segments;
    }
    draw(ctx){
        for(const seg of this.segments){
            seg.draw(ctx);
        }

        for(const point of this.points){
            point.draw(ctx);
        }
    }

    addPoint(point){
        //  adding the random point
        this.points.push(point);
    }

    containPoint(point){
       for(let p of this.points){
        if(p.equals(point)){
            return true;
        }
       }
       return false;

    //    this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point){
        if(!this.containPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }


}