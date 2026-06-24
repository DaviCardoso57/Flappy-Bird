// Aqui teremos a programação do Flappy Bird :D

const sprites=new Image();
sprites.src='./sprites.png';

const som_punch= new Audio();
som_punch.src="./som/punch.wav";

let animation_frame=0;

const canvas=document.querySelector('#game-canvas');
const contexto=canvas.getContext('2d')

function CriarPlacar(){
    const placar={
        pontos:0,
        desenha(){
            contexto.font='35px "VT323"';
            contexto.textAlign='right';
            contexto.fillStyle='white';
            contexto.fillText('Pontuação:'+placar.pontos,canvas.width - 10,35);
      },
      atualiza(){
         const intervaloDeFrames= 20;
         const passouDoIntervalo= animation_frame%intervaloDeFrames===0;

         if (passouDoIntervalo){
                placar.pontos=placar.pontos +1;
         }
        }
    }
    return placar;
}
const TelaGameOver={
    desenha(){
        gameOver.desenha();
    },
    click(){
        inicializa();
        telaAtiva=TelaJogo;
    }
}

const gameOver={
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y:70,

    desenha(){
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY,
            gameOver.largura, gameOver.altura,
            gameOver.x, gameOver.y,
            gameOver.largura, gameOver.altura,
        );
    }
}

const jogo={};


function CriarCity(){

    const city={
        spriteX:390,
        spriteY:0,
        largura:666,
        altura:203,
        x:0,
        y:264,

        desenha(){

            contexto.fillStyle='#70c5ce'
            contexto.fillRect(0,0, canvas.width, canvas.height);
            contexto.drawImage(
                sprites,
                city.spriteX, city.spriteY,
                city.largura, city.altura,
                city.x, city.y,
                city.largura+156, city.altura+40,  
            ),
            contexto.drawImage(
                sprites,
                city.spriteX, city.spriteY,
                city.largura, city.altura,
                city.x+340, city.y,
                city.largura+156, city.altura+40,  
        );

        },
        
        atualiza(){
            
            city.x=city.x-1
            city.x=city.x % (city.largura/2);
            
        }
    }
    return city;
};

function CriarChao(){
    const chao={
        spriteX:0,
        spriteY:610,
        largura:223,
        altura:610,
        x:0,
        y:370,

        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura+250, chao.altura,  
            );
        },

        atualiza(){
            
            chao.x=chao.x-3
            chao.x=chao.x % (chao.largura/2);
            
        }
    };
    return chao;

}

function fazColisaoObstaculo(par){
    if(jogo.flappyBird.x >= par.x){
        const alturaCabecaFlappy= jogo.flappyBird.y;
        const alturaPeFlappy = jogo.flappyBird.y + jogo.flappyBird.altura;
        const bocaCanoAltoY= par.y + jogo.canos.altura;
        const bocaCanoBaixoY= par.y + jogo.canos.altura + jogo.canos.espacoEntreCanos;

        if (alturaPeFlappy >= bocaCanoBaixoY){
            return true;
        }
        if (alturaCabecaFlappy <= bocaCanoAltoY){
            return true;
        }
    }
    return false;
}

