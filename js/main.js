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

function getInfo(name) {
  event.preventDefault();
  var userlist = document.querySelector('#user-list');

  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  var targetUrl = encodeURIComponent('https://api-nba-v1.p.rapidapi.com/players?name=Williams&team=1&season=2021');

  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
  xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
  });

  // xhr.open('GET', 'https://api-nba-v1.p.rapidapi.com/players?name=Williams&team=1&season=2021');
  // xhr.open('GET', ('https://api-nba-v1.p.rapidapi.com/players?id=') + Math.floor(Math.random() * 450));
  // xhr.setRequestHeader('x-rapidapi-key', '1b8d6d3d44msh6a42d044a856858p1a0c39jsn1d0dcdaecf3d');
  // xhr.setRequestHeader('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');

  // xhr.send();
  console.log(xhr);
  console.log(data);

  xhr.addEventListener('load', function () {

    for (let i = 0; i < xhr.response.response.length; i++) {

      event.preventDefault();
      const player = xhr.response;
      var objectOne = {
        Name: 'Name: ' + player[i].firstName + ' ' + player[i].lastName,
        Height: 'Height: ' + player[i].heightInMeters,
        Weight: 'Weight: ' + player[i].weightInKilograms,
        YearsPro: 'Years Pro: ' + player[i].yearsPro,
        Education: 'Birth Place: ' + player[i].affiliation,
        Jerseynum: 'Jersey Number: ' + player[i].leagues.standard.jersey,
        Position: 'Position: ' + player[i].leagues.standard.pos,
        College: 'College ' + player[i].collegeName
      };
      data.entries.unshift(objectOne);
      form.reset();
      console.log(objectOne);
      playerinfo.appendChild(userlist);

      form.className = 'hidden';
      const team = document.createElement('ul');
      const list = document.createElement('ul');
      list.textContent = 'Name: ' + player[i].firstName + ' ' + player[i].lastName;
      const height = document.createElement('ul');
      height.textContent = 'Height: ' + player[i].heightInMeters;

      const weight = document.createElement('ul');
      weight.textContent = 'Weight: ' + player[i].weightInKilograms;
      const years = document.createElement('ul');
      years.textContent = 'Years Pro: ' + player[i].yearsPro;
      const education = document.createElement('ul');
      education.textContent = 'Birth Place: ' + player[i].affiliation;
      const jerseynum = document.createElement('ul');
      jerseynum.textContent = 'Jersey Number: ' + player[i].leagues.standard.jersey;
      const position = document.createElement('ul');
      position.textContent = 'Position: ' + player[i].leagues.standard.pos;
      const college = document.createElement('ul');
      college.textContent = 'College ' + player[i].collegeName;
      playerinfo.appendChild(jerseynum);
      playerinfo.appendChild(position);
      playerinfo.appendChild(college);
      playerinfo.appendChild(education);
      playerinfo.appendChild(years);
      playerinfo.appendChild(weight);
      playerinfo.appendChild(team);
      playerinfo.appendChild(height);
      userlist.appendChild(list);
    }

  });
  infointerior.className = 'hidden';

  return playerinfo;

}

form.addEventListener('submit', getInfo);
