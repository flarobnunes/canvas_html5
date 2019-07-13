
//primeira classe a ser carregada.



function ObjPonto(x,y){
    	this.Pcoordx = x;
        this.Pcoordy = y;
        this.nome = 'ponto';
        this.TOL = 1;
    	this.sel = false;
    	this.cor = 'white';
    	this.tam_ponto = 3;


	    this.desenhaPonto = function (contexto){	
			//PONTO REDONDO.
			//console.log('função desenhaPonto');
			contexto.beginPath();
			// faz a correção de desenho para um ponto mais proximo da ponteira do mouse.
			contexto.arc(this.Pcoordx, this.Pcoordy,this.tam_ponto,0,2*Math.PI);
			contexto.fillStyle = this.cor;
			contexto.fill();

		};

	    this.escalar = function(p){
        	this.Pcoordx*=p;
        	this.Pcoordy*=p;
    	};



    	this.setcor = function (pcor) {
    		this.cor = pcor;
    	};

    	this.transladar = function(x,y){
        	
        	this.Pcoordx+=x;
        	this.Pcoordy+=y;
    	};


	// contaPontos(){

	// };
    
 //    //  // funcção para retornar se um ponto está em uma figura.
 //    //  isPontoInRec(x, y) {
	// //     var rectDimensions = [0,0,150,75];
	// //        var click_x = x;
	// //        var click_y = y;
	   
	// //        if (click_x >= rectDimensions[0] && click_x 
	// //         <= rectDimensions[0] + rectDimensions[2]
	// //          && click_y >= rectDimensions[1] && click_y 
	// //          <= rectDimensions[1] + rectDimensions[3]) {
	// //              return true;
	// //        }
	   
	// //        return false;
 //  	// }

	//this.transPonto = function(x0, y0, x, y){
	// 	this.Pcoordx += (x - x0);
	// 	this.Pcoordy += (y - y0);

	//};
		
	this.escalaPonto = function(escala, x0, x, y){

		if(!Number.isNaN(escala)){
			if(x0 > x)
				escala = 1/escala;
			
			// calcula o novo valor pra Pcoordx e Pcoordy do ponto
			// resultado da matriz de escala  [sx 0][0 sy] {x y} = {sx*x  sy*y}.

			this.Pcoordx = escala * this.Pcoordx;
			this.Pcoordy = escala * this.Pcoordy;
		}
	};



	this.rotacionaPonto = function(coordx, coordy, angle){
		// segue a forma de rotação de um ponto em torno de um eixo
		// r = raio, alfa = angulo atual, teta = angulo final
		//x' = x.cos - y*sen
		//y' = y.sen + x*cos
		var seno = Math.sin(Math.PI/180);
		var cosseno = Math.cos(Math.PI/180);
		this.Pcoordx = coordx*cosseno  -  coordy*seno;	
		this.Pcoordy = coordy*seno     +  coordx*cosseno;   
	};



	this.espelharPonto = function(PSeclectCoord, PontoClick, eixo){


	    ponto_mediox = (PSeclectCoord.Pcoordx + PontoClick.x)/2;
		ponto_medioy = (PSeclectCoord.Pcoordy + PontoClick.y)/2;
	    
	};

}
// Fim Obje PONTO ************************************


// Fim Obje RETA.


function ObjPoligonal(retas){

}



// Fim Obje POLIGONAL



function ObjPoligono(retas){

}

desenhaPoligono = function(contexto){
}	

translate = function(){
}

escalapoligonal = function(){
}
rotacionaPoligonal = function(){
}

espelhaPoligonal = function(){

}

// Fim da Obje POLIGONO