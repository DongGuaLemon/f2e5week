const Finishmain={
    key:'finish',
    preload(){
        this.load.image('bg1', '../img/Component.png');
        this.load.image('finishbtn','../img/endbtn.PNG');
        this.load.image('success','../img/m_Nicky_mask.png');
        this.load.image('planet1', '../img/Planet.png');
        this.load.image('planet2', '../img/Planet2.png');
        this.load.image('Component1', '../img/Component4.png');
        this.load.image('Component2', '../img/Component10.png');
    },
    create() {
        //結束畫面圖片配置
        this.cameras.main.setBackgroundColor("#001D27")
        this.endText = this.add.text(300, 150, `Nicky Success Again?`, { fontSize: '65px', fill: '#E2FF65', fontFamily: 'Lobster', fontWeight: 'bold' })
        this.bg1 = this.add.tileSprite(600, window.innerHeight / 2, 1200, window.innerHeight, 'bg1');
        this.success=this.add.image(550,550,'success')
        this.finishplant1=this.add.image(300,300,'planet1')
        this.finishplant2=this.add.image(800,500,'planet2')
        this.finishCo1=this.add.image(200,200,'Component1')
        this.finishCo2=this.add.image(1000,500,'Component2')
        this.finish=this.add.image(550,330,'finishbtn')
        //點擊事件
        this.finish.setInteractive()
        this.finish.on('pointerdown', () => this.scene.start('Game'));
    },
    update() {
    },

}