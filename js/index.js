
const config={
    type: Phaser.AUTO,
    width: 1200,
    height: 750,
    parent: 'app',
    scene: [GameStart,EndPage,Finishmain],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            //debug: true
        }
    },
}
const game = new Phaser.Game(config)
