//criar o canvas
const canvas = document.createElement('canvas');
const  ctx = canvas.getContext('2d');
canvas.width =512;
canvas.height =480;
document.body.appendChild(canvas);

//imagem de fundo do canvas

let bgReady = false;
const bgImage = new Image();
bgImage.onload =()=>{
    bgReady = true;
    // esse evento mostra a imagem quando a pagina carregar
};

bgImage.src ='chao.jpg';

// Imagem do heroi
let heroRead = false;
const heroImage = new Image();
heroImage.onload = ()=>{
    heroRead =true;
    // quando o mostro estiver pronto, que no meu caso é a febre.
};
heroImage.src = 'hero.png';

// Imagem mostro
let mosterReady =false;
const mosterImage = new Image();
mosterImage.onload = ()=>{
    mosterReady =true;
}
mosterImage.src = 'moster.png';

// objectos do Jogo

const hero ={
    speed:256 // O movimento é alterado em px/Segundo
};

const monster={};
let mostersCaught =0;

// Controlo do Teclado
// Essa função e a seguir ajudam a verificar os valores das teclas
const keysDown ={

}
window.addEventListener('keydown',function (e){
 console.log(e); // Este console log permite ver qual é o valor da tecla pressionada
    keysDown[e.keyCode] =true;
}, false);
window.addEventListener('keyup',function (e){
    delete keysDown[e.keyCode];
}, false);
 // Resete o jogo quando o jogador pega o mostro
 const rest = function(){
    hero.x = canvas.width/2;
    hero.y = canvas.height /2;

    //Posicionar o mostro randomicamente na tela ou seja, o mostro posiciona-se aleatoriamente
    monster.x =32+ (Math.random() * (canvas.width -64)); 
    monster.y = 32+(Math.random() * (canvas.height -64)); 

 };
 // Actualização dos objectos do jogo
 // Cada tecla do teclado tem um determinado valor
 const update = function(modifier){
    if(38 in keysDown){ // Pressionada a tecla para cima
        hero.y -=hero.speed *modifier;
    }
    if(40 in keysDown){ // pressionando a tecla para baixo
        hero.y +=hero.speed *modifier;
    }
    if(37 in keysDown){ //pressionado a seta para esquerda
        hero.x-=hero.speed *modifier;
 }
 if(39 in keysDown){//pressionado a seta para direita
    hero.x += hero.speed*modifier;
 }

 // Seo os personagens colidiram?

 if( hero.x<= (monster.x+32) && monster.x<=(hero.x +32) &&
 hero.y<= (monster.y+32) && monster.y<=(hero.y +32)){
 ++mostersCaught; // aqui aumenta o valor dos mostros pegos
 rest();
 }
};

// Renderização

function Render(){
    if(bgReady){
        ctx.drawImage(bgImage, 0,0); // drawImage é uma propriedade do canvas
    }
    if(heroRead){
        ctx.drawImage(heroImage, hero.x,hero.y); 
    }
    if(mosterReady){
        ctx.drawImage(mosterImage, monster.x,monster.y);

    }
    // Pontuação na Tela
    ctx.fillStyle ='rgb(250,250,250)';
    ctx.font ='24px Helvetica';
    ctx.textAlign ='left';
    ctx.textBaseline ='top';
    ctx.fillText('Doenças Pegos: '+ mostersCaught, 32, 32);

}
// Controla o Loop do Jogo.

const main = ()=>{
    const now = Date.now();
    const delta = now-then;

    update(delta /1000);
    Render();
    then =now;

    requestAnimationFrame(main);
}
// Suporte Cross-browser para requestAnimationFrame
const windo = window;
const requestAnimationFrame = windo.requestAnimationFrame || windo.webKitRequestAnimationFrame || windo.mozRequestAnimationFrame;
let then = Date.now();
rest();
main();

