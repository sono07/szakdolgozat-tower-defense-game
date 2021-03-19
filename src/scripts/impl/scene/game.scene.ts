import { BaseScene } from './_abstract/base.scene.abstract';
import { GameStateStore } from '../game-state-store/game-state.store.class';

export const GAME_SCENE_KEY = "Game";
export class GameScene extends BaseScene {
    path!: Phaser.Curves.Path;
    private gameStateStore!: GameStateStore;
    private nextEnemy!: number;
    map!: number[][];
    i = 0;

    constructor() {
        super(GAME_SCENE_KEY);
    }

    init(data: {seed: string}): void {
        this.map = [
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]
        ];
    }

    preload(): void {
    }

    create(data: object): void {
        let graphics = this.add.graphics();
        this.drawLines(graphics);

        this.path = this.add.path(96, -32);
        this.path.lineTo(96, 164);
        this.path.lineTo(480, 164);
        this.path.lineTo(480, 544);

        graphics.lineStyle(2, 0xffffff, 1);
        this.path.draw(graphics);

        this.gameStateStore = new GameStateStore(this);

        this.nextEnemy = 0;

        this.input.on('pointerdown', this.placeTurret, this);
    }

    update(time: number, delta: number): void {
        if (time > this.nextEnemy) {
            const enemy = this.gameStateStore.enemiesGroup.get();
            if (enemy) {
                enemy.init(100, 150, this.path, this.gameStateStore)
                enemy.id = this.i++;

                this.nextEnemy = time + 1000;
            }
        }
    }

    drawLines(graphics: Phaser.GameObjects.Graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for (let i = 0; i < 8; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(640, i * 64);
        }
        for (let j = 0; j < 10; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, 512);
        }
        graphics.strokePath();
    }

    turretIndex: number = 0;

    placeTurret(pointer: any /*TODO type */) {
        const i = Math.floor(pointer.y / 64);
        const j = Math.floor(pointer.x / 64);
        if (this.canPlaceTurret(i, j)) {
            const turret = this.gameStateStore.turretRocketMk3sGroup.get();
            if (turret) {
                const pos = new Phaser.Math.Vector2(
                    j * 64 + 64 / 2,
                    i * 64 + 64 / 2,
                );
                turret.init(pos, this.gameStateStore);
                this.map[i][j] = 1;
            }
        }
    }

    canPlaceTurret(i: number, j: number) {
        return this.map[i][j] === 0;
    }
}
