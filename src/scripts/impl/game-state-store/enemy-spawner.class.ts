import { IGroup } from "../../api/group/group.interface";
import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { GameStateStore } from "./game-state.store.class";

const WAVE_START_DELAY_MS = 5000;
const SPAWN_DELAY_MS = 1000;
const EXTRA_HEALTH_PER_WAVE = 10;
const ENEMY_BASE_HEALTH = 100;
const ENEMY_BASE_SPEED = 75;

export type EnemyDescription = {
    group: IGroup<Phaser.GameObjects.Sprite & IEnemy>,
    health: number,
    speed: number,
}

export class EnemySpawner {
    private gameStateStore: GameStateStore;
    private path: Phaser.Curves.Path;

    private waveNumber: number = 0;
    private nextWaveTime: number = 0;
    private isWaveRunning: boolean = false;

    private enemyDescriptions: EnemyDescription[] = []
    private nextEnemyIndex: number = 0;
    private nextEnemyTime: number = 0;

    private spawnedEnemies: (Phaser.GameObjects.Sprite & IEnemy)[] = [];

    public waveNumberChangedCallback: ((waveNumber: number) => void)[] = [];
    public waveEnemyNumberChangedCallback: ((enemyNumber: number) => void)[] = [];

    constructor(gameStateStore: GameStateStore) {
        this.gameStateStore = gameStateStore;
        this.path = gameStateStore.path;
    }

    getWaveNumber(): number {
        return this.waveNumber;
    }

    getWaveEnemyNumber(): number {
        return this.enemyDescriptions.length;
    }

    startNewWave(time: number) {
        this.enemyDescriptions = this.enemyDescriptions.map(e => {
            e.health += EXTRA_HEALTH_PER_WAVE;
            return e;
        })

        this.enemyDescriptions.unshift({
            group: this.gameStateStore.enemiesGroup as any,
            health: ENEMY_BASE_HEALTH,
            speed: ENEMY_BASE_SPEED,
        },
        {
            group: this.gameStateStore.enemiesGroup as any,
            health: ENEMY_BASE_HEALTH,
            speed: ENEMY_BASE_SPEED,
        })
        this.waveEnemyNumberChangedCallback.forEach(cb => {
            cb(this.getWaveEnemyNumber())
        })

        this.waveNumber++;
        this.waveNumberChangedCallback.forEach(cb => {
            cb(this.getWaveNumber());
        })

        this.nextEnemyIndex = 0;
        this.nextWaveTime = time + WAVE_START_DELAY_MS;
        this.nextEnemyTime = this.nextWaveTime;

        this.isWaveRunning = true;
    }
    
    processWave(time: number) {
        if(time > this.nextWaveTime) {
            if(this.nextEnemyIndex < this.enemyDescriptions.length) {
                if(time > this.nextEnemyTime) {
                    const enemyDescription = this.enemyDescriptions[this.nextEnemyIndex];

                    const enemy = enemyDescription.group.get();
                    if (enemy) {
                        enemy.init(enemyDescription.health, enemyDescription.speed, this.path, this.gameStateStore)
                        this.nextEnemyTime = time + SPAWN_DELAY_MS;
                        this.nextEnemyIndex++;

                        this.spawnedEnemies.push(enemy);
                    }
                }
            } else {
                if(this.spawnedEnemies.every(se => se.active == false && se.visible == false)) {
                    this.spawnedEnemies = [];
                    this.isWaveRunning = false;
                }
            }
        }
    }
    
    update(time: number, delta: number) {
        if(this.isWaveRunning == false) {
            this.startNewWave(time);
        } else {
            this.processWave(time);
        }
    }
}