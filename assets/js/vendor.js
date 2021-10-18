const monsterHealthBar = document.getElementById("health-monster");
const playerHealthBar = document.getElementById("health-player");
const bonusLifeEl = document.getElementById("bonus-health");

const attackBtn = document.getElementById("btn-attack");
const strongAttackBtn = document.getElementById("btn-strong-attack");
const healBtn = document.getElementById("btn-heal");
const logBtn = document.getElementById("btn-log");

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(chosenValue) {
  playerHealthBar.value = chosenValue;
  monsterHealthBar.value = chosenValue;
}

function removeBonusLife(bonuslife) {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
  playerHealthBar.value = bonuslife;
}
