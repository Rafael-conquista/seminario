import React, { Component } from 'react';
import p5 from 'p5';

class SpringSimulation extends Component {
  constructor(props) {
    super(props);

    // Parâmetros da simulação física
    this.spring = 0.1;
    this.damping = 0.1;
    this.objectMass = 10;
    this.objectSize = 20;
    this.gravity = 0.5; // Força da gravidade

    // Posições e velocidades iniciais
    this.equilibriumY = window.innerHeight / 2;
    this.equilibriumX = window.innerWidth / 2;
    this.position = {
      x: this.equilibriumX,
      y: this.equilibriumY - 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.acceleration = {
      x: 0,
      y: 0,
    };

    // Comprimento de repouso da mola
    this.restLength = this.equilibriumY - this.position.y;

    // Variáveis para arrastar a bolinha com o mouse
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  componentDidMount() {
    // Configura o sketch p5.js quando o componente é montado
    this.sketch = new p5(this.createCanvas);
  }

  componentWillUnmount() {
    // Remove o sketch p5.js quando o componente é desmontado para evitar vazamentos de memória
    this.sketch.remove();
  }

  createCanvas = (p) => {
    // Função de configuração do sketch p5.js
    p.setup = () => {
      // Configura o canvas p5.js
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.frameRate(60); // Taxa de quadros por segundo

      // Define o evento de mousePressed para iniciar o arrasto da bolinha
      p.mousePressed = () => {
        const d = p.dist(p.mouseX, p.mouseY, this.position.x, this.position.y);
        if (d < this.objectSize / 2) {
          this.dragging = true;
          this.offsetX = this.position.x - p.mouseX;
          this.offsetY = this.position.y - p.mouseY;
        }
      };

      // Define o evento de mouseReleased para parar o arrasto da bolinha
      p.mouseReleased = () => {
        this.dragging = false;
      };
    };

    p.draw = () => {
      // Função de desenho do sketch p5.js (chamada a cada quadro)

      // Limpa o fundo do canvas
      p.background(220);

      // Verifica se o usuário está arrastando a bolinha com o mouse
      if (this.dragging) {
        this.position.x = p.mouseX + this.offsetX;
        this.position.y = p.mouseY + this.offsetY;
      }

      // Calcula a força elástica da mola (F = -k * x)
      const displacementY = this.position.y - this.equilibriumY;
      const displacementX = this.position.x - this.equilibriumX;
      const springForceY = -this.spring * displacementY;
      const springForceX = -this.spring * displacementX;

      // Calcula a força de amortecimento (F = -c * v)
      const dampingForceY = -this.damping * this.velocity.y;
      const dampingForceX = -this.damping * this.velocity.x;

      // Aplica a força da gravidade
      const gravityForce = this.gravity * this.objectMass;

      // Aplica as forças para calcular a aceleração
      const totalForceY = springForceY + dampingForceY + gravityForce;
      const totalForceX = springForceX + dampingForceX;
      this.acceleration.y = totalForceY / this.objectMass;
      this.acceleration.x = totalForceX / this.objectMass;
      this.velocity.y += this.acceleration.y;
      this.velocity.x += this.acceleration.x;
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;

      // Desenha a corda da mola
      p.stroke(0);
      p.strokeWeight(2);
      p.line(this.equilibriumX, this.equilibriumY, this.position.x, this.position.y);

      // Desenha a bolinha
      p.fill('blue');
      p.noStroke();
      p.ellipse(this.position.x, this.position.y, this.objectSize, this.objectSize);

      // Desenha o ponto de equilíbrio da mola
      p.fill(0);
      p.ellipse(this.equilibriumX, this.equilibriumY, 20, 20);
    };
  };

  render() {
    return <div ref={(el) => (this.canvasContainer = el)} />;
  }
}

export default SpringSimulation;
