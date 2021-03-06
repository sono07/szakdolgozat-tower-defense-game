import { IAction } from '../../api/action/action.interface';
import { Tuple, WindowSizes } from '../../api/common/types';
import { IGameStateStore } from '../../api/game-state/game-state-store.interface';
import { PlaceTurretBulletMk1Action } from '../action/place-action/place-turret-bullet-mk1-action.class';
import { PlaceTurretBulletMk2Action } from '../action/place-action/place-turret-bullet-mk2-action.class';
import { PlaceTurretBulletMk3Action } from '../action/place-action/place-turret-bullet-mk3-action.class';
import { PlaceTurretEnergyBallBlueMk1Action } from '../action/place-action/place-turret-energy-ball-blue-mk1-action.class';
import { PlaceTurretEnergyBallBlueMk2Action } from '../action/place-action/place-turret-energy-ball-blue-mk2-action.class';
import { PlaceTurretEnergyBallBlueMk3Action } from '../action/place-action/place-turret-energy-ball-blue-mk3-action.class';
import { PlaceTurretEnergyBallOrangeMk1Action } from '../action/place-action/place-turret-energy-ball-orange-mk1-action.class';
import { PlaceTurretEnergyBallOrangeMk2Action } from '../action/place-action/place-turret-energy-ball-orange-mk2-action.class';
import { PlaceTurretEnergyBallOrangeMk3Action } from '../action/place-action/place-turret-energy-ball-orange-mk3-action.class';
import { PlaceTurretLaserMk1Action } from '../action/place-action/place-turret-laser-mk1-action.class';
import { PlaceTurretLaserMk2Action } from '../action/place-action/place-turret-laser-mk2-action.class';
import { PlaceTurretLaserMk3Action } from '../action/place-action/place-turret-laser-mk3-action.class';
import { PlaceTurretRocketMk1Action } from '../action/place-action/place-turret-rocket-mk1-action.class';
import { PlaceTurretRocketMk2Action } from '../action/place-action/place-turret-rocket-mk2-action.class';
import { PlaceTurretRocketMk3Action } from '../action/place-action/place-turret-rocket-mk3-action.class';
import { RemoveAction } from '../action/remove-action.class';
import { SelectAction } from '../action/select-action.class';
import { Phaser } from '../../api/__helper__/phaser.export';
import { GameStateStore } from '../game-state/game-state.store.class';
import { MapGenerator } from '../map/map-generator.class';
import { MAP_TILES_COL_COUNT, MAP_TILES_ROW_COUNT } from '../game-config';
import { ROTATION_DIVISOR, TILE_SELECTOR_Z_INDEX, UI_CLICKABLE_FIELD_BORDER_Z_INDEX, UI_CLICKABLE_FIELD_BOX_Z_INDEX, UI_CLICKABLE_FIELD_IMAGE_Z_INDEX, UI_CLICKABLE_FIELD_LAYER_Z_INDEX, UI_CLICKABLE_FIELD_OVERLAY_Z_INDEX, UI_INFO_FIELD_BOX_Z_INDEX, UI_INFO_FIELD_ICON_Z_INDEX, UI_INFO_FIELD_TEXT_Z_INDEX, UI_SEPARATOR_Z_INDEX, UI_SIDE_PANEL_Z_INDEX, UI_TOP_PANEL_Z_INDEX } from '../game-constants';
import { BaseScene } from './__abstract__/base.scene.abstract';

export const GAME_SCENE_KEY = "Game";
export class GameScene extends BaseScene {
    private gameStateStore!: IGameStateStore;
    
    private tileMap!: Phaser.Tilemaps.Tilemap;
    private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;
    private tileSelector!: Phaser.GameObjects.Rectangle;
    private priceText!: Phaser.GameObjects.Text;

    constructor() {
        super(GAME_SCENE_KEY);
    }

    public init(data: object): void {   
    }

    public preload(): void {
    }

    public create(data: {seed: string}): void {
        const windowSizes = this.getWindowSizes();

        const {map, path} = MapGenerator.generateMap(data.seed, MAP_TILES_ROW_COUNT, MAP_TILES_COL_COUNT)
        
        const convertedPath = this.getConvertedPath(path, windowSizes);
        this.gameStateStore = new GameStateStore(this, map, convertedPath);
        
        this.createMapTiles(this.gameStateStore.getMapDataForTileMap(), windowSizes);
        this.createMapTileSelector(windowSizes);
        this.createMapGrid(windowSizes);
        this.createTopUI();
        this.createSideUI();
        this.createUIInputHandlers();
    }   

