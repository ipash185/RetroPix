var m, n, m1, n1;
var move=0, time=0;
var bmove=0, btime=0;
var timerInterval;
var lbArr=[];
var arrCount=0;
var img;

var chInterval, unfInterval;

function hide(screen){
    document.getElementsByClassName(screen)[0].style.display = "none";
}

function show(screen){
    document.getElementsByClassName(screen)[0].style.display = "block";
}

function flyingText(i){
    var element = document.getElementsByClassName("screen2__flyingText")[i];
    element.classList.add("fly_l2r");
    var ftTimeout;
    clearTimeout(ftTimeout);
    ftTimeout=setTimeout(remft,2000,i);
}

function remft(i){
    var element = document.getElementsByClassName("screen2__flyingText")[i];
    element.classList.remove("fly_l2r");
}

function setimg(url){
    img=url;
}

function setGame(){
    move=0;
    document.getElementsByClassName("move-counter")[0].innerHTML=0;
    m=document.getElementsByClassName("chooserows")[0].value;
    n=document.getElementsByClassName("choosecols")[0].value;
    m1=parseInt(m);
    n1=parseInt(n);

    for(var i=0, j=0;i<m1;i++){
        for(j=0;j<n1&&(j!=(n1-1)||i!=(m1-1));j++){
            var div=document.createElement("div");
            div.className="tile"+i+"_"+j;
            div.id="cell"+i+"_"+j;
            div.style.height=30/m1+"rem";
            div.style.width=30/n1+"rem";
            div.style.float="left";
            div.style.opacity="1";
            var style=document.createElement("style");
            style.innerHTML=".tile"+i+"_"+j+"{border:2px gray outset;background-image:url("+img+");background-position:"+100*j/(n1-1)+"% "+100*i/(m1-1)+"%;background-size:"+n1*100+"% "+m1*100+"%;} .tile"+i+"_"+j+"::before{content:'"+(n1*i+j)+"'; font-size:"+600/(m1+n1)+"%;position:relative;top:40%;}";
            document.getElementById("gametable").appendChild(div);
            document.getElementById("gametable").appendChild(style);
            div.addEventListener("click", tileclick.bind(null,document.getElementsByClassName("tile"+i+"_"+j)[0].id));
        }
        var brdiv=document.getElementById("cell"+i+"_"+0);
        brdiv.style.clear="both";
    }
    var div=document.createElement("div");
    div.className="tile"+(m1-1)+"_"+(n1-1);
    div.id="cell"+(m1-1)+"_"+(n1-1);
    div.style.height=30/m1+"rem";
    div.style.width=30/n1+"rem";
    div.style.float="left";
    div.style.opacity="1";
    document.getElementById("gametable").appendChild(div);
    div.addEventListener("click", tileclick.bind(null,document.getElementsByClassName("tile"+(m1-1)+"_"+(n1-1))[0].id));
    var animStyle=document.createElement("style");
    var animationR = "\
        .right{\
            animation: shiftR 0.5s ease-out;\
            animation-fill-mode: both;\
        }\
        @keyframes shiftR{\
            50%{\
                transform: rotateY(20deg) translateX(-"+7/n1+"rem) scale(1.1);\
                box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
            }\
            90%{\
                transform: rotateY(-20deg) translateX("+33/n1+"rem) scale(1.1);\
                box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
            }\
            100%{\
                transform: rotateY(0deg) translateX("+30/n1+"rem) scale(1);\
            }\
        }";
    animStyle.innerHTML = animationR;
    document.getElementsByTagName('body')[0].appendChild(animStyle);
    animStyle=document.createElement("style");
    var animationL = "\
    .left{\
        animation: shiftL 0.5s ease-out;\
        animation-fill-mode: both;\
    }\
    @keyframes shiftL{\
        50%{\
            transform: rotateY(-20deg) translateX("+7/n1+"rem) scale(1.1);\
            box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
        }\
        90%{\
            transform: rotateY(20deg) translateX(-"+33/n1+"rem) scale(1.1);\
            box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
        }\
        100%{\
            transform: rotateY(0deg) translateX(-"+30/n1+"rem) scale(1);\
        }\
    }";
    animStyle.innerHTML = animationL;
    document.getElementsByTagName('body')[0].appendChild(animStyle);
    animStyle=document.createElement("style");
    var animationU = "\
    .up{\
        animation: shiftU 0.5s ease-out;\
        animation-fill-mode: both;\
    }\
    @keyframes shiftU{\
        50%{\
            transform: rotateX(20deg) translateY("+7/m1+"rem) scale(1.1);\
            box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
        }\
        90%{\
            transform: rotateX(-20deg) translateY(-"+33/m1+"rem) scale(1.1);\
            box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
        }\
        100%{\
            transform: rotateX(0deg) translateY(-"+30/m1+"rem) scale(1);\
        }\
    }";
    animStyle.innerHTML = animationU;
    document.getElementsByTagName('body')[0].appendChild(animStyle);
    var animStyle=document.createElement("style");
    var animationD = "\
    .down{\
        animation: shiftD 0.5s ease-out;\
        animation-fill-mode: both;\
    }\
    @keyframes shiftD{\
        50%{\
            transform: rotateX(-20deg) translateY(-"+7/m1+"rem) scale(1.1);\
            box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
        }\
        90%{\
            transform: rotateX(20deg) translateY("+33/m1+"rem) scale(1.1);\
            box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.3);\
        }\
        100%{\
            transform: rotateX(0deg) translateY("+30/m1+"rem) scale(1);\
        }\
    }";
    animStyle.innerHTML = animationD;
    document.getElementsByTagName('body')[0].appendChild(animStyle);
    var freezeStyle=document.createElement("style");
    freezeStyle.innerHTML="\
        .freeze::after{\
            position: absolute;\
            content:' ';\
            width: "+30/n1+"rem;\
            height: "+30/m1+"rem;\
            opacity:0.8;\
            transform:translateX(-55%);\
            background-size:contain;\
            background-repeat:no-repeat;\
            background-image:url(https://cdn-icons-png.flaticon.com/512/3778/3778958.png);\
        }";
    document.getElementsByTagName('body')[0].appendChild(freezeStyle);
    
    shuffle();
}

