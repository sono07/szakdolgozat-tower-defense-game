import { BaseScene } from './_abstract/base.scene.abstract';
import { GameStateStore } from '../game-state-store/game-state.store.class';
import { generateMap, Tuple } from '../map/generate-map';
import { MAP_TILES_COL_COUNT, MAP_TILES_ROW_COUNT, TILE_TURRET_BULLET_MK1 } from '../utils/constants';
import { ROTATION_DIVISOR } from '../utils/constants';

export const GAME_SCENE_KEY = "Game";
export class GameScene extends BaseScene {
    private gameStateStore!: GameStateStore;
    private nextEnemy!: number;
    
    private windowSizes = {
        width: 0,
        height: 0,
        tileWidth: 0,
        tileHeight: 0,
    }
    
    private map!: number[][];
    private tileMap!: Phaser.Tilemaps.Tilemap;
    private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;
    private tileSelector!: Phaser.GameObjects.Rectangle;
    private path!: Phaser.Curves.Path;

    constructor() {
        super(GAME_SCENE_KEY);
    }

    init(data: {seed: string}): void {
        this.initWindowSizes();
        
        const {map, path} = generateMap(data.seed, MAP_TILES_ROW_COUNT, MAP_TILES_COL_COUNT)
        
        this.initMap(map);
        this.initPath(path);
        this.initSelector();
    }

    private initWindowSizes() {
        this.windowSizes.width = this.cameras.main.width;
        this.windowSizes.height = this.cameras.main.height;
        this.windowSizes.tileWidth = this.windowSizes.width / MAP_TILES_COL_COUNT;
        this.windowSizes.tileHeight = this.windowSizes.height / MAP_TILES_ROW_COUNT;
    }

    private initMap(map: number[][]) {
        const { tileWidth, tileHeight } = this.windowSizes;

        this.map = map;
        this.tileMap = this.make.tilemap({tileWidth: 128, tileHeight: 128, width: MAP_TILES_COL_COUNT, height: MAP_TILES_ROW_COUNT});
        const tileset = this.tileMap.addTilesetImage('terrain-tiles', 'terrain-tiles')
        this.tileMapLayer = this.tileMap.createBlankLayer('terrain-layer', tileset)
        this.tileMapLayer.setScale(tileWidth / 128, tileHeight / 128); //scale 128x128 tiles to proper size
        
        for(let rowI = 0; rowI < map.length; rowI++) {
            for(let colI = 0; colI < map[rowI].length; colI++) {
                const cell = map[rowI][colI];
                const tileIndex = Math.floor(cell)
                const tileRotation = (cell - tileIndex) * ROTATION_DIVISOR;

                this.tileMapLayer
                    .putTileAt(tileIndex, colI, rowI)
                    .rotation = Math.PI / 2 * tileRotation;

            }
        }
    }

    private initPath(path: Tuple<number, 2>[]) {
        const { tileWidth, tileHeight } = this.windowSizes;

        path.unshift([0, -1]);
        path.push([MAP_TILES_COL_COUNT - 1, MAP_TILES_ROW_COUNT]);
        path = path.map(point => {
            return [(point[0] + 0.5) * tileWidth, (point[1] + 0.5) * tileHeight]
        })
        
        this.path = this.add.path(...path[0]);
        for (let i = 1; i < path.length; i++) {
            this.path.lineTo(...path[i]);
        }
    }

    private initSelector() {
        const { tileWidth, tileHeight} = this.windowSizes;

        this.tileSelector = this.add.rectangle(
            0,
            0,
            tileWidth - 2,
            tileHeight - 2,
        );
        this.tileSelector.setStrokeStyle(1, 0xFFFF00, 1);
        this.tileSelector.setFillStyle(0xFFFF00, 0.25);
        this.tileSelector.setOrigin(0.5,0.5)
        this.tileSelector.setDepth(10);
    }

    preload(): void {
    }

    create(data: object): void {
        this.drawGrid();

        this.gameStateStore = new GameStateStore(this);

        this.nextEnemy = 0;

        this.input.on('pointerdown', this.placeTurret, this);
    }

    update(time: number, delta: number): void {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

        // Rounds down to nearest tile
        const tile = this.tileMap.getTileAtWorldXY(worldPoint.x, worldPoint.y);
        
        // Snap to tile coordinates, but in world space
        this.tileSelector.x = tile.getCenterX();
        this.tileSelector.y = tile.getCenterY();

        if (time > this.nextEnemy) {
            const enemy = this.gameStateStore.enemiesGroup.get();
            if (enemy) {
                enemy.init(100, 150, this.path, this.gameStateStore)
                // enemy.id = this.i++; //TODO

                this.nextEnemy = time + 1000;
            }
        }
    }

    drawGrid() {
        const { width, height, tileWidth, tileHeight } = this.windowSizes;
        
        const mapGraphics = this.add.graphics();

        mapGraphics.lineStyle(1, 0x000000, 0.8);
        for (let i = 0; i < MAP_TILES_ROW_COUNT; i++) {
            mapGraphics.moveTo(0, i * tileHeight);
            mapGraphics.lineTo(width, i * tileHeight);
        }
        for (let j = 0; j < MAP_TILES_COL_COUNT; j++) {
            mapGraphics.moveTo(j * tileWidth, 0);
            mapGraphics.lineTo(j * tileWidth, height);
        }
        mapGraphics.strokePath();
    }

    placeTurret(pointer: any /*TODO type */) {
        const tile = this.tileMap.getTileAtWorldXY(pointer.x, pointer.y);
        const i = tile.y;
        const j = tile.x;

        if (this.canPlaceTurret(i, j)) {
            const turret = this.gameStateStore.turretRocketMk3sGroup.get();
            if (turret) {
                const pos = new Phaser.Math.Vector2(
                    tile.getCenterX(),
                    tile.getCenterY(),
                );
                turret.init(pos, this.gameStateStore);
                this.map[i][j] = TILE_TURRET_BULLET_MK1;//TODO
            }
        }
    }

    canPlaceTurret(i: number, j: number) {
        return Math.floor(this.map[i][j]) === 0;
    }
}