    public update(time: number, delta: number): void {
        this.gameStateStore.updateSpawner(time, delta);
    }

    private getWindowSizes(): WindowSizes {
        const windowSizes: WindowSizes = {
            width: 0,
            height: 0,
            tileWidth: 0,
            tileHeight: 0,
        };

        windowSizes.width = this.cameras.main.width;
        windowSizes.height = this.cameras.main.height;
        windowSizes.tileWidth = (windowSizes.width - 160) / MAP_TILES_COL_COUNT;
        windowSizes.tileHeight = (windowSizes.height - 80) / MAP_TILES_ROW_COUNT;

        return windowSizes
    }

    private createMapTiles(map: number[][], windowSizes: WindowSizes) {
        const { tileWidth, tileHeight } = windowSizes;
        const currentMap = map;

        this.tileMap = this.make.tilemap({tileWidth: 128, tileHeight: 128, width: MAP_TILES_COL_COUNT, height: MAP_TILES_ROW_COUNT});
        const tileset = this.tileMap.addTilesetImage('terrain-tiles', 'terrain-tiles')
        this.tileMapLayer = this.tileMap.createBlankLayer('terrain-layer', tileset)
        this.tileMapLayer.setPosition(0, 80);
        this.tileMapLayer.setScale(tileWidth / 128, tileHeight / 128); //scale 128x128 tiles to proper size
        
        const createTileAt = (rowI: number, colI: number) => {
            const cell = currentMap[rowI][colI];
            const tileIndex = Math.floor(cell)
            const tileRotation = (cell - tileIndex) * ROTATION_DIVISOR;

            this.tileMapLayer
                .putTileAt(tileIndex, colI, rowI)
                .rotation = Math.PI / 2 * tileRotation;
        }

        const removeTileAt = (rowI: number, colI: number) => {
            this.tileMapLayer.removeTileAt(colI, rowI);
        }
        
        for(let rowI = 0; rowI < currentMap.length; rowI++) {
            for(let colI = 0; colI < currentMap[rowI].length; colI++) {
                createTileAt(rowI, colI);
            }
        }

        this.gameStateStore.tileForTileMapChangedCallbacks.push((i, j, newValue) => {
            if(currentMap[i][j] != newValue) {
                currentMap[i][j] = newValue;
                removeTileAt(i, j);
                createTileAt(i, j);
            }
        })
    }

    private getConvertedPath(path: Tuple<number, 2>[], windowSizes: WindowSizes): Phaser.Curves.Path {
        const { tileWidth, tileHeight } = windowSizes;

        path.unshift([0, -1]);
        path.push([MAP_TILES_COL_COUNT - 1, MAP_TILES_ROW_COUNT]);
        path = path.map(point => {
            return [(point[0] + 0.5) * tileWidth, (point[1] + 0.5) * tileHeight + 80]
        })
        
        const resultPath = this.add.path(...path[0]);
        for (let i = 1; i < path.length; i++) {
            resultPath.lineTo(...path[i]);
        }

        return resultPath;
    }

    private createMapTileSelector(windowSizes: WindowSizes) {
        const { tileWidth, tileHeight} = windowSizes;

        this.tileSelector = this.add.rectangle(
            0,
            80,
            tileWidth - 2,
            tileHeight - 2,
        );
        this.tileSelector.setStrokeStyle(1, 0xFFFF00, 1);
        this.tileSelector.setFillStyle(0xFFFF00, 0.25);
        this.tileSelector.setOrigin(0.5,0.5)
        this.tileSelector.setDepth(TILE_SELECTOR_Z_INDEX);
        this.tileSelector.setVisible(false)
    }

    private createMapGrid(windowSizes: WindowSizes) {
        const { width, height, tileWidth, tileHeight } = windowSizes;
        
        const gridGraphics = this.add.graphics();

        gridGraphics.lineStyle(1, 0x000000, 0.8);
        for (let i = 0; i < MAP_TILES_ROW_COUNT; i++) {
            gridGraphics.moveTo(0, i * tileHeight+80);
            gridGraphics.lineTo(width-160, i * tileHeight+80);
        }
        for (let j = 0; j < MAP_TILES_COL_COUNT; j++) {
            gridGraphics.moveTo(j * tileWidth, 80);
            gridGraphics.lineTo(j * tileWidth, height + 80);
        }
        gridGraphics.strokePath();
    }

