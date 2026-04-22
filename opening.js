class opening extends Phaser.Scene {
    constructor() {
        super('opening');
    }

    preload() {
        this.load.image('openingBackground', 'assets/opening.png');
    }

    create() {
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'openingBackground')
            .setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(this.scale.width / 2, 200, "Opening Scene", {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            color: '#9dfc8b',
            stroke: '#102030',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('game');
        });
    }
}