function tileclick(thisid){
    var a=0;
    var y=thisid[4];
    for(a=5;thisid[a]!="_";a++){
        y=y+thisid[a];
    }
    var x=thisid[++a];
    for(++a;a<thisid.length;a++){
        x=x+thisid[a];
    }
    if(!document.getElementById(thisid).classList.contains("tile"+(m1-1)+"_"+(n1-1))){
        tilework(y,x);
    }
    var wonTimeout;
    clearTimeout(wonTimeout);
    wonTimeout=setTimeout(checkwon,501);
}

function checkRight(y,x){
    var flagA=1, flagB=0;
    for(var i=x;i<n1;i++){
        if(document.getElementById("cell"+y+"_"+i).classList.contains("freeze")){
            flagA=0;
            break;
        }
        if(document.getElementById("cell"+y+"_"+i).classList.contains("tile"+(m1-1)+"_"+(n1-1))){
            flagB=1;
            break;
        }
    }
    if(flagA==1&&flagB==1){
        tilemove(y,x,y,i);
    }
}

function checkLeft(y,x){
    var flagA=1, flagB=0;
    for(var i=x;i>-1;i--){
        if(document.getElementById("cell"+y+"_"+i).classList.contains("freeze")){
            flagA=0;
            break;
        }
        if(document.getElementById("cell"+y+"_"+i).classList.contains("tile"+(m1-1)+"_"+(n1-1))){
            flagB=1;
            break;
        }
    }
    if(flagA==1&&flagB==1){
        tilemove(y,x,y,i);
    }
}

function checkDown(y,x){
    var flagA=1, flagB=0;
    for(var j=y;j<m1;j++){
        if(document.getElementById("cell"+j+"_"+x).classList.contains("freeze")){
            flagA=0;
            break;
        }
        if(document.getElementById("cell"+j+"_"+x).classList.contains("tile"+(m1-1)+"_"+(n1-1))){
            flagB=1;
            break;
        }
    }
    if(flagA==1&&flagB==1){
        tilemove(y,x,j,x);
    }
}

function checkUp(y,x){
    var flagA=1, flagB=0;
    for(var j=y;j>-1;j--){
        if(document.getElementById("cell"+j+"_"+x).classList.contains("freeze")){
            flagA=0;
            break;
        }
        if(document.getElementById("cell"+j+"_"+x).classList.contains("tile"+(m1-1)+"_"+(n1-1))){
            flagB=1;
            break;
        }
    }
    if(flagA==1&&flagB==1){
        tilemove(y,x,j,x);
    }
}

function tilework(y,x){
    checkRight(y,x);
    checkLeft(y,x);
    checkDown(y,x);
    checkUp(y,x);
}

function animRight(y,x,yblank,xblank){
    for(var i=x;i<xblank;i++){
        document.getElementById("cell"+y+"_"+i).classList.add("right");
    }
    var moveTimeout;
    clearTimeout(moveTimeout);
    moveTimeout=setTimeout(moveRight,500,y,x,yblank,xblank);
}

