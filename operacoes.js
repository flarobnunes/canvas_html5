/*
  arquivo operacoes.js


  Flavio Roberto de Sousa Nunes
  Trabalho computação gráfica
*/

var cv, cx; // canvas e contexto

 
// para guardar os dados dos objetos criados no canvas.
var listaPontos = []; 
var listaRetas = [];
var listaPoligonos = [];
var listaPoligonais = [];



// Configurações, canvas, contexto e posicao do click do mouse
var cvlargura = 600;
var cvaltura = 400;
var configura_mouse = 2;

// tolerancia para o pick
var TOL = 0;

// para o pick de reta
// utilizado nao operacao AND.
var cod = []; 

// controles para a reta
var controle = false;
var counter = 0;
var clickMouseX = [];
var clickMouseY = [];



// operacao para o ponto
var ultimo_clickX = -1; // captura o ultimo click dado no canvas, posicao X, que esta na lista de pontos.
var ultimo_clickY = -1; // captura o ultimo click dado no canvas, posicao Y, que esta na lista de pontos
var funcao_selecao = []; // trata qual seleção_ pick_ponto, pick_reta, pick_poligonal, pick_poligono
//var pontos_selecionados = []; // acumula pontos selecionados.
var TOL = 12;
var listaPontosSelecionados = [];

// operacoes para poligonos
var listarestaspoligono_temp = [];

// seleciona a opção de desenho, ponto, reta, poligono, poligonal, respectivamente
// será setada na funçao de click  dos botoes na tela.
// por exemplo, função pintar pontos, é ativada quando acionado o botao ponto na interface de usuáio.
// e é setada na função_desenho[1,0,0,0], todos as outras funções recebem 0.

var funcao_desenho = [0,0,0,0]; 
var funcao_excluir = [0,0,0,0];



// Função de inicialização dos parametros do sistema
function atualizar(){
    cv.width = cvlargura;
    cv.height = cvaltura
    cx.fillStyle = 'black';     // PREENCHIMENTO DO CANVAS
	cx.fillRect(0,0,800,600);  // TAMANHO DO CANVAS
	listaPontos = []; 
	listaRetas = [];
	funcao_selecao = [0,0,0,0];
	funcao_desenho = [0,0,0,0];

}



