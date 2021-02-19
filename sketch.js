var play=1;
var end=0;
var gameState = play;

var caveman,caveman_running,cavemanImage;
var bear1,bear1_running;
var bground,bgroundImage,invisibleGround;
var trap,trapImage,trapGroup;
var tree,treeImage,treeGroup;
var gameover,gameoverImage;
var win,winImage;
var score = 0;
var honey,honeyBee,honeyBeeImg ,honeyImg;

function preload(){
  caveman_running = loadAnimation("caveman1.png","caveman2.png","caveman3.png","caveman4.png");
  cavemanImage = loadAnimation("caveman_jump.png");
  bear1_running = loadAnimation("bear1.png","bear2.png","bear3.png","bear4.png","bear5.png");
  bear1Image = loadAnimation("bear_jump.png");
  bearDie = loadImage("bearDie.png");
  bgroundImage = loadImage("bg.jpg");
  treeImage = loadImage("tree.png");
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeyImage = loadAnimation("Monkey_04.png");
  trapAnimation = loadAnimation("trap_1.png","trap_2.png","trap_3.png","trap_4.png","trap_5.png");
  trapImage = loadImage("trap_1.png");
  bananaImage = loadImage("banana.png");
  cherryImage = loadImage("cherry.png");
  // gameoverImage = loadImage("gameover.png");
  // winImage = loadImage("youwin.png");
  fox_running = loadAnimation("fox.png","fox_2.png","fox_3.png","fox_4.png","fox_5.png","fox_6.png","fox_7.png");
  foxImage = loadAnimation("fox_2.png");
  honeyBeeImg = loadAnimation("bee1.png","bee2.png");
  honeyImg = loadImage("honey.png");
}

function setup(){
  createCanvas(600,500);
  
  bground = createSprite(300,200,1200,500);
  bground.addImage(bgroundImage);
  bground.scale = 3;
  
  invisibleGround = createSprite(300,360,600,5);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;
  
  caveman = createSprite(100,340,50,50);
  caveman.addAnimation("running",caveman_running);
  caveman.addAnimation("rest",cavemanImage);
  caveman.scale = 0.3;
  
  bear1 = createSprite(250,340,50,50);
  bear1.addAnimation("running",bear1_running);
  bear1.addAnimation("rest",bear1Image);
  bear1.scale = 0.3;

  fox = createSprite(250,340,50,50);
  fox.addAnimation("running",fox_running);
  fox.addAnimation("rest",foxImage);
  fox.scale = 0.4;
  fox.visible = false;

  monkey = createSprite(250,340,50,50);
  monkey.addAnimation("running",monkeyRunning);
  monkey.addAnimation("rest",monkeyImage);
  monkey.scale = 0.4;
  monkey.visible = false;

  for(var h = 0; h<5; h++){
    honeyBee = createSprite(random(250,300),random(340,380),10,10);
    honeyBee.addAnimation("honeyBee", honeyBeeImg);
    honeyBee.scale = 0.2;
    honeyBee.visible = false;
  }
  
  gameover = createSprite(300,100,50,50);
 // gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  win = createSprite(300,100,50,50);
 // win.addImage(winImage);
  win.visible = false;
  
  treeGroup = new Group();
  trapGroup = new Group();
}
  
  
  
  

