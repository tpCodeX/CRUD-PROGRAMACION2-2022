function counter() {
  let countdown = 5;
  let timerDiv = document.getElementById("timer");
  
  const ruta = () =>{
    let path= window.location.href ;
    path=path.split("/");
    let path2=path[0]+"//"+path[2]+"/"+path[3];
    return path2
  }

  let timer = setInterval(function () {
    timerDiv.innerHTML = `Regresando a la lista.`;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href =ruta()
    }
  }, 1000);
}
/* function counter() {
  let countdown = 2;

  let timerDiv = document.getElementById("timer");

  
  
  
  let timer = setInterval(function () {
    timerDiv.innerHTML = `Regresando a Home: ${countdown}`;
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = path2;
    }
  }, 1000);
} */
