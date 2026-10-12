class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, { size = 18, color = "black", outline = false ,fill = false} = {}) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2); //arc of a cricle
    // 360deg is 2pi radians
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }


    // now the tracker 
    if(fill){
        ctx.beginPath();
        ctx.arc(this.x , this.y , rad * 0.4 , 0, Math.PI *2);
        ctx.fillStyle = "blue";
        ctx.fill();
    }
  }

  equals(p) {
    if (this.x === p.x && this.y === p.y) {
      return true;
    }
    return false;
  }
}
