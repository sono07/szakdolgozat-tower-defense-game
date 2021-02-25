const random = require('random');
const seedrandom = require('seedrandom')
const Graph = require('node-dijkstra')

const w = 600;
const h = 600;
const gridWidth = 26; //must be even!
const gridHeight = 14; //must be even!
const d = Math.min(w / gridWidth, h/gridHeight);
const canvas: any = document.getElementById("canvas")!;
const button: any = document.getElementById("button")!;
const input: any = document.getElementById("input")!;
const ctx = canvas.getContext("2d");

function drawBoard(tiles: number[][], gridWidth: number, gridHeight: number, color:number[] = [0,0,0]){
    for(let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            const x = i*d;
            const y = j*d;

            ctx.fillStyle=`rgba(${color[0]},${color[1]},${color[2]},${tiles[i][j]})`;
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";
            ctx.rect(x, y, d, d);  
            ctx.stroke();
            ctx.fill();
        }
    }
}

input.addEventListener("keyup", function(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
    }
});

function createGraph(tiles: number[][], p1: number[], p2: number[]) {
    let from: number[] = [];
    let to: number[] = [];
    if(p1[0] < p2[0]) {
        from[0] = p1[0];
        to[0] = p2[0];
    } else {
        from[0] = p2[0];
        to[0] = p1[0];
    }

    if(p1[1] < p2[1]) {
        from[1] = p1[1];
        to[1] = p2[1];
    } else {
        from[1] = p2[1];
        to[1] = p1[1];
    }
    
    // console.warn({tiles, from, to})
    let graph = new Graph()
    for(let i = from[0]; i < to[0]+1; i++) {
        for (let j = from[1]; j < to[1]+1; j++) {
            const name = `${i}_${j}`
            const neighbours: any = {};

            if(i>from[0]) neighbours[`${i-1}_${j}`] = tiles[i-1][j] - tiles[i][j] + 5;
            if(i<to[0]) neighbours[`${i+1}_${j}`] = tiles[i+1][j] - tiles[i][j] + 5;
            if(j>from[1]) neighbours[`${i}_${j-1}`] = tiles[i][j-1] - tiles[i][j] + 5;
            if(j<to[1]) neighbours[`${i}_${j+1}`] = tiles[i][j+1] - tiles[i][j] + 5;

            graph.addNode(name, neighbours);
        }
    }

    return graph;
}

function removeNodesFromGraph(graph: any, nodesToRemove: string[]) {
    for (let j = 0; j < nodesToRemove.length - 1; j++) {
        graph.removeNode(nodesToRemove[j]);
    }
}

button.onclick = onClick;
function onClick() {
    const seed = input.value;
    random.use(seedrandom(seed));
    const randomGen = random.uniform(0,1)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let tiles: number[][] = [];

    for (let i = 0; i < gridWidth; i++) {
        tiles.push([]);
        for (let j = 0; j < gridHeight; j++) {
            tiles[i].push(randomGen());
        }
    }

    const fixPoints = [
        [0,0],
        [
            Math.floor(randomGen()*(gridWidth/2 - 2)) + gridWidth/2 + 1,
            Math.floor(randomGen()*(gridHeight/2 - 2)) + 1
        ],
        [
            Math.floor(randomGen()*(gridWidth/2 - 2)) + 1,
            Math.floor(randomGen()*(gridHeight/2 - 2)) + gridHeight/2 + 1 
        ],
        [gridWidth-1, gridHeight-1]
    ];

    // console.log({fixPoints})
    let path: string[] = [];
    for (let i = 0; i < fixPoints.length-1; i++) {
        const startPoint = fixPoints[i];
        const endPoint = fixPoints[i+1];

        const graph = createGraph(tiles, startPoint, endPoint)
        // console.log({graph})
        removeNodesFromGraph(graph, path);
        // console.log({graph})
        const partialPath: string[] = graph.path(...[startPoint, endPoint].map(fp => `${fp[0]}_${fp[1]}`));
        // console.log({fromTo: [...[startPoint, endPoint].map(fp => `${fp[0]}_${fp[1]}`)],partialPath})

        path.push(...partialPath);
    }

    drawBoard(tiles, gridWidth, gridHeight);

    const newTiles: number[][] = [];
    for (let i = 0; i < gridWidth; i++) {
        newTiles.push([]);
        for (let j = 0; j < gridHeight; j++) {
            newTiles[i].push(
                (path.some(p => p == `${i}_${j}`))
                ? 0.4
                : 0
            );
        }
    }


    drawBoard(newTiles, gridWidth, gridHeight, [0, 255, 0]);
}

//TODO link: dijkstra algortihm shortest path
// https://github.com/albertorestifo/node-dijkstra

//TODO might be useful
//https://world-editor-tutorials.thehelper.net/towerdef.php