    private createTopUI() {
        const topPanel = this.add.image(0,0,'ui', 'panel');
        topPanel.setOrigin(0, 0.5);
        topPanel.x = -10;
        topPanel.y = 40;
        topPanel.displayHeight = 80;
        topPanel.displayWidth = 980;
        topPanel.setDepth(UI_TOP_PANEL_Z_INDEX);

        const healthBox = this.add.graphics();
        healthBox.fillStyle(0x222222, 0.8);
        healthBox.fillRoundedRect(45, 25, 155, 30, 5);
        healthBox.setDepth(UI_INFO_FIELD_BOX_Z_INDEX);

        const healthIcon = this.add.image(0,0, 'ui', 'hearth');
        healthIcon.setOrigin(0, 0.5);
        healthIcon.x = 20;
        healthIcon.y = 40;
        healthIcon.displayHeight = 45;
        healthIcon.setScale(healthIcon.scaleY)
        healthIcon.setDepth(UI_INFO_FIELD_ICON_Z_INDEX);

        const healthText = this.make.text({
            x: 190,
            y: 40,
            text: this.gameStateStore.getHealth().toString(),
            style: {
                font: '25px monospace',
                color: '#ffffff',
            }
        });
        healthText.setOrigin(1, 0.5);
        healthText.setDepth(UI_INFO_FIELD_TEXT_Z_INDEX);
        this.gameStateStore.healtChangedCallbacks.push((value) => {
            healthText.setText(value.toString())
        })

        const moneyBox = this.add.graphics();
        moneyBox.fillStyle(0x222222, 0.8);
        moneyBox.fillRoundedRect(245, 25, 155, 30, 5);
        moneyBox.setDepth(UI_INFO_FIELD_BOX_Z_INDEX);

        const moneyIcon = this.add.image(0,0, 'ui', 'money');
        moneyIcon.setOrigin(0, 0.5);
        moneyIcon.x = 220;
        moneyIcon.y = 40;
        moneyIcon.displayHeight = 45;
        moneyIcon.setScale(moneyIcon.scaleY)
        moneyIcon.setDepth(UI_INFO_FIELD_ICON_Z_INDEX);

        const moneyText = this.make.text({
            x: 390,
            y: 40,
            text: this.gameStateStore.getMoney().toString(),
            style: {
                font: '25px monospace',
                color: '#ffffff',
            }
        });
        moneyText.setOrigin(1, 0.5);
        moneyText.setDepth(UI_INFO_FIELD_TEXT_Z_INDEX);
        this.gameStateStore.moneyChangedCallbacks.push((value) => {
            moneyText.setText(value.toString())
        })

        const scoreBox = this.add.graphics();
        scoreBox.fillStyle(0x222222, 0.8);
        scoreBox.fillRoundedRect(445, 25, 155, 30, 5);
        scoreBox.setDepth(UI_INFO_FIELD_BOX_Z_INDEX);

        const scoreIcon = this.add.image(0,0, 'ui', 'score');
        scoreIcon.setOrigin(0, 0.5);
        scoreIcon.x = 420;
        scoreIcon.y = 40;
        scoreIcon.displayHeight = 45;
        scoreIcon.setScale(scoreIcon.scaleY)
        scoreIcon.setDepth(UI_INFO_FIELD_ICON_Z_INDEX);

        const scoreText = this.make.text({
            x: 590,
            y: 40,
            text: this.gameStateStore.getScore().toString(),
            style: {
                font: '25px monospace',
                color: '#ffffff',
            }
        });
        scoreText.setOrigin(1, 0.5);
        scoreText.setDepth(UI_INFO_FIELD_TEXT_Z_INDEX);
        this.gameStateStore.scoreChangedCallbacks.push((value) => {
            scoreText.setText(value.toString())
        })

        const waveBox = this.add.graphics();
        waveBox.fillStyle(0x222222, 0.8);
        waveBox.fillRoundedRect(655, 25, 120, 30, 5);
        waveBox.setDepth(UI_INFO_FIELD_BOX_Z_INDEX);

        const waveIcon = this.add.image(0,0, 'ui', 'wave');
        waveIcon.setOrigin(0, 0.5);
        waveIcon.x = 620;
        waveIcon.y = 40;
        waveIcon.displayHeight = 45;
        waveIcon.setScale(waveIcon.scaleY)
        waveIcon.setDepth(UI_INFO_FIELD_ICON_Z_INDEX);

        const waveText = this.make.text({
            x: 765,
            y: 40,
            text: this.gameStateStore.enemySpawner.getWaveNumber().toString(),
            style: {
                font: '25px monospace',
                color: '#ffffff',
            }
        });
        waveText.setOrigin(1, 0.5);
        waveText.setDepth(UI_INFO_FIELD_TEXT_Z_INDEX);
        this.gameStateStore.enemySpawner.waveNumberChangedCallback.push((value) => {
            waveText.setText(value.toString())
        })

        const enemyBox = this.add.graphics();
        enemyBox.fillStyle(0x222222, 0.8);
        enemyBox.fillRoundedRect(810, 25, 120, 30, 5);
        enemyBox.setDepth(UI_INFO_FIELD_BOX_Z_INDEX);

        const enemyIcon = this.add.image(0,0, 'ui', 'enemy');
        enemyIcon.setOrigin(0, 0.5);
        enemyIcon.x = 785;
        enemyIcon.y = 40;
        enemyIcon.displayHeight = 45;
        enemyIcon.setScale(enemyIcon.scaleY)
        enemyIcon.setDepth(UI_INFO_FIELD_ICON_Z_INDEX);

        const enemyText = this.make.text({
            x: 920,
            y: 40,
            text: this.gameStateStore.enemySpawner.getWaveEnemyNumber().toString(),
            style: {
                font: '25px monospace',
                color: '#ffffff',
            }
        });
        enemyText.setOrigin(1, 0.5);
        enemyText.setDepth(UI_INFO_FIELD_TEXT_Z_INDEX);
        this.gameStateStore.enemySpawner.waveEnemyNumberChangedCallback.push((value) => {
            enemyText.setText(value.toString())
        })
    }

