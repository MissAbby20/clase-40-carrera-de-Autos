class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');// referencia a db
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }
//función para actualizar la base de datos
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
//iniciar juego y mostrar en pantalla
  async start(){
    if(gameState === 0){
      player = new Player(); //crear objeto para el jugador
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();//obtiene el puntaje para el jugador
      }
      form = new Form() // crea objeto para el formulario
      form.display();//muestra el formulario
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];

   
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //cargar suelo
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //var display_position = 100;
      
      //índice de la matriz
      var index = 0;

      //x and y position de los carros, alinear autos
      var x = 250;
      var y; //solo se esta mencionando

      for(var plr in allPlayers){
        //agregue 1 al índice para cada bucle
        index = index + 1 ;

        //Coloque los coches un poco alejados entre sí en la dirección x
        x = x + 200;
        //utilizar datos de la base de datos para mostrar los coches en la dirección y
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        //Dar un color diferente al jugador activo en el navegador.
        
if (index === player.index){
    stroke(10);
    fill("red");
    ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
         //Cámara se movera dependiendo la posición de los carros o establecer la posición de la cámara para cada jugador en el juego.
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 4100){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }

}
