


//alert("Leu OBJETOS");
// representação do ponto.

function ClassPonto(x, y){
	this.Pcoordx = x;
    this.Pcoordy = y;


}

ClassPonto.prototype.desenha_ponto = function(contexto){
	// preenche no contento de ponto com cor preta.
	contexto.fillStyle = "black";
	contexto.fillRect();
}

ClassPonto.prototype.transPonto = function(x0, y0, x, y){
	this.Pcoordx += (x - x0);
	this.Pcoordy += (y - y0);
}
	
ClassPonto.prototype.escalaPonto = function(escala, x0, x, y){
	if(!isNaN(escala)){
		if(x0 > x)
			escala = 1/escala;
		
		// calcula o novo valor pra Pcoordx e Pcoordy do ponto
		// resultado da matris de escala  [sx 0][0 sy] {x y} = {sx*x  sy*y}.

		this.Pcoordx = escala * this.Pcoordx;
		this.Pcoordy = escala * this.Pcoordy;
	}
}

ClassPonto.prototype.rotacionaPonto = function(coordx, coordy, angle){
	// segue a forma de rotação de um ponto em torno de um eixo
	// r = raio, alfa = angulo atual, teta = angulo final
	//x' = x.cos - y*sen
	//y' = y.sen + x*cos
	var seno = Math.sin((Math.PI/180);
	var cosseno = Math.cos((Math.PI/180);
	this.Pcoordx = coordx*cosseno  -  coordy*seno;	
    this.Pcoordy = coordy*seno     +  coordx*cosseno;   
}



ClassPonto.prototype.espelharPonto = function(PSeclectCoord, PontoClick, eixo){
    // os primeiros parametros indicam as coordenadas do ponto selecionado para o espelhamento.
    // o parametro eixo é o em relação ao eixo de rotação x ou y.
    // pega ponto medio medio da reta entre os pontos de espelhamento.
    // o segundo ponto de espelhamento é em relação a posicao do click do mouse e ao eixo selecionado.
    // trazer o plano pra a origem.

    ponto_mediox = (PSeclectCoord.Pcoordx + PontoClick.x)/2;
	ponto_medioy = (PSeclectCoord.Pcoordy + PontoClick.y)/2;

    if (eixo='x'){
       //calcula ponto médio entre os pontos. se o novo ponto estiver localizado fora do frame, nao fazer nada.
       // se estiver dentro do frame e a localização do novo ponto estiver dentro do frame, faz o espelhamento.
       
    
       this.Pcoordx = 

	}else if(eixo='y'){
		var x2 = x1



    	this.Pcoordy = 
    }

	// em relação ao eixo x
	//x2  = Math.round(a*(this.Pcoordx-coordx0)+b*(this.Pcoordy-coordy0)+coordx0); 
	
	// em relação ao eixo y
	//y2  = Math.round(b * (this.x - x0) - a*(this.y - y0) + y0);

}

// Fim classe PONTO ************************************





function ClassReta(PontoA, PontoB){
	// ponto 1 e 2 para ser uma reta.
	this.p1 = PontoA;
	this.p2 = PontoB;
	this.color = 'black';
	this.reta_espessura  = 2;

}


// os prototype serve para adicionar objetos, funcoes ou parametros em outro objeto.
// ou ainda sobrescrever metodos pré-existentes

ClassReta.prototype.pontoReta = function (ponto, reta){

	//retorna se o ponto esta sobre a reta, distncia 0, senão
	//retorna a distancia.
	// o parametro reta tem dois pontos que a definem, p1 e p2.


}


	
	
ClassReta.prototype.reta_desenha = function (contexto){
		contexto.beginPath();
		contexto.lineWidth = this.reta_espessura;
		contexto.moveTo(this.p1.x, this.p1.y);
		contexto.lineTo(this.p2.x, this.p2.y);
		contexto.strokeStyle = this.color;
		contexto.stroke();
	}
	
	
ClassReta.prototype.transReta = function(x0, y0, x, y){
		this.p1.translate(x_ini, y_ini, x, y);
		this.p2.translate(x_ini, y_ini, x, y);
	}
	
ClassReta.prototype.escalaReta = function(x0, y0, x, y, fator_escala){	
		this.p1.scale(x0, y0, x, y, fator_escala);
		this.p2.scale(x0, y0, x, y, fator_escala);
	}
	
ClassReta.prototype.rotacionaReta = function(angulo){
        
    } 
	
ClassReta.prototype.espelharReta = function(x0, y0, x1, y1){
		this.p1.mirror(x0, y0, x1, y1);
		this.p2.mirror(x0, y0, x1, y1);
	}







// Fim classe RETA.


function ClassPoligonal(retas){

}



// Fim classe POLIGONAL



function ClassPoligono(retas){
	this.draw = function(contexto){
	}	

	this.translate = function(){
	}

	this.escalapoligonal = function(){
	}

	this.rotacionaPoligonal = function(){
    }

	this.espelhaPoligonal = function(){
    }
}

// Fim da classe Poligono