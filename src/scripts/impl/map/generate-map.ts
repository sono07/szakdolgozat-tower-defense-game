import random from 'random';
import seedrandom from 'seedrandom';
import Graph from 'node-dijkstra';
import { ROTATION_180, ROTATION_270, ROTATION_90, ROTATION_ZERO, TILE_CRATERS, TILE_EMPTY, TILE_ROAD_2WAY_CORNER, TILE_ROAD_2WAY_STRAIGHT, TILE_TREES } from '../utils/constants';
import { Tuple, Map } from '../../api/common/types';
import { IMapGenerator } from '../../api/map/map-generator.interface';
  
const SIDE_RIGHT = 0;
const SIDE_DOWN = 1;
const SIDE_LEFT = 2;
const SIDE_TOP = 3;

class MapGenerator implements IMapGenerator {
    private createGraph(tiles: number[][], p1: number[], p2: number[]) {
        let from: number[] = [];
        let to: number[] = [];
        if (p1[0] < p2[0]) {
            from[0] = p1[0];
            to[0] = p2[0];
        } else {
            from[0] = p2[0];
            to[0] = p1[0];
        }
    
        if (p1[1] < p2[1]) {
            from[1] = p1[1];
            to[1] = p2[1];
        } else {
            from[1] = p2[1];
            to[1] = p1[1];
        }
    
        let graph = new Graph()
        for (let i = from[0]; i < to[0] + 1; i++) {
            for (let j = from[1]; j < to[1] + 1; j++) {
                const name = this.pointToPathString([i, j]);
                const neighbours: Map<number> = {};
    
                if (i > from[0]) neighbours[this.pointToPathString([i - 1, j])] = tiles[i - 1][j] - tiles[i][j] + 5;
                if (i < to[0]) neighbours[this.pointToPathString([i + 1, j])] = tiles[i + 1][j] - tiles[i][j] + 5;
                if (j > from[1]) neighbours[this.pointToPathString([i, j - 1])] = tiles[i][j - 1] - tiles[i][j] + 5;
                if (j < to[1]) neighbours[this.pointToPathString([i, j + 1])] = tiles[i][j + 1] - tiles[i][j] + 5;
    
                graph.addNode(name, neighbours);
            }
        }
    
        return graph;
    }
    
    private removeNodesFromGraph(graph: Graph, nodesToRemove: string[]) {
        for (let j = 0; j < nodesToRemove.length - 1; j++) {
            graph.removeNode(nodesToRemove[j]);
        }
    }
    
    private pointToPathString(point: Tuple<number, 2>) {
        return `${point[0]}_${point[1]}`;
    }
    
    private pathStringToPoint(str: String): Tuple<number, 2> {
        return str.split("_").map(v => Number.parseInt(v)) as Tuple<number, 2>;
    }

    
    private  differenceToSide(value: Tuple<number, 2>) {
        if (value[0] == 1) {
            return SIDE_RIGHT;
        } else if (value[0] == -1) {
            return SIDE_LEFT;
        } else if (value[1] == 1) {
            return SIDE_DOWN;
        } else if (value[1] == -1) {
            return SIDE_TOP;
        } else {
            throw new Error("Invalid input!");
        }
    }
    
