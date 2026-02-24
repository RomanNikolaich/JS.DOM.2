import { genTagsHead, genTagsBody } from "./generatores.js";

async function loadJSON() {
  try {
    const response = await fetch('films.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
   // console.log(data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

function renderFilms(films) {
  const filmsTable = document.createElement('table');
  document.querySelector('.conatiner').appendChild(filmsTable);

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  filmsTable.appendChild(thead);
  filmsTable.appendChild(tbody);

  const genHead = genTagsHead(films);
  for (const i of genHead) {
    thead.appendChild(i);
  };
  
  const genBody = genTagsBody(films);
  for (let i of genBody) {
    tbody.appendChild(i);
  };
};

function sortTable(column, ascending = true) {
  const tbody = document.querySelector('tbody');
  const thAll = document.querySelectorAll('th');
  const rows = Array.from(tbody.children);

  const isNumeric = column === 'id' || column === 'imdb' || column === 'year';

  rows.sort((rowA, rowB) => {
    let valA = rowA.dataset[column];
    let valB = rowB.dataset[column];

    if (isNumeric) {
      valA = parseFloat(valA) || 0;
      valB = parseFloat(valB) || 0;
      return ascending ? valA - valB : valB - valA;
    } else {
      const comparison = valA.localeCompare(valB, undefined, { numeric: false, sensitivity: 'base' });
      return ascending ? comparison : -comparison;
    }

  });
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));

  const actualTh = Array.from(thAll).find(th => th.dataset[column] !== undefined);

  thAll.forEach(th => th.classList.remove('sort-asc', 'sort-desc'));

  if (actualTh) {
    actualTh.classList.add(ascending ? 'sort-asc' : 'sort-desc');
  }
};

async function init() {
  const films = await loadJSON();
  //console.log([...films]);
  renderFilms(films);

  const columns = ['id', 'imdb', 'year', 'title'];
  let currentIndex = 0;
  let ascending = true;

  setInterval(() => {
    const column = columns[currentIndex];
    sortTable(column, ascending);
    
    currentIndex = (currentIndex + 1) % columns.length;
    
    if (currentIndex === 0) {
      ascending = !ascending;
    }
  }, 3000);

};

init();
