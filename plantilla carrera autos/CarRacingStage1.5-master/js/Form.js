class Form {

  constructor() {
    this.input = createInput("Name");//crear entrada para datos del nombre
    this.button = createButton('Play');//botón para iniciar juego
    this.greeting = createElement('h3');// subtitulo
    this.title = createElement('h2');//cabecera del titulo.
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("JUEGO DE CARRERAS DE AUTO"); //cabecera del titulo
    this.title.position(displayWidth/2 - 50, 0); //coordenadas para preguntas

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);//posición de la variable input en patalla
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100,20);

    this.button.mousePressed(()=>{//función para dar click sobre el botón
      this.input.hide();//ocultar el nombre
      this.button.hide();//ocultar el botón
      player.name = this.input.value();//obtener el valor de la entrada
      playerCount+=1; //actualizar el número de jugadores
      player.index = playerCount;
      player.update();//actualizar en la base de datos el nombre del jugador
      player.updateCount(playerCount);//actualizar en la base de datos número de jugadores
      this.greeting.html("Hello " + player.name)//Saludo al jugador nuevo
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);//posición del mensaje de bienvenida en la pantalla
    });

    //crear una función para actualizar gameState y playerCount cuando se presiona mouseButton
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    });


  }
}
