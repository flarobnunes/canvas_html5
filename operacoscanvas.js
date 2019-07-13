

// as configurações de dimensao e taxa de amostragem do canvas respectivamente.
var configuracoes = [400, 300, 50]

// tolerancia(TOL) do click do mouse, para capturar tambem pontos vizinho, exemplo: x-1, x+1,
//  																			    y-1, y+1, etc.

var tolerancia = 10;

// pega o canvas e contexto repectivamente, para manipulação
var canvas = document.getElementById("canvas");
canvas.width = configuracoes[0];
canvas.height = configuracoes[1];
var context = canvas.getContext("2d");





var DesenhaPontoCanvas = function(x, y){
	var p = new Ponto(x, y);				

};


var pickPonto = function (){

};

var pickReta = function (){

};

var pickPoligono = function (){

};

var pickPoligonal = function (){

};
document.onclick = function(evt){

	
};
document.onmousemove = function(evt){

};


document.ondblclick = function(evt){

	
};

window.onload = function(){
	alert("Leu OPERACOESCANVAS");
};
