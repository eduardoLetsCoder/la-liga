let thead = document.getElementById("ranking-thead");
let tbody = document.getElementById("ranking-tbody");
let error = document.getElementById("error");
let loading = document.getElementById("loading");

function getRanking() {
  loading.innerHTML = "<p>Cargando...</p>";
  thead.innerHTML =
    "<th>Posición</th><th>Club</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GC</th><th>GF</th><th>DG</th><th>Pts</th><th>Últimos 5</th>";
  let rankingUrl =
    "http://api.football-data.org/v2/competitions/2014/standings?season=2020";
  let info = fetch(rankingUrl, {
    method: "GET",
    headers: {
      "X-Auth-Token": "928dd4e062654c76833a1d9ebc7eb435",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loading.innerHTML = "";
      return data.standings[0].table;
    })
    .catch((error) => {
      loading.innerHTML = "";
      error.innerHTML = `<p>Ha ocurrido el siguiente error: ${error}</p>`;
    });
  return info;
}

const drawRanking = (teamsInfo) => {
  console.log(teamsInfo);
  for (let i = 0; i < teamsInfo.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${teamsInfo[i].position}</td><td><img class="logo" src="https://crests.football-data.org/${teamsInfo[i].team.id}.svg" />${teamsInfo[i].team.name}</td><td>${teamsInfo[i].playedGames}</td><td>${teamsInfo[i].won}</td><td>${teamsInfo[i].draw}</td><td>${teamsInfo[i].lost}</td><td>${teamsInfo[i].goalsAgainst}</td><td>${teamsInfo[i].goalsFor}</td><td>${teamsInfo[i].goalDifference}</td><td>${teamsInfo[i].points}</td><td>${teamsInfo[i].form}</td>`;
    tbody.appendChild(tr);
  }
};

const init = async () => {
  let teams = await getRanking();
  drawRanking(teams);
};

init();
