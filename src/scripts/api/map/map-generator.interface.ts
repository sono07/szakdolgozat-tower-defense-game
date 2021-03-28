import { Tuple } from "../common/types";

export interface IMapGenerator {
    generateMap(seed: string, gridHeight: number, gridWidth: number): { 
        map: number[][], 
        path: Tuple<number, 2>[]
    }
}