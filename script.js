let cities = [];
let persons = [];
let specializations = [];

const figmaSkill = 'figma';
const reactSkill = 'react';

Promise.all(
  [
    fetch('cities.json'),
    fetch('person.json'),
    fetch('specializations.json'),
  ]
).then(async ([citiesResponse, personResponse, specializationsResponse]) => {
  const citiesJson = await citiesResponse.json();
  const personJson = await personResponse.json();
  const specializationsJson = await specializationsResponse.json();
  return [citiesJson, personJson, specializationsJson]
})
  .then(response => {
    cities = response[0];
    persons = response[1];
    specializations = response[2];

    getFigmaDesigner();
    getReactDevOp();
    isAdults();
  })


function getInfo() {
    const {firstName, lastName, locationId} = this.personal;
    const city = cities.find(city => {
      return city.id === locationId;
    })
    console.log(`${firstName} ${lastName}, ${city.name}`)

}

function getFigmaDesigner() {
  const figmaDesigners = persons.filter(item => {
    return item.skills.find(category => {
      return category.name.toLowerCase() === figmaSkill;
    })
  })
  console.log('Владеет Figma: ')
  figmaDesigners.forEach(designer => {
    getInfo.call(designer);
  })
}

function getReactDevOp() {
  const reactDeveloper = persons.find(item => {
    return item.skills.find(category => {
      return category.name.toLowerCase() === reactSkill;
    })
  })
  console.log('Владеет React: ')
  getInfo.call(reactDeveloper);
}

function isAdults() {
  const personAge = persons.every(item => {
    const currentDate = new Date();
    const dateParts = item.personal.birthday.split('.');
    const birthday = new Date(+dateParts[2], +dateParts[1], +dateParts[0]);
    const age = (currentDate.getTime() - birthday.getTime())/(1000*60*60*24*365);
    return age > 18;
  })
  console.log(personAge)
}

