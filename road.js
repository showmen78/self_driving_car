let roadimg = document.getElementById('road')
let t=0
let l =0

class Road{
    constructor(start,end,width){
        this.start = start
        this.end = end
        this.width = width 
        

        this.lLine = new Shape('white')
        this.rLine = new Shape('white')


        this.show()

    }

    show(){
        this.lLine.drawLine(this.start.x,this.start.y,this.end.x,this.end.y,2,screen)
        this.rLine.drawLine(this.start.x+this.width,this.start.y,this.end.x+this.width,this.end.y,2,screen)
    }

    rotate(time){
        this.end.x += Math.sin(time)*20
        this.show()
    }


    update(carSpeed){
        t-= carSpeed.y
        l += carSpeed.x
        roadimg.style.bottom= String(t)+'px'
        roadimg.style.left= String(l)+'px'

        this.start.add(carSpeed)
        this.end.add(carSpeed)
        this.show()
    }
}