function moveRight(y,x,yblank,xblank){
    for(var i=x;i<xblank;i++){
        document.getElementById("cell"+y+"_"+i).classList.remove("right");
    }
    for(var i=xblank;i>x;i--){
        var iminus1=i-1;
        var leftclass=document.getElementById("cell"+y+"_"+iminus1).className;
        document.getElementById("cell"+y+"_"+i).className=leftclass;
    }
    document.getElementById("cell"+y+"_"+x).className="tile"+(m1-1)+"_"+(n1-1);
}

function animLeft(y,x,yblank,xblank){
    for(var i=x;i>xblank;i--){
        document.getElementById("cell"+y+"_"+i).classList.add("left");
    }
    var moveTimeout;
    clearTimeout(moveTimeout);
    moveTimeout=setTimeout(moveLeft,500,y,x,yblank,xblank);
}

function moveLeft(y,x,yblank,xblank){
    for(var i=x;i>xblank;i--){
        document.getElementById("cell"+y+"_"+i).classList.remove("left");
    }
    for(var i=xblank;i<x;i++){
        var iplus1=i+1;
        var rightclass=document.getElementById("cell"+y+"_"+iplus1).className;
        document.getElementById("cell"+y+"_"+i).className=rightclass;
    }
    document.getElementById("cell"+y+"_"+x).className="tile"+(m1-1)+"_"+(n1-1);
}

function animDown(y,x,yblank,xblank){
    for(var j=y;j<yblank;j++){
        document.getElementById("cell"+j+"_"+x).classList.add("down");
    }
    var moveTimeout;
    clearTimeout(moveTimeout);
    moveTimeout=setTimeout(moveDown,500,y,x,yblank,xblank);
}

function moveDown(y,x,yblank,xblank){
    for(var j=y;j<yblank;j++){
        document.getElementById("cell"+j+"_"+x).classList.remove("down");
    }
        for(var j=yblank;j>y;j--){
            var jminus1=j-1;
            var upclass=document.getElementById("cell"+jminus1+"_"+x).className;
            document.getElementById("cell"+j+"_"+x).className=upclass;
        }
        document.getElementById("cell"+y+"_"+x).className="tile"+(m1-1)+"_"+(n1-1);
}

function animUp(y,x,yblank,xblank){
    for(var j=y;j>yblank;j--){
        document.getElementById("cell"+j+"_"+x).classList.add("up");
    }
    var moveTimeout;
    clearTimeout(moveTimeout);
    moveTimeout=setTimeout(moveUp,500,y,x,yblank,xblank);
}

function moveUp(y,x,yblank,xblank){
    for(var j=y;j>yblank;j--){
        document.getElementById("cell"+j+"_"+x).classList.remove("up");
    }
        for(var j=yblank;j<y;j++){
            var jplus1=j+1;
            var downclass=document.getElementById("cell"+jplus1+"_"+x).className;
            document.getElementById("cell"+j+"_"+x).className=downclass;
        }
        document.getElementById("cell"+y+"_"+x).className="tile"+(m1-1)+"_"+(n1-1);
}

function tilemove(y,x,yblank,xblank){
    if(y==yblank&&x<xblank){
        animRight(y,x,yblank,xblank);
        document.getElementsByClassName("move-counter")[0].innerHTML=++move;
    }
    if(y==yblank&&x>xblank){
        animLeft(y,x,yblank,xblank);
        document.getElementsByClassName("move-counter")[0].innerHTML=++move;
    }
    if(x==xblank&&y<yblank){
        animDown(y,x,yblank,xblank);
        document.getElementsByClassName("move-counter")[0].innerHTML=++move;
    }
    if(x==xblank&&y>yblank){
        animUp(y,x,yblank,xblank);
        document.getElementsByClassName("move-counter")[0].innerHTML=++move;
    }
}

function tileswap(class1,class2){
    var temp=class1;
    document.getElementsByClassName(class1)[0].className=class2;
    document.getElementsByClassName(class2)[0].className=temp;
}

function shuffle(){
    for(var j=0;j<(m1);j++){
        for(var i=0;i<n1;i++){
            var row2=Math.floor(Math.random()*m1);
            var col2=Math.floor(Math.random()*n1);
            tileswap("tile"+j+"_"+i,"tile"+row2+"_"+col2);
        }
    }
    document.getElementById("cell0_0").classList.add("tileFocus");
}

function sortnset(){
    var flag=0;
    for(var i=(arrCount-1);i>=0;i--){
        if((lbArr[i].timetaken)<(time)){
            insertData(i);
            flag=1;
            break;
        }
    }
    if(flag==0){
        insertData(-1);
    }
    displaylbArr();
}

function insertData(i){
    for(var k=(arrCount-1);k>i;k--){
        lbArr[k+1]=lbArr[k];
    }
    lbArr[i+1]={timetaken:time,movestaken:move};
}

