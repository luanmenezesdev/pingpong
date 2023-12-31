const ball = {
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2,
    },
    velocity: {
        x: 4,
        y: 4,
    },
    radius: 10,
}

function randomBallVelocity(ball) {
    const velocityY = numeroAleatorioPositivoOuNegativo() * (Math.random() * 2 + 2);
    const velocityX = numeroAleatorioPositivoOuNegativo() * (Math.random() * 2 + 2);

    ball.velocity.x = velocityX;
    ball.velocity.y = velocityY;
}

function renderBall(ball) {
    const { position } = ball;

    context.beginPath();
    context.arc(position.x, position.y, ball.radius, 0, 2 * Math.PI);
    context.fill();
};

function changeBallPosition(ball) {
    const { position, velocity, radius } = ball;

    if (position.y + radius >= canvas.height) {
        changeDirection(velocity, 'y');
    };

    if (position.x + radius >= canvas.width) {
        changeDirection(velocity, 'x');
    };
    
    if (position.y - radius <= 0) {
        changeDirection(velocity, 'y');
    };

    if (position.x - radius <= 0) {
        changeDirection(velocity, 'x');
    };

    position.x += velocity.x;
    position.y += velocity.y;
}
