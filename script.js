//your code here
(function () {
  const nameInput  = document.getElementById('item-name-input');
  const priceInput = document.getElementById('item-price-input');
  const addBtn     = document.getElementById('add-btn');
  const tbody      = document.getElementById('item-tbody');
  const grandTotal = document.querySelector('[data-ns-test="grandTotal"]');
  const errorMsg   = document.getElementById('error-msg');

  let items = [];   // { name, price }
  let errorTimer;

  function showError(msg) {
    errorMsg.textContent = msg;
    clearTimeout(errorTimer);
    errorTimer = setTimeout(() => { errorMsg.textContent = ''; }, 3000);
  }

  function renderTable() {
    tbody.innerHTML = '';

    items.forEach(function (item, idx) {
      const tr = document.createElement('tr');

      const tdNum = document.createElement('td');
      tdNum.textContent = idx + 1;

      const tdName = document.createElement('td');
      tdName.setAttribute('data-ns-test', 'item-name');
      tdName.textContent = item.name;

      const tdPrice = document.createElement('td');
      tdPrice.setAttribute('data-ns-test', 'item-price');
      tdPrice.textContent = item.price.toFixed(2);

      tr.appendChild(tdNum);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tbody.appendChild(tr);
    });

    const total = items.reduce(function (sum, item) { return sum + item.price; }, 0);
    grandTotal.textContent = total.toFixed(2);
  }

  function addItem() {
    const name  = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    // Validation
    if (!name) {
      showError('Please enter an item name.');
      nameInput.focus();
      return;
    }
    if (priceInput.value.trim() === '' || isNaN(price) || price < 0) {
      showError('Please enter a valid price (≥ 0).');
      priceInput.focus();
      return;
    }

    errorMsg.textContent = '';
    items.push({ name: name, price: price });
    renderTable();

    nameInput.value  = '';
    priceInput.value = '';
    nameInput.focus();
  }

  addBtn.addEventListener('click', addItem);

  nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') priceInput.focus();
  });
  priceInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addItem();
  });

  // Initial render (grandTotal = 0, empty tbody)
  renderTable();
})();