
var screen = document.getElementById('screen');
let obstacle=[[new Vector(300,600),new Vector(300,600)],[new Vector(600,200),new Vector(600,600)]]
class Car{
    constructor(width,pos){
        this.width = width
        this.height= this.width*1.5
        this.pos = pos

        this.shape = new Shape('white')
        this.rot = 0
        this.car = null

        this.forward =new Sensor(100,0,this.pos,'yellow')
        this.sensors=[]
        this.netAccelaration= new Vector(0,0)
       this.net_ray = new Shape('red')
       this.angleBetween=0 //angle between forward of the car and the resultant accelaration.
       this.speed = new Vector(0,0)

        this.show()

        this.circle = new Shape('white')
    }

    show(){
     

       this.car= this.shape.drawRect(this.width,this.height,this.pos.x,this.pos.y,screen)
      this.car.style.backgroundImage= 'url("./car2.png")'
      this.car.style.backgroundSize= 'cover'
      this.car.style.backgroundColor= 'transparent'
      this.car.style.backgroundPosition= 'center'
       this.generateSensors()
    }

    generateSensors(){
        for(let i= -90; i<= 90; i+=10){
            let s = new Sensor(600,i+this.rot,this.pos,'white')
            this.sensors.push(s)
       
           
         }
    }

    updateSensors(){
        //rotate the sensors with car
        this.netAccelaration.set_zero()
        this.sensors.forEach(e=>{
            e.update(this.rot)

            let dir = e.dir
        //    dir.mult(dir.magnitude()*1000)
           this.netAccelaration.add(dir)
          
        })
        this.forward.update(this.rot)
        let b = this.netAccelaration
        b= b.normalize()
        b.mult(200)
        b.add(this.pos)


 
        this.net_ray.drawLine(this.pos.x,this.pos.y,b.x,b.y,2,screen)

        //direction of the net accelaration.
        let net_dir = new Vector(b.x-this.pos.x,b.y-this.pos.y)
        //angle between forward of the car and the net accelaration.
       this.angleBetween = Vector.angle(this.forward.dir.normalize(),net_dir.normalize())


    this.speed = this.forward.dir.normalize()
    this.speed.mult(20)
        //console.log(angle)
        

       
        
       
        
    }

  

    

    rotate(){

        this.updateSensors()
        this.rot += this.angleBetween
        
        this.car.style.transformOrigin='center'
        this.car.style.transform= `rotate(${this.rot}deg)`

 

     
    }


}