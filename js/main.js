const beginbut = document.querySelector('.begin');
const openpage = document.querySelector('.open-page');
const infopage = document.querySelector('.hidden');
const form = document.querySelector('.form');
const infointerior = document.querySelector('.infointerior');
const playerinfo = document.querySelector('.diventry');
const playersearch = document.querySelector('.infoname');
const backtoplayer = document.querySelector('.return');
const newdiv = document.querySelector('.singplayerinfo');
const homepage = document.querySelector('.infohead');

console.log(backtoplayer);
beginbut.addEventListener('click', function () {
  openpage.className = 'hidden';
  infopage.className = 'find-info';
});
const playerdata = {};

function getName(name) {
  playerdata.name = playersearch.value;
  console.log('playerdata', playerdata);
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.json);
    }
  });
  var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/players?name=' + playerdata.name);

  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
  xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response.response);
    console.log(xhr);
  });

  xhr.send();
  console.log(xhr);
  console.log(data);

  xhr.addEventListener('load', function () {
    console.log(xhr.response.response.length);
    const player = xhr.response.response;
    for (let i = 0; i <= player.length; i++) {

      var objectOne = {
        Name: player[i].firstname + ' ' + player[i].lastname,
        ID: player[i].id,
        Height: 'Height: ' + player[i].height.feets + '"' + player[i].height.inches,
        Weight: 'Weight: ' + player[i].weight.pounds,
        YearsPro: 'Years Pro: ' + player[i].nba.pro,
        Education: 'Education: ' + player[i].college,
        College: 'College: ' + player[i].college,
        Position: 'Position: ' + player[i].leagues.standard.pos,
        JerseyNo: 'Jersey Number: ' + player[i].leagues.standard.jersey
      };
      data.entries.unshift(objectOne);

      console.log(objectOne);

      form.className = 'hidden';
      const list = document.createElement('ul');
      list.setAttribute('id', 'playername');
      list.textContent = objectOne.Name;
      const height = document.createElement('ul');
      height.textContent = objectOne.Height;
      const weight = document.createElement('ul');
      weight.textContent = objectOne.Weight;
      const years = document.createElement('ul');
      years.textContent = objectOne.YearsPro;
      const education = document.createElement('ul');
      education.textContent = objectOne.Education;
      const jerseynum = document.createElement('ul');
      jerseynum.textContent = objectOne.JerseyNo;
      const position = document.createElement('ul');
      position.textContent = objectOne.Position;
      const college = document.createElement('ul');
      college.textContent = objectOne.College;
      playerinfo.appendChild(list);
      // playerinfo.appendChild(height);
      // playerinfo.appendChild(weight);
      // playerinfo.appendChild(years);
      // playerinfo.appendChild(college);
      // playerinfo.appendChild(education);
      // playerinfo.appendChild(jerseynum);
      // playerinfo.appendChild(position);
      playerinfo.className = 'diventry';

      form.reset();
    }
  }

  );
  infointerior.className = 'hidden';

  return playerinfo;

}

form.addEventListener('submit', getName);

function getInfo(event) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  for (let i = 0; i < data.entries.length; i++) {
    if (event.target.textContent === data.entries[i].Name) {
      const newinfo = data.entries[i];
      var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/players?id=' + data.entries[i].ID);
      xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
      xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
      xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        console.log(xhr.response.response[0]);
        console.log(xhr);
      });
      xhr.send(data);
      xhr.addEventListener('load', function () {
        const player = xhr.response.response[0];
        if (player.id === data.entries[i].ID) {
          var ObjectTwo = {
            Name: newinfo.Name,
            ID: newinfo.ID,
            Height: newinfo.Height,
            Weight: newinfo.Weight,
            YearsPro: newinfo.YearsPro,
            Education: newinfo.Education,
            College: newinfo.College,
            Position: newinfo.Position,
            JerseyNo: newinfo.JerseyNo
          };
          xhr.addEventListener('load', function () {
            console.log(xhr.response.response);
            console.log(xhr);
          });
        }
        console.log(ObjectTwo);
        const list = document.createElement('ul');
        list.textContent = ObjectTwo.Name;
        const height = document.createElement('ul');
        height.textContent = ObjectTwo.Height;
        const weight = document.createElement('ul');
        weight.textContent = ObjectTwo.Weight;
        const years = document.createElement('ul');
        years.textContent = ObjectTwo.YearsPro;
        const education = document.createElement('ul');
        education.textContent = ObjectTwo.Education;
        const jerseynum = document.createElement('ul');
        jerseynum.textContent = ObjectTwo.JerseyNo;
        const position = document.createElement('ul');
        position.textContent = ObjectTwo.Position;
        const college = document.createElement('ul');
        college.textContent = ObjectTwo.College;
        newdiv.append(list, height, weight, years, education, jerseynum, position, college);
      });

      playerinfo.className = 'hidden';

    }

  }

}
backtoplayer.addEventListener('click', () => {
  playerinfo.className = 'diventry';
  newdiv.textContent = ' ';
});
playerinfo.addEventListener('click', getInfo);
console.log(data.entries);

homepage.addEventListener('click', () => {
  playerinfo.textContent = '';
  openpage.className = 'open-page';
  infopage.className = 'hidden';
  infointerior.className = 'infointerior';
  playerinfo.className = 'hidden';
  newdiv.textContent = ' ';
  form.className = 'form';
});
