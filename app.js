function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100
    }
  },
  computed: {
    monsterBarWidth() {
      return { width: this.monsterHealth + '%' }
    },
    playerBarWidth() {
      return { width: this.playerHealth + '%' }
    }
  },
  methods: {
    attackMonster() {
      const attackedValue = getRandomValue(5, 12);
      this.monsterHealth -= attackedValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackedValue = getRandomValue(8, 15);
      this.playerHealth -= attackedValue;
    },
    specialAttackMonster() {
      // should only fire on every 3 rounds
      const attackedValue = getRandomValue(10, 25);
      this.monsterHealth -= attackedValue;
      this.attackPlayer();
    },
    heal() {

    },
    surrender() {

    }
  }
});

app.mount('#game');