function CriarCanos(){
const canos={
    largura:52,
    altura:400,
    alto:{
        spriteX:52,
        spriteY:169,
        x:120,
        y:-150,
    },
    baixo:{
        spriteX:0,
        spriteY:169,

    },
    pares:[],
    espacoEntreCanos: 120,
    desenha(){
        
        for(i=0;i<canos.pares.length;i++){
            canos.alto.x=canos.pares[i].x;
            canos.alto.y=canos.pares[i].y;
            contexto.drawImage(
                sprites,
                canos.alto.spriteX, canos.alto.spriteY,
                canos.largura, canos.altura,
                canos.alto.x, canos.alto.y,
                canos.largura, canos.altura,
                );
                
                const canoBaixoX=canos.alto.x;
                const canoBaixoY= canos.altura + canos.espacoEntreCanos+ canos.alto.y;
                
                contexto.drawImage(
                    sprites,
                    canos.baixo.spriteX, canos.baixo.spriteY,
                    canos.largura, canos.altura,
                    canoBaixoX, canoBaixoY,
                    canos.largura, canos.altura,

                    
                    );
        }
    },

    atualiza(){

        const CemFrames=(animation_frame % 100 === 0);
    if (CemFrames){
        const novoPar={
            x:canvas.width,
            y:-150* (Math.random()+1),
        }
        canos.pares.push(novoPar);
    };

        for(i=0;i<canos.pares.length;i++){
            const par=canos.pares[i];
            par.x=par.x-2;

            if(fazColisaoObstaculo(par)){
                som_punch.play();
                telaAtiva=TelaGameOver;
                return;
            }

            if (par.x < -canos.largura){
                canos.pares.shift()
            }
        };
    },
};
    return canos;
}


const TelaInicio={
    desenha(){
        
        jogo.city.desenha();
        jogo.chao.desenha();
        inicio.desenha();
        jogo.flappyBird.desenha();
    },
    click(){
        telaAtiva= TelaJogo;
    }
}

const TelaJogo={
    desenha(){
        jogo.city.desenha();
        jogo.city.atualiza();
        jogo.chao.desenha();
        jogo.chao.atualiza();
        jogo.flappyBird.atualiza();
        jogo.flappyBird.desenha();
        jogo.canos.desenha();
        jogo.canos.atualiza();
        jogo.placar.desenha();
        jogo.placar.atualiza();
    },
    click(){
        jogo.flappyBird.pula();
    }
}


function CriarFlappyBird(){
    const flappyBird={
        spriteX:0,
        spriteY:0,
        largura:35,
        altura:25,
        x:10,
        y:50,
        pulo:4.6,
        movimentos:[
            {spriteX:0,spriteY:0,},
            {spriteX:0,spriteY:26,},
            {spriteX:0,spriteY:52,},
            {spriteX:0,spriteY:26,},
        ],
        pula(){
        flappyBird.velocidade=-flappyBird.pulo;  
        },
        desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        },
        gravidade:0.25,
        velocidade:0,
        atualiza(){

            if (flappyBird.y>340| flappyBird.y<=0){
                fazColisao()
            }

            flappyBird.velocidade+=flappyBird.gravidade;
            flappyBird.y=flappyBird.y + flappyBird.velocidade;
            flappyBird.atualizaFrame();
        },
        frameAtual:0,
        atualizaFrame(){
            if((animation_frame%10)===0){
                flappyBird.frameAtual=flappyBird.frameAtual+1;
                flappyBird.frameAtual=flappyBird.frameAtual% flappyBird.movimentos.length;
                flappyBird.spriteX=flappyBird.movimentos[flappyBird.frameAtual].spriteX;
                flappyBird.spriteY=flappyBird.movimentos[flappyBird.frameAtual].spriteY;
            }
        }
    };
    return flappyBird;
}

function inicializa(){
    jogo.flappyBird= CriarFlappyBird();
    jogo.city= CriarCity();
    jogo.chao= CriarChao();
    jogo.canos= CriarCanos();
    jogo.placar= CriarPlacar();
}

const inicio={
    spriteX:130,
    spriteY:0,
    largura:180,
    altura:152,
    x:70,
    y:70,
        desenha(){
        contexto.drawImage(
                sprites,
                inicio.spriteX, inicio.spriteY,
                inicio.largura, inicio.altura,
                inicio.x, inicio.y,
                inicio.largura, inicio.altura,
            );
        }
}

var telaAtiva= TelaInicio;


function mudaTelaAtiva(){
    telaAtiva.click();
}
window.addEventListener("click",mudaTelaAtiva);

function loop(){
    telaAtiva.desenha()
    requestAnimationFrame(loop);
    animation_frame=animation_frame + 1;

}

function fazColisao(){
    som_punch.play();
    telaAtiva=TelaGameOver;
    return;
}

inicializa();
loop();

