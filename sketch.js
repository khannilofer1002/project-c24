
var distance = 0;
var coin,flooro;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var coins_score = 0;

function preload(){
  background1 = loadImage('background_lava.jpg');
  bomb1 = loadImage('Bomb.gif');
  coinn = loadImage('Coin.gif');
  Ninja_player = loadImage('Ninja_player.gif');
  pillar = loadImage("Pillar.png");
  floor = loadImage('floor.jpg');

  coinGroup = new Group();
  bombGroup = new Group();
  floorGroup = new Group();
}

function setup(){
  createCanvas(windowWidth,windowHeight);


ninja = createSprite(windowWidth/2 - 350,windowHeight/2,10,10);
ninja.addImage('n',Ninja_player);
ninja.scale = 0.5;
ninja.setCollider('circle',0,0,0.1);

lava = createSprite(windowWidth/2,windowHeight,windowWidth,windowHeight-390);
lava.visible = false;

  coinGroup = new Group();
  bombGroup = new Group();
  floorGroup = new Group();

}

function draw(){
  background(background1);

 if(gameState === PLAY){
    
    if(keyDown(RIGHT_ARROW)){
      ninja.x = ninja.x + 2;
    }

    if(keyDown(LEFT_ARROW)){
      ninja.x = ninja.x - 2;
    }

    if(keyDown(DOWN_ARROW)){
      ninja.y = ninja.y + 2;
    }

    if(keyDown(UP_ARROW)){
      ninja.y = ninja.y - 2;
    }

    if(ninja.isTouching(coinGroup)){
      coinGroup.destroyEach();
      coins_score = coins_score + 1;
      console.log(coins_score);
      }

    spawnBomb();
    spawnfloors();
    spawnCoins();

    if(ninja.isTouching(lava)){
      gameState = END;
    }      
 }
  
 if(gameState === END){
    ninja.velocityX = 0;
    text("game over",200,200);
    coinGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    floorGroup.setVelocityXEach(0);
    coinGroup.setVelocityYEach(0);  
    bombGroup.setVelocityYEach(0);
    floorGroup.setVelocitYXEach(0);
    coinGroup.setLifetimeEach(-1);
    bombGroup.setLifetimeEach(-1);
    floorGroup.setLifetimeEach(-1);
    }

  text('Coins:'+ coins_score, 50,100);
 
  drawSprites();
  

}


function spawnBomb(){
  if(frameCount % 64 === 0){
    fill("pink");
    bomb = createSprite(random(300,1000),random(250,100),200,100);
    
    bomb.addImage('bb', bomb1);
    bomb.scale = 0.1;
    bomb.velocityY = 2;
    bomb.velocityX = 2;
    bombGroup.add(bomb);
    bombGroup.setLifetimeEach(-1);
  }
}

function spawnfloors(){
  if(frameCount % 150 === 0){
    flooro = createSprite(250,100 ,100,10);
    flooro.addImage('f', floor);
    flooro.scale = 0.1;
    flooro.x = Math.round(random(windowWidth/2 - 100,windowWidth/2 + 100));
    flooro.y = Math.round(random(windowHeight/2 +100,windowHeight/2 - 100));
    floorGroup.add(flooro);
    floorGroup.setLifetimeEach(-1);
    flooro.depth = ninja.depth;
    ninja.depth = ninja.depth + 1;
    
  }
}
function spawnCoins(){
  if(frameCount % 150 === 0){
    coin = createSprite(250,100,10,10);
    coin.x = flooro.x;
    coin.y = flooro.y - 60;
    coin.scale = 0.1;
    coin.addImage('coin1', coinn);
    coinGroup.add(coin);
  }
}