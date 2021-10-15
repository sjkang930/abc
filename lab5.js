const fs = require('fs');
// hello world

fs.readFile('meals.csv', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const splitList = data.split('\n');
  splitList.sort();
  let itemObject = { lunch: [], dinner: [], dessert: [] };
  for (const element of splitList) {
    let values = element.split(',');
    const lunchOrDinner = values[0];
    const mealObj = { name: values[1], quantity: values[2], price: values[3] };
    itemObject[lunchOrDinner].push(mealObj);
}


  let content = '* Lunch Items *\n';
  for (let i = 0; i < itemObject.lunch.length; i++) {
    const item = itemObject.lunch[i];
    content += '$' + (parseFloat(item.price.replace('$','')) * 1.8).toFixed(2);
    content += '\t';
    content += item.name;
    content += ', ';
    content += item.quantity;
    content += '\n';
  }

  content += '\n';
  content += '* Dinner Items *\n';
  for (let i = 0; i < itemObject.dinner.length; i++) {
    const item = itemObject.dinner[i];
    content += '$' + (parseFloat(item.price.replace('$','')) * 1.8).toFixed(2);
    content += '\t';
    content += item.name;
    content += ', ';
    content += item.quantity;
    content += '\n';
  }

  fs.writeFile('meal.txt', content, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Finished!!');
  });
});
