class Homescreen extends Phaser.Scene {
    constructor() {
        super('homescreen');
    }

    preload() {
        this.load.image('homeBackground', 'assets/background.jpg');
    }

    create() {
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'homeBackground')
            .setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(this.scale.width / 2, 200, "Welcome to Fallen!", {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            color: '#9dfc8b',
            stroke: '#102030',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 300, "Press SPACE to Start", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#9dfc8b',
            stroke: '#102030',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.return = this.input.keyboard.addKey('R');


        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('opening');
        });

    }

    update() {
            //if (Phaser.Input.Keyboard.JustDown(this.return)) {
             //   this.scene.start('game');
            //}

 
    }
}