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
        x: -2,
        y: -2,
    },
    radius: 10,
}

function renderBall(ball) {
    const { position } = ball;

    context.beginPath();
    context.arc(position.x, position.y, ball.radius, 0, 2 * Math.PI);
    context.fill();
};

function changeBallPosition(ball) {
    const { position, velocity, radius } = ball;

    if (position.y + radius >= canvas.height) position.y = canvas.height - radius;
    if (position.x + radius >= canvas.width) position.x = canvas.width - radius;
    if (position.y - radius <= 0) position.y = radius;
    if (position.x - radius <= 0) position.x = radius;

    position.x += velocity.x;
    position.y += velocity.y;
}


function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderBall(ball);
    changeBallPosition(ball);

    requestAnimationFrame(update)
}

update();
