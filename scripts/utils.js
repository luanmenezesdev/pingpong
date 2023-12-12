function changeDirection(velocity, direction) {
    velocity[direction] = -velocity[direction];
}

function numeroAleatorioPositivoOuNegativo() {
    const numeroAleatorio = Math.random();
  
    return numeroAleatorio >= 0.5 ? 1 : -1;
  }