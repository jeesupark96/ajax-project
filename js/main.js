const beginbut = document.querySelector('.begin');
const openpage = document.querySelector('.open-page');
const infopage = document.querySelector('.hidden');
const form = document.querySelector('.form');
const infointerior = document.querySelector('.infointerior');
const playerinfo = document.querySelector('.diventry');
beginbut.addEventListener('click', function () {
  openpage.className = 'hidden';
  infopage.className = 'find-info';
});

function getName(name) {

  event.preventDefault();
  var userlist = document.querySelector('#user-list');

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.json);
    }
  });
  var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/players?name=James');

  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
  xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response.response);
    console.log(xhr);
  });

  // xhr.open('GET', 'https://api-nba-v1.p.rapidapi.com/players?name=Williams&team=1&season=2021');
  // xhr.open('GET', ('https://api-nba-v1.p.rapidapi.com/players?id=') + Math.floor(Math.random() * 450));
  // xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
  // xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');

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
        College: 'College ' + player[i].college
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
      jerseynum.textContent = objectOne.Jerseynum;
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
      form.reset();
    }
  }

  );
  infointerior.className = 'hidden';

  return playerinfo;

}
console.log(data.entries);

form.addEventListener('submit', getName);

const playername = document.querySelector('#playername');
function getInfo(event) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].Name === event.target.textContent) {
      console.log(data.entries[i].ID);
      var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/players?id=' + data.entries[i].ID);
      xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
      xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
      xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        console.log((xhr.response.response[0]));
        console.log(xhr);

      });

      xhr.send(data);
    }
  }
}

playerinfo.addEventListener('click', getInfo);
