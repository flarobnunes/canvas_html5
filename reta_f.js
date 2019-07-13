

function ObjReta(ptrA, ptrB){
	
		this.ponto1 = new ObjPonto(ptrA.Pcoordx, ptrA.Pcoordy);
		this.ponto2 = new ObjPonto(ptrB.Pcoordx, ptrB.Pcoordy);
		this.ID = 1;
		this.tipo = 1;
		this.pontos = [this.ponto1, this.ponto2];  
		this.cor = 'white';
		this.sel = false;
		this.nome = 'reta';
		
	this.pontoReta = function(ponto, reta){
		//retorna se o ponto esta sobre a reta, distncia 0, senão
		//retorna a distancia.
		// o parametro reta tem dois pontos que a definem, p1 e p2.
	}

 
	// desenha reta no canvas
	this.desenhaReta = function(contexto){
        contexto.beginPath();
		contexto.moveTo(this.ponto1.Pcoordx, this.ponto1.Pcoordy);
		contexto.lineTo(this.ponto2.Pcoordx, this.ponto2.Pcoordy);
		contexto.lineWidth = 3;
		contexto.strokeStyle = this.cor;
		contexto.stroke();
	}


	


	this.transReta = function(x0, y0, x, y){
	}
		
	this.escalaReta = function(x0, y0, x, y, fator_escala){	
		}
		
	this.rotacionaReta = function(angulo){
	        

	        
	} 
		
	this.espelharReta = function(x0, y0, x1, y1){
	 }



}


