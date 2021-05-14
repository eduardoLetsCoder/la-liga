let thead = document.getElementById("ranking-thead");
let tbody = document.getElementById("ranking-tbody");

function getRanking() {
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
      let matchesUrl =
        "http://api.football-data.org/v2/competitions/PD/matches?dateFrom=2020-09-13&dateTo=2021-05-23";
      fetch(matchesUrl, {
        method: "GET",
        headers: {
          "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
        },
      })
        .then((response) => response.json())
        .then((info) => {
          let matches = info.matches;
          for (let i = 0; i < matches.length; i++) {
            let homeTeam = matches[i].homeTeam.name;
            let awayTeam = matches[i].awayTeam.name;
            let homeTeamGoals =
              matches[i].score.halfTime.homeTeam +
              matches[i].score.fullTime.homeTeam;
            let awayTeamGoals =
              matches[i].score.halfTime.awayTeam +
              matches[i].score.fullTime.awayTeam;
            for (let j = 0; j < teamsInfo.length; j++) {
              if (teamsInfo[j].name == homeTeam) {
                teamsInfo[j].homeGoals += homeTeamGoals;
              } else if (teamsInfo[j].name == awayTeam) {
                teamsInfo[j].awayGoals += awayTeamGoals;
              }
            }
          }
          console.log(teamsInfo);
          for (let i = 0; i < teamsInfo.length; i++) {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${teamsInfo[i].teamPosition}</td><td>${teamsInfo[i].name}</td><td>${teamsInfo[i].played}</td><td>${teamsInfo[i].won}</td><td>${teamsInfo[i].draw}</td><td>${teamsInfo[i].lost}</td><td>${teamsInfo[i].homeGoals}</td><td>${teamsInfo[i].awayGoals}</td><td>${teamsInfo[i].goalDifference}</td><td>${teamsInfo[i].points}</td><td>${teamsInfo[i].lastFive}</td>`;
            tbody.appendChild(tr);
          }
        });
    });
}

getRanking();
