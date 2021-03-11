export function test() {
    const random = require('random');
    const seedrandom = require('seedrandom')
    const Graph = require('node-dijkstra')
    
    const w = 600;
    const h = 600;
    let gridWidth = 26;
    let gridHeight = 14;
    const d = 30;
    const canvas: any = document.getElementById("canvas")!;
    canvas.width = w;
    canvas.height = h;
    const generateButton: any = document.getElementById("generate-button")!;
    const seedInput: any = document.getElementById("seed-input")!;
    const widthInput: any = document.getElementById("width-input")!;
    const heightInput: any = document.getElementById("height-input")!;
    const ctx = canvas.getContext("2d");
    
    function resizeCanvas(tilesX: number, tilesY: number) {
        canvas.width = gridWidth*d;
        canvas.height = gridHeight*d;
    }

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

    function drawPath(path: string[], color:number[] = [255,0,0]) {
        ctx.lineWidth = "1";
        ctx.strokeStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
        ctx.beginPath();
        ctx.moveTo(d/2,d/2);

        const coordsArray = path.map(p => p.split('_').map(coord => Number.parseInt(coord)));
        for(const coords of coordsArray) {
            ctx.lineTo(d*coords[0]+d/2, d*coords[1]+d/2);
        }
        if(coordsArray.length >= 2) {
            const coords0 = coordsArray[coordsArray.length-2]
            const coords1 = coordsArray[coordsArray.length-1]

            const dCoords = [(coords1[0] - coords0[0]), (coords1[1] - coords0[1])];
            const dx0 = dCoords[0] !== 0 ? Math.sign(dCoords[0])*(-1)*d/4 : d/4;
            const dy0 = dCoords[1] !== 0 ? Math.sign(dCoords[1])*(-1)*d/4 : d/4;
            const dx1 = dCoords[0] !== 0 ? Math.sign(dCoords[0])*(-1)*d/4 : -d/4;
            const dy1 = dCoords[1] !== 0 ? Math.sign(dCoords[1])*(-1)*d/4 : -d/4;

            ctx.moveTo(d*coords1[0]+d/2, d*coords1[1]+d/2);
            ctx.lineTo(d*coords1[0]+d/2 + (dx0), d*coords1[1]+d/2 + (dy0))
            ctx.moveTo(d*coords1[0]+d/2, d*coords1[1]+d/2);
            ctx.lineTo(d*coords1[0]+d/2 + (dx1), d*coords1[1]+d/2 + (dy1))
        }

        ctx.stroke();
        ctx.closePath();
    }
    
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

    window.addEventListener("keyup", function(event: any) {
        if (event.keyCode === 13) {
          event.preventDefault();
          generateButton.click();
        }
    });
    
    generateButton.onclick = function onClick() {
        if(widthInput.value == null || widthInput.value < 5) widthInput.value = 5;
        gridWidth = widthInput.value;
        if(heightInput.value == null || heightInput.value < 5) heightInput.value = 5;
        gridHeight = heightInput.value;

        resizeCanvas(gridWidth, gridHeight);

        const seed = seedInput.value;
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

        const wPadd = gridWidth % 2 == 0 ? 4 : 3; 
        const hPadd = gridHeight % 2 == 0 ? 4 : 3;

        const fixPoints = [
            [0,0],
            [
                Math.floor(gridWidth/2) +1 + Math.floor(randomGen() * (gridWidth - wPadd)/2),
                1 + Math.floor(randomGen() * (gridHeight - hPadd)/2)
            ],
            [
                1 + Math.floor(randomGen() * (gridWidth - wPadd)/2),
                Math.floor(gridHeight/2) +1 + Math.floor(randomGen() * (gridHeight - hPadd)/2)
            ],
            [gridWidth-1, gridHeight-1]
        ];

    
        let path: string[] = [];
        for (let i = 0; i < fixPoints.length-1; i++) {
            const startPoint = fixPoints[i];
            const endPoint = fixPoints[i+1];
    
            const graph = createGraph(tiles, startPoint, endPoint)
            removeNodesFromGraph(graph, path);
            const partialPath: string[] = graph.path(...[startPoint, endPoint].map(fp => `${fp[0]}_${fp[1]}`));
    
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
        drawPath(path);
    }
    
    //TODO link: dijkstra algortihm shortest path
    // https://github.com/albertorestifo/node-dijkstra
    
    //TODO might be useful
    //https://world-editor-tutorials.thehelper.net/towerdef.php
}    
