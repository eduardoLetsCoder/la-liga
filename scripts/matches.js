let thead = document.getElementById("matches-thead");
let tbody = document.getElementById("matches-tbody");
let error = document.getElementById("error");
let loading = document.getElementById("loading");
let radios = document.getElementsByClassName("radio-input");
let teamInput = document.getElementById("teamName");
let searchButton = document.getElementById("search-matches");
let allButton = document.getElementById("all-button");

let init = async () => {
  let apiMatches = await getMatches();
  console.log(apiMatches);
  allButton.addEventListener("click", () => {
    cleanTable();
    drawMatches(apiMatches);
  });
  searchButton.addEventListener("click", () => {
    filter(apiMatches);
  });
  if (apiMatches) {
    drawMatches(apiMatches);
  } else {
    drawError("<p>No se han encontrado partidos.</p>");
  }
};

const getMatches = () => {
  cleanError();
  drawLoading();
  cleanTable();
  drawThead();
  let url =
    "https://api.football-data.org/v2/competitions/2014/matches?season=2021";
  let info = fetch(url, {
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
      drawError(`<p>Ha ocurrido el siguiente error: ${error}</p>`);
      cleanLoading();
    });
  return info;
};

const drawMatches = (matches) => {
  cleanInput();
  matches.forEach((match) => {
    let score = "";
    if (match.status == "FINISHED") {
      score = `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`;
    } else {
      score = "PENDIENTE";
    }
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${match.homeTeam.name}</td><td><img class="logo" src="https://crests.football-data.org/${match.homeTeam.id}.svg" />${score}<img class="logo" src="https://crests.football-data.org/${match.awayTeam.id}.svg"/></td><td>${match.awayTeam.name}</td>`;
    tbody.appendChild(tr);
  });
};

const drawThead = () => {
  thead.innerHTML = "<th>Local</th><th>Resultado</th><th>Visitante</th>";
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

const cleanInput = () => {
  teamInput.value = "";
};

const filter = (matches) => {
  let checkedRadio = "";
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked == true) {
      checkedRadio = radios[i].id;
    }
  }
  if (teamInput.value == "" && checkedRadio == "") {
    drawMatches(matches);
  } else if (checkedRadio == "radio-won") {
    if (teamInput.value == "") {
      cleanTable();
      drawError("<p>Pon un equipo o algo.</p>");
    } else {
      let selectedMatches = [];
      matches.forEach((match) => {
        if (
          (match.homeTeam.name == teamInput.value &&
            match.score.winner == "HOME_TEAM") ||
          (match.awayTeam.name == teamInput.value &&
            match.score.winner == "AWAY_TEAM")
        ) {
          selectedMatches.push(match);
        }
      });
      cleanTable();
      drawMatches(selectedMatches);
    }
  } else if (checkedRadio == "radio-draw") {
    if (teamInput.value == "") {
      cleanTable();
      drawError("<p>Pon un equipo o algo.</p>");
    } else {
      let selectedMatches = [];
      matches.forEach((match) => {
        if (
          (match.homeTeam.name == teamInput.value &&
            match.score.winner == "DRAW") ||
          (match.awayTeam.name == teamInput.value &&
            match.score.winner == "DRAW")
        ) {
          selectedMatches.push(match);
        }
      });
      cleanTable();
      drawMatches(selectedMatches);
    }
  } else if (checkedRadio == "radio-lost") {
    if (teamInput.value == "") {
      cleanTable();
      drawError("<p>Pon un equipo o algo.</p>");
    } else {
      let selectedMatches = [];
      matches.forEach((match) => {
        if (
          (match.homeTeam.name == teamInput.value &&
            match.score.winner == "AWAY_TEAM") ||
          (match.awayTeam.name == teamInput.value &&
            match.score.winner == "HOME_TEAM")
        ) {
          selectedMatches.push(match);
        }
      });
      cleanTable();
      drawMatches(selectedMatches);
    }
  } else if (checkedRadio == "radio-all" || checkedRadio == "") {
    if (teamInput.value == "") {
      cleanTable();
      drawError("<p>Pon un equipo o algo.</p>");
    } else {
      let selectedMatches = [];
      matches.forEach((match) => {
        if (
          match.homeTeam.name == teamInput.value ||
          match.awayTeam.name == teamInput.value
        ) {
          selectedMatches.push(match);
        }
      });
      cleanTable();
      drawMatches(selectedMatches);
    }
  }
};

init();
