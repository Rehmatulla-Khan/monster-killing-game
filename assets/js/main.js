const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 16;
const HEAL_VALUE = 20;

const playerChosenValue = prompt(
  "Enter the maximum health for you and monster",
  "100"
);

const modeAttack = "ATTACk";
const modeStrongAttack = "STRONG-ATTACK";
const logEventPlayerAttack = "PLAYER-ATTACK";
const logEventPlayerStrongAttack = "PLAYER-STRONG-ATTACK";
const logEventMonsterAttack = "MONSTER-ATTACK";
const logEventPlayerHeal = "PLAYER-HEAL";
const logEventGameOver = "GAME-OVER";

let chosenMaxLife = parseInt(playerChosenValue);
let battleLog = [];

let playerHealth = chosenMaxLife;
let monsterHealth = chosenMaxLife;
let hasBonusLife = true;

if (isNaN(playerChosenValue) || playerChosenValue <= 0) {
  chosenMaxLife = 100;
  alert(
    "You have entered a invalid value so monster and player health is taken as 100"
  );
}

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, logMonsterHealth, logPlayerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: logMonsterHealth,
    finalPlayerHealth: logPlayerHealth,
  };
  switch (event) {
    case logEventPlayerAttack:
      logEntry.target = "MONSTER";
      break;
    case logEventPlayerStrongAttack:
      logEntry = {
        event: event,
        value: value,
        target: "MONSTER",
        finalMonsterHealth: logMonsterHealth,
        finalPlayerHealth: logPlayerHealth,
      };
      break;
    case logEventMonsterAttack:
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: logMonsterHealth,
        finalPlayerHealth: logPlayerHealth,
      };
      break;
    case logEventPlayerHeal:
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: logMonsterHealth,
        finalPlayerHealth: logPlayerHealth,
      };
      break;
    case logEventGameOver:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: logMonsterHealth,
        finalPlayerHealth: logPlayerHealth,
      };
      break;
  }
  // if (event === logEventPlayerAttack) {
  //   logEntry.target = "MONSTER";
  // } else if (event === logEventPlayerStrongAttack) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: "MONSTER",
  //     finalMonsterHealth: logMonsterHealth,
  //     finalPlayerHealth: logPlayerHealth,
  //   };
  // } else if (event === logEventMonsterAttack) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: "PLAYER",
  //     finalMonsterHealth: logMonsterHealth,
  //     finalPlayerHealth: logPlayerHealth,
  //   };
  // } else if (event === logEventPlayerHeal) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: "PLAYER",
  //     finalMonsterHealth: logMonsterHealth,
  //     finalPlayerHealth: logPlayerHealth,
  //   };
  // } else if (event === logEventGameOver) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     finalMonsterHealth: logMonsterHealth,
  //     finalPlayerHealth: logPlayerHealth,
  //   };
  // }
  battleLog.push(logEntry);
}

function reset() {
  playerHealth = chosenMaxLife;
  monsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const damageTaken = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  const bonusLifeValue = chosenMaxLife - (20 % chosenMaxLife);
  playerHealth -= damageTaken;
  writeToLog(logEventMonsterAttack, damageTaken, monsterHealth, playerHealth);

  if (playerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife(bonusLifeValue);
    playerHealth = bonusLifeValue;
    alert("You would be dead but the bonus life saved you");
  }
  if (monsterHealth <= 0 && playerHealth > 0) {
    alert("Congrats You Won");
    writeToLog(logEventGameOver, "You won", monsterHealth, playerHealth);
  } else if (playerHealth <= 0 && monsterHealth > 0) {
    alert("You Lost");
    writeToLog(logEventGameOver, "You lost", monsterHealth, playerHealth);
  } else if (playerHealth <= 0 && monsterHealth <= 0) {
    alert("You Have A Draw");
    writeToLog(logEventGameOver, "We have a draw", monsterHealth, playerHealth);
  }
  if (playerHealth <= 0 || monsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxAttack = mode === modeAttack ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === modeAttack ? logEventPlayerAttack : logEventMonsterAttack;
  // if (mode === modeAttack) {
  //   maxAttack = ATTACK_VALUE;
  //   logEvent = logEventPlayerAttack;
  // } else if (mode === modeStrongAttack) {
  //   maxAttack = STRONG_ATTACK_VALUE;
  //   logEvent = logEventPlayerStrongAttack;
  // }
  const damageGiven = dealMonsterDamage(maxAttack);
  monsterHealth -= damageGiven;
  writeToLog(logEvent, damageGiven, monsterHealth, playerHealth);
  endRound();
}
function attackHandler() {
  attackMonster(modeAttack);
}

function strongAttackHandler() {
  attackMonster(modeStrongAttack);
}

function healHandler() {
  //   let healValue;
  if (playerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You cant heal than your most initial health");
    // healValue = chosenMaxLife - playerHealth;
  } else {
    // healValue = HEAL_VALUE;
    increasePlayerHealth(HEAL_VALUE);
    playerHealth += HEAL_VALUE;
    writeToLog(logEventPlayerHeal, HEAL_VALUE, monsterHealth, playerHealth);
  }

  endRound();
}

function printLogHandler() {
  // for (let i = 0; i < 3; i++) {
  //   console.log("---");
  // }
  // let j = 0;
  // while (j < 3) {
  //   console.log("---");
  //   j++;
  // }
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(`${key} => ${logEntry[key]}`);
    }
    i++;
  }
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", printLogHandler);