    public generateMap(seed: string, gridHeight: number, gridWidth: number): { map: number[][], path: Tuple<number, 2>[] } {
        random.use(seedrandom(seed));
        const randomGen = random.uniform(0, 1)
    
        let tiles: number[][] = [];
    
        for (let i = 0; i < gridWidth; i++) {
            tiles.push([]);
            for (let j = 0; j < gridHeight; j++) {
                tiles[i].push(randomGen());
            }
        }
    
        const wPadd = gridWidth % 2 == 0 ? 4 : 3;
        const hPadd = gridHeight % 2 == 0 ? 4 : 3;
    
        const fixPoints: Tuple<number, 2>[] = [
            [0, 0],
            [
                Math.floor(gridWidth / 2) + 1 + Math.floor(randomGen() * (gridWidth - wPadd) / 2),
                1 + Math.floor(randomGen() * (gridHeight - hPadd) / 2)
            ],
            [
                1 + Math.floor(randomGen() * (gridWidth - wPadd) / 2),
                Math.floor(gridHeight / 2) + 1 + Math.floor(randomGen() * (gridHeight - hPadd) / 2)
            ],
            [gridWidth - 1, gridHeight - 1]
        ];
    
    
        let path: string[] = [];
        for (let i = 0; i < fixPoints.length - 1; i++) {
            const startPoint = fixPoints[i];
            const endPoint = fixPoints[i + 1];
    
            const graph = this.createGraph(tiles, startPoint, endPoint)
            this.removeNodesFromGraph(graph, path);
            const partialPath: string[] = graph.path(
                this.pointToPathString(startPoint),
                this.pointToPathString(endPoint),
            );
    
            path.push(...partialPath);
        }
    
        //removes duplicated inner fixpoints
        path = path.filter((item, index, array) => array.indexOf(item) === index);
    
        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridHeight; j++) {
                if (tiles[i][j] < 0.7) {
                    tiles[i][j] = TILE_EMPTY + ROTATION_ZERO;
                } else if (tiles[i][j] < 0.85) {
                    tiles[i][j] = TILE_CRATERS + ROTATION_ZERO;
                } else {
                    tiles[i][j] = TILE_TREES + ROTATION_ZERO;
                }
            }
        }
    
        const pointPath: Tuple<number, 2>[] = [
            [0, -1],
            ...path.map(p => this.pathStringToPoint(p)),
            [gridWidth - 1, gridHeight],
        ]
        for (let i = 1; i < pointPath.length - 1; i++) {
            const previousPoint = pointPath[i - 1];
            const currentPoint = pointPath[i];
            const nextPoint = pointPath[i + 1];
    
            //0 right, 1 down, 2 left, 3 top
            const d1 = this.differenceToSide([currentPoint[0] - previousPoint[0], currentPoint[1] - previousPoint[1]]);
            const d2 = this.differenceToSide([nextPoint[0] - currentPoint[0], nextPoint[1] - currentPoint[1]]);
    
            if (d1 == SIDE_DOWN && d2 == SIDE_DOWN) {
                //straight road, from top to down
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_STRAIGHT + ROTATION_ZERO;
            } else if (d1 == SIDE_TOP && d2 == SIDE_TOP) {
                //straight road, from down to top
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_STRAIGHT + ROTATION_ZERO;
            } else if (d1 == SIDE_RIGHT && d2 == SIDE_RIGHT) {
                //straight road, from left to right
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_STRAIGHT + ROTATION_90;
            } else if (d1 == SIDE_LEFT && d2 == SIDE_LEFT) {
                //straight road, from right to left
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_STRAIGHT + ROTATION_90;
    
    
            } else if (d1 == SIDE_DOWN && d2 == SIDE_RIGHT) {
                //corner road, from top to right
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_270;
            } else if (d1 == SIDE_DOWN && d2 == SIDE_LEFT) {
                //corner road, from top to left
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_180;
            } else if (d1 == SIDE_RIGHT && d2 == SIDE_TOP) {
                //corner road, from left to top
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_180;
            } else if (d1 == SIDE_RIGHT && d2 == SIDE_DOWN) {
                //corner road, from left to down
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_90;
            } else if (d1 == SIDE_TOP && d2 == SIDE_RIGHT) {
                //corner road, from down to right
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_ZERO;
            } else if (d1 == SIDE_TOP && d2 == SIDE_LEFT) {
                //corner road, from down to left
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_90;
            } else if (d1 == SIDE_LEFT && d2 == SIDE_TOP) {
                //corner road, from right to top
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_270;
            } else if (d1 == SIDE_LEFT && d2 == SIDE_DOWN) {
                //corner road, from right to down
                tiles[currentPoint[0]][currentPoint[1]] = TILE_ROAD_2WAY_CORNER + ROTATION_ZERO;
            }
        }
    
        const map: number[][] = [];
        for (let j = 0; j < gridHeight; j++) {
            map.push([]);
            for (let i = 0; i < gridWidth; i++) {
                map[j].push(tiles[i][j]);
            }
        }
    
        return {
            map: map,
            path: path.map(p => this.pathStringToPoint(p)),
        }
    }
}

const MapGeneratorInstance = new MapGenerator();
export {MapGeneratorInstance as MapGenerator};
