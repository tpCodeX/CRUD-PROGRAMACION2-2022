function counter() {
    let countdown = 3;
    let timerDiv = document.getElementById("timer");
    
    let timer = setInterval(function () {
      timerDiv.innerHTML = `Regresando a la pantalla de registro.`;
      countdown--;
      if (countdown === 0) {
        clearInterval(timer);
        window.location.href = './registro'
      }
    }, 1000);
  }