function displaylbArr(){
    document.getElementsByClassName("best--time")[0].innerHTML="";
    document.getElementsByClassName("best--move")[0].innerHTML="";
    for(var i=0;i<=arrCount;i++){
        document.getElementsByClassName("best--time")[0].innerHTML+="<br>"+lbArr[i].timetaken;
        document.getElementsByClassName("best--move")[0].innerHTML+="<br>"+lbArr[i].movestaken;
    }
    arrCount++;
}

function checkwon(){
    var flag=1;
    for(var i=0;i<n1;i++){
        for(var j=0;j<m1;j++){
            if(!document.getElementById("cell"+j+"_"+i).classList.contains("tile"+j+"_"+i)){
                flag=0;
                break;
            }
        }
        if(flag==0){
            break;
        }
    }
    if(flag==1){
        flyingText(1);
        sortnset();
        clearInterval(timerInterval);
        stopChallenge();
    }
}

function newGame(){
    shuffle();
    move=0;
    document.getElementsByClassName("move-counter")[0].innerHTML=0;
    document.getElementsByClassName("time-counter")[0].innerHTML=0;
}

function startTimer(){
    clearInterval(timerInterval);
    time=0;
    document.getElementsByClassName("time-counter")[0].innerHTML=0;
    timerInterval=setInterval(timeIncrement,10);
}

function timeIncrement(){
    time+=0.01;
    time=Math.round(time*100)/100;
    document.getElementsByClassName("time-counter")[0].innerHTML=time.toFixed(2);
}

function reset(){
    document.getElementById("gametable").innerHTML="";
}

function resetTimer(){
    clearInterval(timerInterval);
    time=0;
    document.getElementsByClassName("time-counter")[0].innerHTML=0;
}

function keyboard(){
    document.addEventListener("keydown", function (event){
        if(event.code==="KeyK"){
            var focussed=document.getElementsByClassName("tileFocus")[0].className;
            tileclick(document.getElementsByClassName("tileFocus")[0].id);
        }
        if(event.code==="KeyA"||event.code==="KeyD"||event.code==="KeyW"||event.code==="KeyS"){
            var focussedEl=document.getElementsByClassName("tileFocus")[0];
            focussedEl.classList.remove("tileFocus");
            focussedid=focussedEl.id;
            var a=0;
            var y=focussedid[4];
            for(a=5;focussedid[a]!="_";a++){
                y=y+focussedid[a];
            }
            var x=focussedid[++a];
            for(++a;a<focussedid.length;a++){
                x=x+focussedid[a];
            }
            var newid;
            if(event.code==="KeyA"){
                if(x==0){
                    newid="cell"+y+"_"+(n1-1);
                }
                else{
                    newid="cell"+y+"_"+(parseInt(x)-1);
                }
            }
            if(event.code==="KeyD"){
                if(x==(n1-1)){
                    newid="cell"+y+"_"+0;
                }
                else{
                    newid="cell"+y+"_"+(parseInt(x)+1);
                }
            }
            if(event.code==="KeyS"){
                if(y==(m1-1)){
                    newid="cell"+0+"_"+x;
                }
                else{
                    newid="cell"+(parseInt(y)+1)+"_"+x;
                }
            }
            if(event.code==="KeyW"){
                if(y==0){
                    newid="cell"+(m1-1)+"_"+x;
                }
                else{
                    newid="cell"+(parseInt(y)-1)+"_"+x;
                }
            }
            document.getElementById(newid).classList.add("tileFocus");
        }
    },true);
}

function hideKcontrol(){
    document.getElementsByClassName("tileFocus")[0].classList.remove("tileFocus");
}

function showKcontrol(){
    document.getElementById("cell0_0").classList.add("tileFocus");
}

function challenge(){
    clearInterval(chInterval);
    chInterval=setInterval(freeze,10000);
    var unfTimeout;
    clearTimeout(unfTimeout);
    unfTimeout=setTimeout(preunfreeze,5000);
}

function freeze(){
    var y,x;
    y=Math.floor(Math.random()*m1);
    x=Math.floor(Math.random()*n1);
    if(y==(m1-1)&&x==(n1-1)){
        --x;
    }
    document.getElementsByClassName("tile"+y+"_"+x)[0].classList.add("freeze");
}

function preunfreeze(){
    clearInterval(unfInterval);
    unfInterval=setInterval(unfreeze,10000);
}

function unfreeze(){
    document.getElementsByClassName("freeze")[0].classList.remove("freeze");
}

function stopChallenge(){
    clearInterval(unfInterval);
    clearInterval(chInterval);
}
