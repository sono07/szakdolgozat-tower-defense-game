import { EnemyGroup } from "../group/enemy.group.class";
import { BulletGroup } from "../group/projectiles/bullet.group.class";
import { EnergyBallBlueGroup } from "../group/projectiles/energy-ball-blue.group.class";
import { EnergyBallOrangeGroup } from "../group/projectiles/energy-ball-orange.group.class";
import { LaserGroup } from "../group/projectiles/laser.group.class";
import { RocketGroup } from "../group/projectiles/rocket.group.class";
import { TurretBulletMk1Group } from "../group/turret/turret-bullet-mk1.group.class";
import { TurretBulletMk2Group } from "../group/turret/turret-bullet-mk2.group.class";
import { TurretBulletMk3Group } from "../group/turret/turret-bullet-mk3.group.class";
import { TurretRocketMk1Group } from "../group/turret/turret-rocket-mk1.group.class";
import { TurretRocketMk2Group } from "../group/turret/turret-rocket-mk2.group.class";
import { TurretRocketMk3Group } from "../group/turret/turret-rocket-mk3.group.class";
import { TurretEnergyBallBlueMk1Group } from "../group/turret/turret-energy-ball-blue-mk1.group.class";
import { TurretEnergyBallBlueMk2Group } from "../group/turret/turret-energy-ball-blue-mk2.group.class";
import { TurretEnergyBallBlueMk3Group } from "../group/turret/turret-energy-ball-blue-mk3.group.class";
import { TurretEnergyBallOrangeMk1Group } from "../group/turret/turret-energy-ball-orange-mk1.group.class";
import { TurretEnergyBallOrangeMk2Group } from "../group/turret/turret-energy-ball-orange-mk2.group.class";
import { TurretEnergyBallOrangeMk3Group } from "../group/turret/turret-energy-ball-orange-mk3.group.class";
import { TurretLaserMk1Group } from "../group/turret/turret-laser-mk1.group.class";
import { TurretLaserMk2Group } from "../group/turret/turret-laser-mk2.group.class";
import { TurretLaserMk3Group } from "../group/turret/turret-laser-mk3.group.class";
import { GAME_OVER_SCENE_KEY } from "../scene/game-over.scene";
import { TILE_CRATERS, TILE_EMPTY, TILE_ROAD_2WAY_CORNER, TILE_ROAD_2WAY_STRAIGHT, TILE_ROAD_3WAY, TILE_ROAD_4WAY, TILE_TREES } from "../utils/constants";
import { IAction, SelectAction } from "../action/action.interface";
import { ITurretGroup } from "../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../api/object/turret-object/turret-object.interface";
import { STARTING_HEALTH, STARTING_MONEY } from "../utils/config.constants";

export class GameStateStore {
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

    public enemiesGroup: EnemyGroup;

    public turretBulletMk1sGroup: TurretBulletMk1Group;
    public turretBulletMk2sGroup: TurretBulletMk2Group;
    public turretBulletMk3sGroup: TurretBulletMk3Group;
    public turretRocketMk1sGroup: TurretRocketMk1Group;
    public turretRocketMk2sGroup: TurretRocketMk2Group;
    public turretRocketMk3sGroup: TurretRocketMk3Group;
    public turretEnergyBallBlueMk1sGroup: TurretEnergyBallBlueMk1Group;
    public turretEnergyBallBlueMk2sGroup: TurretEnergyBallBlueMk2Group;
    public turretEnergyBallBlueMk3sGroup: TurretEnergyBallBlueMk3Group;
    public turretEnergyBallOrangeMk1sGroup: TurretEnergyBallOrangeMk1Group;
    public turretEnergyBallOrangeMk2sGroup: TurretEnergyBallOrangeMk2Group;
    public turretEnergyBallOrangeMk3sGroup: TurretEnergyBallOrangeMk3Group;
    public turretLaserMk1sGroup: TurretLaserMk1Group;
    public turretLaserMk2sGroup: TurretLaserMk2Group;
    public turretLaserMk3sGroup: TurretLaserMk3Group;

