let tableCaption = document.getElementById("matches-table-caption");
let thead = document.getElementById("matches-thead");
let tbody = document.getElementById("matches-tbody");
let teamInput = document.getElementById("teamName");
let radioAll = document.getElementById("radio-all");
let radioWon = document.getElementById("radio-won");
let radioLost = document.getElementById("radio-lost");
let radioDraw = document.getElementById("radio-draw");
let radioNext = document.getElementById("radio-next");
let queryError = document.getElementById("query-error");

function getMatches(allOrSome) {
  queryError.innerText = "";
  tbody.innerHTML = "";
  tableCaption.innerText = "PARTIDOS";
  thead.innerHTML =
    "<th>Fecha</th><th>Local</th><th>Visitante</th><th>Ganador</th><th>Jugado</th>";
  let url =
    "http://api.football-data.org/v2/competitions/PD/matches?dateFrom=2020-09-13&dateTo=2021-05-23";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let matches = data.matches;
      let inputValue = teamInput.value;
      if (allOrSome == "all" || inputValue == "") {
        for (let i = 0; i < matches.length; i++) {
          let utcDate = matches[i].utcDate;
          let splitUtcDate = utcDate.split("T");
          let date = splitUtcDate[0];
          let homeTeam = matches[i].homeTeam.name;
          let awayTeam = matches[i].awayTeam.name;
          let winner = matches[i].score.winner;
          let winnerTeam = "";
          if (winner === "HOME_TEAM") {
            winnerTeam = homeTeam;
          } else if (winner === "AWAY_TEAM") {
            winnerTeam = awayTeam;
          } else {
            winnerTeam = "Empate";
          }
          let played = "";
          if (matches[i].status == "FINISHED") {
            played = "Jugado";
          } else {
            played = "Pendiente";
          }
          let tr = document.createElement("tr");
          tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
          tbody.appendChild(tr);
        }
      } else if (teamInput.value != "") {
        if (radioAll.checked == true) {
        }
        let selectedMatches = [];
        for (let i = 0; i < matches.length; i++) {
          if (
            inputValue == matches[i].homeTeam.name ||
            inputValue == matches[i].awayTeam.name
          ) {
            selectedMatches.push(matches[i]);
          }
        }
        if (selectedMatches.length > 0) {
          if (radioAll.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let utcDate = selectedMatches[i].utcDate;
              let splitUtcDate = utcDate.split("T");
              let date = splitUtcDate[0];
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let winner = selectedMatches[i].score.winner;
              let winnerTeam = "";
              if (winner === "HOME_TEAM") {
                winnerTeam = homeTeam;
              } else if (winner === "AWAY_TEAM") {
                winnerTeam = awayTeam;
              } else {
                winnerTeam = "Empate";
              }
              let played = "";
              if (selectedMatches[i].status == "FINISHED") {
                played = "Jugado";
              } else {
                played = "Pendiente";
              }
              let tr = document.createElement("tr");
              tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
              tbody.appendChild(tr);
            }
          } else if (radioWon.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let utcDate = selectedMatches[i].utcDate;
              let splitUtcDate = utcDate.split("T");
              let date = splitUtcDate[0];
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let winner = selectedMatches[i].score.winner;
              let winnerTeam = "";
              if (winner === "HOME_TEAM") {
                winnerTeam = homeTeam;
              } else if (winner === "AWAY_TEAM") {
                winnerTeam = awayTeam;
              } else {
                winnerTeam = "Empate";
              }
              let played = "";
              if (selectedMatches[i].status == "FINISHED") {
                played = "Jugado";
              } else {
                played = "Pendiente";
              }
              if (winnerTeam == teamInput.value) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioLost.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let utcDate = selectedMatches[i].utcDate;
              let splitUtcDate = utcDate.split("T");
              let date = splitUtcDate[0];
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let winner = selectedMatches[i].score.winner;
              let winnerTeam = "";
              if (winner === "HOME_TEAM") {
                winnerTeam = homeTeam;
              } else if (winner === "AWAY_TEAM") {
                winnerTeam = awayTeam;
              } else {
                winnerTeam = "Empate";
              }
              let played = "";
              if (selectedMatches[i].status == "FINISHED") {
                played = "Jugado";
              } else {
                played = "Pendiente";
              }
              if (winnerTeam != teamInput.value && winnerTeam != "Empate") {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioDraw.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let utcDate = selectedMatches[i].utcDate;
              let splitUtcDate = utcDate.split("T");
              let date = splitUtcDate[0];
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let winner = selectedMatches[i].score.winner;
              let winnerTeam = "";
              if (winner === "HOME_TEAM") {
                winnerTeam = homeTeam;
              } else if (winner === "AWAY_TEAM") {
                winnerTeam = awayTeam;
              } else {
                winnerTeam = "Empate";
              }
              let played = "Jugado";
              if (
                winnerTeam == "Empate" &&
                selectedMatches[i].status == "FINISHED"
              ) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioNext.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let utcDate = selectedMatches[i].utcDate;
              let splitUtcDate = utcDate.split("T");
              let date = splitUtcDate[0];
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let winner = selectedMatches[i].score.winner;
              let winnerTeam = "";
              if (winner === "HOME_TEAM") {
                winnerTeam = homeTeam;
              } else if (winner === "AWAY_TEAM") {
                winnerTeam = awayTeam;
              } else {
                winnerTeam = "Empate";
              }
              let played = "Pendiente";
              if (selectedMatches[i].status != "FINISHED") {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else {
            for (let i = 0; i < selectedMatches.length; i++) {
              let utcDate = selectedMatches[i].utcDate;
              let splitUtcDate = utcDate.split("T");
              let date = splitUtcDate[0];
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let winner = selectedMatches[i].score.winner;
              let winnerTeam = "";
              if (winner === "HOME_TEAM") {
                winnerTeam = homeTeam;
              } else if (winner === "AWAY_TEAM") {
                winnerTeam = awayTeam;
              } else {
                winnerTeam = "Empate";
              }
              let played = "";
              if (selectedMatches[i].status == "FINISHED") {
                played = "Jugado";
              } else {
                played = "Pendiente";
              }
              let tr = document.createElement("tr");
              tr.innerHTML = `<td>${date}</td><td>${homeTeam}</td><td>${awayTeam}</td><td>${winnerTeam}</td><td>${played}</td>`;
              tbody.appendChild(tr);
            }
          }
        } else {
          tbody.innerHTML = "";
          tableCaption.innerHTML = "";
          thead.innerHTML = "";
          queryError.innerText = "Ese equipo no existe.";
        }
      }
    });
}

getMatches("all");
