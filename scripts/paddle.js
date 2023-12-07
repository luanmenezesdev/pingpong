const paddlePlayer = {
    position: {
        x: 10,
        y: canvas.height / 2,
    },
    sizes: {
        width: 8,
        height: canvas.height / 5,
    }
}

const paddleComputer = {
    position: {
        x: canvas.width - 18,
        y: canvas.height / 2,
    },
    sizes: {
        width: 8,
        height: canvas.height / 5,
    },
    isGoingDown: true,
}

function renderPaddle(paddle) {
    const { position, sizes } = paddle;

    context.beginPath();
    context.rect(position.x, position.y, sizes.width, sizes.height);
    context.fill();
}

function changePaddlePosition(paddle, clientY) {
    const rect = canvas.getBoundingClientRect();
    const paddleHeight = paddle.sizes.height;

    const outsideBottom = clientY + (paddleHeight / 2) >= rect.bottom;
    const outsideTop = clientY - (paddleHeight / 2) <= rect.top;

    if (outsideBottom || outsideTop) return;

    paddle.position.y = clientY - rect.top - paddleHeight / 2;
}

function handleChangePaddleAI(paddle) {
    const paddleHeight = paddle.sizes.height;
    const paddleCenter = paddle.position.y + (paddleHeight / 2);

    if (paddleCenter >= canvas.height - (paddleHeight / 2) && paddle.isGoingDown === true) {
        paddle.isGoingDown = false;
    }

    if (paddleCenter <= (paddleHeight / 2) && paddle.isGoingDown === false) {
        paddle.isGoingDown = true;
    }

    if (paddle.isGoingDown) {
        paddle.position.y += 5;
        return;
    }

    paddle.position.y -= 5;
}

function handleCollisionPaddleBall(paddle, ball, isAI = false) {
    const paddleLeftEdge = paddle.position.x;
    const paddleRightEdge = paddle.position.x + paddle.sizes.width;
    const paddleTopEdge = paddle.position.y;
    const paddleBottomEdge = paddle.position.y + paddle.sizes.height;

    const ballIsSameX = isAI ? ball.position.x + ball.radius === paddleLeftEdge : ball.position.x - ball.radius === paddleRightEdge;
    const ballIsSameY = ball.position.y + ball.radius >= paddleTopEdge && ball.position.y - ball.radius <= paddleBottomEdge;

    if (ballIsSameX && ballIsSameY) {
        changeDirection(ball.velocity, 'x');
    }
}