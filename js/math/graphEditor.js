class GraphEditor {
  constructor(canvas2D, graph) {
    this.canvas2D = canvas2D;
    this.graph = graph;

    this.ctx = this.canvas2D.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.#addEventListeners();
  }
  // private method - nobody else can add events
  #addEventListeners() {
    //  this event is for adding new points
    this.canvas2D.addEventListener("mousedown", (evt) => {
      if (evt.button == 2) {
        // right click - > to remove the point
        if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }

      if (evt.button == 0) {
        // left click to add point if not select near point
        const mouse = new Point(evt.offsetX, evt.offsetY);
        if (this.hovered) {
          this.selected = this.hovered;
          return;
        }
        this.graph.addPoint(mouse);
        this.selected = mouse;
        this.hovered = mouse;
      }

      //   this.hovered = getNearestPoint(mouse, this.graph.points, 10);
    });
    // this event is to track the mouse and if threshold is hit or not
    this.canvas2D.addEventListener("mousemove", (evt) => {
      const mouse = new Point(evt.offsetX, evt.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 10);
    });

    // event to ignore the right click menu box to appear
    this.canvas2D.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
    });
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    // removing the selection when selected point is deleted and not removing selection when other point is removed
    if (this.selected == point) {
      this.selected = null;
    }
  }
  display() {
    this.graph.draw(this.ctx);
    // making the new point to be visible
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
