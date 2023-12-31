var grid = [];
var player = 0
var powerups = {"Q": 1, "R": 2, "B": 2, "N": 2};
var font;
var level = 1;
var health = 3;
var board;
var king;
var pawn;
var bishop;
var qpow;
var rpow;
var npow;
var bpow;
var cpow;
var instructions;
var delaytime = 0;
var delay = 7;
var i = -1;

function setup(){
    board = loadImage("./board.png");
    king = loadImage("./king.png");
    pawn = loadImage("./pawn.png");
    bishop = loadImage("./bishop.png");
    cpow = loadImage("./cancel.png");
    qpow = loadImage("./queenpower.png");
    rpow = loadImage("./rookpower.png");
    npow = loadImage("./knightpower.png");
    bpow = loadImage("./bishoppower.png");
    instructions = loadImage("./instructions.png");
    font = loadFont("./JMH HORROR.otf");
    
    createCanvas(1440,800);
    
    grid.push({"x":4,"y":7,"type":"K","movetype":"K", "player": 0});
    if(level == 1){
    grid.push({"x":6,"y":0,"type":"P","movetype":"P", "player": 1});
    grid.push({"x":1,"y":1,"type":"P","movetype":"P", "player": 1});
    }
}
function draw(){
    background(30,0,0);
    fill("white");
    strokeWeight(15);
    stroke(60);
    rect(520,200,400,400);
    textAlign(CENTER);
    drawGrid();
    fill(100);
    stroke(0);
    strokeWeight(7);
    image(qpow,100,120,300,120); // Q
    image(rpow,100,260,300,120); // R
    image(bpow,100,400,300,120); // B
    image(npow,100,540,300,120); // N
    image(cpow,130,680,240,80); // C
    noStroke();
    fill("white");
    textStyle(BOLD);
    textSize(12);
    text(powerups.Q, 275,182);
    text(powerups.R, 275,322);
    text(powerups.B, 275,462);
    text(powerups.N, 275,602);
    textStyle(NORMAL);
    textFont(font);
    textSize(60);
    text("LEVEL " + level, 720, 110)
    text("HEALTH " + health + "/3", 720, 700)
    textFont("sans-serif");
    image(instructions,1000,150)
    if(mouseX > 520 && mouseY > 200 && mouseX < 920 && mouseY < 600){
        noFill();
        strokeWeight(3);
        stroke(200);
        rect(Math.floor((mouseX - 520) / 50) * 50 + 520, Math.floor((mouseY - 400) / 50) * 50 + 400,50,50);
    }
    if(player == 1){
        
        delaytime++;
        if(delaytime > delay){
            i++;
            delaytime = 0;
        }
        if(i < grid.length && delaytime < 1){
            p = grid[i];
            if(p.player == 1){
                switch(p.type){
                    case "P":
                        if(p.y == 7){
                            health --;
                            grid.splice(grid.indexOf(p),1);
                            i--;
                        }
                        if(enemyCanMove(p.x,p.y + 1)){
                            p.y ++;
                        }
                        break;
                    case "B":
                        console.log(i);
                        console.log(grid[i]);
                        if(p.y == 7){
                            health --;
                            grid.splice(grid.indexOf(p),1);
                            i--;
                        }
                        var upleft = [];
                        var upright = [];
                        var downleft = [];
                        var downright = [];
                        if(enemyCanMove(p.x-1,p.y-1)){upleft = [p.x-1,p.y-1];} 
                        else{upleft = [p.x,p.y];}

                        if(enemyCanMove(p.x+1,p.y-1)){upright = [p.x+1,p.y-1];}
                        else{upright = [p.x,p.y];}

                        if(enemyCanMove(p.x-1,p.y+1)){
                            if(enemyCanMove(p.x-2,p.y+2)){
                                if(enemyCanMove(p.x-3,p.y+3)){
                                    if(enemyCanMove(p.x-4,p.y+4)){
                                        if(enemyCanMove(p.x-5,p.y+5)){
                                            if(enemyCanMove(p.x-6,p.y+6)){
                                                if(enemyCanMove(p.x-7,p.y+7)){
                                                    downleft = [p.x-7,p.y+7]; 
                                                }else{
                                                    downleft = [p.x-6,p.y+6];
                                                }
                                            }else{
                                                downleft = [p.x-5,p.y+5];
                                            }
                                        }else{
                                            downleft = [p.x-4,p.y+4];
                                        }
                                    }else{
                                        downleft = [p.x-3,p.y+3];
                                    }
                                }else{
                                    downleft = [p.x-2,p.y+2];
                                } 
                            }else{
                                downleft = [p.x-1,p.y+1];
                            }
                        }
                        else{downleft = [p.x,p.y];}
                        
                        if(enemyCanMove(p.x+1,p.y+1)){
                            if(enemyCanMove(p.x+2,p.y+2)){
                                if(enemyCanMove(p.x+3,p.y+3)){
                                    if(enemyCanMove(p.x+4,p.y+4)){
                                        if(enemyCanMove(p.x+5,p.y+5)){
                                            if(enemyCanMove(p.x+6,p.y+6)){
                                                if(enemyCanMove(p.x+7,p.y+7)){
                                                    downright = [p.x+7,p.y+7]; 
                                                }else{
                                                    downright = [p.x+6,p.y+6];
                                                }
                                            }else{
                                                downright = [p.x+5,p.y+5];
                                            }
                                        }else{
                                            downright = [p.x+4,p.y+4];
                                        }
                                    }else{
                                        downright = [p.x+3,p.y+3];
                                    }
                                }else{
                                    downright = [p.x+2,p.y+2];
                                } 
                            }else{
                                downright = [p.x+1,p.y+1];
                            }
                        }
                        else{downright = [p.x,p.y];}
                        if(downright[0] != p.x && downright[1] != p.y && downleft[0] != p.x && downleft[1] != p.y){
                            if(downright[1] > downleft[1]){
                                p.x = downright[0];
                                p.y = downright[1];
                            }else{
                                p.x = downleft[0];
                                p.y = downleft[1];
                            }
                        }else if(downleft[0] != p.x && downleft[1] != p.y){
                            p.x = downleft[0];
                            p.y = downleft[1];
                        }
                        else if(downright[0] != p.x && downright[1] != p.y){
                            p.x = downright[0];
                            p.y = downright[1];
                        }else if(upright[0] != p.x && upright[1] != p.y && upleft[0] != p.x && upleft[1] != p.y){
                            if(upright[1] > upleft[1]){
                                p.x = upright[0];
                                p.y = upright[1];
                            }else{
                                p.x = upleft[0];
                                p.y = upleft[1];
                            }
                        }else if(upright[0] != p.x && upright[1] != p.y){
                            p.x = upright[0];
                            p.y = upright[1];
                        }
                        else{
                            p.x = upleft[0];
                            p.y = upleft[1];
                        }
                        break;
                }
            }else{
            }
        }else if (i >= grid.length){player = 0;}
            
    }
    for(var g of grid){
        if(g.player == 1){
            return;
        }
    }
    level++;
    player = 0;
    switch(level){
        case 2:
            grid.push({"x":6,"y":0,"type":"P","movetype":"P", "player": 1});
            grid.push({"x":1,"y":1,"type":"P","movetype":"P", "player": 1});
            grid.push({"x":3,"y":0,"type":"P","movetype":"P", "player": 1});
            grid.push({"x":2,"y":2,"type":"P","movetype":"P", "player": 1});
            break;
        case 3:
            grid.push({"x":6,"y":0,"type":"P","movetype":"P", "player": 1});
            grid.push({"x":3,"y":0,"type":"B","movetype":"B", "player": 1}); 
            break;
        case 4:
            grid.push({"x":6,"y":0,"type":"B","movetype":"P", "player": 1});
            grid.push({"x":3,"y":0,"type":"B","movetype":"B", "player": 1}); 
            break;
        case 5:
            powerups.R += 1;
            powerups.N += 4;
            powerups.B += 2;
            grid.push({"x":6,"y":0,"type":"B","movetype":"B", "player": 1});
            grid.push({"x":3,"y":0,"type":"B","movetype":"B", "player": 1}); 
            grid.push({"x":4,"y":1,"type":"P","movetype":"P", "player": 1}); 
            grid.push({"x":5,"y":1,"type":"P","movetype":"P", "player": 1});
            break;
        case 6:
            grid.push({"x":1,"y":0,"type":"B","movetype":"B", "player": 1});
            grid.push({"x":2,"y":0,"type":"B","movetype":"B", "player": 1});
            grid.push({"x":3,"y":1,"type":"P","movetype":"P", "player": 1});
            grid.push({"x":5,"y":5,"type":"P","movetype":"P", "player": 1});
            grid.push({"x":4,"y":4,"type":"P","movetype":"P", "player": 1});
            break;
        default:
            break;
    }
}
function getGrid(x,y){
    for(var i = 0; i < grid.length; i++){
        if(grid[i].x == x && grid[i].y == y){
            return grid[i];
        }
    }
    return false;
}
function findKingSpot(){
    for(var i = 0; i < grid.length; i++){
        if(grid[i].type == "K"){
            return grid[i];
        }
    }
    console.error("No Player?");
}
function drawGrid(){
    noStroke();
    image(board,520,200,400,400);
    for(var x = 0; x < 8; x++){
        for(var y = 0; y < 8; y++){
            if(player == 0){
            if(canMove(findKingSpot().movetype,findKingSpot().x, findKingSpot().y, x,y)){
                fill(255,255,0,80);
                rect(520 + x * 50, 200 + y * 50, 50, 50);
            }
        }
        if(getGrid(x,y).player == 0){
            switch(getGrid(x,y).type){
                case "K":
                    image(king,505 + x * 50, 180 + y * 50, 80, 70);
                    break;
                default:
                    break;
            }
        }
        if(getGrid(x,y).player == 1){
            switch(getGrid(x,y).type){
                case "P":
                    image(pawn,510 + x * 50, 180 + y * 50, 70, 87);
                    break;
                case "B":
                    image(bishop,510 + x * 50, 189 + y * 50, 70, 71);
                    break;
                default:
                    break;
            }
        }
    }
    }
}

