var path, boy, cash, diamonds, jewelry, car;
var pathImg, boyImg, cashImg, diamondsImg, jewelryImg, carImg;
var treasureCollection = 0;
var cashG, diamondsG, jewelryG, carGroup;

//Estados do Jogo
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  carImg = loadImage("carImg.png");
  endImg = loadAnimation("fimdeJogo.png");
}

function setup(){
  createCanvas(400,600);

//Movendo fundo
  path = createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 5;

//criando menino correndo
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.08;
  
  cashG = new Group();
  diamondsG = new Group();
  jewelryG = new Group();
  carGroup = new Group();
}

function draw() {
  if(gameState === PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges = createEdgeSprites();
  boy.collide(edges);
  
//código para reiniciar o fundo
  if(path.y > 400 ){
    path.y = height/3.5;
  }
    createCash();
    createDiamonds();
    createjewelry();
    createCar();

    if(cashG.isTouching(boy)){
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if(diamondsG.isTouching(boy)){
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
    }
    else if(jewelryG.isTouching(boy)){
      jewelryG.destroyEach();
      treasureCollection= treasureCollection + 150;
    }
    else{
      if(carGroup.isTouching(boy)){
        gameState =  END;
        
        boy.addAnimation("SahilRunning",endImg);
        
        boy.x =  200;
        boy.y = 300;
        boy.scale = 0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jewelryG.destroyEach();
        carGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelryG.setVelocityYEach(0);
        carGroup.setVelocityYEach(0);
     
      }
    }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection, 10, 30);
  }
}

function createCash(){
  if(World.frameCount % 200 == 0){
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale  = 0.12;
    cash.velocityY = 5;
    cash.lifetime = 210;
    cashG.add(cash);
    cash.setCollider("circle", 0, 0, 40);
    cash.debug = false;
  }
}

function createDiamonds(){
  if(World.frameCount % 320 == 0){
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 5;
    diamonds.lifetime = 210;
    diamondsG.add(diamonds);
    diamonds.setCollider("circle", 0, 0, 40);
    diamonds.debug = false;
  }
}

function createjewelry(){
  if(World.frameCount % 410 == 0){
    var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale =  0.13;
    jewelry.velocityY = 5;
    jewelry.lifetime = 210;
    jewelryG.add(jewelry);
    jewelry.setCollider("circle", 0, 0, 40);
    jewelry.debug = false;
  }
}

function createCar(){
  if(World.frameCount % 530 == 0){
    var car = createSprite(Math.round(random(50, 350),40, 10, 10));
    car.addImage(carImg);
    car.scale =  0.7;
    car.velocityY = 9;
    car.lifetime = 210;
    carGroup.add(car);
    car.setCollider("circle", 0, 0, 50);
    car.debug = false;
  }
}
