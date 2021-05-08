let tableCaption = document.getElementById("ranking-table-caption");
let thead = document.getElementById("ranking-thead");
let tbody = document.getElementById("ranking-tbody");

function getRanking() {
  thead.innerHTML = "<th>Posición</th><th>Equipo</th><th>Puntos</th><th>Partidos jugados</th>";
  let url = "http://api.football-data.org/v2/competitions/2014/standings"
  fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "875bb0b93478426fb1050e158da976cf"
    }
  })
    .then((response) => response.json())
    .then((data) => {
      let ranking = data.standings[0].table;
      let lastUpdated = data.competition.lastUpdated;
      let splitLastUpdated = lastUpdated.split("T");
      let lastUpdatedDate = splitLastUpdated[0];
      tableCaption.innerText = `CLASIFICACIÓN (${lastUpdatedDate})`;
      console.log(lastUpdatedDate);
      for (let i = 0; i < ranking.length; i++) {
        let position = ranking[i].position;
        let team = ranking[i].team.name;
        let points = ranking[i].points;
        let playedGames = ranking[i].playedGames;
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${position}</td><td>${team}</td><td>${points}</td><td>${playedGames}</td>`;
        tbody.appendChild(tr);
      }
    });
}

getRanking();
