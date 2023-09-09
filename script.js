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

    getInfo.call(persons);
  })


function getInfo() {
  this.forEach(item => {
    const {firstName, lastName, locationId} = item.personal;
    const city = cities.find(city => {
      return city.id === locationId;
    })
    console.log(`${firstName} ${lastName}, ${city.name}`)
  })

  const figmaDesigners = this.filter(item => {
    return item.skills.find(category => {
      return category.name.toLowerCase() === figmaSkill;
    })
  })
  console.log(figmaDesigners);

  const reactDeveloper = this.find(item => {
    return item.skills.find(category => {
      return category.name.toLowerCase() === reactSkill;
    })
  })
  console.log(reactDeveloper)

}
