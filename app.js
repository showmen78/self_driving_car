




let center = new Vector(window.innerWidth/2,500)
let bottom = window.innerHeight
let right = window.innerWidth
let lastEnd = new Vector(300,bottom)//last end pos of the last road


let road = new Road(new Vector(300,bottom),new Vector(300+Math.random()*200,-50000),500)





function moveRoads(speed){

     speed.mult(-1)
     road.update(speed)
     obstacle=[[road.start,road.end],[new Vector(road.start.x+road.width,road.start.y),new Vector(road.end.x+road.width,road.end.y)]]
}








window.onload=e=>{

let time =0
let car  = new Car(80,center)
//updateRoad()




setInterval(() => {

    car.rotate()
  //  updateRoad()
    moveRoads(car.speed)
    road.rotate(time)
    time += .009

}, 50);







}



