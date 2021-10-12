let thead = document.getElementById("thead");
let tbody = document.getElementById("tbody");
let error = document.getElementById("error");
let loading = document.getElementById("loading");

const getMatches = () => {
  let url =
    "https://api.football-data.org/v2/competitions/2014/matches?season=2021";
  let data = fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "928dd4e062654c76833a1d9ebc7eb435",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      cleanLoading();
      return data.matches;
    })
    .catch((error) => {
      cleanLoading();
      drawError(`<p>Ha ocurrido el siguiente error: ${error}</p>`);
    });
  return data;
};

const drawThead = () => {
  thead.innerHTML = "<th>Club</th><th>Goles</th><th>Partidos</th><th>Media</th>";
};

const drawLoading = () => {
  loading.innerHTML = "<p>Cargando...</p>";
};

const cleanTable = () => {
  tbody.innerHTML = "";
};

const cleanLoading = () => {
  loading.innerHTML = "";
};

const drawError = (errorHTML) => {
  error.innerHTML = errorHTML;
};

const cleanError = () => {
  error.innerHTML = "";
};

const init = async () => {
  cleanTable();
  cleanError();
  drawLoading();
  drawThead();
  let matches = await getMatches();
  let top = getAverage(matches);
  drawTop(top);
};

const getAverage = (matches) => {
  let allMatches = matches;
  let teams = [];
  for (let i = 0; i < allMatches.length; i++) {
    let match = allMatches[i];
    if (matches[i].status != "FINISHED") {
      continue;
    }
    let homeTeamRepeated = false;
    let awayTeamRepeated = false;
    teams.forEach((team) => {
      if (match.homeTeam.id == team.id) {
        homeTeamRepeated = true;
      }
      if (match.awayTeam.id == team.id) {
        awayTeamRepeated = true;
      }
    });
    if (homeTeamRepeated == false) {
      let homeTeamObject = {
        id: match.homeTeam.id,
        name: match.homeTeam.name,
        goals: 0,
        matches: 0,
        average: 0,
      };
      teams.push(homeTeamObject);
    }
    if (awayTeamRepeated == false) {
      let awayTeamObject = {
        id: match.awayTeam.id,
        name: match.awayTeam.name,
        goals: 0,
        matches: 0,
        average: 0,
      };
      teams.push(awayTeamObject);
    }
    teams.forEach((team) => {
      if (team.id == match.homeTeam.id) {
        team.goals += match.score.fullTime.homeTeam;
        team.matches++;
      } else if (team.id == match.awayTeam.id) {
        team.goals += match.score.fullTime.awayTeam;
        team.matches++;
      }
    });
  }
  teams.forEach((team) => {
    team.average = (team.goals / team.matches).toFixed(2);
  });
  teams.sort((a, b) => {
    return b.average - a.average;
  });
  return (top5 = teams.slice(0, 5));
};

const drawTop = (teams) => {
  teams.forEach((team) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<tr><td><img class="logo" src="https://crests.football-data.org/${team.id}.svg" />${team.name}</td><td>${team.goals}</td><td>${team.matches}</td><td>${team.average}</td></tr>`;
    tbody.appendChild(tr);
  });
};

init();