function checkMovable(moveType,x,y){
    var movable = [];
    switch(moveType){
        case "K":
            if(validMove(x-1,y-1)){movable.push({"x":x-1,"y":y-1});}
            if(validMove(x-1,y)){movable.push({"x":x-1,"y":y});}
            if(validMove(x-1,y+1)){movable.push({"x":x-1,"y":y+1});}
            if(validMove(x,y-1)){movable.push({"x":x,"y":y-1});}
            if(validMove(x,y+1)){movable.push({"x":x,"y":y+1});}
            if(validMove(x+1,y-1)){movable.push({"x":x+1,"y":y-1});}
            if(validMove(x+1,y)){movable.push({"x":x+1,"y":y});}
            if(validMove(x+1,y+1)){movable.push({"x":x+1,"y":y+1});}
            break;
        case "N":
            if(validMove(x-1,y-2)){movable.push({"x":x-1,"y":y-2});}
            if(validMove(x-1,y+2)){movable.push({"x":x-1,"y":y+2});}
            if(validMove(x-2,y+1)){movable.push({"x":x-2,"y":y+1});}
            if(validMove(x-2,y-1)){movable.push({"x":x-2,"y":y-1});}
            if(validMove(x+1,y-2)){movable.push({"x":x+1,"y":y-2});}
            if(validMove(x+1,y+2)){movable.push({"x":x+1,"y":y+2});}
            if(validMove(x+2,y+1)){movable.push({"x":x+2,"y":y+1});}
            if(validMove(x+2,y-1)){movable.push({"x":x+2,"y":y-1});}
            break;
        case "Q":
            if(validMove(x-1,y-1)){movable.push({"x":x-1,"y":y-1});} 
            if(validMove(x-2,y-2)){movable.push({"x":x-2,"y":y-2});} 
            if(validMove(x-3,y-3)){movable.push({"x":x-3,"y":y-3});} 
            if(validMove(x-4,y-4)){movable.push({"x":x-4,"y":y-4});} 
            if(validMove(x-5,y-5)){movable.push({"x":x-5,"y":y-5});} 
            if(validMove(x-6,y-6)){movable.push({"x":x-6,"y":y-6});} 
            if(validMove(x-7,y-7)){movable.push({"x":x-7,"y":y-7});} 

            if(validMove(x+1,y-1)){movable.push({"x":x+1,"y":y-1});} 
            if(validMove(x+2,y-2)){movable.push({"x":x+2,"y":y-2});} 
            if(validMove(x+3,y-3)){movable.push({"x":x+3,"y":y-3});} 
            if(validMove(x+4,y-4)){movable.push({"x":x+4,"y":y-4});} 
            if(validMove(x+5,y-5)){movable.push({"x":x+5,"y":y-5});} 
            if(validMove(x+6,y-6)){movable.push({"x":x+6,"y":y-6});} 
            if(validMove(x+7,y-7)){movable.push({"x":x+7,"y":y-7});} 

            if(validMove(x-1,y+1)){movable.push({"x":x-1,"y":y+1});} 
            if(validMove(x-2,y+2)){movable.push({"x":x-2,"y":y+2});} 
            if(validMove(x-3,y+3)){movable.push({"x":x-3,"y":y+3});} 
            if(validMove(x-4,y+4)){movable.push({"x":x-4,"y":y+4});} 
            if(validMove(x-5,y+5)){movable.push({"x":x-5,"y":y+5});} 
            if(validMove(x-6,y+6)){movable.push({"x":x-6,"y":y+6});} 
            if(validMove(x-7,y+7)){movable.push({"x":x-7,"y":y+7});} 

            if(validMove(x+1,y+1)){movable.push({"x":x+1,"y":y+1});} 
            if(validMove(x+2,y+2)){movable.push({"x":x+2,"y":y+2});} 
            if(validMove(x+3,y+3)){movable.push({"x":x+3,"y":y+3});} 
            if(validMove(x+4,y+4)){movable.push({"x":x+4,"y":y+4});} 
            if(validMove(x+5,y+5)){movable.push({"x":x+5,"y":y+5});} 
            if(validMove(x+6,y+6)){movable.push({"x":x+6,"y":y+6});} 
            if(validMove(x+7,y+7)){movable.push({"x":x+7,"y":y+7});}

            if(validMove(x,y-1)){movable.push({"x":x,"y":y-1});} 
            if(validMove(x,y-2)){movable.push({"x":x,"y":y-2});} 
            if(validMove(x,y-3)){movable.push({"x":x,"y":y-3});} 
            if(validMove(x,y-4)){movable.push({"x":x,"y":y-4});} 
            if(validMove(x,y-5)){movable.push({"x":x,"y":y-5});} 
            if(validMove(x,y-6)){movable.push({"x":x,"y":y-6});} 
            if(validMove(x,y-7)){movable.push({"x":x,"y":y-7});} 

            if(validMove(x,y+1)){movable.push({"x":x,"y":y+1});} 
            if(validMove(x,y+2)){movable.push({"x":x,"y":y+2});} 
            if(validMove(x,y+3)){movable.push({"x":x,"y":y+3});} 
            if(validMove(x,y+4)){movable.push({"x":x,"y":y+4});} 
            if(validMove(x,y+5)){movable.push({"x":x,"y":y+5});} 
            if(validMove(x,y+6)){movable.push({"x":x,"y":y+6});} 
            if(validMove(x,y+7)){movable.push({"x":x,"y":y+7});} 

            if(validMove(x+1,y)){movable.push({"x":x+1,"y":y});} 
            if(validMove(x+2,y)){movable.push({"x":x+2,"y":y});} 
            if(validMove(x+3,y)){movable.push({"x":x+3,"y":y});} 
            if(validMove(x+4,y)){movable.push({"x":x+4,"y":y});} 
            if(validMove(x+5,y)){movable.push({"x":x+5,"y":y});} 
            if(validMove(x+6,y)){movable.push({"x":x+6,"y":y});} 
            if(validMove(x+7,y)){movable.push({"x":x+7,"y":y});} 

            if(validMove(x-1,y)){movable.push({"x":x-1,"y":y});} 
            if(validMove(x-2,y)){movable.push({"x":x-2,"y":y});} 
            if(validMove(x-3,y)){movable.push({"x":x-3,"y":y});} 
            if(validMove(x-4,y)){movable.push({"x":x-4,"y":y});} 
            if(validMove(x-5,y)){movable.push({"x":x-5,"y":y});} 
            if(validMove(x-6,y)){movable.push({"x":x-6,"y":y});} 
            if(validMove(x-7,y)){movable.push({"x":x-7,"y":y});}  
            break;
        case "R":
            if(validMove(x,y-1)){movable.push({"x":x,"y":y-1});} 
            if(validMove(x,y-2)){movable.push({"x":x,"y":y-2});} 
            if(validMove(x,y-3)){movable.push({"x":x,"y":y-3});} 
            if(validMove(x,y-4)){movable.push({"x":x,"y":y-4});} 
            if(validMove(x,y-5)){movable.push({"x":x,"y":y-5});} 
            if(validMove(x,y-6)){movable.push({"x":x,"y":y-6});} 
            if(validMove(x,y-7)){movable.push({"x":x,"y":y-7});} 

            if(validMove(x,y+1)){movable.push({"x":x,"y":y+1});} 
            if(validMove(x,y+2)){movable.push({"x":x,"y":y+2});} 
            if(validMove(x,y+3)){movable.push({"x":x,"y":y+3});} 
            if(validMove(x,y+4)){movable.push({"x":x,"y":y+4});} 
            if(validMove(x,y+5)){movable.push({"x":x,"y":y+5});} 
            if(validMove(x,y+6)){movable.push({"x":x,"y":y+6});} 
            if(validMove(x,y+7)){movable.push({"x":x,"y":y+7});} 

            if(validMove(x+1,y)){movable.push({"x":x+1,"y":y});} 
            if(validMove(x+2,y)){movable.push({"x":x+2,"y":y});} 
            if(validMove(x+3,y)){movable.push({"x":x+3,"y":y});} 
            if(validMove(x+4,y)){movable.push({"x":x+4,"y":y});} 
            if(validMove(x+5,y)){movable.push({"x":x+5,"y":y});} 
            if(validMove(x+6,y)){movable.push({"x":x+6,"y":y});} 
            if(validMove(x+7,y)){movable.push({"x":x+7,"y":y});} 

            if(validMove(x-1,y)){movable.push({"x":x-1,"y":y});} 
            if(validMove(x-2,y)){movable.push({"x":x-2,"y":y});} 
            if(validMove(x-3,y)){movable.push({"x":x-3,"y":y});} 
            if(validMove(x-4,y)){movable.push({"x":x-4,"y":y});} 
            if(validMove(x-5,y)){movable.push({"x":x-5,"y":y});} 
            if(validMove(x-6,y)){movable.push({"x":x-6,"y":y});} 
            if(validMove(x-7,y)){movable.push({"x":x-7,"y":y});} 
            break;
        case "B":
            if(validMove(x-1,y-1)){movable.push({"x":x-1,"y":y-1});} 
            if(validMove(x-2,y-2)){movable.push({"x":x-2,"y":y-2});} 
            if(validMove(x-3,y-3)){movable.push({"x":x-3,"y":y-3});} 
            if(validMove(x-4,y-4)){movable.push({"x":x-4,"y":y-4});} 
            if(validMove(x-5,y-5)){movable.push({"x":x-5,"y":y-5});} 
            if(validMove(x-6,y-6)){movable.push({"x":x-6,"y":y-6});} 
            if(validMove(x-7,y-7)){movable.push({"x":x-7,"y":y-7});} 

            if(validMove(x+1,y-1)){movable.push({"x":x+1,"y":y-1});} 
            if(validMove(x+2,y-2)){movable.push({"x":x+2,"y":y-2});} 
            if(validMove(x+3,y-3)){movable.push({"x":x+3,"y":y-3});} 
            if(validMove(x+4,y-4)){movable.push({"x":x+4,"y":y-4});} 
            if(validMove(x+5,y-5)){movable.push({"x":x+5,"y":y-5});} 
            if(validMove(x+6,y-6)){movable.push({"x":x+6,"y":y-6});} 
            if(validMove(x+7,y-7)){movable.push({"x":x+7,"y":y-7});} 

            if(validMove(x-1,y+1)){movable.push({"x":x-1,"y":y+1});} 
            if(validMove(x-2,y+2)){movable.push({"x":x-2,"y":y+2});} 
            if(validMove(x-3,y+3)){movable.push({"x":x-3,"y":y+3});} 
            if(validMove(x-4,y+4)){movable.push({"x":x-4,"y":y+4});} 
            if(validMove(x-5,y+5)){movable.push({"x":x-5,"y":y+5});} 
            if(validMove(x-6,y+6)){movable.push({"x":x-6,"y":y+6});} 
            if(validMove(x-7,y+7)){movable.push({"x":x-7,"y":y+7});} 

            if(validMove(x+1,y+1)){movable.push({"x":x+1,"y":y+1});} 
            if(validMove(x+2,y+2)){movable.push({"x":x+2,"y":y+2});} 
            if(validMove(x+3,y+3)){movable.push({"x":x+3,"y":y+3});} 
            if(validMove(x+4,y+4)){movable.push({"x":x+4,"y":y+4});} 
            if(validMove(x+5,y+5)){movable.push({"x":x+5,"y":y+5});} 
            if(validMove(x+6,y+6)){movable.push({"x":x+6,"y":y+6});} 
            if(validMove(x+7,y+7)){movable.push({"x":x+7,"y":y+7});} 
            break;
        default:
            console.error("Improper move type: " + moveType);
    }
    return movable;
}


