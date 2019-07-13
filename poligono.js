

function ObjPoligono(){
    
    this.listalista_pontos_poligono_poligono=[];
    this.listalista_pontos_poligono_poligono.push(new ObjPonto(x,y));
    this.tmp =null;
    this.sel=false;
    this.tipo="Poligono";
    this.cor = 'white';

    this.centro = function(){

        var x_max,y_max,y_min,x_min;


        x_max=x_min=this.lista_pontos_poligono[0].Pcoordx;
        y_max=y_min=this.lista_pontos_poligono[0].Pcoordx;
        
        this.lista_pontos_poligono.forEach((p)=>{
            if(p.x>x_max)
                   x_max=p.x;
            if(p.x<x_min)x_min=p.x;
            if(p.y>y_max)y_max=p.y;
            if(p.y<y_min)y_min=p.y;
        });
        let x = (x_max+x_min)/2;
        let y = (y_max+y_min)/2;
        return new Ponto(x,y);
    }

    calcula_angulo(vetor1,vetor2){
    	let cos_teta=((vetor1.x*vetor2.x)+(vetor1.y*vetor2.y))/(Math.sqrt((vetor1.x*vetor1.x)+(vetor1.y*vetor1.y))*Math.sqrt((vetor2.x*vetor2.x)+(vetor2.y*vetor2.y)));
    	return Math.acos(cos_teta)*(180/Math.PI);
    }

    transladar(x,y){
        this.lista_pontos_poligono.forEach((p)=>p.transladar(x,y));
    }
    
    espelhar(x,y){
        this.lista_pontos_poligono.forEach((p)=>p.espelhar(x,y));
    }
    
    escalar(p){
        let c1=this.centro;
        this.lista_pontos_poligono.forEach((ponto)=>ponto.escalar(p));
        let c2=this.centro;
        this.transladar(c1.x-c2.x,c1.y-c2.y);
    }

    rotacionar(x,y,angulo){
        this.lista_pontos_poligono.forEach((ponto)=>ponto.rotacionar(x,y,angulo));
    }

    seleciona2(x,y){
    	let p=new Ponto(x,y);
    	let soma_ang=0;    	
    	let fst=this.lista_pontos_poligono.length-1;
    	for (var i = 0; i < this.lista_pontos_poligono.length ; i++) {
    		let v1=new Vetor(p.x,p.y,this.lista_pontos_poligono[i].x,this.lista_pontos_poligono[i].y);
    		let v2=new Vetor(p.x,p.y,this.lista_pontos_poligono[fst].x,this.lista_pontos_poligono[fst].y);
    		soma_ang+=this.calcula_angulo(v1,v2);
    		fst=i;
    	}
    	return parseInt(soma_ang)==360;
    }

    seleciona(x,y){
        let ni=0,fst=this.lista_pontos_poligono.length-1;
        let p1,p2,xc;
        for (var i = 0; i < this.lista_pontos_poligono.length ; i++) {
            p1 = this.lista_pontos_poligono[i];
            p2 = this.lista_pontos_poligono[fst];
            if (!(p1.y == p2.y) &&       /* descarta horizontais */
                !((p1.y > y)&&(p2.y > y))&&   /* descarta retas acima */
                !((p1.y < y)&&(p2.y < y))&&   /* descarta retas abaixo */
                !((p1.x < x)&&(p2.x < x))){  /* descarta retas esquerda */
                
                if (p1.y == y){      /* primeiro ponto na mesma cota */
                    if ((p1.x > x) && (p2.y > y))
                        ni++;                /* a direita e acima do ponto */
                }else{
                    if (p2.y == y){      /* segundo ponto na mesma cota */
                        if ((p2.x > x) && (p1.y > y))
                            ni++;         /* a direita e acima do ponto */
                    }else{
                        if ((p1.x > x) && (p2.x > x))
                            ni++;             /* inteiramente a direita */
                        else{ /* verifica ponto de intersecao */
                            let dx = p1.x - p2.x;
                            xc = p1.x;
                            if ( dx != 0.0 )
                                xc += ( y - p1.y ) * dx / ( p1.y - p2.y );
                            if (xc > x)
                                ni++;
                        }
                    }
                }
            }
            fst=i;
        }
        if( ni % 2 )
            this._selecionado=!this._selecionado;
    }


    add_ponto(x,y,flag='T'){// FLAG T=temporario, N=normal, U=ultimo ponto
        if(flag=='N'){
            this.lista_pontos_poligono.push(new Ponto(x,y));
            this._tmp =new Ponto(x,y);
        } 
        else if(flag=='U'){
            this.lista_pontos_poligono.push(new Ponto(x,y));
            this._tmp =null;
        }
        else {
            this._tmp = new Ponto(x,y); 
        }
    }

    draw(context){
        context.moveTo(this.lista_pontos_poligono[0].x,this.lista_pontos_poligono[0].y);
        for(let i=1;i<this.lista_pontos_poligono.length;i++){
            context.lineTo(this.lista_pontos_poligono[i].x,this.lista_pontos_poligono[i].y);
        }
        if(this._tmp) context.lineTo(this._tmp.x,this._tmp.y);
        context.lineTo(this.lista_pontos_poligono[0].x,this.lista_pontos_poligono[0].y);
        if((this.lista_pontos_poligono.length>1 && this._tmp)|| this.lista_pontos_poligono.length>2) context.fill();
    }
}
