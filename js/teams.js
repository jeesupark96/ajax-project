const teams = document.querySelector('.teams');
const mainpage = document.querySelector('.open-page');
const playerpage = document.querySelector('.mainpage');
const findinfo = document.querySelector('#find-info');
const scoreinfo = document.querySelector('.scoreform');
const teamroster = document.querySelector('#roster');
const returntoteam = document.querySelector('#returntoteam');
const playeridinfo = document.querySelector('#playeridinfo');
teams.addEventListener('click', () => {
  mainpage.className = 'hidden main';
  findinfo.className = 'hidden';
  scoreinfo.className = 'scoreinfo';
  teamroster.className = 'hidden';
  scoreinfo.textContent = ' ';
  returntoteam.className = 'returntoteam';
  teamchart.textContent = ' ';
  rosterchart.textContent = ' ';
});

playerpage.addEventListener('click', () => {
  mainpage.className = 'main';
  playerpage.className = 'hidden';
  mainpage.className = 'open-page';
  returntoteam.className = 'hidden';
  scoreinfo.className = 'hidden';
  roster.className = 'hidden';
  playeridinfo.className = 'hidden';
  rosterchart.textContent = ' ';
  teamchart.textContent = ' ';
  teamchart.className = 'hidden';
});
function getName(name) {

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log('');
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

    for (let i = 0; i < team.length; i++) {
      const team = xhr.response.response;
      if (team[i].nbaFranchise === true) {
        const newlist = document.createElement('ul');
        const logo = document.createElement('img');
        newlist.addEventListener('click', () => {
          if (event.target.textContent === team[i].name) {
            console.log(team[i].id);
            teamroster.className = 'main';
            scoreinfo.className = 'hidden';
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
                teamroster.appendChild(roster);
                roster.addEventListener('click', () => {
                  console.log(teamname[i].id);

                  const xhs = new XMLHttpRequest();
                  xhs.withCredentials = false;

                  xhs.addEventListener('readystatechange', function () {
                    if (this.readyState === this.DONE) {
                      console.log(this.response);
                    }
                  });
                  var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/players?id=' + teamname[i].id);

                  xhs.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
                  xhs.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
                  xhs.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
                  xhs.responseType = 'json';
                  xhs.addEventListener('load', function () {
                    console.log(xhs.response.response);
                    console.log(xhs);
                    const playerid = xhs.response.response;
                    const playerinfoid = document.createElement('ul');
                    playerinfoid.textContent = playerid[0].firstname + ' ' + playerid[0].lastname;
                    const height = document.createElement('ul');
                    height.textContent = 'Height: ' + playerid[0].height.feets + "'" + playerid[0].height.inches;
                    const weight = document.createElement('ul');
                    weight.textContent = 'Weight: ' + playerid[0].weight.pounds;
                    const years = document.createElement('ul');
                    years.textContent = 'Years Pro: ' + playerid[0].nba.pro;
                    const education = document.createElement('ul');
                    education.textContent = 'College: ' + playerid[0].college;
                    const jerseynum = document.createElement('ul');
                    jerseynum.textContent = 'Jersey #: ' + playerid[0].leagues.standard.jersey;
                    const position = document.createElement('ul');
                    position.textContent = 'Position: ' + playerid[0].leagues.standard.pos;
                    playeridinfo.append(playerinfoid, height, weight, years, education, jerseynum, position);

                  });

                  xhs.send();
                });

              }

            });
            teamroster.addEventListener('click', () => {
              playeridinfo.className = 'main';
              teamroster.className = 'hidden';
            });
            xhs.send();
          }
        });

        newlist.textContent = team[i].name;
        logo.src = team[i].logo;

        scoreinfo.appendChild(newlist);
        newlist.appendChild(logo);

      }
    }
    return scoreinfo;
  }

  );

}

returntoteam.addEventListener('click', () => {
  teamroster.className = 'hidden';
  scoreinfo.className = 'main';
  playeridinfo.textContent = ' ';
  teamroster.textContent = ' ';
  rosterchart.textContent = ' ';
  teamchart.className = 'main';

});

teams.addEventListener('click', getName);
