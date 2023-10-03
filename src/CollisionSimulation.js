import React, { Component } from 'react';
import Matter from 'matter-js';

class MatterCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { Engine, Render, Bodies, World, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create();

    const render = Render.create({
      element: this.canvasRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });

    const ground = Bodies.rectangle(400, 580, 800, 20, { isStatic: true });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    let ball = Matter.Bodies.circle(200, 200, 30);
    ball.render.fillStyle = 'red'; // Define a cor de preenchimento da bolinha como vermelha
    const sling = Matter.Constraint.create({
      pointA: { x: 200, y: 200 },
      bodyB: ball,
      stiffness: 0.05,
    });

    const stack = Matter.Composites.stack(1000, 200, 4, 4, 0, 0, function (x, y) {
      return Matter.Bodies.polygon(x, y, 8, 30);
    });

    let firing = false;
    Events.on(mouseConstraint, 'enddrag', function (e) {
      if (e.body === ball) firing = true;
    });
    Events.on(engine, 'afterUpdate', function () {
      if (firing && Math.abs(ball.position.x - 200) < 20 && Math.abs(ball.position.y - 200) < 20) {
        ball = Matter.Bodies.circle(200, 200, 20);
        ball.render.fillStyle = 'red'; // Define a cor de preenchimento da nova bolinha como vermelha
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
      }
    });

    Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
    Engine.run(engine);
    Render.run(render);
  }

  componentWillUnmount() {
    // Limpa o canvas e pára a simulação ao desmontar o componente
    // Certifique-se de que o componente está desmontado antes de limpar o Matter.js
    // e encerrar a renderização
    Matter.Render.stop(this.render);
    Matter.Engine.clear(this.engine);
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default MatterCanvas;
