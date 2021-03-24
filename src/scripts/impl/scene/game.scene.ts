import { BaseScene } from './_abstract/base.scene.abstract';
import { GameStateStore } from '../game-state-store/game-state.store.class';
import { generateMap, Tuple } from '../map/generate-map';
import { ROTATION_DIVISOR } from '../utils/constants';
import { MAP_TILES_COL_COUNT, MAP_TILES_ROW_COUNT } from '../utils/config.constants';
import { IAction, PlaceTurretBulletMk1Action, PlaceTurretBulletMk2Action, PlaceTurretBulletMk3Action, PlaceTurretEnergyBallBlueMk1Action, PlaceTurretEnergyBallBlueMk2Action, PlaceTurretEnergyBallBlueMk3Action, PlaceTurretEnergyBallOrangeMk1Action, PlaceTurretEnergyBallOrangeMk2Action, PlaceTurretEnergyBallOrangeMk3Action, PlaceTurretLaserMk1Action, PlaceTurretLaserMk2Action, PlaceTurretLaserMk3Action, PlaceTurretRocketMk1Action, PlaceTurretRocketMk2Action, PlaceTurretRocketMk3Action, RemoveAction, SelectAction } from '../action/action.interface';

export type WindowSizes = {
    width: number,
    height: number,
    tileWidth: number,
    tileHeight: number,
}

export const GAME_SCENE_KEY = "Game";
export class GameScene extends BaseScene {
    private gameStateStore!: GameStateStore;
    private nextEnemy!: number;
    
    private tileMap!: Phaser.Tilemaps.Tilemap;
    private tileMapLayer!: Phaser.Tilemaps.TilemapLayer;
    private tileSelector!: Phaser.GameObjects.Rectangle;
    private priceText!: Phaser.GameObjects.Text;
    private path!: Phaser.Curves.Path;

    constructor() {
        super(GAME_SCENE_KEY);
    }

    init(data: object): void {   
    }

    preload(): void {
    }

    create(data: {seed: string}): void {
        const {map, path} = generateMap(data.seed, MAP_TILES_ROW_COUNT, MAP_TILES_COL_COUNT)
        this.gameStateStore = new GameStateStore(this, map);
        
        const windowSizes = this.createWindowSizes();
        
        this.createMapTiles(this.gameStateStore.getMapDataForTileMap(), windowSizes);
        this.createPath(path, windowSizes);
        this.createMapTileSelector(windowSizes);
        this.createMapGrid(windowSizes);
        this.createTopUI();
        this.createSideUI();
        this.createUIInputHandlers();

        this.nextEnemy = 0;
    }   

    update(time: number, delta: number): void {
        // TODO
        if (time > this.nextEnemy) {
            const enemy = this.gameStateStore.enemiesGroup.get();
            if (enemy) {
                enemy.init(100, 150, this.path, this.gameStateStore)
                this.nextEnemy = time + 1000 +1000000;
            }
        }
    }

