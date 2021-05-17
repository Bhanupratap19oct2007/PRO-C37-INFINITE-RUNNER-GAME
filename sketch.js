var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_collided;
var ground, invisibleGround, groundImage;

//var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameOver, gameOverImg;

var restart, restartImg;

function preload(){
  player_running = loadAnimation("player1.png","player2.png","player3.png");
  //player_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  //cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight/2);
  
  player = createSprite(50,180,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.2;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  //cloudsGroup = new Group();
  obstaclesGroup = new Group();

  var gameOver = createSprite(200,300);
  gameOver.addAnimation("gameOver");
  gameOver.scale = 0.5;
  
  var restart = createSprite(200,340);
  restart.addAnimation("restart");
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
  background("white");
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY) {
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space")) {
      player.velocityY = -13;
    }
    
    player.velocityY = player.velocityY + 0.8;

    if(obstaclesGroup.isTouching(player)) {
      gameState = END;
    }
  } else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
  }
  
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  player.collide(invisibleGround);
  //spawnClouds();
  spawnObstacles();
  drawSprites();
}

/*function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}*/

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}