/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable max-len */

function randInt(max) {
  return Math.floor(Math.random() * max);
}
function randMeals(data) {
  const random_meals = [];
  for (i = 0; i < 10; i++) {
    const current_random_meal = randInt(data.length - 1);
    random_meals.push(data[current_random_meal]);
    data.splice(current_random_meal, 1);
  }
  return random_meals;
}

async function dataHandler() {
  // getting data from the api
  const request = await fetch('/api/dining');
  const api_data = await request.json();
  const { data } = api_data;
  const table = document.querySelector('.table');

  console.log(data);

  data.forEach((element) => {
    console.log(element.hall_name);
    console.log(element.hall_address);
    console.log(element.hall_id);
    const appendItem = document.createElement('tr');
    appendItem.innerHTML = `<td>${element.hall_id}</td><td>${element.hall_name}</td><td>${element.hall_address}</td>`;
    table.append(appendItem);
  });
}
async function macrosData() {
  const request = await fetch('/api/macros');
  const api_data = await request.json();
  const {data} = api_data;
  const macro_data = [
    {
      type: 'stackedBar',
      name: 'Calories',
      showInLegend: 'true',
      dataPoints: []
    },

    {
      type: 'stackedBar',
      name: 'Serving Size',
      showInLegend: 'true',
      dataPoints: []
    },
    {
      type: 'stackedBar',
      name: 'Cholesterol',
      showInLegend: 'true',
      dataPoints: []
    },
    {
      type: 'stackedBar',
      name: 'Sodium',
      showInLegend: 'true',
      dataPoints: []
    },
    {
      type: 'stackedBar',
      name: 'Carbs',
      showInLegend: 'true',
      dataPoints: []
    },
    {
      type: 'stackedBar',
      name: 'Protein',
      showInLegend: 'true',
      dataPoints: []
    },
    {
      type: 'stackedBar',
      name: 'Fat',
      showInLegend: 'true',
      dataPoints: []
    }
  ];

  const randMealList = randMeals(api_data);

  for (i = 0; i < randMealList.length; i++) {
    element = randMealList[i];
    const nameRequest = await fetch(`/api/meals/${element.meal_id}`);
    const titleData = await nameRequest.json();
    console.log(titleData);

    macro_data[0].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.calories
    });
    macro_data[1].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.serving_size
    });
    macro_data[2].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.cholesterol
    });
    macro_data[3].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.sodium
    });
    macro_data[4].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.carbs
    });
    macro_data[5].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.protein
    });
    macro_data[6].dataPoints.push({
      label: titleData[0].meal_name,
      y: element.fat
    });
  }

  const chart = new CanvasJS.Chart('chartContainer', {
    title: {
      text: 'Macro Data'
    },
    data: macro_data
  });
  chart.render();
}

async function windowActions() {
  await dataHandler();
  await macrosData();
}

window.onload = windowActions;