window.onload = function(){
    
	cv = document.getElementById('canvas');
	cx = cv.getContext('2d');

	atualizar();



	// CLICK DO MOUSE
	cv.onmousedown = function(event){
		// imprime quantidades:
		console.log('Pontos(qtd): '+listaPontos.length);
		console.log('Retas (qtd): '+listaRetas.length);

		// corrige a posicao do mouse em relação ao canvas
		var click_mouseX = event.pageX-this.offsetLeft;
        var click_mouseY = event.pageY-this.offsetTop;

        

		if(funcao_excluir[0]==1){
			// funcao de excluir objetos
		};

		// implementa seleção de elementos no canvas.
		if (funcao_selecao[0]==1){



			// ------------- chamada da funcao_selecao()--------------------
			// se nao existir pontos no cavas nao faz nada
			// implementa o pickponto se a lista de pontos nao estiver vazia.
			if(listaPontos.length != 0){
				for (var i = 0; i < listaPontos.length; i++) {

					// implementação do Pickponto dentro do if.
					if((click_mouseX-TOL<=listaPontos[i].Pcoordx && click_mouseX+TOL>=listaPontos[i].Pcoordx) 
						&& (click_mouseY-TOL<=listaPontos[i].Pcoordy && click_mouseY+TOL>=listaPontos[i].Pcoordy) ){

						if (!listaPontos[i].sel){ // se o ponto não estiver selecionado.		
							listaPontos[i].sel = true;
							listaPontos[i].cor = 'red';

							// redenha o ponto com as especificações acima e o coloca na lista de pontos selecionados
							listaPontos[i].desenhaPonto(cx); 
							listaPontosSelecionados.push(listaPontos[i]);

						} else{ // se o ponto já estiver selecionado, desfaz a seleção e o muda de cor.
							listaPontos[i].sel = false;
							listaPontos[i].cor = 'white';
							// redenha o ponto com as especificações acima e o coloca na lista de pontos selecionados
							listaPontos[i].desenhaPonto(cx); 
							listaPontosSelecionados.push(listaPontos[i]);
						};
					};
				};
			};
			
			// ------------- chamada da funcao_selecao()--------------------
			// Inicia seleção(PICK de RETA) de retas.
			if(listaRetas.length != 0){
				// emite saida, se false ou true em relação ao pick de reta.
				// teste feito em todas as retas da lista
     			for (var i = 0; i < listaRetas.length; i++){
					console.log('Retas(qtd): '+i);
					console.log('x,y: '+click_mouseX+','+click_mouseY);
					// calculo da distancia do ponto a reta.
					var distancia_ponto_reta = (click_mouseX - listaRetas[i].ponto1.Pcoordx)*(listaRetas[i].ponto2.Pcoordy - listaRetas[i].ponto1.Pcoordy)
											  -(listaRetas[i].ponto2.Pcoordx - listaRetas[i].ponto1.Pcoordx)*(click_mouseY-listaRetas[i].ponto1.Pcoordy);

					console.log('coord. da Reta:'+listaRetas[i].ponto1.Pcoordx+','+listaRetas[i].ponto1.Pcoordy);
					console.log('Alinhados:'+distancia_ponto_reta);

					// manda somente uma reta por vez para verificar se esta ou nao na posicao do clikc.
					if(pickReta(listaRetas[i], click_mouseX, click_mouseY)){
						//console.log('verdadeiro para o pick de reta: '+pickReta(listaRetas[i], click_mouseX, click_mouseY));						
						if (listaRetas[i].sel) {
							listaRetas[i].sel = false;
							listaRetas[i].cor = 'white';
							// modifica os parametros de cor e sel do objeto reta para a a marcação.
							listaRetas[i].desenhaReta(cx); 
						}else{
							// modifica os parametros de cor e sel do objeto reta para a a marcação.
							
							listaRetas[i].sel = true;
							listaRetas[i].cor = '#0F0';
							listaRetas[i].desenhaReta(cx); 
						};
				 	}else {
                        console.log('pickdereta retornou false');
				 	};

				 	for (var i = 0; i < listaRetas.length; i++) {
				 		if (listaRetas.sel == true) {
				 			console.log('retas selecionadas: '+listaRetas[i]);	
				 		};	
				 	};
				};
				//return 1;
			};		
			// FIM função de seleção de RETAS
		};


		// controla o desenho de ponto a partir do controle do botao na pagina.
		if(funcao_desenho[0]==1){

				var novo_pt = new ObjPonto(click_mouseX, click_mouseY);
				novo_pt.desenhaPonto(cx);
				listaPontos.push(novo_pt);

		}; // FIM desenho de PONTOS


		// verifica ultimo click e comeca desenho de reta.
		if(funcao_desenho[1]==1){
			// a operação de modulo é para determinar se é o primeiro ou o segundo click do mouse.
			if (counter%2==1){
				//console.log('ímpar');
			    clickMouseX.push(click_mouseX); // para o controle de criação de dois pontos.
			    clickMouseY.push(click_mouseY); // onde aqui se cria o primeio ponto de reta e o segundo no segundo click
			} else if(counter%2==0){

			 	// pt1 recebe a lista de clicks do mouse, que acula o ultimo click dado.
			 	var m_y = clickMouseY.pop();
				var m_x = clickMouseX.pop();
				var pt1  = new ObjPonto( m_x , m_y);

			 	
			 	var pt2  = new ObjPonto(click_mouseX, click_mouseY); // são coordenadas do mouse durante click ja corrigidas
			 	var reta = new ObjReta(pt1,pt2);				
			 	listaRetas.push(reta);
			 	reta.desenhaReta(cx);
			 	//apaga os dados da lista após o segundo cliclk.
			 	clickMouseX = [];
			 	clickMouseY = [];

			 	counter =0;
			};
			// esta variavel controla se é o primeio ou segndo ponto da reta a ser desenhada.
			counter += 1;
			
		}; // FIM do desenho de reta.


		//código para  o poligonol.
		if(funcao_desenho[2]==1){
			
			// o modulo de counter por 2 retorna 1 se é o primeiro click para reta, se for o segundo retorna 0
			// e desenha a reta.
			if(counter%2==1){ 

				clickMouseX.push(click_mouseX); // para o controle de criação de dois pontos.
			    clickMouseY.push(click_mouseY); // onde aqui se cria o primeio ponto de reta e o segundo no segundo click

			}else{
				// comeca desenho de retas.
				var m_y = clickMouseY.pop();
				var m_x = clickMouseX.pop();
				var pt1  = new ObjPonto( m_x , m_y); 
			 	var pt2  = new ObjPonto(click_mouseX, click_mouseY); // são coordenadas do mouse durante click ja corrigidas
			 	var reta = new ObjReta(pt1,pt2); // desenha aresta do poligono

				console.log('ponto(x,y): '+'('+pt2.Pcoordx+','+pt2.Pcoordy+')');
				
				var reta1 = new ObjReta(pt1,pt2);
				reta1.desenhaReta(cx);
				var poligono = new ObjPoligono();
				listaPoligonos
				counter =0;
			};
			counter += 1;
    	};





	}; // fim função MOUSEDOWN


	cv.onmousemove = function(event){ 
		var click_mouseX = event.pageX - this.offsetLeft;
        var click_mouseY = event.pageY - this.offsetTop;

        //inclui na pagina HTML as coordenadas do mouse na #div.CoordsMousexy
		var div = document.getElementById("CoordsMousexy");
		div.innerHTML="("+click_mouseX+","+click_mouseY+")";


	}; 

    cv.onmouseup  = function(event){ 
		


	};
};



