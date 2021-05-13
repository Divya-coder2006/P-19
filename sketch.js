var START = 0;
var END = 2;
var PLAY = 1;

var score = 0;

var gameState = 0;

function preload(){
  
    obstacle2Image = loadImage("Top.png");
    obstacleImage = loadImage("Bottom .png");
    flappyImage = loadImage("flappy-1.png");
    backgroundImage = loadImage("background.jpg");
    buttonImage = loadImage("Ply Button flappy.png");
    gameOverImage = loadImage("flappy-bird-game-over-png-1.jpg")
  
}

function setup() {
    createCanvas(600, 500);

    background1 = createSprite(460,300,1000,600);
    background1.addImage(backgroundImage);
    background1.scale = 3.5; 
    background1.velocityX = -5; 

    obstacleGroup = new Group();
    obstacleGroup2 = new Group();
  
    laser = createSprite(300,495,600,5);  
    flappy = createSprite(100,300,50,50);
    flappy.addImage(flappyImage)
    flappy.scale = 0.15;
    flappy.debug = false;
  
    top1 = createSprite(300,5,600,5);
  
    start1 = createSprite(300,250,100,50);
    start1.addImage(buttonImage);
    start1.scale = 0.5;
  
    gameOver = createSprite(300,250,10,10);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.8;
    gameOver.visible = false;

} 

function draw() {
  
      background("lightblue");
      if(background1.x < 0){
          background1.x = 300
      }
  
      if(gameState == START){
        
          flappy.y = 200;
        
          background1.visible = false;
          flappy.visible = false;
          obstacleGroup2.destroyEach();
          obstacleGroup.destroyEach();
          start1.visible = true;
          fill("black");
          textSize(50);
          text("FLAPPY BIRD",150,150);
          if(mousePressedOver(start1)){
             gameState = PLAY;
             start1.visible = false;
          }
          score = 0;
      }

      else if(gameState == PLAY){
        
          flappy.setCollider("circle",0,0,120);
          
          laser.visible = false;
          flappy.bounceOff(top1);
          background1.visible = true;
          start1.visible = false;
          flappy.visible = true;

          if(keyDown("space") && flappy.y <= 600){
            flappy.velocityY = -8; 
          }
          flappy.velocityY = flappy.velocityY + 0.5

          obstacles();
          obstacles2();

          if(flappy.isTouching(obstacleGroup)){
              gameState = START;
          }
          if(flappy.isTouching(obstacleGroup2)){
              gameState = START;
          }
         if(flappy.isTouching(laser)){
           gameState = START;
         }
      }
  
      else if(gameState == END){
          gameOver.visible = true;
          obstacleGroup.destroyEach();
          obstacleGroup2.destroyEach();
          background1.visible = false;
          flappy.visible = false;
        
      }
    drawSprites();
  
}

function obstacles(){
  
  if(World.frameCount % 60 == 0){
    
    obstacle = createSprite(600,400,300,300);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 1.0;
    obstacle.y = random(450,575)
    obstacleGroup2.add(obstacle);
    
  }  
  
}
function obstacles2(){
  
  if(World.frameCount % 60 == 0){
    
    obstacle2 = createSprite(600,90,300,10);
    obstacle2.addImage(obstacle2Image);
    obstacle2.velocityX = -5;
    obstacle2.scale = 1.3;
    obstacle2.y = random(20,125 )
    obstacleGroup.add(obstacle2);
    
  }  
  
}