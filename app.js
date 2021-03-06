function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    }
  },
  computed: {
    // reset value to 0 if health < 0
    monsterBarWidth() {
      return { width: this.monsterHealth < 0 ? 0 : this.monsterHealth + '%' }
    },
    // reset value to 0 if health < 0
    playerBarWidth() {
      return { width: this.playerHealth < 0 ? 0 : this.playerHealth + '%' }
    },
    mayUseSpecialAttack() {
      // should only fire on every 3 rounds
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    }
  },
  methods: {
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackedValue = getRandomValue(5, 12);
      this.monsterHealth -= attackedValue;
      this.addLogMessage('player', 'attack', attackedValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackedValue = getRandomValue(8, 15);
      this.playerHealth -= attackedValue;
      this.addLogMessage('monster', 'attack', attackedValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackedValue = getRandomValue(10, 25);
      this.monsterHealth -= attackedValue;
      this.addLogMessage('player', 'special-attack', attackedValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healthValue = getRandomValue(8, 20);
      if (this.playerHealth + healthValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healthValue;
      }
      this.addLogMessage('player', 'heal', healthValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
      this.addLogMessage('player', 'surrender')
    },
    addLogMessage(who, what, value = null) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    }
  }
});

app.mount('#game');
