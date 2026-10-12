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
    this.canvas2D.addEventListener("mousedown", (evt) => {
      const mouse = new Point(evt.offsetX, evt.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 10);
      if (this.hovered) {
        this.selected = this.hovered;
        return;
      }
      this.graph.addPoint(mouse);
      this.selected = mouse;
    });
  }
  display() {
    this.graph.draw(this.ctx);
    // making the new point to be visible
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