function draw(){
  background("white");
  
  
  
  
  spawntree();
  //spawntrap();
  
  
  
  if(gameState===play){
    bground.velocityX = -(5+0.5*score/100);
  
  if (bground.x < 0){
      bground.x = bground.width/2;
    }
  
  if(keyDown(UP_ARROW)&&bear1.y>320){
    bear1.velocityY = -(12+0.1*score/100);
  }

  if(keyDown(UP_ARROW)&&fox.y>320){
    fox.velocityY = -(12+0.1*score/100);
  }

  if(keyDown(UP_ARROW)&&monkey.y>320){
    monkey.velocityY = -(12+0.1*score/100);
  }

  if(caveman.y<320){
    caveman.changeAnimation("rest",cavemanImage);
  }
  else{
   caveman.changeAnimation("running",caveman_running);
  }


  if(keyDown("b")&& score>0){
    bear1 = createSprite(250,340,50,50);
    bear1.addAnimation("running",bear1_running);
    bear1.addAnimation("rest",bear1Image);
    bear1.scale = 0.3;
    fox.destroy();
    monkey.destroy();
  }

  if(keyDown("f") && score>=100){
    fox = createSprite(250,340,50,50);
    fox.addAnimation("running",fox_running);
    fox.scale = 0.4;
    fox.visible = true;
    bear1.destroy();
    monkey.destroy();
  }

  if(keyDown("m") && score>200){
    monkey = createSprite(250,340,50,50);
    monkey.addAnimation("running",monkeyRunning);
    monkey.scale = 0.08;
    monkey.visible = true;
    bear1.destroy();
    fox.destroy();
  }

    score = score + Math.round(frameRate()/60);
    
    if(trapGroup.isTouching(bear1)){
      gameState = end;
    //  bear1.velocityY = bear1.velocityY-(1+0.4*score/100);
    }
    
    if(treeGroup.isTouching(bear1)){
      gameState = end;
     // bear1.velocityY = bear1.velocityY-(1+0.08*score/100);
    }
    
    if(trapGroup.isTouching(caveman)){
      caveman.velocityY = caveman.velocityY-(1+0.08*score/100);
      caveman.changeAnimation("rest",cavemanImage);
    }
    
    if(treeGroup.isTouching(caveman)){
      caveman.velocityY = caveman.velocityY-(1+0.08*score/100);
      
    }
    

  //bear1.velocityX = bear1.velocityX - 0.00001;
  }
  
      if(bear1.y<320){
    bear1.changeAnimation("rest",bear1Image);
  }
  else{
   bear1.changeAnimation("running",bear1_running);
  }

  if(fox.y<320){
    fox.changeAnimation("rest",foxImage);
  }
  else{
   fox.changeAnimation("running",fox_running);
  }

  if(monkey.y<320){
    monkey.changeAnimation("rest",monkeyImage);
  }
  else{
   monkey.changeAnimation("running",monkeyRunning);
  }
  
  caveman.velocityY = caveman.velocityY + 0.5+0.02*score/100;
    
  bear1.velocityY = bear1.velocityY + 0.5+0.05*score/100;
  fox.velocityY = fox.velocityY + 0.5+0.05*score/100;
  monkey.velocityY = monkey.velocityY + 0.5+0.05*score/100;
  
  caveman.collide(invisibleGround);
  
  bear1.collide(invisibleGround);
  fox.collide(invisibleGround);
  monkey.collide(invisibleGround);
  
  if(gameState===end){
    score = 0;

    //caveman.debug = true;
    caveman.setCollider("rectangle",0,0,100,240);
    
    treeGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);
    
    gameover.visible = true;

    caveman.velocityX = caveman.velocityX+0.2;
    caveman.collide(bear1);
    caveman.collide(fox);
    caveman.collide(monkey);

    bground.velocityX = 0;
    
  }
  
 /* if(caveman.isTouching(bear1)){
    win.visible = true;
    score = 0;
    bground.velocityX = 0;
    
    bear1.velocityX = 0;
    caveman.velocityX = 0;
    
    treeGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);
    
    
  }*/


  
 // caveman.debug = true;
 // bear1.debug = true;
  caveman.setCollider("rectangle",100,0,350,240)
  bear1.setCollider("rectangle",0,0,140,130);
  
  drawSprites();
  
  textSize(25);
  stroke("black");
  fill("black");
  text("Score:"+score,420,50);
}

function spawntree(){
  if (frameCount % 250===0){
    tree = createSprite(700,355,50,50);
    tree.addImage(treeImage);
    tree.velocityX = -(5+0.5*score/100);
    
    tree.scale = 0.3;
    tree.depth = caveman.depth;
    caveman.depth = caveman.depth+1;
    tree.depth = bear1.depth;
    bear1.depth = bear1.depth+1;
    
    tree.lifetime = 150;
    
    treeGroup.add(tree);

    /*trap = createSprite(700,330,50,50);
    trap.addImage(trapImage);
    trap.velocityX = -(5+0.5*score/100);
    
    trap.scale = 0.2;
    trap.depth = caveman.depth;
    caveman.depth = caveman.depth+1;
    trap.depth = bear1.depth;
    bear1.depth = bear1.depth+1;
    
    trap.lifetime = 150;

    
    trapGroup.add(trap);*/
  }
}

function spawnfruit(){
  fruit = createSprite(700,355,50,50);
  fruit.velocityX = -(5+0.5*score/100);
}
