canvas2D.height = 600;
canvas2D.width = 600;
// adding random point
function addRandomPoint() {
  const success = graph.tryAddPoint(
    new Point(Math.random() * canvas2D.width, Math.random() * canvas2D.height),
  );
  ctx.clearRect(0, 0, canvas2D.width, canvas2D.height);
  graph.draw(ctx);
  console.log(success);
}
// graph
const ctx = canvas2D.getContext("2d");

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(300, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p3, p1);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
graph.draw(ctx);
