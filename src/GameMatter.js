import React, { Component } from 'react';
import { Engine, Render, Bodies, World, Mouse, MouseConstraint } from 'matter-js';

class GameMatter extends Component {
    engine = Engine.create();

    render = Render.create({
        element: document.body,
        engine: engine,
        options:{
            width:2000,
            height: 600,
            wireframes: false
        }
    });

    ground = Bodies.rectangle(1100, 500, 300, 50, { isStatic: true });

    mouse = Matter.Mouse.create(render.canvas);
    mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: false}
    }
    });
    render.mouse = mouse;

    ball = Matter.Bodies.circle(200, 200, 30);
    ball.render.fillStyle = 'red'; // Define a cor de preenchimento da bolinha como vermelha
    sling = Matter.Constraint.create({ 
        pointA: { x: 200, y: 200 },
        bodyB: ball, 
        stiffness: 0.05
    });

    let stack = Matter.Composites.stack(1000, 200, 4, 4, 0, 0, function(x,y){
        return Matter.Bodies.polygon(x, y, 8, 30); 
    })

    let firing = false
    Matter.Events.on(mouseConstraint,'enddrag', function(e) {
        if(e.body === ball) firing = true;
    });
    Matter.Events.on(engine,'afterUpdate', function() {
        if (firing && Math.abs(ball.position.x-200) < 20 && Math.abs(ball.position.y-200) < 20) {
            ball = Matter.Bodies.circle(200, 200, 20);
            ball.render.fillStyle = 'red'; // Define a cor de preenchimento da nova bolinha como vermelha
            Matter.World.add(engine.world, ball);
            sling.bodyB = ball;
            firing = false;
        }
    });

    Matter.World.add(engine.world,[stack, ground, ball, sling, mouseConstraint]);
    Engine.run(engine);
    Render.run(render);
}

export default GameMatter;
