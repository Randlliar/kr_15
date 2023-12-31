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

    // getFigmaDesigner();
    // getReactDevOp();
    // isAdults();
    getBackEndDevOps();
    // getDesignerLevel();
    // getDevOpsTeam();
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
    //Нашел 2 способа находить возраст человека. Какой из них лучше?
    // const age = (currentDate.getTime() - birthday.getTime())/(1000*60*60*24*365);
    const age = new Date(currentDate - birthday).getFullYear() - new Date(0).getFullYear();
    return age > 18;
  })
  console.log('Всем есть 18?: ')
  console.log(personAge);
}

function getSalary(obj) {
  const salary = obj.request.find(item => {
    return item.name.toLowerCase() === 'зарплата';
  })
  // console.log(salary)
  return salary.value;
}

function getBackEndDevOps() {
  const city = cities.find(city => {
    return city.name.toLowerCase() === "москва";
  })

  const specialization = specializations.find(specialization => {
    return specialization.name.toLowerCase() === "backend";
  })

  const fullDay = persons.filter(person => {
    return person.request.find(item => {
      return item.value === 'Полная';
    })
  })

  const backEndDevOps = fullDay.filter(item => {
    return item.personal.locationId === city.id
      && item.personal.specializationId === specialization.id
  })
  console.log(backEndDevOps)

  backEndDevOps.sort(function (a, b) {
    return getSalary(a) - getSalary(b);
  })
  console.log(backEndDevOps)
}

function getDesignerLevel() {

  const designers = persons.filter(item => {
    const figmaPhotoshopSkills = item.skills.filter(skill => {
      return (skill.name.toLowerCase() === 'figma' || skill.name.toLowerCase() === 'photoshop') && skill.level >= 6;
    })
    return figmaPhotoshopSkills.length === 2;
  })
  console.log(designers)
}

function getRating(obj) {
  const rating = obj.skills.find(item => {
    return item.name.toLowerCase() === 'figma' || item.name.toLowerCase() === 'angular' || item.name.toLowerCase() === 'go';
  })
  return rating.level;
}

function getDevOpsTeam() {
  const designers = persons.filter(item => {
    return item.skills.find(skill => {
      return skill.name.toLowerCase() === 'figma';
    });
  })

  designers.sort(function (a, b) {
    return getRating(b) - getRating(a);
  })

  const frontEndDevOp = persons.filter(item => {
    return item.skills.find(skill => {
      return skill.name.toLowerCase() === 'angular';
    })
  })

  frontEndDevOp.sort(function (a, b) {
    return getRating(b) - getRating(a);
  });

  const backEndDevOp = persons.filter(item => {
    return item.skills.find(skill => {
      return skill.name.toLowerCase() === 'go';
    })
  })

  backEndDevOp.sort(function (a, b) {
    return getRating(b) - getRating(a);
  });

  getInfo.call(designers[0]);
  getInfo.call(frontEndDevOp[0]);
  getInfo.call(backEndDevOp[0]);
}