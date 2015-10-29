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

