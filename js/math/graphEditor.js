class GraphEditor {
  constructor(canvas2D, graph) {
    this.canvas2D = canvas2D;
    this.graph = graph;

    this.ctx = this.canvas2D.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragged = false;
    this.#addEventListeners();
    this.mouse = null;
  }
  // private method - nobody else can add events
  #addEventListeners() {
    //  this event is for adding new points
    this.canvas2D.addEventListener("mousedown", (evt) => {
      if (evt.button == 2) {
        // right click - > to remove the point
        if (this.hovered) {
          this.#removePoint(this.hovered);
        } else {
          // deselect the current point to add segment between old points
          this.selected = null;
        }
      }

      if (evt.button == 0) {
        // left click to add point if not select near point
        if (this.hovered) {
          // making the hovered and selected point to have segment between them
          this.#select(this.hovered);
          // make it draggged
          this.dragged = true;
          return;
        }
        this.graph.addPoint(this.mouse);
        // addding new segemnt between the old selected and new mouse point added
        this.#select(this.mouse);
        this.hovered = this.mouse;
      }

      //   this.hovered = getNearestPoint(mouse, this.graph.points, 10);
    });
    // this event is to track the mouse and if threshold is hit or not
    this.canvas2D.addEventListener("mousemove", (evt) => {
      this.mouse = new Point(evt.offsetX, evt.offsetY);
      this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
      // making dragged point to move according to mouse values
      if (this.dragged) {
        this.selected.x = this.mouse.x;
        this.selected.y = this.mouse.y;
      }
    });

    // event to ignore the right click menu box to appear
    this.canvas2D.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
    });

    // event for when mouse left click will get released and dragged point should stop
    this.canvas2D.addEventListener("mouseup", () => {
      this.dragged = false;
    });
  }

  #select(point) {
    if (this.selected)
      this.graph.tryAddSegment(new Segment(this.selected, point));
    this.selected = point;
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
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected , intent).draw(ctx , {dash : [3,3]});
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
