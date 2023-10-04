import React, { Component } from 'react';
import p5 from 'p5';

class Sketch extends Component {
  constructor(props) {
    super(props);
    this.sketchRef = React.createRef();
  }

  componentDidMount() {
    const sketch = (p) => {
      let ball1;
      let ball2;

      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(this.sketchRef.current);

        // Inicializa as bolas com posições e velocidades iniciais
        ball1 = new Ball(p.width / 4, p.height / 2, 80, p.createVector(15, 5));
        ball2 = new Ball((3 * p.width) / 4, p.height / 2, 65, p.createVector(-15, -10));
      };

      p.draw = () => {
        p.background(220); // Define o fundo do canvas

        // Atualiza e exibe as bolas
        ball1.update();
        ball2.update();
        ball1.display();
        ball2.display();

        // Verifica a colisão entre as bolas
        if (ball1.checkCollision(ball2)) {
          ball1.handleCollision(ball2);
          ball2.handleCollision(ball1);
        }
      };

      class Ball {
        constructor(x, y, radius, velocity) {
          this.position = p.createVector(x, y);
          this.radius = radius;
          this.velocity = velocity;
        }

        update() {
          this.position.add(this.velocity);

          // Verifica e trata a colisão com as paredes
          if (this.position.x + this.radius >= p.width || this.position.x - this.radius <= 0) {
            // Deixe as bolas continuar se movendo na direção oposta quando atingirem as laterais
            this.velocity.x *= -1;
          }

          if (this.position.y + this.radius >= p.height || this.position.y - this.radius <= 0) {
            this.velocity.y *= -1;
          }
        }

        display() {
          p.fill(0);
          p.ellipse(this.position.x, this.position.y, this.radius * 2);
        }

        // Verifica a colisão com outra bola
        checkCollision(other) {
          const distance = p.dist(this.position.x, this.position.y, other.position.x, other.position.y);
          return distance < this.radius + other.radius;
        }

        // Trata a colisão com outra bola (inverte a velocidade)
        handleCollision(other) {
          const delta = p5.Vector.sub(this.position, other.position);
          delta.normalize();
          this.velocity.reflect(delta);
        }
      }
    };

    // Cria um novo sketch p5.js no elemento HTML com a referência 'sketchRef'
    this.p5 = new p5(sketch);
  }

  render() {
    return <div ref={this.sketchRef}></div>;
  }
}

export default Sketch;
