const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100
    }
  },
  methods: {
    attackMonster() {
      const attackedValue = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= attackedValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackedValue = Math.floor(Math.random() * (15 - 8)) + 8;
      this.playerHealth -= attackedValue;
    }
  }
});

app.mount('#game');
