const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine , world;
var bg , cloud1 , cloud2 , cloudsImg;
var man , manImg , manleft , manright;
var ground;
var gameState = 1;
var gameOver , gameOverImg;
var balls = [];

function preload(){
   bg = loadImage("background.png");
   cloudsImg = loadImage("redCloud.png");
   manImg = loadImage("blueninja.png");
   manleft = loadImage("ninjaleft.png");
   manright = loadImage("ninjaright.png");
   gameOverImg = loadImage("gameover.png");
}

function setup(){
    createCanvas(1300,800);

    engine = Engine.create();
    world = engine.world;

    cloud1 = createSprite(-50,120,20,20);
    cloud1.velocityX = 2;
    cloud1.addImage(cloudsImg);
    cloud1.scale = 0.6;

    cloud2 = createSprite(-800,250,20,20);
    cloud2.velocityX = 2;
    cloud2.addImage(cloudsImg);
    cloud2.scale = 0.6;

    var options = {
      'restitution':0.8,
      'friction':1.0,
      'density':1.0
  }
    man = Bodies.rectangle(650, 500, 20, 20, options);
    World.add(world,man);

    var options1 ={
      isStatic : true
    }
    ground = Bodies.rectangle(650, 600, 1000, 60, options1);
    World.add(world,ground);

    for(var i = 0;i < 10;i=i+1){
      balls.push(new ball(random(300,1000),random(-300,50)));
    }
}

function draw(){

  Engine.update(engine);

  background(bg);

  if(cloud1.x > 1350){
      cloud1.x = -50;
  }

  if(cloud2.x > 1350){
    cloud2.x = -50;
}

  imageMode(CENTER);
  image(manImg,man.position.x,man.position.y,50,100);

  if(gameState === 1){
    if(keyDown(LEFT_ARROW)){
      Matter.Body.translate(man,{x:-5,y:0});
    } 
    
    if(keyDown(RIGHT_ARROW)){
        Matter.Body.translate(man,{x:5,y:0});
    } 

    spawnObjects();

    

    if(man.y > 850){
     gameState = 2;
    }
    }

  if(gameState === 2){
    gameover();
  }

    drawSprites();

    for(var i=0;i<balls.length;i++){
      balls[i].display();
    }
}

function gameover(){
  gameOver = createSprite(650,400,200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
}

function spawnObjects(){
  
}