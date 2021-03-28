import { IAction } from "../action/action.interface"
import { IGroup } from "../group/group.interface"
import { ITurretGroup } from "../group/turret-group/turret-group.interface"
import { IEnemySpawner } from "../map/enemy-spawner.interface"
import { IEnemy } from "../object/enemy-object/enemy.interface"
import { IAOEMovingProjectile } from "../object/projectile-object/aoe-moving-projectile.interface"
import { IPenetratingMovingProjectile } from "../object/projectile-object/penetrating-moving-projectile.interface"
import { IProjectile } from "../object/projectile-object/projectile.interface"
import { ITurretObject } from "../object/turret-object/turret-object.interface"

export interface IGameStateStore {
    tileChangedCallbacks: ((i: number, j: number, value: number) => void)[];
    tileForTileMapChangedCallbacks: ((i: number, j: number, value: number) => void)[];

    actionChangedCallbacks: ((value: IAction) => void)[];

    healtChangedCallbacks: ((value: number) => void)[];
    scoreChangedCallbacks: ((value: number) => void)[];
    moneyChangedCallbacks: ((value: number) => void)[];

    path: Phaser.Curves.Path;
    
    enemySpawner: IEnemySpawner;

    enemiesGroup: IGroup<Phaser.GameObjects.GameObject & IEnemy>;

    turretBulletMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretBulletMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretBulletMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretRocketMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretRocketMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretRocketMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretEnergyBallBlueMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretEnergyBallBlueMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretEnergyBallBlueMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretEnergyBallOrangeMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretEnergyBallOrangeMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretEnergyBallOrangeMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretLaserMk1sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretLaserMk2sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;
    turretLaserMk3sGroup: ITurretGroup<Phaser.GameObjects.GameObject & ITurretObject>;

    bulletsGroup: IGroup<Phaser.GameObjects.GameObject & IPenetratingMovingProjectile>;
    lasersGroup: IGroup<Phaser.GameObjects.GameObject & IProjectile>;
    energyBallBluesGroup: IGroup<Phaser.GameObjects.GameObject & IPenetratingMovingProjectile>;
    energyBallOrangesGroup: IGroup<Phaser.GameObjects.GameObject & IPenetratingMovingProjectile>;
    rocketsGroup: IGroup<Phaser.GameObjects.GameObject & IAOEMovingProjectile>;

    getAllTurretGroups(): ITurretGroup<Phaser.GameObjects.Sprite & ITurretObject>[];
    getAction(): IAction;
    setAction(value: IAction): void;
    getMap(): number[][];
    getMapDataForTileMap(): number[][];
    setTile(i: number, j: number, value: number): void;
    getHealth(): number;
    setHealth(value: number): void;
    getScore(): number;
    setScore(value: number) : void;
    getMoney(): number;
    setMoney(value: number): void;
    receiveMoney(value: number): void;
    spendMoney(value: number): void;
    receiveDamage(value: number): void;
    updateSpawner(time: number, delta: number): void;
}