function desenha_poligono(){

	funcao_desenho = [0,0,1,0];
	

};

function desenha_poligonal(){

	funcao_desenho = [0,0,0,1];
};

function repintar() {
	
};

// a seleção de funcionalidades é através das listas que guardam valores logicos
// correspondentes as interações desejadas.
// exeplo: a variavel do tipo lista função_desenho, guarda que operação será aplicada
// no evento mousedown(click do mouse).


function limpar_tela(){
    
    cx.fillStyle = "black";
    cx.beginPath();
    cx.rect(0, 0, cvlargura, cvaltura);
    cx.closePath();
    cx.fill();
    
    // limpeza dos valores das listas de objetos.
	listaPontos = []; 
	listaRetas = [];
	listaPoligonos = [];
	listaPoligonais = [];

	// limpa dados de listas de objetos
	// zera funcoes selecionadas
	funcao_desenho = [0,0,0,0];
	funcao_selecao = [0,0,0,0];
	listaPontosSelecionados = [];

	// limpa a lista para o quickhull.

	ultimo_clickY = -1;
	ultimo_clickX = -1;

};


// chamada do botao seleciona, como nao foi implementado completamente, para qualquer objeto,
// está selecionando pontos e retas.
function selecionar_ponto(){

	// zera o vetor de desenhos, para nao ocorrer conflito de funções.
	funcao_selecao = [1,0,0,0];
	funcao_desenho = [0,0,0,0];
	counter = 3; 
};




function desenha_ponto(){
	// os vetores sao setados de acordo com o que foi clicado na pagina inicial

	funcao_selecao = [0,0,0,0];
	funcao_desenho = [1,0,0,0];
	selecao = [];
	counter = 3; 

};


function desenha_reta(){
        clickMouseX = [];
        clickMouseY = [];
		funcao_desenho = [0,1,0,0];
		funcao_selecao = [0,0,0,0];
		// inicializado com três para controle do modulo da divisao por 2.
		counter = 3; 


};


function desenha_poligonal(){
	    // limpa lista temporaria de coordenadas do mouse.
        clickMouseX = [];
        clickMouseY = [];
		funcao_desenho = [0,0,0,1];
		funcao_selecao = [0,0,0,0];

		// inicializado com três para controle do modulo da divisao por 2,
		// esta variável é o controle de clicks(coordenadas) para de pontos
		counter = 3; 


};

function desenha_poligono(){
        // limpa lista temporaria de coordenadas do mouse.
        clickMouseX = [];
        clickMouseY = [];
		funcao_desenho = [0,0,1,0];
		funcao_selecao = [0,0,0,0];
		
		// inicializado com três para controle do modulo da divisao por 2.
		counter = 3; 


};



function pickarea(id, x, y){	

};


// INICIO - CAPTURA E MANIPULA BOTOES DE ROLAGEM DO MOUSE
function mouse_scroll_(delta) {

	/* EVENTO COM O MOUSE WHEEL DESCENDO */
    // delta é 1 quando rotaciona para fente e -1 quando para trás.
	if (delta < 0){ 

		//console.log('Roda do mouse: '+delta);

	} 
	else { 
		
		//console.log('Roda do mouse: '+delta);
	};
};



function mouse_scroll(event){
	// delta representa o codigo de rotação da RODA do Mouse, que é 1 ou -1.
	var delta=0; 
	if(!event)
		event=window.event;
	if(event.wheelDelta){
		delta=event.wheelDelta/120;
	if(window.opera)
		delta=-delta;
	}
    else if(event.detail){
    	delta=-event.detail/3;
    }

	if(delta)
		mouse_scroll_(delta);

	if(event.preventDefault)
		event.preventDefault();
	event.returnValue=false;
};

addEventListener('DOMMouseScroll',mouse_scroll,false);
window.onmousewheel=document.onmousewheel=mouse_scroll;
// FIM  - CAPTURA E MANIPULA BOTOES E RODA DO MOUSE - ||||||||




// definição de valores lógicos para os pontos dados
function pickcode(x,y,xmin,xmax, ymin, ymax){
	var _code = [];
	_code[0] = x < xmin;
	_code[1] = x > xmax;
	_code[2] = y < ymin;
	_code[3] = y > ymax;

    // exibe a estrutura da lista _code
    //console.log(_code);

	return _code;
};




