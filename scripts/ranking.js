let thead = document.getElementById("ranking-thead");
let tbody = document.getElementById("ranking-tbody");
let error = document.getElementById("error");
let loading = document.getElementById("loading");

function getRanking() {
  loading.innerHTML = "<p>Cargando...</p>";
  thead.innerHTML =
    "<th>Posición</th><th>Club</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GC</th><th>GF</th><th>DG</th><th>Pts</th><th>Últimos 5</th>";
  let rankingUrl =
    "http://api.football-data.org/v2/competitions/2014/standings";
  fetch(rankingUrl, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loading.innerHTML = "";
      let ranking = data.standings[0].table;
      let teamsInfo = [];
      for (let i = 0; i < ranking.length; i++) {
        let teamInfo = new Object();
        teamInfo.teamPosition = ranking[i].position;
        teamInfo.name = ranking[i].team.name;
        teamInfo.played = ranking[i].playedGames;
        teamInfo.won = ranking[i].won;
        teamInfo.lost = ranking[i].lost;
        teamInfo.draw =
          ranking[i].playedGames - ranking[i].won - ranking[i].lost;
        teamInfo.homeGoals = 0;
        teamInfo.awayGoals = 0;
        teamInfo.goalDifference = ranking[i].goalsFor - ranking[i].goalsAgainst;
        teamInfo.points = ranking[i].points;
        teamInfo.lastFive = ranking[i].form;
        teamsInfo.push(teamInfo);
      }
      for (let i = 0; i < teamsInfo.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${teamsInfo[i].teamPosition}</td><td>${teamsInfo[i].name}</td><td>${teamsInfo[i].played}</td><td>${teamsInfo[i].won}</td><td>${teamsInfo[i].draw}</td><td>${teamsInfo[i].lost}</td><td>${teamsInfo[i].homeGoals}</td><td>${teamsInfo[i].awayGoals}</td><td>${teamsInfo[i].goalDifference}</td><td>${teamsInfo[i].points}</td><td>${teamsInfo[i].lastFive}</td>`;
        tbody.appendChild(tr);
      }
    })
    .catch((err) => {
      console.log(err);
      let paragraph = document.createElement("p");
      loading.innerHTML = "";
      paragraph.innerHTML = `Ha ocurrido un error. Vuelva a intentarlo más tarde.`;
      error.appendChild(paragraph);
    });
}

getRanking();
