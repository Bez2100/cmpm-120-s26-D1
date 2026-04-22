class studio extends Phaser.Scene {
	constructor() {
		super('studio');
	}

	preload() {
		this.load.image('studioLogo', 'assets/logo.png');
	}

	create() {
		const cx = this.scale.width / 2;
		const cy = this.scale.height / 2;

		this.cameras.main.setBackgroundColor('#000000');
		this.cameras.main.resetFX();

		const logo = this.add.image(cx, cy - 80, 'studioLogo').setOrigin(0.5).setAlpha(0);

		const studioText = this.add.text(cx, cy + 140, 'Shark Tooth Studios', {
			fontFamily: '"Press Start 2P"',
			fontSize: '24px',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5).setAlpha(0);

		this.createOrbitReveal(cx, cy, logo, studioText);

		this.time.delayedCall(7000, () => {
			this.scene.start('worldbuild');
		});
	}

	createOrbitReveal(cx, cy, logo, studioText) {
		const orbitRadius = 150;
		const leftCircle = this.add.circle(cx - orbitRadius, cy, 56, 0x9dfc8b, 1).setDepth(20);
		const rightCircle = this.add.circle(cx + orbitRadius, cy, 56, 0x61dafb, 1).setDepth(20);

		const orbitState = { angle: 0 };
		this.tweens.add({
			targets: orbitState,
			angle: 360,
			duration: 4200,
			ease: 'Sine.easeInOut',
			onUpdate: () => {
				const radians = Phaser.Math.DegToRad(orbitState.angle);
				leftCircle.setPosition(cx + Math.cos(radians) * orbitRadius, cy + Math.sin(radians) * orbitRadius);
				rightCircle.setPosition(cx - Math.cos(radians) * orbitRadius, cy - Math.sin(radians) * orbitRadius);
			}
		});

		this.time.delayedCall(4200, () => {
			this.tweens.add({
				targets: [leftCircle, rightCircle],
				alpha: 0,
				duration: 900,
				ease: 'Sine.easeOut'
			});

			this.tweens.add({
				targets: [logo, studioText],
				alpha: 1,
				duration: 900,
				ease: 'Sine.easeInOut'
			});
		});
	}
}
