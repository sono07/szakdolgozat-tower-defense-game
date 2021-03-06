import { Phaser } from '../../../api/__helper__/phaser.export';
import { ENEMY_HEALTH_BAR_BACKGROUND_INDICATOR_Z_INDEX, ENEMY_HEALTH_BAR_BOX_Z_INDEX, ENEMY_HEALTH_BAR_FOREGROUND_INDICATOR_Z_INDEX } from "../../game-constants";

export class HealthBarObject {
    private scene: Phaser.Scene;
    private healthBarBox: Phaser.GameObjects.Rectangle;
    private healthBarBackground: Phaser.GameObjects.Rectangle;
    private healthBarIndicator: Phaser.GameObjects.Rectangle;

    private position!: Phaser.Math.Vector2;
    private width!: number;
    private height!: number;
    private padding!: number;
    private maxValue!: number;
    private currentValue!: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.healthBarBox = this.scene.add.rectangle();
        this.healthBarBox.setDepth(ENEMY_HEALTH_BAR_BOX_Z_INDEX)
        this.healthBarBox.setFillStyle(0x222222, 1)
        this.healthBarBox.setOrigin(0.5, 0.5)
        this.healthBarBox.setActive(false);
        this.healthBarBox.setVisible(false);

        this.healthBarBackground = this.scene.add.rectangle();
        this.healthBarBackground.setDepth(ENEMY_HEALTH_BAR_BACKGROUND_INDICATOR_Z_INDEX)
        this.healthBarBackground.setFillStyle(0xFF0000, 1)
        this.healthBarBackground.setOrigin(0.5, 0.5)
        this.healthBarBackground.setActive(false);
        this.healthBarBackground.setVisible(false);

        this.healthBarIndicator = this.scene.add.rectangle();
        this.healthBarIndicator.setDepth(ENEMY_HEALTH_BAR_FOREGROUND_INDICATOR_Z_INDEX)
        this.healthBarIndicator.setFillStyle(0x00FF00, 1)
        this.healthBarIndicator.setOrigin(0, 0.5)
        this.healthBarIndicator.setActive(false);
        this.healthBarIndicator.setVisible(false);
    }

    private getValuePercentage(): number {
        return this.currentValue / this.maxValue;
    }

    public init(position: Phaser.Math.Vector2, width: number, height: number, padding: number, maxValue: number, currentValue: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.maxValue = maxValue;
        this.currentValue = currentValue;

        this.healthBarBox.setPosition(this.position.x, this.position.y);
        this.healthBarBox.setDisplaySize(width, height);
        this.healthBarBox.setActive(true);
        this.healthBarBox.setVisible(true);

        this.healthBarBackground.setPosition(this.position.x, this.position.y);
        this.healthBarBackground.setDisplaySize((this.width - (2 * this.padding)) * this.getValuePercentage(), this.height - (2 * this.padding));
        this.healthBarBackground.setActive(true);
        this.healthBarBackground.setVisible(true);

        this.healthBarIndicator.setPosition(this.position.x - this.width/2 + this.padding, this.position.y);
        this.healthBarIndicator.setDisplaySize((this.width - (2 * this.padding)) * this.getValuePercentage(), this.height - (2 * this.padding));
        this.healthBarIndicator.setActive(true);
        this.healthBarIndicator.setVisible(true);
    }

    public update(position: Phaser.Math.Vector2, currentValue: number) {
        this.position = position;
        this.currentValue = currentValue;

        this.healthBarBox.setPosition(this.position.x, this.position.y);
        this.healthBarBackground.setPosition(this.position.x, this.position.y);
        this.healthBarIndicator.setPosition(this.position.x - this.width/2 + this.padding, this.position.y);
        this.healthBarIndicator.setDisplaySize((this.width - (2 * this.padding)) * this.getValuePercentage(), this.height - (2 * this.padding));
    }

    public remove() {
        this.healthBarBox.setActive(false);
        this.healthBarBox.setVisible(false);

        this.healthBarBackground.setActive(false);
        this.healthBarBackground.setVisible(false);

        this.healthBarIndicator.setActive(false);
        this.healthBarIndicator.setVisible(false);
    }
}
