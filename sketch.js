var dog,dogImage,happyDog,happyDogImage;
var database;
var foodS , foodStock;

function preload()
{
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(250,300,100,50);
  dog.addImage("normalDog",dogImage);
  dog.addImage("happyDog",happyDogImage);
  dog.scale = 0.5;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readFoodStock);
   
  //foodS = foodStock;
  
}


function draw() {  
  background(46, 139, 87);
  
  if(keyDown(UP_ARROW)){
    dog.changeImage("happyDog",happyDogImage);
    writeStock(foodS);
   }
   drawSprites();
  textSize(20);
  fill("white");
  strokeWeight(4);
  text("Press Up Arrow Key To feed the dog",125,50);

}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x--;
  }
  database.ref('/').update({
    Food : x
  })
}
function readFoodStock(data){
  foodS = data.val();
}

