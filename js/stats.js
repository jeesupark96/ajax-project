const stats = document.querySelector('.stats');
const scorepage = document.querySelector('.scoreinfo');
const playerchart = document.querySelector('#playerchart');
const teamchart = document.querySelector('#teamchart');
const rosterchart = document.querySelector('#rosterchart');
const chart = document.querySelector('#myChart');

function getName(name) {

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log('hello');
    }
  });

  var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/teams');

  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
  xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response.response);
    console.log(xhr);
  });

  xhr.send();

  xhr.addEventListener('load', function () {
    const team = xhr.response.response;
    console.log(xhr.response.response.length);

    for (let i = 0; i < team.length; i++) {
      if (team[i].nbaFranchise === true) {
        const newlist = document.createElement('ul');
        const logo = document.createElement('img');
        newlist.addEventListener('click', () => {
          if (event.target.textContent === team[i].name) {
            console.log(team[i].id);
            rosterchart.className = 'main';
            teamchart.className = 'hidden';

            const xhs = new XMLHttpRequest();
            xhs.withCredentials = false;

            xhs.addEventListener('readystatechange', function () {
              if (this.readyState === this.DONE) {
                console.log(this.response);
              }
            });

            xhs.open('GET', 'https://api-nba-v1.p.rapidapi.com/players?team=' + team[i].id + '&season=2022');
            xhs.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
            xhs.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
            xhs.responseType = 'json';
            xhs.addEventListener('load', function () {
              const teamname = (xhs.response.response);

              for (let i = 0; i < teamname.length; i++) {
                const roster = document.createElement('ul');
                roster.textContent = (teamname[i].firstname + ' ' + teamname[i].lastname);
                rosterchart.appendChild(roster);
                roster.addEventListener('click', () => {

                  const xhr = new XMLHttpRequest();
                  xhr.withCredentials = false;

                  xhr.addEventListener('readystatechange', function () {
                    if (this.readyState === this.DONE) {
                      console.log(this.json);
                    }
                  });

                  xhr.open('GET', 'https://api-nba-v1.p.rapidapi.com/players/statistics?id=' + teamname[i].id + '&season=2022');
                  xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
                  xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
                  xhr.responseType = 'json';
                  xhr.addEventListener('load', function () {
                    console.log(xhr.response.response);
                    console.log(xhr);
                  });
                  xhr.addEventListener('load', function () {
                    console.log(xhr);
                    const points = [];
                    const assists = [];
                    const pergame = [];
                    const rebounds = [];
                    const steals = [];
                    const blocks = [];
                    const tos = [];
                    const fgp = [];
                    const threes = [];
                    const ftp = [];

                    for (let i = 0; i < xhr.response.response.length; i++) {
                      const player = xhr.response.response[i];
                      points.push(player.points);
                      assists.push(player.assists);
                      rebounds.push(player.totReb);
                      steals.push(player.steals);
                      blocks.push(player.blocks);
                      tos.push(player.turnovers);
                      fgp.push(player.fgp);
                      threes.push(player.tpm);
                      ftp.push(player.ftp);
                      pergame.push(i);

                    }
                    const player = xhr.response.response[i];
                    console.log(xhr.response.response);
                    const newChart = new Chart('myChart', {
                      type: 'line',
                      data: {
                        labels: pergame,
                        datasets: [{
                          fill: false,
                          label: 'Points',
                          lineTension: 0,
                          backgroundColor: 'rgba(0,0,255,1.0)',
                          borderColor: 'rgba(0,0,255,0.1)',
                          data: points
                        },
                        {
                          data: assists,
                          borderColor: 'green',
                          label: 'assists',
                          fill: false
                        }, {
                          data: rebounds,
                          borderColor: 'blue',
                          label: 'rebounds',
                          fill: false
                        },
                        {
                          data: steals,
                          borderColor: 'black',
                          label: 'steals',
                          fill: false
                        }, {
                          data: tos,
                          borderColor: 'yellow',
                          label: 'turnovers',
                          fill: false
                        },
                        {
                          data: blocks,
                          borderColor: 'orange',
                          label: 'blocks',
                          fill: false
                        }, {
                          data: fgp,
                          borderColor: 'grey',
                          label: 'fg %',
                          fill: false
                        },
                        {
                          data: threes,
                          borderColor: 'orange',
                          label: 'threes',
                          fill: false
                        }, {
                          data: ftp,
                          borderColor: 'red',
                          label: 'ft %',
                          fill: false
                        }]
                      },
                      options: {
                        responsive: true,
                        legend: { display: true },
                        title: {
                          display: true,
                          text: player.player.firstname + ' ' + player.player.lastname + ' 2022 Season Stats'
                        },
                        scales: {

                          yAxes: [{ ticks: { min: 0, max: 100 } }],
                          xValues: [{ ticks: { min: 1, max: 82 } }]
                        }
                      }
                    });
                    stats.addEventListener('click', () => {
                      newChart.destroy();
                    });
                    returntoteam.addEventListener('click', () => {
                      newChart.destroy();

                    });
                    playerpage.addEventListener('click', () => {
                      newChart.destroy();

                    });
                  });

                  xhr.send();

                });

              }
              rosterchart.addEventListener('click', () => {
                playerchart.className = 'main';
                rosterchart.className = 'hidden';
              });
            });
            xhs.send();
          }

        });
        newlist.textContent = team[i].name;
        logo.src = team[i].logo;

        teamchart.appendChild(newlist);
        newlist.appendChild(logo);
        teamchart.className = 'main';
      }
    }
    return teamchart;
  }
  );
}

stats.addEventListener('click', getName);

stats.addEventListener('click', () => {
  playerpage.className = 'hidden';
  mainpage.className = 'hidden';
  scoreinfo.textContent = '';
  findinfo.className = 'hidden';
  roster.className = 'hidden';
  playeridinfo.className = 'hidden';
  rosterchart.className = 'hidden';
  teamchart.textContent = ' ';
  rosterchart.textContent = ' ';
  returntoteam.className = 'returntoteam';
});
