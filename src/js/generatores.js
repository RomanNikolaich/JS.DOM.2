export function* genTagsHead(films) {
  let tr = document.createElement('tr');
  let dataKeys = Object.keys(films[0]);
  for (let key of dataKeys) {
    const th = document.createElement('th');
    th.textContent = key;
    th.dataset[key] = key;
    tr.appendChild(th);
  yield tr
}};

export function* genTagsBody(films) {
   for (let idx = 0; idx <= [...films].length - 1; idx++) {
    let tr = document.createElement('tr');
    let dataKeys = Object.keys(films[idx]);
    for (let key of dataKeys) {
      tr.dataset[key] = films[idx][key];
      let td = document.createElement('td');
      if (key === 'imdb') {  
        td.textContent = parseFloat(films[idx][key]).toFixed(2);
      } else {
        td.textContent =  films[idx][key];
      }
      td.dataset[key] = key;
      tr.appendChild(td);
    }
    yield tr
  }
};
