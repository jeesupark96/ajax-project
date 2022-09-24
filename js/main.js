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

  xhr.open('GET', 'https://api-nba-v1.p.rapidapi.com/players?name=James');
  // xhr.open('GET', ('https://api-nba-v1.p.rapidapi.com/players?id=') + Math.floor(Math.random() * 450));

  xhr.setRequestHeader('X-RapidAPI-Key', '4f342a5e8emsh1448e6e6d8cb504p1ed7bejsn9179a8339002');
  xhr.setRequestHeader('X-RapidAPI-Host', 'api-nba-v1.p.rapidapi.com');

  xhr.send(data);

  console.log(xhr.response.players);

  xhr.addEventListener('load', function () {

    for (let i = 0; i < xhr.response.api.players.length; i++) {

      event.preventDefault();
      var objectOne = {
        Name: 'Name: ' + xhr.response.api.players[i].firstName + ' ' + xhr.response.api.players[i].lastName,
        Height: 'Height: ' + xhr.response.api.players[i].heightInMeters,
        Weight: 'Weight: ' + xhr.response.api.players[i].weightInKilograms,
        YearsPro: 'Years Pro: ' + xhr.response.api.players[i].yearsPro,
        Education: 'Birth Place: ' + xhr.response.api.players[i].affiliation,
        Jerseynum: 'Jersey Number: ' + xhr.response.api.players[i].leagues.standard.jersey,
        Position: 'Position: ' + xhr.response.api.players[i].leagues.standard.pos,
        College: 'College ' + xhr.response.api.players[i].collegeName
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
