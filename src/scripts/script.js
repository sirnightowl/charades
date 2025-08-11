document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result');
  const resultTitle = document.getElementById('result-title');
  const resultCategory = document.getElementById('result-category');
  const resultAuthor = document.getElementById('result-author');
  const resultYear = document.getElementById('result-year');

  const buttons = {
    film: document.getElementById('getfilm'),
    show: document.getElementById('getshow'),
    game: document.getElementById('getgame'),
    song: document.getElementById('getsong'),
    book: document.getElementById('getbook'),
  };

  let charadesData = {};
  let usedItems = new Set();

  const fetchData = async () => {
    try {
      const response = await fetch('../src/data/charades.json');
      charadesData = await response.json();
    } catch (error) {
      console.error('Error fetching charades data:', error);
    }
  };

  const getRandomItem = (category) => {
    const items = charadesData[category];
    const unusedItems = items.filter(item => !usedItems.has(item.id));

    if (unusedItems.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * unusedItems.length);
    const selectedItem = unusedItems[randomIndex];
    usedItems.add(selectedItem.id);
    return selectedItem;
  };

  const displayItem = (category, item) => {
    result.classList.add('active');
    resultTitle.textContent = item.title;
    resultCategory.textContent = category;
    resultCategory.className = category;
    resultAuthor.textContent = item.author || '';
    resultYear.textContent = item.year;
  };

  const handleButtonClick = (category) => {
    const item = getRandomItem(category);
    if (item) {
      displayItem(category, item);
    } else {
      resultTitle.textContent = `All ${category}s have been used`;
      resultCategory.textContent = '';
      resultAuthor.textContent = '';
      resultYear.textContent = '';
    }
  };

  for (const category in buttons) {
    buttons[category].addEventListener('click', () => handleButtonClick(category));
  }

  fetchData();
});