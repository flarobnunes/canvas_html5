
// id = id do objeto reta.
int PkLine (listaRetas, mouse_X, mouse_Y)
{
 var   	i, j;
 var   	cod0[4], cod1[4];
 var 	x0, y0, x1, y1;
 var 	xmin, xmax, ymin, ymax;
 
 /* define janela de atracao */
 xmin = x - TOL;		
 xmax = x + TOL;		
 ymin = y - TOL;		
 ymax = y + TOL;
 
 /* testa cada segmento */
 for (i = 0; i <= listaRetas.length; i++){
  x0 = listaRetas[i].ponto1.Pcoordx;
  x1 = listaRetas[i].ponto2.Pcoordx;
  y0 = listaRetas[i].ponto1.Pcoordy;
  y1 = listaRetas[i].ponto2.Pcoordy;

  PickCode (x1, y1, xmin, xmax, ymin, ymax, cod1);
  do{
   PickCode (x0, y0, xmin, xmax, ymin, ymax, cod0);
   for ( j = 0; j < 4; j++ )
    if (cod0[j] && cod1[j])	
     break;
   if (j != 4)
    break;
   /* move point 0 to window limit */
   if (cod0[0]){
      y0 += (xmin - x0) * (y1 - y0) / (x1 - x0);
      x0 = xmin;
   }else if (cod0[1]){
      y0 += (xmax - x0) * (y1 - y0) / (x1 - x0);
      x0 = xmax;
   }else if (cod0[2]){
    x0 += (ymin - y0) * (x1 - x0) / (y1 - y0);
    y0 = ymin;
  }else if (cod0[3]){
    x0 += (ymax - y0) * (x1 - x0) / (y1 - y0);
    y0 = ymax;
   }else
    return true;
  } while(1);
 };
 return false;
};