    private createWindowSizes(): WindowSizes {
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

    private createPath(path: Tuple<number, 2>[], windowSizes: WindowSizes) {
        const { tileWidth, tileHeight } = windowSizes;

        path.unshift([0, -1]);
        path.push([MAP_TILES_COL_COUNT - 1, MAP_TILES_ROW_COUNT]);
        path = path.map(point => {
            return [(point[0] + 0.5) * tileWidth, (point[1] + 0.5) * tileHeight + 80]
        })
        
        this.path = this.add.path(...path[0]);
        for (let i = 1; i < path.length; i++) {
            this.path.lineTo(...path[i]);
        }
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
        this.tileSelector.setDepth(10);
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
        topPanel.setDepth(100);

        const healthBox = this.add.graphics();
        healthBox.fillStyle(0x222222, 0.8);
        healthBox.fillRoundedRect(45, 25, 155, 30, 5);
        healthBox.setDepth(101);

        const healthIcon = this.add.image(0,0, 'ui', 'hearth');
        healthIcon.setOrigin(0, 0.5);
        healthIcon.x = 20;
        healthIcon.y = 40;
        healthIcon.displayHeight = 45;
        healthIcon.setScale(healthIcon.scaleY)
        healthIcon.setDepth(102);

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
        healthText.setDepth(103);
        this.gameStateStore.healtChangedCallbacks.push((value) => {
            healthText.setText(value.toString())
        })

        const moneyBox = this.add.graphics();
        moneyBox.fillStyle(0x222222, 0.8);
        moneyBox.fillRoundedRect(245, 25, 155, 30, 5);
        moneyBox.setDepth(101);

        const moneyIcon = this.add.image(0,0, 'ui', 'money');
        moneyIcon.setOrigin(0, 0.5);
        moneyIcon.x = 220;
        moneyIcon.y = 40;
        moneyIcon.displayHeight = 45;
        moneyIcon.setScale(moneyIcon.scaleY)
        moneyIcon.setDepth(102);

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
        moneyText.setDepth(103);
        this.gameStateStore.moneyChangedCallbacks.push((value) => {
            moneyText.setText(value.toString())
        })

        const scoreBox = this.add.graphics();
        scoreBox.fillStyle(0x222222, 0.8);
        scoreBox.fillRoundedRect(445, 25, 155, 30, 5);
        scoreBox.setDepth(101);

        const scoreIcon = this.add.image(0,0, 'ui', 'score');
        scoreIcon.setOrigin(0, 0.5);
        scoreIcon.x = 420;
        scoreIcon.y = 40;
        scoreIcon.displayHeight = 45;
        scoreIcon.setScale(scoreIcon.scaleY)
        scoreIcon.setDepth(102);

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
        scoreText.setDepth(103);
        this.gameStateStore.scoreChangedCallbacks.push((value) => {
            scoreText.setText(value.toString())
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
        sidePanel.setDepth(99);

        const priceBox = this.add.graphics();
        priceBox.fillStyle(0x222222, 0.8);
        priceBox.fillRoundedRect(820, 90, 120, 30, 5);
        priceBox.setDepth(101);

        const priceIcon = this.add.image(0,0, 'ui', 'money');
        priceIcon.setOrigin(0, 0.5);
        priceIcon.x = 825;
        priceIcon.y = 105;
        priceIcon.displayWidth = 20;
        priceIcon.setScale(priceIcon.scaleX)
        priceIcon.setDepth(102);

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
        priceText.setDepth(103);
        this.priceText = priceText;
        this.gameStateStore.actionChangedCallbacks.push((action) => {
            const price = action.getPriceForTile();
            this.priceText.setText(this.formatPrice(price))
        })

        const separator = this.add.graphics()
        separator.lineStyle(1, 0xFFFFFF, 0.8);
        separator.moveTo(820, 165);
        separator.lineTo(940, 165);
        separator.setDepth(101);
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
            box.setDepth(101);

            const boxBorder = this.add.graphics();
            boxBorder.lineStyle(2, 0xFFFFFF, 0.8);
            boxBorder.strokeRoundedRect(
                button.pos.x - button.box.size.x/2,
                button.pos.y - button.box.size.y/2,
                button.box.size.x,
                button.box.size.y,
                5
            );
            boxBorder.setDepth(102);
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
            boxOverlay.setDepth(103);
            boxOverlay.setVisible(false);

            const image = this.add.image(
                button.pos.x,
                button.pos.y,
                button.image.texture,
                button.image.frame
            )
            image.setDepth(104);
            image.setOrigin(0.5)
            image.setDisplaySize(button.image.size.x, button.image.size.y)

            const interactiveLayer = this.add.rectangle(
                button.pos.x - button.box.size.x/2,
                button.pos.y - button.box.size.y/2,
                button.box.size.x,
                button.box.size.y,
            )
            interactiveLayer.setOrigin(0)
            interactiveLayer.setDepth(110)
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
