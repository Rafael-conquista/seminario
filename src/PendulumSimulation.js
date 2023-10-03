import React, { Component } from 'react';
import p5 from 'p5';

class PendulumSimulation extends Component {
  componentDidMount() {
    this.sketch = new p5(this.createCanvas);
  }

  componentWillUnmount() {
    this.sketch.remove();
  }

  createCanvas = (p) => {
    let ropeLength; // Comprimento da corda
    let angle; // Ângulo de oscilação
    let angleVelocity; // Velocidade angular
    let angleAcceleration; // Aceleração angular
    let damping; // Coeficiente de amortecimento do ar
    let weight; // Peso no final da corda

    p.setup = () => {
      // Cria um canvas e define as variáveis iniciais
      const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
      ropeLength = 150;
      angle = p.PI / 4;
      angleVelocity = 0.05;
      angleAcceleration = 0;
      damping = 0.995; // Coeficiente de amortecimento mais alto
      weight = 5;
    };

    p.draw = () => {
      p.background(220);

      const gravity = 1.5;
      const weightForce = weight * gravity * p.sin(angle);

      angleAcceleration = (-1 * weightForce) / (weight + ropeLength);

      angleVelocity += angleAcceleration;
      angleVelocity *= damping;
      angle += angleVelocity;

      const weightX = p.width / 2 + ropeLength * p.sin(angle);
      const weightY = p.height / 2 + ropeLength * p.cos(angle);

      p.stroke(0);
      p.strokeWeight(2);
      p.line(p.width / 2, p.height / 2, weightX, weightY);

      p.fill(127);
      p.stroke(0);
      p.ellipse(weightX, weightY, 40, 40);
    };

    p.windowResized = () => {
      // Redimensiona o canvas quando a janela é redimensionada
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  };

  render() {
    return <div ref={(el) => (this.canvasContainer = el)} />;
  }
}

export default PendulumSimulation;
