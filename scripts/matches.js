let thead = document.getElementById("matches-thead");
let tbody = document.getElementById("matches-tbody");
let teamInput = document.getElementById("teamName");
let radioAll = document.getElementById("radio-all");
let radioWon = document.getElementById("radio-won");
let radioLost = document.getElementById("radio-lost");
let radioDraw = document.getElementById("radio-draw");
let radioNext = document.getElementById("radio-next");
let queryError = document.getElementById("query-error");
let error = document.getElementById("error");
let loading = document.getElementById("loading");

function getMatches(allOrSome) {
  loading.innerHTML = "<p>Cargando...</p>";
  queryError.innerHTML = "";
  tbody.innerHTML = "";
  thead.innerHTML = "<th>Local</th><th>Resultado</th><th>Visitante</th>";
  let url = "https://api.football-data.org/v2/competitions/2014/matches";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loading.innerHTML = "";
      let matches = data.matches;
      let inputValue = teamInput.value;
      if (allOrSome == "all" || inputValue == "") {
        for (let i = 0; i < matches.length; i++) {
          let homeTeam = matches[i].homeTeam.name;
          let awayTeam = matches[i].awayTeam.name;
          let homeTeamGoals = matches[i].score.fullTime.homeTeam;
          let awayTeamGoals = matches[i].score.fullTime.awayTeam;
          let score = `${homeTeamGoals} - ${awayTeamGoals}`;
          if (matches[i].status == "FINISHED") {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${homeTeam}</td><td>${score}</td><td>${awayTeam}</td>`;
            tbody.appendChild(tr);
          }
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
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let homeTeamGoals = selectedMatches[i].score.fullTime.homeTeam;
              let awayTeamGoals = selectedMatches[i].score.fullTime.awayTeam;
              let score = `${homeTeamGoals} - ${awayTeamGoals}`;
              if (selectedMatches[i].status == "FINISHED") {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${homeTeam}</td><td>${score}</td><td>${awayTeam}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioWon.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let homeTeamGoals = selectedMatches[i].score.fullTime.homeTeam;
              let awayTeamGoals = selectedMatches[i].score.fullTime.awayTeam;
              let score = `${homeTeamGoals} - ${awayTeamGoals}`;
              let winnerHomeOrAway = selectedMatches[i].score.winner;
              if (
                ((winnerHomeOrAway == "HOME_TEAM" && homeTeam == inputValue) ||
                  (winnerHomeOrAway == "AWAY_TEAM" &&
                    awayTeam == inputValue)) &&
                selectedMatches[i].status == "FINISHED"
              ) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${homeTeam}</td><td>${score}</td><td>${awayTeam}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioLost.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let homeTeamGoals = selectedMatches[i].score.fullTime.homeTeam;
              let awayTeamGoals = selectedMatches[i].score.fullTime.awayTeam;
              let score = `${homeTeamGoals} - ${awayTeamGoals}`;
              let winnerHomeOrAway = selectedMatches[i].score.winner;
              if (
                ((winnerHomeOrAway == "HOME_TEAM" && homeTeam != inputValue) ||
                  (winnerHomeOrAway == "AWAY_TEAM" &&
                    awayTeam != inputValue)) &&
                selectedMatches[i].status == "FINISHED"
              ) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${homeTeam}</td><td>${score}</td><td>${awayTeam}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioDraw.checked == true) {
            for (let i = 0; i < selectedMatches.length; i++) {
              let homeTeam = selectedMatches[i].homeTeam.name;
              let awayTeam = selectedMatches[i].awayTeam.name;
              let homeTeamGoals = selectedMatches[i].score.fullTime.homeTeam;
              let awayTeamGoals = selectedMatches[i].score.fullTime.awayTeam;
              let score = `${homeTeamGoals} - ${awayTeamGoals}`;
              let winnerHomeOrAway = selectedMatches[i].score.winner;
              if (
                winnerHomeOrAway == "DRAW" &&
                selectedMatches[i].status == "FINISHED"
              ) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${homeTeam}</td><td>${score}</td><td>${awayTeam}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else if (radioNext.checked == true) {
            let notFinishedMatches = [];
            for (let i = 0; i < selectedMatches.length; i++) {
              if (selectedMatches[i].status !== "FINISHED") {
                notFinishedMatches.push(selectedMatches[i]);
              }
            }
            if (notFinishedMatches.length == 0) {
              queryError.innerHTML =
                "<p>A este equipo no le quedan partidos por jugar.</p>";
            } else {
              for (let i = 0; let < notFinishedMatches.length; i++) {
                let homeTeam = notFinishedMatches[i].homeTeam.name;
                let awayTeam = notFinishedMatches[i].awayTeam.name;
                let tr = document.createElement("tr");
                tr.innerHTML = `<td${homeTeam}</td><td>PENDIENTE</td><td>${awayTeam}</td>`;
                tbody.appendChild(tr);
              }
            }
          } else {
            for (let i = 0; i < matches.length; i++) {
              let homeTeam = matches[i].homeTeam.name;
              let awayTeam = matches[i].awayTeam.name;
              let homeTeamGoals = matches[i].score.fullTime.homeTeam;
              let awayTeamGoals = matches[i].score.fullTime.awayTeam;
              let score = `${homeTeamGoals} - ${awayTeamGoals}`;
              if (matches[i].status == "FINISHED") {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${homeTeam}</td><td>${score}</td><td>${awayTeam}</td>`;
                tbody.appendChild(tr);
              }
            }
          }
        } else {
          tbody.innerHTML = "";
          thead.innerHTML = "";
          teamInput.value = "";
          queryError.innerHTML = "<p>Ese equipo no existe.</p>";
        }
      }
    })
    .catch((err) => {
      let paragraph = document.createElement("p");
      loading.innerHTML = "";
      paragraph.innerHTML = `Ha ocurrido un error. Vuelva a intentarlo más tarde.`;
      error.appendChild(paragraph);
    });
}

getMatches("all");
