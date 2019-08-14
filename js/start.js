const getRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const GameStart={
    key:'Game',
    //active: true,
    preload () {
        this.load.image('bg1', './../img/Component.png');
        this.load.image('Player', './../img/m_Nicky.png');
        this.load.image('Player_mask', './../img/m_Nicky_mask.png');
        this.load.image('Player_fail', './../img/m_Nicky_fail.png');
        this.load.image('stone1', './../img/Stone.png');
        this.load.image('stone2', './../img/Stone2.png');
        this.load.image('planet1', './../img/Planet.png');
        this.load.image('planet2', './../img/Planet2.png');
        this.load.image('planet3', './../img/Planet4.png');
        this.load.image('redpoison', './../img/RedPoison.png');
        this.load.image('bg1', './../img/Component3.png');
        this.load.image('Component1', './../img/Component4.png');
        this.load.image('Component2', './../img/Component6.png');
        this.load.image('Component3', './../img/Component9.png');
        this.load.image('Component4', './../img/Component10.png');
        this.gameStop = false;
        this.monsterArr = [];
        this.monsterArr2 = [];
        this.stoneArr = [];
        this.planetArr = [];
        this.planetIdx = 0;
        this.stoneIdx = 0;
        this.masIdx = 0;
        this.masIdx2 = 1;
        this.TimeStep = 30;
        this.speed=1;
    },
    create() {
        this.bg1 = this.add.tileSprite(600, window.innerHeight / 2, 1200, window.innerHeight, 'bg1');
        //人物配置
        this.player = this.physics.add.sprite(300, window.innerHeight / 2, 'Player');
        this.player.setScale(0.5);
        this.player.setBounce(1);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.setBackgroundColor("#001D27")
        //障礙物配置
        const obstacle = [
            { name: 'Component1', x: 1400, y: 0, w: 90, h: 145 },
            { name: 'Component2', x: 1400, y: 100, w: 140, h: 155 },
            { name: 'Component3', x: 1400, y: 250, w: 130, h: 154 },
        ]
        const stone = [
            { name: 'stone1', x: 1400, y: 300, w: 150, h: 120 },
            { name: 'stone2', x: 1400, y: 400, w: 300, h: 200 }

        ]
        const plant = [
            { name: 'planet1', x: 1800, y: 100, w: 100, h: 50 },
            { name: 'planet2', x: 1600, y: 350, w: 100, h: 50 },
            { name: 'planet3', x: 1700, y: 600, w: 100, h: 50 }
        ]
        //碰撞事件
        let punch = (player, hitter) => {
            this.player.destroy()
            this.player = this.physics.add.sprite(this.player.x, this.player.y, 'Player_fail');
            this.player.setScale(0.5);
            clearInterval(gametime)
            this.gameStop = true
            this.scene.start('end')
        }
        //碰到不會位移
        let immovable = (obj) => {
            obj.body.immovable = true;
            obj.body.move = false;
        }
        //生成障礙物
        for (let i = 0; i < 10; i++) {
            let BoolIdx = getRandom(2, 0);
            let BoolIdx2 = getRandom(2, 0);
            let BoolIdx3 = getRandom(1, 0);
            let BoolIdx4 = getRandom(2, 0);
            this['Component' + i] = this.physics.add.sprite(obstacle[BoolIdx].x, obstacle[BoolIdx].y, obstacle[BoolIdx].name);
            this['Components' + i] = this.physics.add.sprite(obstacle[BoolIdx2].x, obstacle[BoolIdx2].y, obstacle[BoolIdx2].name);
            this['stone' + i] = this.physics.add.sprite(stone[BoolIdx3].x, stone[BoolIdx3].y, stone[BoolIdx3].name);
            this['planet' + i] = this.physics.add.sprite(plant[BoolIdx4].x, plant[BoolIdx4].y, plant[BoolIdx4].name);
            this['planet' + i].setScale(0.5);
            this['planet' + i].setCircle(55, 50, 50);
            immovable(this['planet' + i])
            immovable(this['Component' + i])
            immovable(this['stone' + i])
            this.stoneArr.push(this['stone' + i]);
            this.planetArr.push(this['planet' + i])
            this.monsterArr.push(this['Component' + i]);
            this.monsterArr2.push(this['Components' + i]);
            this.physics.add.collider(this.player, this['stone' + i], punch)
            this.physics.add.collider(this.player, this['planet' + i], punch)
            this.physics.add.collider(this.player, this['Component' + i], punch)
            this.physics.add.collider(this.player, this['Component' + i], punch)
        }
        //時間
        this.timeText = this.add.text(25,  window.innerHeight-50, `TIME: ${this.TimeStep}`, { fontSize: '22px', fill: '#FFFFFF' })
        let gametime = setInterval(()=>{
            this.TimeStep--;
            this.timeText.setText(`TIME: ${this.TimeStep}`);
            if(this.TimeStep<20&&this.TimeStep>10){
                this.speed=1.4
            }
            if(this.TimeStep <= 0){
                this.gameStop = true;
                clearInterval(gametime);
                this.scene.start('finish')
            }
        }, 1000);
    },
    update() {
        if (this.gameStop) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            return
        }
        //障礙物移動
        this.bg1.tilePositionX += 3*this.speed;
        this.monsterArr[this.masIdx].x -= 6*this.speed
        this.stoneArr[this.stoneIdx].x -= 5*this.speed
        this.planetArr[this.planetIdx].x -= 5*this.speed
        if (this.monsterArr[this.masIdx].x < 1200) {
            this.monsterArr[this.masIdx].y += 2
        }
        for (let i = 0; i < this.stoneArr.length; i++) {
            if (this.stoneArr[i].x <= -100) {
                this.stoneArr[i].x = 1400;
                this.stoneArr[i].y = getRandom(700, 200);
                this.stoneIdx = getRandom(1, 0)
            }
        }
        for (let i = 0; i < this.planetArr.length; i++) {
            if (this.planetArr[i].x <= -100) {
                this.planetArr[i].x = 1500 + getRandom(200, 100);
                this.planetArr[i].y = getRandom(800, 100);
                this.planetIdx = getRandom(2, 0)
            }
        }
        for (let i = 0; i < this.monsterArr.length; i++) {
            if (this.monsterArr[i].x <= -100 || this.monsterArr[i].y >= window.innerHeight + 100) {
                this.monsterArr[i].x = 1400;
                this.monsterArr[i].y = getRandom(400, 50);
                this.masIdx = getRandom(this.monsterArr.length - 1, 0);
            }
            if (this.monsterArr2[i].x <= -100) {
                this.monsterArr2[i].x = 1400 + getRandom(400, 200);
                this.monsterArr2[i].y = getRandom(200, 0);
                this.masIdx2 = getRandom(this.monsterArr2.length - 1, 0);
            }
        }
        //操作人物
        let keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.right.isDown) {
            this.player.setVelocityX(200);

        }
        else if (keyboard.left.isDown) {
            this.player.setVelocityX(-200);

        }
        else if (keyboard.up.isDown) {
            this.player.setVelocityY(-200);

        }
        else if (keyboard.down.isDown) {
            this.player.setVelocityY(200);

        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
    }
}