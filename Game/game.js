var createCanvas= document.getElementById('2048');
var ctx = createCanvas.getContext("2d");

var parentStyle = createCanvas.parentElement.style;
parentStyle.textAlign = "center";

var score=0;

var colour ={
    "2":"#ffff80",
    "4":"#ffff4d",
    "8":"#ffff33",
    "16":"#ffcc00",
    "32":"#e6b800",
    "64":"#ff8533",
    "128":"#ff6600",
    "256":"#e67300",
    "512":"#994d00",
    "1024":"#cc4400",
    "2048":"#cc6600"
};

function createGrid(){
    let grid= [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    return grid;
}

grid=createGrid();

function setup() {

    
    grid = addNumber(grid);
    grid = addNumber(grid); 
    draw(grid);  
    scoreDisplay();
}

function random_item(item){
    return item[Math.floor(Math.random()*item.length)];
}

function addNumber(grid){
    let options = [];

    for(let i=0; i<4; i++){
        for(let j=0;j<4;j++){
            if(grid[i][j] === 0){

                options.push({x:i, y:j});

            }
        }
    }

    if(options.length > 0){

        let spot = random_item(options);       
        let r = Math.random(1);
        grid[spot.x][spot.y] = r > 0.4? 2: 4;
        
    } else if( options.length===0){

        alert('GameOver :(');
        alert(score);
    }
    
    return grid;
}

function draw(grid) {
    w=100;
    ctx.clearRect(0, 0, createCanvas.width, createCanvas.height);
    ctx.font="30px Arial";
    ctx.rect(0, 0, 4*w, 4*w);
    for(let i=0; i<4; i++){
        for(let j=0;j<4;j++){
            
            ctx.rect(i*w, j*w, w, w);
            ctx.stroke();
            if(grid[i][j]!==0){

                ctx.fillStyle=colour[grid[i][j]];
                ctx.fillRect(j*w, i*w, w, w);
                ctx.textAlign='center';
                ctx.fillStyle='white';
                ctx.fillText(grid[i][j], j*w+w/2, i*w+w/2);

                if(grid[i][j]===2048){
                    alert("You Won");
                    alert(score);
                }
            }
        }
    }
}

function slide(row){
    let arr=[0, 0, 0, 0];
    let j=3;
    for(let i=3; i>=0; i--){
        if(row[i]!==0){
            arr[j]=row[i];
            j--;
        }
    }
    return arr;
}

function combine(row){
    for(let i=3;i>=1;i--){
        if(row[i-1]===row[i]){
            row[i]=row[i-1]+row[i];
            row[i-1]=0;
            score += row[i];
        }
    }

    return row;
}

//One move for the key.
function keyPressed(grid){
    
    for(let i=0; i<4; i++){
        grid[i] = slide(grid[i]);
        grid[i] = combine(grid[i]);
        grid[i] = slide(grid[i]);
    }
    grid=addNumber(grid);
    return grid;
}

function flip(grid){
    
    let copygrid=createGrid();

    for(let i=0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            copygrid[i][3-j] = grid[i][j];
        }
    }

    return copygrid;
}

function rotate(grid){
    let copygrid=createGrid()
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            copygrid[i][j] = grid[j][i];
        }
    }

    return copygrid;
}

function movement(event){
    //let filpped=False;
    //let rotated=False;
    //let pressed= True;
    
    if(event.code==="ArrowRight"){
       // alert(event.code);
       grid=keyPressed(grid);
       draw(grid);
    } else if(event.code==="ArrowLeft"){
       grid=flip(grid);
       grid=keyPressed(grid);
       grid=flip(grid);
       draw(grid);
    } else if(event.code==="ArrowDown"){
       grid=rotate(grid);
       grid=keyPressed(grid);
       grid=rotate(grid);
       grid=rotate(grid);
       grid=rotate(grid);
       draw(grid);


    } else if(event.code==="ArrowUp"){
        grid=rotate(grid);
        grid=flip(grid);
       
        grid=keyPressed(grid);
        grid=flip(grid);
        grid=rotate(grid);
        grid=rotate(grid);
        grid=rotate(grid);
        
        draw(grid);
        
    } else{
        pressed=False;
    }

    scoreDisplay();
    
}

function scoreDisplay(){
    document.getElementById("display").innerHTML = score;
}
document.addEventListener("keydown", movement)
setup();