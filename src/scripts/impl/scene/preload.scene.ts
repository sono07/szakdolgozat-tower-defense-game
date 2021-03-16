import { MAIN_MENU_SCENE_KEY } from "./main-menu.scene";
import { BaseScene } from "./_abstract/base.scene.abstract";

export const PRELOAD_SCENE_KEY = "Preload";
export class PrealoadScene extends BaseScene {
    progressBar!: Phaser.GameObjects.Graphics;
    progressBox!: Phaser.GameObjects.Graphics;
    loadingText!: Phaser.GameObjects.Text;
    percentageText!: Phaser.GameObjects.Text;
    fileText!: Phaser.GameObjects.Text;
    backgroundImage!: Phaser.GameObjects.Image;

    constructor() {
        super(PRELOAD_SCENE_KEY);
    }

    init(data: object): void {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.backgroundImage = this.add.image(width/2, height/2, 'background');
        this.backgroundImage.setAlpha(0.5);

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
        
        this.loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#ffffff',
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);
        
        this.percentageText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff',
            }
        });
        this.percentageText.setOrigin(0.5, 0.5);
        
        this.fileText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ffffff'
            }
        });
        
        this.fileText.setOrigin(0.5, 0.5);
        
        this.load.on(Phaser.Loader.Events.PROGRESS, this.updateLoadProgress, this);
        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, this.updateLoadFileProgress, this);
    }

    private updateLoadProgress(value: number) {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.percentageText.setText(Math.floor(value * 100) + '%');
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    }

    private updateLoadFileProgress(file: any) {
        this.fileText.setText('Loading asset: ' + file.key);
    }

    preload(): void {
        //TODO remove
        this.load.atlas('sprites', 'images/spritesheet.png', 'images/spritesheet.json');

        this.load.atlas('turret-bases', 'images/spritesheets/turret/turret-base.spritesheet.png', 'images/spritesheets/turret/turret-base.spritesheet.json');
        this.load.atlas('turret-weapons', 'images/spritesheets/turret/turret-weapon.spritesheet.png', 'images/spritesheets/turret/turret-weapon.spritesheet.json');
        
        this.load.atlas('projectile-bullet', 'images/spritesheets/projectile/projectile-bullet.spritesheet.png', 'images/spritesheets/projectile/projectile-bullet.spritesheet.json');
        this.load.atlas('projectile-laser', 'images/spritesheets/projectile/projectile-laser.spritesheet.png', 'images/spritesheets/projectile/projectile-laser.spritesheet.json');
        this.load.atlas('projectile-energy-ball-orange', 'images/spritesheets/projectile/projectile-energy-ball-orange.spritesheet.png', 'images/spritesheets/projectile/projectile-energy-ball-orange.spritesheet.json');
        this.load.atlas('projectile-energy-ball-blue', 'images/spritesheets/projectile/projectile-energy-ball-blue.spritesheet.png', 'images/spritesheets/projectile/projectile-energy-ball-blue.spritesheet.json');
        this.load.atlas('projectile-rocket', 'images/spritesheets/projectile/projectile-rocket.spritesheet.png', 'images/spritesheets/projectile/projectile-rocket.spritesheet.json');
    }

    create(data: object): void {
        this.anims.create({ key: 'projectile-bullet-blow-animation', frames: this.anims.generateFrameNames('projectile-bullet', { prefix: '', start: 1, end: 6, zeroPad: 3 }), repeat: 0 });
        this.anims.create({ key: 'projectile-laser-blow-animation', frames: this.anims.generateFrameNames('projectile-laser', { prefix: '', start: 1, end: 5, zeroPad: 3 }), repeat: 0 });
        this.anims.create({ key: 'projectile-energy-ball-orange-blow-animation', frames: this.anims.generateFrameNames('projectile-energy-ball-orange', { prefix: '', start: 1, end: 7, zeroPad: 3 }), repeat: 0 });
        this.anims.create({ key: 'projectile-energy-ball-blue-blow-animation', frames: this.anims.generateFrameNames('projectile-energy-ball-blue', { prefix: '', start: 1, end: 7, zeroPad: 3 }), repeat: 0 });
        this.anims.create({ key: 'projectile-rocket-blow-animation', frames: this.anims.generateFrameNames('projectile-rocket', { prefix: '', start: 2, end: 6, zeroPad: 3 }), repeat: 0 });

        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
        this.percentageText.destroy();
        this.fileText.destroy();
        this.backgroundImage.destroy();

        this.scene.start(MAIN_MENU_SCENE_KEY);
    }

    update(time: number, delta: number): void {

    }
}
