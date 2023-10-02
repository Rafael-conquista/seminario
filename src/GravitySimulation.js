import React, { Component } from 'react';
import P5Wrapper from 'react-p5';

class GravitySimulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ball: {
        position: null,
        velocity: null,
        radius: 20,
        mass: 0.1,
        gravity: props.gravity, // Usar a gravidade passada como prop ou o valor padrão
      },
    };
  }

  setup = (p5, parentRef) => {
    p5.createCanvas(400, 400).parent(parentRef);

    this.state.ball.position = p5.createVector(p5.width / 2, 0);
    this.state.ball.velocity = p5.createVector(0, 0);
  };

  draw = (p5) => {
    p5.background(50);

    // Aplica a gravidade
    const gravityForce = p5.createVector(0, this.state.ball.mass * this.state.ball.gravity);
    this.state.ball.velocity.add(gravityForce);

    // Atualiza a posição da bola
    this.state.ball.position.add(this.state.ball.velocity);

    // Verifica colisão com o chão
    if (this.state.ball.position.y > p5.height - this.state.ball.radius / 2) {
      this.state.ball.position.y = p5.height - this.state.ball.radius / 2;
      this.state.ball.velocity.y *= -0.7; // Coeficiente de restituição
    }

    // Desenha a bola
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.ellipse(this.state.ball.position.x, this.state.ball.position.y, this.state.ball.radius * 2);
  };

  setGravity = (gravity) => {
    // Atualize o valor da gravidade no estado
    this.setState({
      ball: {
        ...this.state.ball,
        gravity,
      },
    });
  };

  render() {
    return (
      <div>
        <P5Wrapper setup={this.setup} draw={this.draw} />
        <GravityController setGravity={this.setGravity} />
        <p>Gravidade: {this.state.ball.gravity}</p> {/* Exibe a gravidade aqui */}
      </div>
    );
  }
}

class GravityController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gravity: props.initialGravity, // Usar a gravidade inicial passada como prop ou o valor padrão
    };
  }

  handleChange = (event) => {
    const newGravity = parseFloat(event.target.value);
    this.setState({ gravity: newGravity });
    this.props.setGravity(newGravity); // Chama a função para atualizar a gravidade no componente pai
  };

  render() {
    return (
      <div>
        {/* Adicione aqui seus controles de gravidade, se necessário */}
      </div>
    );
  }
}

export default GravitySimulation;
