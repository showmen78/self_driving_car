class Sensor{
    constructor(len,angle,start,color){
        this.len = len
        this.angle = angle
        this.start = start
        this.new_len= this.len //length after intersection.

        this.body = new Shape(color)
        this.car_rot =0

        this.dir = new Vector(0,0)


        this.show()
    }

    endPoint(len){
        let end = new Vector(Math.sin(Vector.to_rad(this.angle+this.car_rot)),-Math.cos(Vector.to_rad(this.angle+this.car_rot)))
        end.mult(len)
        end.add(this.start)
        
        return end
    }


    show(){
        let end  = this.endPoint(this.new_len)
        this.body.drawLine(this.start.x,this.start.y,end.x,end.y,2,screen)
        this.dir= Vector.position_vector(this.start,end)
        this.dir.mult(100000)
        
    }

    is_intersecting(c,d){
        //checks for intersection with obstacles.
        let a= this.start
        let b= this.endPoint(this.len)


       
        let den = ((a.x-b.x)*(c.y-d.y))-((a.y-b.y)*(c.x-d.x))
      

        let t = ((a.x-c.x)*(c.y-d.y))-((a.y-c.y)*(c.x-d.x))
        let u = ((a.x-c.x)*(a.y-b.y))-((a.y-c.y)*(a.x-b.x))
        t /= den
        u /= den

        if(u>0 && u<=1 && t>0 && t<=1){
            let p_x = a.x+t*(b.x-a.x)
            let p_y= a.y+ t*(b.y-a.y)

            return new Vector(p_x,p_y)
        }
        return 0

      
    }

    update_ray(){
        //check for the nearest intersection and draw a line from start to the intersection point
        let dist = 10000
        for(let i =0; i<obstacle.length; i++){
            let d = this.is_intersecting(obstacle[i][0],obstacle[i][1])

        if(d!==0){
            if(Vector._distance(d,this.start)<dist){
                dist = Vector._distance(d,this.start)
                this.new_len = dist
             
            }
        }

    }
    if(dist===10000){
        this.new_len= this.len
    }

    this.show()

       
    }




    update(rot){
        this.car_rot = rot // car rotation in deg
        this.update_ray()
      
    }
}