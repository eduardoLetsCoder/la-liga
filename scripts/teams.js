let tableCaption = document.getElementById("teams-table-caption");
let thead = document.getElementById("teams-thead");
let tbody = document.getElementById("teams-tbody");

function getTeams(whichTeams) {
  tbody.innerHTML = "";
  thead.innerHTML =
    "<th>Nombre</th><th>Goles a favor</th><th>Goles en contra</th><th>Diferencia de goles</th>";
  let url = "http://api.football-data.org/v2/competitions/2014/standings";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let info = data.standings[0].table;
      if (whichTeams == "all") {
        tableCaption.innerText = "Todos los equipos de La Liga";
        for (let i = 0; i < info.length; i++) {
          let tr = document.createElement("tr");
          tr.innerHTML = `<tr><td>${info[i].team.name}</td><td>${info[i].goalsFor}</td><td>${info[i].goalsAgainst}</td><td>${info[i].goalDifference}</td></tr>`;
          tbody.appendChild(tr);
        }
      } else if (whichTeams == "topFiveInGoals") {
        tableCaption.innerText = "Equipos más goleadores";
        let infoGoals = [];
        for (let i = 0; i < info.length; i++) {
          let goals = info[i].goalsFor;
          infoGoals.push(goals);
        }
        let sortedInfoGoals = [];
        sortedInfoGoals = infoGoals.sort((a, b) => {
          return b - a;
        });
        let firstFive = [];
        for (let i = 0; i < 5; i++) {
          firstFive.push(sortedInfoGoals[i]);
        }
        let sortedInfo = [];
        for (let i = 0; i < firstFive.length; i++) {
          for (let j = 0; j < info.length; j++) {
            if (info[j].goalsFor == firstFive[i]) {
              sortedInfo.push(info[j]);
            }
          }
        }
        for (let i = 0; i < sortedInfo.length; i++) {
          let tr = document.createElement("tr");
          tr.innerHTML = `<tr><td>${sortedInfo[i].team.name}</td><td>${sortedInfo[i].goalsFor}</td><td>${sortedInfo[i].goalsAgainst}</td><td>${sortedInfo[i].goalDifference}</td></tr>`;
          tbody.appendChild(tr);
        }
      } else if (whichTeams == "topFiveDefenders") {
        tableCaption.innerText = "Mejores equipos en defensa";
        let infoGoals = [];
        for (let i = 0; i < info.length; i++) {
          let goals = info[i].goalsAgainst;
          infoGoals.push(goals);
        }
        let sortedInfoGoals = [];
        sortedInfoGoals = infoGoals.sort((a, b) => {
          return a - b;
        });
        let firstFive = [];
        for (let i = 0; i < 5; i++) {
          firstFive.push(sortedInfoGoals[i]);
        }
        let sortedInfo = [];
        for (let i = 0; i < firstFive.length; i++) {
          for (let j = 0; j < info.length; j++) {
            if (info[j].goalsAgainst == firstFive[i]) {
              sortedInfo.push(info[j]);
            }
          }
        }
        for (let i = 0; i < sortedInfo.length; i++) {
          let tr = document.createElement("tr");
          tr.innerHTML = `<tr><td>${sortedInfo[i].team.name}</td><td>${sortedInfo[i].goalsFor}</td><td>${sortedInfo[i].goalsAgainst}</td><td>${sortedInfo[i].goalDifference}</td></tr>`;
          tbody.appendChild(tr);
        }
      }
    });
}

function getAverages(goalsOrDefense) {
  tbody.innerHTML = "";
  let url = "http://api.football-data.org/v2/competitions/2014/standings";
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf",
    },
  })
    .then((response) => response.json())
    .then((info) => {
      let teams = info.standings[0].table;
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
          console.log(teams);
          console.log(matches);
          let statistics = [];
          for (let i = 0; i < teams.length; i++) {
            let teamStats = new Object();
            teamStats.name = teams[i].team.name;
            statistics.push(teamStats);
          }
          if (goalsOrDefense == "goals") {
            tableCaption.innerText = "Equipos con mayor media de goles por partido";
            let orderedStatistics = [];
            thead.innerHTML = "<th>Nombre</th><th>Media de goles marcados</th>";
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
            orderedStatistics = statistics.sort((a, b) => {
              return b.goalsAverage - a.goalsAverage;
            });
            for (let i = 0; i < 5; i++) {
              let tr = document.createElement("tr");
              tr.innerHTML = `<tr><td>${orderedStatistics[i].name}</td><td>${orderedStatistics[i].goalsAverage}</td></tr>`;
              tbody.appendChild(tr);
            }
          } else if (goalsOrDefense == "defense") {
            thead.innerHTML =
              "<th>Nombre</th><th>Media de goles encajados</th>";
          }
        });
    });
}

function round(num, decimales = 2) {
  var signo = num >= 0 ? 1 : -1;
  num = num * signo;
  if (decimales === 0)
    //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split("e");
  num = Math.round(
    +(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
  );
  // x * 10 ^ (-decimales)
  num = num.toString().split("e");
  return signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales));
}

getTeams("all");