function validMove(x,y){
    if(x > -1 && y > -1 && x < 8 && y < 8){
        return true;
    }
    return false;
}

function canMove(type,x1,y1,x2,y2){
    for(var spot of checkMovable(type,x1,y1)){
        if(spot.x == x2 && spot.y == y2){
            return true;
        }
    }
    return false;
}
function mousePressed(){
    if(player == 0){
        if(mouseX > 130 && mouseX < 370 && mouseY > 680 && mouseY < 760){
            findKingSpot().movetype = "K"; 
        }
        if(mouseX > 100 && mouseX < 400){
            if(mouseY > 120 && mouseY < 240 && powerups.Q > 0){
                findKingSpot().movetype = "Q";
            }
            if(mouseY > 260 && mouseY < 380 && powerups.R > 0){
                findKingSpot().movetype = "R";
            }
            if(mouseY > 400 && mouseY < 520 && powerups.B > 0){
                findKingSpot().movetype = "B";
            }
            if(mouseY > 540 && mouseY < 660 && powerups.N > 0){
                findKingSpot().movetype = "N";
            }
        }
    }
    if(canMove(findKingSpot().movetype,findKingSpot().x, findKingSpot().y,Math.floor((mouseX - 520) / 50), Math.floor((mouseY - 200) / 50)) && player == 0){
        if(findKingSpot().movetype != "K"){
            powerups[findKingSpot().movetype]--;
        }
        var prevkingspot = [findKingSpot().x, findKingSpot().y];
        if(getGrid(Math.floor((mouseX - 520) / 50), Math.floor((mouseY - 200) / 50))){
            console.log("test");
            
            getGrid(Math.floor((mouseX - 520) / 50), Math.floor((mouseY - 200) / 50)).type = "K";
        getGrid(Math.floor((mouseX - 520) / 50), Math.floor((mouseY - 200) / 50)).movetype = "K";
        getGrid(Math.floor((mouseX - 520) / 50), Math.floor((mouseY - 200) / 50)).player = 0;
        }else{
            grid.push({"x": Math.floor((mouseX - 520) / 50), "y": Math.floor((mouseY - 200) / 50), "type": "K", "movetype":"K", "player": 0});
        }
        grid.splice(grid.indexOf(getGrid(prevkingspot[0],prevkingspot[1])),1);
        
        player = 1;
        delaytime = -1;
        i = 0;
    }
}

function enemyCanMove(x,y){
    if(x >= 0 && x <= 7 && y >= 0 && y <= 7){
    for(var p of grid){
        if(p.x == x && p.y == y && p.type != "NONE"){
            return false;
        }
    }
    return true;
}else{
    return false;
}
}