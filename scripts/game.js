canvas.addEventListener('mousemove', (event) => {
    const { clientY } = event;
    
    changePaddlePosition(paddlePlayer, clientY);
});

function gameLoop() {
    renderBall(ball);
    changeBallPosition(ball);

    renderPaddle(paddlePlayer);
    renderPaddle(paddleComputer);

    handleCollisionPaddleBall(paddlePlayer, ball);
    handleCollisionPaddleBall(paddleComputer, ball, true);

    handleChangePaddleAI(paddleComputer);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    gameLoop();

    requestAnimationFrame(update);
}

function adjustScreenStyle() {
    const overlay = document.querySelector('.overlay');

    overlay.classList.add('ongame');
}

function startGame() {
    randomBallVelocity(ball);
    adjustScreenStyle();
    update();
}
