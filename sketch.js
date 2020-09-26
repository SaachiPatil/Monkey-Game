var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var survival_time;
var gameover,restart;
var gameoverImg,restartImg;
var monkey , monkey_running
var jungle,jungleImg;
var banana ,bananaImage;
var obstacle, obstacleImage;
var spawnBanana,spawnObstacles;
var bananaGroup,obstacleGroup;
var ground , groundImage,invisibleGround;
var scoreSound;

function preload()
{
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  gameoverImg=loadImage("gameover.jpg");
  restartImg=loadImage("reset.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImg=loadImage("jungle.jpg");
  scoreSound=loadSound("scoreSound.mp3");
  
}



function setup()
{
  createCanvas(400,400);
  jungle = createSprite(200,360,400,15);
  jungle.x = jungle.width /2;
  jungle.addImage(jungleImg);
  jungle.velocityX=-6;
  monkey = createSprite(90,309,20,50);
  monkey.addAnimation("running", monkey_running);
//monkey.addAnimation("collided" ,monkey_collided);
  monkey.scale = 0.15;
  
  
  
  invisibleGround = createSprite(200,360,400,5);
  invisibleGround.visible = false;

  gameover = createSprite(200,100);
  gameover.addImage(gameoverImg);
  gameover.scale=1.2;
  
  restart = createSprite(200,260);
  restart.addImage(restartImg);
  restart.scale=0.3;
  
  survival_time=0;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() 
{
  background("white");
  //displaying score
 
  
  if(gamestate===PLAY)
  {  
    gameover.visible=false;
    restart.visible=false;
  
//spawning the obstacles and banana    
  spawnObstacles();
  spawnBanana();
    
//adding score    
   if(bananaGroup.isTouching(monkey))
   {
     survival_time=survival_time+1;
     bananaGroup.destroyEach();
   }
    
//moving backgroud    
  if (jungle.x<0)
  {
      jungle.x = jungle.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 100) 
  {
     monkey.velocityY = -12;
  }
  
//add gravity
    monkey.velocityY = monkey.velocityY + 0.8  
  }
  
  if(obstacleGroup.isTouching(monkey))
  {
    gamestate=END;
  }
   else if(gamestate===END)
  {
    gameover.visible=true;
    restart.visible=true;
    
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    
//set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  
  if(mousePressedOver(restart))
  {
    reset();
  }
  
  if(survival_time>0 && survival_time===10)
  {
    scoreSound.play();
 }
  
  drawSprites();
  fill("black");
   text("Survival Time: "+ survival_time, 300,50);
}

  function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(200,335,10,40);
   obstacle.addImage("stone",obstacleImage);
 // obstacle.velocityX = -(3+survival_time/100) ;
    obstacle.velocityX = -3;
    //generate random obstacles
    /*var rand = Math.round(random(2,9));
    switch(rand) {
      case 1: obstacle.addImage("stone",obstacleImage);
              break;
      default: break;
    }*/
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.16;
    obstacle.lifetime = 270;
   
//add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

 function spawnBanana()
{
  if (frameCount % 140 === 0){
   var banana = createSprite(200,235,10,20);
   banana.addImage("fruit",bananaImage);
 //  banana.velocityX = -(2+survival_time/100) ;
   banana.velocityX =-2
    //generate random obstacles
   /* var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: banana.addImage("fruit",bananaImage);
              break;
              default: break;
    }*/
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.12;
    banana.lifetime = 270;
    banana.y = Math.round(random(120,200));
    //banana.x = Math.round(random(200,400));
   
//add each obstacle to the group
    bananaGroup.add(banana);
 }
}

function reset()
{
  gameState=PLAY;
  survival_time=0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
}


