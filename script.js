const canvas = document.querySelector('#pingpong');

const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const ball = {
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2,
    },
    velocity: {
        x: 2,
        y: 2,
    },
    radius: 10,
}

const paddlePlayer = {
    position: {
        x: 10,
        y: 0,
    },
    sizes: {
        width: 8,
        height: canvas.height / 5,
    }
}

function renderPaddle(paddle) {
    const { position, sizes } = paddle;

    context.beginPath();
    context.rect(position.x, position.y, sizes.width, sizes.height);
    context.fill();
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

function changePaddlePosition(paddle, clientY) {
    const rect = canvas.getBoundingClientRect();
    const paddleHeight = paddle.sizes.height;

    const outsideBottom = clientY + (paddleHeight / 2) >= rect.bottom;
    const outsideTop = clientY - (paddleHeight / 2) <= rect.top;

    if (outsideBottom || outsideTop) return;

    paddle.position.y = clientY - rect.top - paddleHeight / 2;
}

canvas.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    
    changePaddlePosition(paddlePlayer, clientY)
});

function changeDirection(velocity, direction) {
    velocity[direction] = -velocity[direction];
}

function gameLoop() {
    renderBall(ball);
    renderPaddle(paddlePlayer);
    changeBallPosition(ball);
}


function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    gameLoop();

    requestAnimationFrame(update);
}

update();
