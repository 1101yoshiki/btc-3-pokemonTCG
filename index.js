// import axios from "axios";

let cardData = [];
const max = 50;

class Pokemonfunctions {
  getAllCards() {
    return axios
      .get(`https://api.pokemontcg.io/v2/cards?pageSize=${max}`)
      .then((json) => json.data.data)
      .catch((error) => console.error("読み込みエラー : " + error));
  }

  getCardImageUrl(index) {
    return cardData[index].images.small;
  }

  getRandomNumbers(num) {
    const resultArray = [];
    for (let i = 0; i < num; i++) {
      let newnum = Math.floor(Math.random() * max);
      while (resultArray.length !== 0 && resultArray.includes(newnum)) {
        newnum = Math.floor(Math.random() * max);
      }
      resultArray.push(newnum);
    }
    return resultArray;
  }
}

function selectCard(num) {
    if (
      document.getElementById(playerImageInsertTagName[num] + "_order")
        .innerHTML === ""
    ) {
      if (order.length > 0) {
        document.getElementById(
          playerImageInsertTagName[num] + "_order"
        ).innerHTML = order.shift();
        if (order.length === 0) {
          document.getElementById("battleStartButton").disabled = false;
        }
      }
    } else {
      order.push(
        Number(
          document.getElementById(playerImageInsertTagName[num] + "_order")
            .innerHTML
        )
      );
      order.sort();
      document.getElementById(
        playerImageInsertTagName[num] + "_order"
      ).innerHTML = "";
      document.getElementById("battleStartButton").disabled = true;
    }
}

function judgement(ply, com) {
  if (Number(cardData[ply].hp) > Number(cardData[com].hp)) {
    return "win";
  } else if (Number(cardData[ply].hp) < Number(cardData[com].hp)) {
    return "lose";
  } else {
    return "draw";
  }
}

function startBattle() {
  const resultEach = [];
  let resultTotal = 0;
  let resultMessageTag = document.getElementById("result");
  document.getElementById("battleStartButton").disabled = true;
  for (let i = 0; i < 3; i++) {
    document.getElementById(playerImageInsertTagName[i]).style.pointerEvents =
      "none";
  }
  const players = [];
  const comps = [];
  for (let i = 0; i < 3; i++) {
    comps[
      Number(
        document.getElementById(playerImageInsertTagName[i] + "_order")
          .innerHTML
      ) - 1
    ] = cards[i + 3];
    players[
      Number(
        document.getElementById(playerImageInsertTagName[i] + "_order")
          .innerHTML
      ) - 1
    ] = cards[i];
  }
  for (let i = 0; i < 3; i++) {
    document.getElementById(
      compImageInsertTagName[
        Number(
          document.getElementById(playerImageInsertTagName[i] + "_order")
            .innerHTML
        ) - 1
      ]
    ).innerHTML =
      '<img src="' +
      func.getCardImageUrl(comps[i]) +
      '" alt="pokemon card" class="images" width="120">';
  }
  for (let i = 0; i < 3; i++) {
    let result = judgement(players[i], comps[i]);
    resultEach.push(result);
    if (result === "win") {
      resultTotal++;
    } else if (result === "lose") {
      resultTotal--;
    }
  }
  if (resultTotal > 0) {
    resultTotal = "You Win!";
  } else if (resultTotal < 0) {
    resultTotal = "You Lose!";
  } else {
    resultTotal = "Draw";
  }
  resultMessageTag.innerText = resultTotal;
  resultMessageTag.style.display = "block";
  document.getElementById("resultBox").style.display = "block";
}

window.Pokemonfunctions = Pokemonfunctions;
let func = new Pokemonfunctions();
const playerImageInsertTagName = [
  "field_battle_pokemon_player1",
  "field_battle_pokemon_player2",
  "field_battle_pokemon_player3",
];
const compImageInsertTagName = [
  "field_battle_pokemon_cp1",
  "field_battle_pokemon_cp2",
  "field_battle_pokemon_cp3",
];
const order = [1, 2, 3];
let cards = [];
const startButton = document.getElementById("gameStartButton");

func.getAllCards().then((res) => {
  cardData = res;
  startButton.disabled = false;
  startButton.innerText = "Game Start";
  cards = func.getRandomNumbers(6);
  document.getElementById(compImageInsertTagName[0]).innerHTML +=
    '<img src="./picture/poke_ura.jpg" alt="pokemon card" class="images" width="120">';
  document.getElementById(compImageInsertTagName[1]).innerHTML +=
    '<img src="./picture/poke_ura.jpg" alt="pokemon card" class="images" width="120">';
  document.getElementById(compImageInsertTagName[2]).innerHTML +=
    '<img src="./picture/poke_ura.jpg" alt="pokemon card" class="images" width="120">';
  for (let i = 0; i < 3; i++) {
    document.getElementById(playerImageInsertTagName[i]).innerHTML +=
      '<img src="' +
      func.getCardImageUrl(cards[i]) +
      '" alt="pokemon card" class="images" width="120" onclick="selectCard(' +
      i +
      ')"><p id="' +
      playerImageInsertTagName[i] +
      '_order"></p>';
  }
  const startBtn = document.getElementById("battleStartButton");
  startBtn.addEventListener("click", startBattle);
});

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  document.getElementById("start").style.display = "none";
});
