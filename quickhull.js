
 
var Hull = []; // fecho, variavel global, sera retornado pela função qhull...

function dist(p, q)
{
    // "Falsa" distancia entre dois pontos
    return (p.Pcoordy - q.Pcoordy) * (p.Pcoordy - q.Pcoordy) + 
           (p.Pcoordx - q.Pcoordx) * (p.Pcoordx - q.Pcoordx);
};
 

function lineDist(p1, p2, p)
{   // falsa distancia entre o ponto(p) e o segmento de reta p1p2.
    return Math.abs((p.Pcoordy - p1.Pcoordy) * (p2.Pcoordx - p1.Pcoordx) - 
                    (p2.Pcoordy - p1.Pcoordy) * (p.Pcoordx - p1.Pcoordx));
};
 

function findSide(p1, p2, p)
{
    // Obtem a rotação do segmento 
    var val = (p.Pcoordy - p1.Pcoordy) * (p2.Pcoordx - p1.Pcoordx) - (p2.Pcoordy- p1.Pcoordy) * (p.Pcoordx - p1.Pcoordx);

    if (val > 0)
        return 1;
    if (val < 0)
        return -1;
    return 0;
};

function quickHull(vectorPoints, vectorPoints_length, p1, p2, lado){

	var ind = -1;
	var max_dist = 0;

    for (var i=0; i<vectorPoints_length; i++)
    {
        var temp = lineDist(p1, p2, vectorPoints[i]);

        if (findSide(p1, p2, vectorPoints[i]) == lado && temp > max_dist)
        {
            ind = i;
            max_dist = temp;
        }
    };

    if (ind == -1)
    {
        Hull.push(p1);
        Hull.push(p2);
        return;
    };
 
    quickHull(vectorPoints, vectorPoints.length, vectorPoints[ind], p1, -findSide(vectorPoints[ind], p1, p2));
    quickHull(vectorPoints, vectorPoints.length, vectorPoints[ind], p2, -findSide(vectorPoints[ind], p2, p1));
};

// qhull é o retorno com o conjunto de pontos do feiPcoordxo
function qhull(listapontos)
{
    // tamanho do vetor de pontos
    var listapontos_length = listapontos.length;

    if (listapontos_length < 3)
    {// retorna um conjunto vazio, caso nao encontre 3 ou mais pontos.
        
        return Hull;
    }
    // Minimo e maximo pontos nas coordenasdas(eixo x)
    var min_Pcoordx = 0, max_Pcoordx = 0;
    for (var i=1; i<listapontos_length; i++)
    {
        if (listapontos[i].Pcoordx < listapontos[min_Pcoordx].Pcoordx)
            min_Pcoordx = i;
        if (listapontos[i].Pcoordx > listapontos[max_Pcoordx].Pcoordx)
            max_Pcoordx = i;
    };

    // antes da recursao
    //console.log('antes da recursao');

    quickHull(listapontos, listapontos_length, listapontos[min_Pcoordx], listapontos[max_Pcoordx], 1);
    quickHull(listapontos, listapontos_length, listapontos[min_Pcoordx], listapontos[max_Pcoordx],-1);

    return Hull;

};
  