    private createSideUI() {
        const sidePanel = this.add.image(0,0,'ui', 'panel');
        sidePanel.setRotation(Math.PI / 2);
        //rotation moves upper left corner to upper right, so correct this
        sidePanel.setOrigin(0, 1);
        sidePanel.x = 800;
        sidePanel.y = -10;
        //rotation swaps x with y
        sidePanel.displayHeight = 160;
        sidePanel.displayWidth = 740;
        sidePanel.setDepth(UI_SIDE_PANEL_Z_INDEX);

        const priceBox = this.add.graphics();
        priceBox.fillStyle(0x222222, 0.8);
        priceBox.fillRoundedRect(820, 90, 120, 30, 5);
        priceBox.setDepth(UI_INFO_FIELD_BOX_Z_INDEX);

        const priceIcon = this.add.image(0,0, 'ui', 'money');
        priceIcon.setOrigin(0, 0.5);
        priceIcon.x = 825;
        priceIcon.y = 105;
        priceIcon.displayWidth = 20;
        priceIcon.setScale(priceIcon.scaleX)
        priceIcon.setDepth(UI_INFO_FIELD_ICON_Z_INDEX);

        const priceText = this.make.text({
            x: 935,
            y: 105,
            text: "",
            style: {
                font: '25px monospace',
                color: '#ffffff',
            }
        });
        priceText.setOrigin(1, 0.5);
        priceText.setDepth(UI_INFO_FIELD_TEXT_Z_INDEX);
        this.priceText = priceText;
        this.gameStateStore.actionChangedCallbacks.push((action) => {
            const price = action.getPriceForTile();
            this.priceText.setText(this.formatPrice(price))
        })

        const separator = this.add.graphics()
        separator.lineStyle(1, 0xFFFFFF, 0.8);
        separator.moveTo(820, 165);
        separator.lineTo(940, 165);
        separator.setDepth(UI_SEPARATOR_Z_INDEX);
        separator.strokePath()

        const buttons: {
            action: IAction,
            pos: { x: number, y: number },
            image: { size: { x: number, y: number }, texture: string, frame?: string },
            box: { size: { x: number, y: number } },
            graphics?: {
                box: Phaser.GameObjects.Graphics,
                boxHover: Phaser.GameObjects.Graphics,
                boxActive: Phaser.GameObjects.Graphics,
                image: Phaser.GameObjects.Image,
                interactiveRectangle: Phaser.GameObjects.Rectangle,
            }
        }[] = [
            {
                action: new SelectAction(this.gameStateStore),
                pos: { x: 847.5, y: 145 },
                image: { size: { x: 25, y: 25 }, texture: 'ui', frame: 'select' },
                box: { size: { x: 55, y: 30 }},
            },
            {
                action: new RemoveAction(this.gameStateStore),
                pos: { x: 912.5, y: 145 },
                image: { size: { x: 25, y: 25 }, texture: 'ui', frame: 'bulldoze' },
                box: { size: { x: 55, y: 30 }},
            },
        ];

        const startPoint = new Phaser.Math.Vector2(847.5, 197.5);
        const dpos = 65;
        const boxSize = 55;
        const imageSize = 70;
        [
            {action: new PlaceTurretBulletMk1Action(this.gameStateStore), texture: 'turret-weapons', frame: 'bullet-mk1'},
            {action: new PlaceTurretBulletMk2Action(this.gameStateStore), texture: 'turret-weapons', frame: 'bullet-mk2'},
            {action: new PlaceTurretBulletMk3Action(this.gameStateStore), texture: 'turret-weapons', frame: 'bullet-mk3'},

            {action: new PlaceTurretEnergyBallBlueMk1Action(this.gameStateStore), texture: 'turret-weapons', frame: 'energy-ball-blue-mk1'},
            {action: new PlaceTurretEnergyBallBlueMk2Action(this.gameStateStore), texture: 'turret-weapons', frame: 'energy-ball-blue-mk2'},
            {action: new PlaceTurretEnergyBallBlueMk3Action(this.gameStateStore), texture: 'turret-weapons', frame: 'energy-ball-blue-mk3'},

            {action: new PlaceTurretEnergyBallOrangeMk1Action(this.gameStateStore), texture: 'turret-weapons', frame: 'energy-ball-orange-mk1'},
            {action: new PlaceTurretEnergyBallOrangeMk2Action(this.gameStateStore), texture: 'turret-weapons', frame: 'energy-ball-orange-mk2'},
            {action: new PlaceTurretEnergyBallOrangeMk3Action(this.gameStateStore), texture: 'turret-weapons', frame: 'energy-ball-orange-mk3'},

            {action: new PlaceTurretLaserMk1Action(this.gameStateStore), texture: 'turret-weapons', frame: 'laser-mk1'},
            {action: new PlaceTurretLaserMk2Action(this.gameStateStore), texture: 'turret-weapons', frame: 'laser-mk2'},
            {action: new PlaceTurretLaserMk3Action(this.gameStateStore), texture: 'turret-weapons', frame: 'laser-mk3'},

            {action: new PlaceTurretRocketMk1Action(this.gameStateStore), texture: 'turret-weapons', frame: 'rocket-mk1'},
            {action: new PlaceTurretRocketMk2Action(this.gameStateStore), texture: 'turret-weapons', frame: 'rocket-mk2'},
            {action: new PlaceTurretRocketMk3Action(this.gameStateStore), texture: 'turret-weapons', frame: 'rocket-mk3'},
        ].forEach((turretButtonDescription, i) => {
            const col = i%2;
            const row = Math.floor(i/2)

            buttons.push({
                action: turretButtonDescription.action,
                pos: { x: startPoint.x + col * dpos, y: startPoint.y + row * dpos },
                image: { size: { x: imageSize, y: imageSize }, texture: turretButtonDescription.texture, frame: turretButtonDescription.frame },
                box: { size: { x: boxSize, y: boxSize }},
            })
        })

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];

