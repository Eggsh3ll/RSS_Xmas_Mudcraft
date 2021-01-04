let territories = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES); // Change the mode to DEGREES
  background(220);
  stroke(0);
  strokeWeight(2);

  hexsize = 60;
  territories.push(new territory(-hexsize * sin(60) * 2, -hexsize * 3, hexsize));
  territories.push(new territory(0, -hexsize * 3, hexsize));
  territories.push(new territory(hexsize * sin(60) * 2, -hexsize * 3, hexsize));
  territories.push(new territory(-hexsize * sin(60) * 3, -hexsize * 1.5, hexsize));
  territories.push(new territory(-hexsize * sin(60), -hexsize * 1.5, hexsize));
  territories.push(new territory(hexsize * sin(60), -hexsize * 1.5, hexsize));
  territories.push(new territory(hexsize * sin(60) * 3, -hexsize * 1.5, hexsize));
  territories.push(new territory(-hexsize * sin(60) * 4, 0, hexsize));
  territories.push(new territory(-hexsize * sin(60) * 2, 0, hexsize));
  territories.push(new territory(0, 0, hexsize));
  territories.push(new territory(hexsize * sin(60) * 2, 0, hexsize));
  territories.push(new territory(hexsize * sin(60) * 4, 0, hexsize));
  territories.push(new territory(-hexsize * sin(60) * 3, hexsize * 1.5, hexsize));
  territories.push(new territory(-hexsize * sin(60), hexsize * 1.5, hexsize));
  territories.push(new territory(hexsize * sin(60), hexsize * 1.5, hexsize));
  territories.push(new territory(hexsize * sin(60) * 3, hexsize * 1.5, hexsize));
  territories.push(new territory(-hexsize * sin(60) * 2, hexsize * 3, hexsize));
  territories.push(new territory(0, hexsize * 3, hexsize));
  territories.push(new territory(hexsize * sin(60) * 2, hexsize * 3, hexsize));
}

function draw() {
  for (var i = 0; i < territories.length; i++) {
    territories[i].show();
  }
}

function hexagon(x, y, s, col) {
  stroke(255);
  strokeWeight(5);
  fill(col);
  this.x = x;
  this.y = y;
  push();
  translate(width / 2, height / 2)
  translate(this.x, this.y);
  angle = 60
  beginShape();
  vertex(-s * sin(angle), -s * cos(angle));
  vertex(-s * sin(angle), s * cos(angle));
  vertex(0, s);
  vertex(s * sin(angle), s * cos(angle));
  vertex(s * sin(angle), -s * cos(angle));
  vertex(0, -s);
  endShape(CLOSE);
  pop();
}

class territory {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.state = 0;
    this.col = color(150, 75, 0)
  }

  show() {
    if (this.state == 0) {
      hexagon(this.x, this.y, this.s, color(150, 75, 0))
    } else {
      hexagon(this.x, this.y, this.s, color(0, 75, 0))
    }
  }

  flip() {
    if (this.state == 0) {
      this.state = 1;
    }
    if (this.state == 1) {
      this.state = 0;
    }
  }

  clicked(px, py) {
    var d = dist(px - height / 2, py - height / 2, this.x, this.y)
    if (d < this.s * sin(60)) {
      this.state = -1 * this.state + 1
      for (var i = 0; i < territories.length; i++) {
        var dneighbours = dist(territories[i].x, territories[i].y, this.x, this.y)
        if (dneighbours < this.s*2) {
          territories[i].state = -1 * territories[i].state + 1;
        }
      }
      this.state = 1
    }
  }
}

function mousePressed() {
  for (var i = 0; i < territories.length; i++) {
    territories[i].clicked(mouseX, mouseY);
  }
}