function pickReta(reta, mouse_X, mouse_Y)
{
 
 var   	code0 = [], code1 = [];
 var 	x0, y0, x1, y1;
 var 	xmin, xmax, ymin, ymax;
 
 /* define janela de atracao */
 xmin = mouse_X - TOL;		
 xmax = mouse_X + TOL;		
 ymin = mouse_Y - TOL;		
 ymax = mouse_Y + TOL;

  x0 = reta.ponto1.Pcoordx;
  x1 = reta.ponto2.Pcoordx;
  y0 = reta.ponto1.Pcoordy;
  y1 = reta.ponto2.Pcoordy;

  code1 = pickcode (x1, y1, xmin, xmax, ymin, ymax);
  
  do{
   console.log('code0= '+code0);
   code0 = pickcode (x0, y0, xmin, xmax, ymin, ymax);
   console.log('code1= '+code1);
   
   for (var j = 0; j < 4; j++ )
    if (code0[j] && code1[j]) // caso em que os pontos da reta estao de um mesmo lado da caixa de interesse e
             break;           // AND retorna 1 e a reta esta totalmente fora da area de interesse.
       
   
   if (j != 4)
    break;

	
   // Continua o processo de procura levando o ponto ate a borda da janela de atração
   if (code0[0]){
      console.log('code0= (1ºif) '+code0);
      y0 += (xmin - x0) * (y1 - y0) / (x1 - x0);
      x0 = xmin;
   }else if (code0[1]){
   	  console.log('code0= (2ºif) '+code0);
      y0 += (xmax - x0) * (y1 - y0) / (x1 - x0);
      x0 = xmax;
   }else if (code0[2]){
   	  console.log('code0= (3ºif) '+code0);
      x0 += (ymin - y0) * (x1 - x0) / (y1 - y0);
      y0 = ymin;
   }else if (code0[3]){
  	  console.log('code0= (4ºif) '+code0);
      x0 += (ymax - y0) * (x1 - x0) / (y1 - y0);
      y0 = ymax;
   }else
      return true;
  } while(1);
 
 return false;

};



// Utiliza a funcionalidade do arquivo quickHull.js
function QuickHull(){
		
		// faz a atribuição de pontos ao vetor/lista de pontos;
		pontos = lista_pontos_canvas();
        
        if (pontos.length > 2) {

        	// chama a função qhull do algoritmo quickhull e atibui a hull o feixo(lista de pontos do feixe) encontrado.
        	hull = qhull(pontos);

        	console.log(hull);
        	for (var i = 0; i < hull.length; i++) {
        		ponto = i+1;
        		
        		//console.log('P'+ponto+'('+hull[i].Pcoordx+','+hull[i].Pcoordy+')');
        	};

        	// percorre o vetor de feixo para desenhar retas entre os pontos do  feixo convexo.
        	for (var i = 0; i < hull.length - 1; i++) {
        		
				cx.beginPath();
				cx.moveTo(hull[i].Pcoordx, hull[i].Pcoordy);
				cx.lineTo(hull[i+1].Pcoordx, hull[i+1].Pcoordy);
				cx.lineWidth = 3;
				cx.strokeStyle = 'green';
				cx.stroke();	
        	};
       
        } else {
        	// aviso para o caso de um conjunto menor q tres pontos seja passado para o quickhull
        	alert('São necessários pelo menos 3 pontos no canvas, para esta funcionalidade!!');

        };

        clickMouseX = [];
        clickMouseY = [];
		funcao_desenho = [0,0,0,0];
		funcao_selecao = [0,0,0,0];	

};


// função que retorna todos os pontos criados no canvas,
// inclusive pontos de retas e poligonos.
function lista_pontos_canvas(){

	// limpa lista de objetos para uma nova atribuição
	var objetos = [];

	// Verificação se as listas de objetos nao estao vazias e procede com a captura de pontos.
	if (listaPontos.length != 0) {
		for (var i = 0; i < listaPontos.length; i++) {
			objetos.push(listaPontos[i]);
		};
	};

	// adiciona os pontos de retas à lista de objetos
	if (listaRetas.length !=0){

		for (var i = 0; i < listaRetas.length; i++) {
			// acrescenta no feixo os dois pontos de uma reta, uma vez que nao se precisa saber em qual reta esta o ponto.
			objetos.push(listaRetas[i].ponto1);
			objetos.push(listaRetas[i].ponto2);
		};
	};

	//adiciona poligonos e poligonais a lista de objetos
	if (listaPoligonos.length!=0){

	};
	return objetos;

};
 
