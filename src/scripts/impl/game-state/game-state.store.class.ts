import { IAction } from "../../api/action/action.interface";
import { IGameStateStore } from "../../api/game-state/game-state-store.interface";
import { IGroup } from "../../api/group/group.interface";
import { ITurretGroup } from "../../api/group/turret-group/turret-group.interface";
import { IEnemySpawner } from "../../api/map/enemy-spawner.interface";
import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { IAOEMovingProjectile } from "../../api/object/projectile-object/aoe-moving-projectile.interface";
import { IPenetratingMovingProjectile } from "../../api/object/projectile-object/penetrating-moving-projectile.interface";
import { IProjectile } from "../../api/object/projectile-object/projectile.interface";
import { ITurretObject } from "../../api/object/turret-object/turret-object.interface";
import { SelectAction } from "../action/select-action.class";
import { EnemyGroup } from "../group/enemy.group.class";
import { BulletGroup } from "../group/projectiles/bullet.group.class";
import { EnergyBallBlueGroup } from "../group/projectiles/energy-ball-blue.group.class";
import { EnergyBallOrangeGroup } from "../group/projectiles/energy-ball-orange.group.class";
import { LaserGroup } from "../group/projectiles/laser.group.class";
import { RocketGroup } from "../group/projectiles/rocket.group.class";
import { TurretBulletMk1Group } from "../group/turret/turret-bullet-mk1.group.class";
import { TurretBulletMk2Group } from "../group/turret/turret-bullet-mk2.group.class";
import { TurretBulletMk3Group } from "../group/turret/turret-bullet-mk3.group.class";
import { TurretEnergyBallBlueMk1Group } from "../group/turret/turret-energy-ball-blue-mk1.group.class";
import { TurretEnergyBallBlueMk2Group } from "../group/turret/turret-energy-ball-blue-mk2.group.class";
import { TurretEnergyBallBlueMk3Group } from "../group/turret/turret-energy-ball-blue-mk3.group.class";
import { TurretEnergyBallOrangeMk1Group } from "../group/turret/turret-energy-ball-orange-mk1.group.class";
import { TurretEnergyBallOrangeMk2Group } from "../group/turret/turret-energy-ball-orange-mk2.group.class";
import { TurretEnergyBallOrangeMk3Group } from "../group/turret/turret-energy-ball-orange-mk3.group.class";
import { TurretLaserMk1Group } from "../group/turret/turret-laser-mk1.group.class";
import { TurretLaserMk2Group } from "../group/turret/turret-laser-mk2.group.class";
import { TurretLaserMk3Group } from "../group/turret/turret-laser-mk3.group.class";
import { TurretRocketMk1Group } from "../group/turret/turret-rocket-mk1.group.class";
import { TurretRocketMk2Group } from "../group/turret/turret-rocket-mk2.group.class";
import { TurretRocketMk3Group } from "../group/turret/turret-rocket-mk3.group.class";
import { EnemySpawner } from "../map/enemy-spawner.class";
import { GAME_OVER_SCENE_KEY } from "../scene/game-over.scene";
import { STARTING_HEALTH, STARTING_MONEY } from "../utils/config.constants";
import { TILE_CRATERS, TILE_EMPTY, TILE_ROAD_2WAY_CORNER, TILE_ROAD_2WAY_STRAIGHT, TILE_ROAD_3WAY, TILE_ROAD_4WAY, TILE_TREES } from "../utils/constants";

export class GameStateStore implements IGameStateStore {
    private scene: Phaser.Scene;

    private map: number[][];
    public tileChangedCallbacks: ((i: number, j: number, value: number) => void)[] = [];
    public tileForTileMapChangedCallbacks: ((i: number, j: number, value: number) => void)[] = [];

    private action: IAction = new SelectAction(this);
    public actionChangedCallbacks: ((value: IAction) => void)[] = [];

    private health: number;
    public healtChangedCallbacks: ((value: number) => void)[] = [];
    private score: number;
    public scoreChangedCallbacks: ((value: number) => void)[] = [];
    private money: number;
    public moneyChangedCallbacks: ((value: number) => void)[] = [];

    public path: Phaser.Curves.Path;
    
    public enemySpawner: IEnemySpawner;

    public enemiesGroup: IGroup<Phaser.GameObjects.GameObject & IEnemy>;

    public turretBulletMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretBulletMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretBulletMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretRocketMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretRocketMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretRocketMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretEnergyBallBlueMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretEnergyBallBlueMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretEnergyBallBlueMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretEnergyBallOrangeMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretEnergyBallOrangeMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretEnergyBallOrangeMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretLaserMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretLaserMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    public turretLaserMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;

    public bulletsGroup: IGroup<Phaser.GameObjects.GameObject & IPenetratingMovingProjectile>;
    public lasersGroup: IGroup<Phaser.GameObjects.GameObject & IProjectile>;
    public energyBallBluesGroup: IGroup<Phaser.GameObjects.GameObject & IPenetratingMovingProjectile>;
    public energyBallOrangesGroup: IGroup<Phaser.GameObjects.GameObject & IPenetratingMovingProjectile>;
    public rocketsGroup: IGroup<Phaser.GameObjects.GameObject & IAOEMovingProjectile>;

