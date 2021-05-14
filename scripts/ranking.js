let thead = document.getElementById("ranking-thead");
let tbody = document.getElementById("ranking-tbody");

function getRanking() {
  thead.innerHTML = "<th>Posición</th><th>Equipo</th><th>PJ</th><th>PG</th><th>Pts</th>";
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
      for (let i = 0; i < ranking.length; i++) {
        let position = ranking[i].position;
        let team = ranking[i].team.name;
        let points = ranking[i].points;
        let playedGames = ranking[i].playedGames;
        let wonGames = ranking[i].won;
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${position}</td><td>${team}</td><td>${playedGames}</td><td>${wonGames}</td><td>${points}</td>`;
        tbody.appendChild(tr);
      }
    });
}

getRanking();