    public bulletsGroup: BulletGroup;
    public lasersGroup: LaserGroup;
    public energyBallBluesGroup: EnergyBallBlueGroup;
    public energyBallOrangesGroup: EnergyBallOrangeGroup;
    public rocketsGroup: RocketGroup;

    constructor(scene: Phaser.Scene, map: number[][]) {
        this.scene = scene;
        this.map = map;

        this.health = STARTING_HEALTH;
        this.score = 0;
        this.money = STARTING_MONEY;

        this.enemiesGroup = new EnemyGroup(this.scene);

        this.turretBulletMk1sGroup = new TurretBulletMk1Group(this.scene);
        this.turretBulletMk2sGroup = new TurretBulletMk2Group(this.scene);
        this.turretBulletMk3sGroup = new TurretBulletMk3Group(this.scene);
        this.turretRocketMk1sGroup = new TurretRocketMk1Group(this.scene);
        this.turretRocketMk2sGroup = new TurretRocketMk2Group(this.scene);
        this.turretRocketMk3sGroup = new TurretRocketMk3Group(this.scene);
        this.turretEnergyBallBlueMk1sGroup = new TurretEnergyBallBlueMk1Group(this.scene);
        this.turretEnergyBallBlueMk2sGroup = new TurretEnergyBallBlueMk2Group(this.scene);
        this.turretEnergyBallBlueMk3sGroup = new TurretEnergyBallBlueMk3Group(this.scene);
        this.turretEnergyBallOrangeMk1sGroup = new TurretEnergyBallOrangeMk1Group(this.scene);
        this.turretEnergyBallOrangeMk2sGroup = new TurretEnergyBallOrangeMk2Group(this.scene);
        this.turretEnergyBallOrangeMk3sGroup = new TurretEnergyBallOrangeMk3Group(this.scene);
        this.turretLaserMk1sGroup = new TurretLaserMk1Group(this.scene);
        this.turretLaserMk2sGroup = new TurretLaserMk2Group(this.scene);
        this.turretLaserMk3sGroup = new TurretLaserMk3Group(this.scene);

        this.bulletsGroup = new BulletGroup(this.scene);
        this.lasersGroup = new LaserGroup(this.scene);
        this.energyBallBluesGroup = new EnergyBallBlueGroup(this.scene);
        this.energyBallOrangesGroup = new EnergyBallOrangeGroup(this.scene);
        this.rocketsGroup = new RocketGroup(this.scene);
    }

    getAllTurretGroups(): ITurretGroup<Phaser.GameObjects.Sprite & ITurretObject>[] {
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

    getAction() {
        return this.action;
    }

    setAction(value: IAction) {
        this.action = value;

        this.actionChangedCallbacks.forEach(cb => {
            cb(this.action);
        })
    }

    getMap() {
        return this.map;
    }

    getMapDataForTileMap() {
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

    setTile(i: number, j: number, value: number) {
        this.map[i][j] = value;
    
        this.tileChangedCallbacks.forEach(cb => {
            cb(i, j, this.getMap()[i][j])
        })

        this.tileForTileMapChangedCallbacks.forEach(cb => {
            cb(i, j, this.getMapDataForTileMap()[i][j])
        })
    }

    getHealth(): number {
        return this.health;
    }

    setHealth(value: number) {
        this.health = value;

        this.healtChangedCallbacks.forEach(cb => {
            cb(value)
        })
    }

    getScore(): number {
        return this.score;
    }

    setScore(value: number) {
        this.score = value;

        this.scoreChangedCallbacks.forEach(cb => {
            cb(value);
        })
    }

    getMoney(): number {
        return this.money;
    }

    setMoney(value: number) {
        this.money = value;

        this.moneyChangedCallbacks.forEach(cb => {
            cb(value)
        })
    }

    receiveMoney(value: number): void {
        this.setScore(this.score + value);
        this.setMoney(this.money + value);
    }

    spendMoney(value: number): void {
        this.setMoney(this.money - value);
    }

    receiveDamage(value: number): void {
        this.setHealth(this.health - value);

        if (this.health <= 0) {
            this.scene.scene.start(GAME_OVER_SCENE_KEY, { score: this.score });
        }
    }
}
