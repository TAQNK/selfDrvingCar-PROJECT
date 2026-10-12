class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }
  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  addPoint(point) {
    //  adding the random point
    this.points.push(point);
  }

  containPoint(point) {
    for (let p of this.points) {
      if (p.equals(point)) {
        return true;
      }
    }
    return false;

    //    this.points.find((p) => p.equals(point));
  }

  tryAddPoint(point) {
    if (!this.containPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addSegment(segment) {
    this.segments.push(segment);
  }
  containSegment(segment) {
    return this.segments.find((s) => s.equals(segment));
  }
  tryAddSegment(segment) {
    if (!segment.p1.equals(segment.p2) && !this.containSegment(segment)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
    // splice to remove the segment inside list of segment and only 1 element to remove
  }
  getSegmentsWithPoint(point) {
    const pointSegments = [];
    for (const s of this.segments) {
      if (s.includes(point)) {
        pointSegments.push(s);
      }
    }
    return pointSegments;
  }
  removePoint(point) {
    this.points.splice(this.points.indexOf(point), 1);
    const pointSegments = this.getSegmentsWithPoint(point);
    for (const s of pointSegments) {
      this.removeSegment(s);
    }
  }

//  remove all
  dispose(){
    this.points.length = 0;
    this.segments.length = 0;
  }
}
