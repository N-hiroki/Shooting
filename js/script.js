// Canvasの初期化→描画オブジェクトを準備
//----------------------------------------------------------------- 
var can = document.getElementById("drowarea");
var context = can.getContext("2d");

// 諸々初期設定
//-----------------------------------------------------------------
var sw = false;//マウスがcanvas上から外れた時は、プレーヤー機が動かないようにする。
var oldX = can.offsetX;
            
//Session1

var canvasX = can.width;
var canvasY = can.height;
var Player,MyUfo;


//Session2
var balls = [];

//Session3
var enemys = [];
var enemySpeed = [1,2,3,4,10];
var imgEnemy,oldEnemyX;
var enemysBall = [];                                                                     
var enemy;

                                                                                                          
//プレイヤー機のUFOを作成
//プレイヤー
//----------------------------------------------------------------- 
var makePlayer = function(){
    var ufo = "img/myufo.gif";
    Player = new Image();
    Player.src = ufo;
    Player.onload = function(){
        MyUfo = {img:Player,posX:(canvasX+Player.width)/2,posY:(canvasY-Player.height),speed:10};
        context.drawImage(Player,MyUfo.posX,MyUfo.posY);
    };
};

//プレイヤー機のショット発射について
//マウスダウンしたらプレイヤー機からショットが発射
//ショットのオブジェクトを生成し、配列ballsに格納していく
//ショットのオブジェクトは、負荷軽減の為に最大20とする。
//----------------------------------------------------------------- 
//-----------------------------------------------------------------//

can.addEventListener("mousedown",function(e){                           
    var ballX = e.offsetX;
    if (balls.length <= 20){
        var ball = {radius:5,posX:ballX+(Player.width/2)-2.5, posY:MyUfo.posY-5, speed:5};
        balls.push(ball);
    }
},false);

//makeShotはショットが発射されてから一番上に向かっていて消えるまでの動きを定義  
//下記でsetTimeoutで高速で動かしているので、ボールが移動しているように見える。
//-----------------------------------------------------------------                  
var makeShot = function(){
    for(var i=0;i<balls.length;i++){               
        var beam =balls[i];
        context.clearRect(beam.posX,beam.posY,beam.radius,beam.radius);
        context.fillStyle ="#f00";
        beam.posY -=beam.speed;
        context.fillRect(beam.posX,beam.posY,beam.radius,beam.radius);           
    }
};
     



// 敵の出現にについて
//-----------------------------------------------------------------         
//-----------------------------------------------------------------
var makeEnemys = function(){
    var enemyUfo = "img/enemy.gif";//敵機のUFO
    imgEnemy = new Image();
    imgEnemy.src = enemyUfo;
    imgEnemy.onload = function(){
        enemy = {img:imgEnemy,posX:Math.floor(Math.random()*(canvasX-imgEnemy.width)),posY:2,speed:enemySpeed[0]};
        enemys.push(enemy);//とりあえず一つ入れておく。                          
    };
};
            
var appearEnemys = function(){  
    if(enemys.length <2){
        var randomSpeed = Math.floor((Math.random()*100));
        if(randomSpeed < enemySpeed.length){
            var randomX = Math.floor(Math.random() *(can.width));                
            if(Math.abs(randomX-oldEnemyX)>imgEnemy.width){
                var newEnemy = {img:imgEnemy,posX:randomX,posY:0,speed:enemySpeed[randomSpeed]}; 
                enemys.push(newEnemy);
            }
            oldEnemyX =randomX;
         }
    }
};

var moveEnemys = function(){    
    for(var i = 0;i<enemys.length;i++){
        if (!enemys[i]){continue;}
        context.clearRect(enemys[i].posX,enemys[i].posY,enemys[i].img.width,enemys[i].img.height);
        enemys[i].posY += enemys[i].speed;
        context.drawImage(enemys[i].img,enemys[i].posX,enemys[i].posY);
    }
};
        
            
//敵に弾があたった時のイベントを定義                                               
//-----------------------------------------------------------------        
//-----------------------------------------------------------------
var hitJudge = function(){
    for(var k=0;k<balls.length;k++){ 
        var b = balls[k];
        if (!b) {continue;}
        for(var j=0;j<enemys.length;j++){
            var a = enemys[j];
            if (!a) {continue;}
            if(b.posY<=(a.posY+a.img.height)&&b.posX<=(a.posX+a.img.width)&&b.posX>=a.posX){
                enemys.splice(j,1);
                context.clearRect(a.posX,a.posY,a.img.width*4,a.img.height*4);                                
                balls.splice(k,1);  
                context.clearRect(b.posX,b.posY,b.radius,b.radius);
                break;
            }
        } 
    }  
};


//メインの処理を下記にまとめて、一つの関数をsetInterval！                                             
//-----------------------------------------------------------------        
var Game =function(){
    makeShot();
    appearEnemys();
    moveEnemys();
    hitJudge();
};
        
window.onload = function() {
        makePlayer();
        makeEnemys();
    // プレイヤー機の操作について
    // マウスを動かしたらその分だけ横に移動
    //-----------------------------------------------------------------//         
    can.addEventListener("mousemove",function(e){
        sw = true;                              
        var px = e.offsetX;
        if(px>=canvasX-Player.width){
            sw = false;  
            return false;
        }else{
            context.clearRect(0,MyUfo.posY-10,can.width,can.height);
            context.drawImage(Player,px,MyUfo.posY);
            MyUfo.posX = px;  
            MyUfo.posY = MyUfo.posY;
            oldX = px;
        }                                                                                                             
    });

    var time = 0;

    var start = setInterval(function(){         
        Game();             
        time = time+50;
        if(time>10000){
            clearInterval(start);
            alert("GAME OVER!!");
        }                

    },50);
 
};
//end window.onload
            
can.addEventListener("mouseout",function(e){
    sw = false;                               
});                                                     