    constructor(scene: Phaser.Scene, map: number[][], path: Phaser.Curves.Path) {
        this.scene = scene;
        this.map = map;
        this.path = path;

        this.health = STARTING_HEALTH;
        this.score = 0;
        this.money = STARTING_MONEY;

        this.enemiesGroup = new EnemyGroup(this.scene) as any;

        this.enemySpawner = new EnemySpawner(this);

        this.turretBulletMk1sGroup = new TurretBulletMk1Group(this.scene) as any;
        this.turretBulletMk2sGroup = new TurretBulletMk2Group(this.scene) as any;
        this.turretBulletMk3sGroup = new TurretBulletMk3Group(this.scene) as any;
        this.turretRocketMk1sGroup = new TurretRocketMk1Group(this.scene) as any;
        this.turretRocketMk2sGroup = new TurretRocketMk2Group(this.scene) as any;
        this.turretRocketMk3sGroup = new TurretRocketMk3Group(this.scene) as any;
        this.turretEnergyBallBlueMk1sGroup = new TurretEnergyBallBlueMk1Group(this.scene) as any;
        this.turretEnergyBallBlueMk2sGroup = new TurretEnergyBallBlueMk2Group(this.scene) as any;
        this.turretEnergyBallBlueMk3sGroup = new TurretEnergyBallBlueMk3Group(this.scene) as any;
        this.turretEnergyBallOrangeMk1sGroup = new TurretEnergyBallOrangeMk1Group(this.scene) as any;
        this.turretEnergyBallOrangeMk2sGroup = new TurretEnergyBallOrangeMk2Group(this.scene) as any;
        this.turretEnergyBallOrangeMk3sGroup = new TurretEnergyBallOrangeMk3Group(this.scene) as any;
        this.turretLaserMk1sGroup = new TurretLaserMk1Group(this.scene) as any;
        this.turretLaserMk2sGroup = new TurretLaserMk2Group(this.scene) as any;
        this.turretLaserMk3sGroup = new TurretLaserMk3Group(this.scene) as any;

        this.bulletsGroup = new BulletGroup(this.scene) as any;
        this.lasersGroup = new LaserGroup(this.scene) as any;
        this.energyBallBluesGroup = new EnergyBallBlueGroup(this.scene) as any;
        this.energyBallOrangesGroup = new EnergyBallOrangeGroup(this.scene) as any;
        this.rocketsGroup = new RocketGroup(this.scene) as any;
    }

    public getAllTurretGroups(): ITurretGroup<Phaser.GameObjects.Sprite & ITurretObject>[] {
        return [
            this.turretBulletMk1sGroup,
            this.turretBulletMk2sGroup,
            this.turretBulletMk3sGroup,

            this.turretEnergyBallBlueMk1sGroup,
            this.turretEnergyBallBlueMk2sGroup,
            this.turretEnergyBallBlueMk3sGroup,

            this.turretEnergyBallOrangeMk1sGroup,
            this.turretEnergyBallOrangeMk2sGroup,
            this.turretEnergyBallOrangeMk3sGroup,

            this.turretLaserMk1sGroup,
            this.turretLaserMk2sGroup,
            this.turretLaserMk3sGroup,

            this.turretRocketMk1sGroup,
            this.turretRocketMk2sGroup,
            this.turretRocketMk3sGroup,
        ] as any[];
    }

    public getAction() {
        return this.action;
    }

    public setAction(value: IAction) {
        this.action = value;

        this.actionChangedCallbacks.forEach(cb => {
            cb(this.action);
        })
    }

    public getMap() {
        return this.map;
    }

    public getMapDataForTileMap() {
        return this.map.map(row => row.map(cell => {
            switch(Math.floor(cell)) {
                case TILE_CRATERS:
                case TILE_TREES:
                case TILE_ROAD_2WAY_STRAIGHT:
                case TILE_ROAD_2WAY_CORNER:
                case TILE_ROAD_3WAY:
                case TILE_ROAD_4WAY:
                    return cell;
                default:
                    return TILE_EMPTY;
            }
        }))
    }

    public setTile(i: number, j: number, value: number) {
        this.map[i][j] = value;
    
        this.tileChangedCallbacks.forEach(cb => {
            cb(i, j, this.getMap()[i][j])
        })

        this.tileForTileMapChangedCallbacks.forEach(cb => {
            cb(i, j, this.getMapDataForTileMap()[i][j])
        })
    }

    public getHealth(): number {
        return this.health;
    }

    private setHealth(value: number) {
        this.health = value;

        this.healtChangedCallbacks.forEach(cb => {
            cb(value)
        })
    }

    public getScore(): number {
        return this.score;
    }

    private setScore(value: number) {
        this.score = value;

        this.scoreChangedCallbacks.forEach(cb => {
            cb(value);
        })
    }

    public getMoney(): number {
        return this.money;
    }

    private setMoney(value: number) {
        this.money = value;

        this.moneyChangedCallbacks.forEach(cb => {
            cb(value)
        })
    }

    public receiveMoney(value: number): void {
        this.setScore(this.score + value);
        this.setMoney(this.money + value);
    }

    public spendMoney(value: number): void {
        this.setMoney(this.money - value);
    }

    public receiveDamage(value: number): void {
        this.setHealth(this.health - value);

        if (this.health <= 0) {
            this.scene.scene.start(GAME_OVER_SCENE_KEY, { score: this.score });
        }
    }

    public updateSpawner(time: number, delta: number) {
        this.enemySpawner.update(time, delta);
    }
}
