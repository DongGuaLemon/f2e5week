const EndPage={
    key:'end',
    preload () {
        this.load.image('endbtn','../img/endbtn.PNG')
        this.load.image('Player_fail', '../img/m_Nicky_fail.png');
        this.load.image('bg1', '../img/Component.png');
    },
    create() {
        this.endText = this.add.text(400, 200, `Help Nicky Again?`, { fontSize: '65px', fill: '#E2FF65', fontFamily: 'Lobster', fontWeight: 'bold' })
        this.End=this.add.image(650,380,'endbtn')
        this.playerfail=this.add.image(230,300,'Player_fail')
        this.bg1 = this.add.tileSprite(600, window.innerHeight / 2, 1200, window.innerHeight, 'bg1');
        this.cameras.main.setBackgroundColor("#001D27")
        this.End.setInteractive()
        this.End.on('pointerdown', () => this.scene.start('Game'));
    },
    update() {
        
    },
}