            const box = this.add.graphics();
            box.fillStyle(0x222222, 0.8);
            box.fillRoundedRect(
                button.pos.x - button.box.size.x/2,
                button.pos.y - button.box.size.y/2,
                button.box.size.x,
                button.box.size.y,
                5
            );
            box.setDepth(UI_CLICKABLE_FIELD_BOX_Z_INDEX);

            const boxBorder = this.add.graphics();
            boxBorder.lineStyle(2, 0xFFFFFF, 0.8);
            boxBorder.strokeRoundedRect(
                button.pos.x - button.box.size.x/2,
                button.pos.y - button.box.size.y/2,
                button.box.size.x,
                button.box.size.y,
                5
            );
            boxBorder.setDepth(UI_CLICKABLE_FIELD_BORDER_Z_INDEX);
            boxBorder.setVisible(false);

            const boxOverlay = this.add.graphics();
            boxOverlay.fillStyle(0xFFFFFF, 0.15);
            boxOverlay.fillRoundedRect(
                button.pos.x - button.box.size.x/2,
                button.pos.y - button.box.size.y/2,
                button.box.size.x,
                button.box.size.y,
                5
            );
            boxOverlay.setDepth(UI_CLICKABLE_FIELD_OVERLAY_Z_INDEX);
            boxOverlay.setVisible(false);

