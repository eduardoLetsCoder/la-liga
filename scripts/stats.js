let theadGoals = document.getElementById("teams-thead-goals");
let tbodyGoals = document.getElementById("teams-tbody-goals");
let theadDefense = document.getElementById("teams-thead-defense");
let tbodyDefense = document.getElementById("teams-tbody-defense");
let error = document.getElementById("error");
let loading = document.getElementById("loading");

function getInfo() {
  loading.innerHTML = "<p>Cargando...</p>";
  tbodyGoals.innerHTML = "";
  tbodyDefense.innerHTML = "";
  let url = "http://api.football-data.org/v2/competitions/2014/standings";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
    },
  })
    .then((response) => response.json())
    .then((info) => {
      loading.innerHTML = "";
      let teams = info.standings[0].table;
      let url =
        "https://api.football-data.org/v2/competitions/2014/matches";
      fetch(url, {
        method: "GET",
        headers: {
          "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let matches = data.matches;
          let statistics = [];
          for (let i = 0; i < teams.length; i++) {
            let teamStats = new Object();
            teamStats.name = teams[i].team.name;
            statistics.push(teamStats);
          }
          let sortedStatisticsGoals = [];
          theadGoals.innerHTML =
            "<th>Club</th><th>Media de goles marcados</th>";
          for (let i = 0; i < teams.length; i++) {
            let name = teams[i].team.name;
            let goals = teams[i].goalsFor;
            let played = teams[i].playedGames;
            let average = goals / played;
            let roundedAverage = round(average);
            for (let j = 0; j < statistics.length; j++) {
              if (statistics[i].name == name) {
                statistics[i].goalsAverage = roundedAverage;
              }
            }
          }
          sortedStatisticsGoals = statistics.sort((a, b) => {
            return b.goalsAverage - a.goalsAverage;
          });
          for (let i = 0; i < 5; i++) {
            let tr = document.createElement("tr");
            tr.innerHTML = `<tr><td>${sortedStatisticsGoals[i].name}</td><td class="flex-center">${sortedStatisticsGoals[i].goalsAverage}</td></tr>`;
            tbodyGoals.appendChild(tr);
          }
          theadDefense.innerHTML =
            "<th>Club</th><th>Media de goles encajados fuera de casa</th>";
          let sortedStatisticsDefense;
          for (let i = 0; i < statistics.length; i++) {
            let name = statistics[i].name;
            let totalGoalsAgainst = 0;
            let totalMatches = 0;
            for (let j = 0; j < matches.length; j++) {
              if (
                matches[j].awayTeam.name == name &&
                matches[j].status == "FINISHED"
              ) {
                let goalsAgainst =
                  matches[j].score.halfTime.homeTeam +
                  matches[j].score.fullTime.homeTeam;
                totalGoalsAgainst += goalsAgainst;
                totalMatches++;
              }
            }
            let average = totalGoalsAgainst / totalMatches;
            for (let j = 0; j < statistics.length; j++) {
              if (statistics[j].name == name) {
                statistics[j].awayGoalsAgainstAverge = round(average);
              }
            }
          }
          sortedStatisticsDefense = statistics.sort((a, b) => {
            return a.awayGoalsAgainstAverge - b.awayGoalsAgainstAverge;
          });
          for (let i = 0; i < 5; i++) {
            let tr = document.createElement("tr");
            tr.innerHTML = `<tr><td>${sortedStatisticsDefense[i].name}</td><td class="flex-center">${sortedStatisticsDefense[i].awayGoalsAgainstAverge}</td></tr>`;
            tbodyDefense.appendChild(tr);
          }
        });
    })
    .catch((err) => {
      console.log(err);
      let paragraph = document.createElement("p");
      loading.innerHTML = "";
      error.innerHTML = "<p>Ha ocurrido un error. Vuelva a intentarlo más tarde.</p>";
      error.appendChild(paragraph);
    });
}

function round(num, decimales = 2) {
  var signo = num >= 0 ? 1 : -1;
  num = num * signo;
  if (decimales === 0) return signo * Math.round(num);
  num = num.toString().split("e");
  num = Math.round(
    +(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
  );
  num = num.toString().split("e");
  return signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales));
}

getInfo();
