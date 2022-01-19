class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
  }

  //función para obtener el playerCount
  getCount(){ 
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  //para que playerCount se actualice en la BD
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({//el nombre se crea en firebase
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');//referencia en la base de datos llamando a los jugadores
    playerInfoRef.on("value",(data)=>{ //crear un oyente para generar el valor haciendo referencia en data y haga la relación con player
      allPlayers = data.val(); 
    })
  }
}