            const image = this.add.image(
                button.pos.x,
                button.pos.y,
                button.image.texture,
                button.image.frame
            )
            image.setDepth(UI_CLICKABLE_FIELD_IMAGE_Z_INDEX);
            image.setOrigin(0.5)
            image.setDisplaySize(button.image.size.x, button.image.size.y)

            const interactiveLayer = this.add.rectangle(
                button.pos.x - button.box.size.x/2,
                button.pos.y - button.box.size.y/2,
                button.box.size.x,
                button.box.size.y,
            )
            interactiveLayer.setOrigin(0)
            interactiveLayer.setDepth(UI_CLICKABLE_FIELD_LAYER_Z_INDEX)
            interactiveLayer.setInteractive({ useHandCursor: true })
            interactiveLayer.on(Phaser.Input.Events.POINTER_OVER, () => {
                button.graphics?.boxHover.setVisible(true);
            })
            interactiveLayer.on(Phaser.Input.Events.POINTER_OUT, () => {
                button.graphics?.boxHover.setVisible(false);
            })
            
            interactiveLayer.on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.gameStateStore.setAction(button.action);
            });

            button.graphics = {
                box: box,
                boxHover: boxOverlay,
                boxActive: boxBorder,
                image: image,
                interactiveRectangle: interactiveLayer,
            }

            button.graphics?.boxActive.setVisible(this.gameStateStore.getAction().actionKey === button.action.actionKey)
        }

        this.gameStateStore.actionChangedCallbacks.push((action) => {
            buttons.forEach(btn => {
                if(action.actionKey === btn.action.actionKey) {
                    btn.graphics?.boxActive.setVisible(true);
                } else {
                    btn.graphics?.boxActive.setVisible(false);
                }
            })
        })
    }

    private createUIInputHandlers() {
        const updateUI = (tile: Phaser.Tilemaps.Tile) => {
            const action = this.gameStateStore.getAction();
            action.onTileHover(tile);

            const price = action.getPriceForTile(tile);
            this.priceText.setText(this.formatPrice(price));

            if (tile != null) {
                const color = action.getSelectorColorForTile(tile);
                this.tileSelector.fillColor = color;
                this.tileSelector.strokeColor = color;

                // Snap to tile coordinates, but in world space
                this.tileSelector.x = tile.getCenterX();
                this.tileSelector.y = tile.getCenterY();
                this.tileSelector.setVisible(true);
            } else {
                this.tileSelector.setVisible(false);
            }
        };

        let prevTile: Phaser.Tilemaps.Tile;
        this.gameStateStore.tileChangedCallbacks.push(() => {
            if (prevTile != null)
                updateUI(prevTile);
        });
        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: { x: number; y: number; }) => {
            const worldPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);

            const tile = this.tileMap.getTileAtWorldXY(worldPoint.x, worldPoint.y);
            if (prevTile != tile) {
                prevTile = tile;
                updateUI(tile);
            }
        });

        this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: { x: number; y: number; }) => {
            const worldPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);
            const tile = this.tileMap.getTileAtWorldXY(worldPoint.x, worldPoint.y);

            if (tile != null) {
                const action = this.gameStateStore.getAction();
                action.onTileClick(tile);
            }
        });
    }

    private formatPrice(price: number) {
        return (price < 0 ? '+' : '-') + Math.abs(price).toString()
    }
}
