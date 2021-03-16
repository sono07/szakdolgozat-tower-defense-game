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

export class ObjectStore {
    private scene: Phaser.Scene;

    private health: number;

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

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.health = 3;

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

    receiveDamage(value: number): void {
        this.health -= value;
        if(this.health <= 0) {
            //TODO score
            this.scene.scene.start(GAME_OVER_SCENE_KEY, {score: 111});
        }
    }
}