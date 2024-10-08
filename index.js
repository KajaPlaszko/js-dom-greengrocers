const ProductTypeEnum = Object.freeze({
  DEFAULT: 'default',
  FRUIT: 'fruits',
  VEGETABLE: 'vegetables',
});

const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: ProductTypeEnum.VEGETABLE
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: ProductTypeEnum.VEGETABLE
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: ProductTypeEnum.FRUIT
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: ProductTypeEnum.FRUIT
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: ProductTypeEnum.FRUIT
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: ProductTypeEnum.FRUIT
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: ProductTypeEnum.VEGETABLE
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: ProductTypeEnum.FRUIT
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: ProductTypeEnum.FRUIT
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: ProductTypeEnum.VEGETABLE
    }
  ],
  cart: []
};

const storeItemList = document.querySelector('.store--item-list');
const cartItemList = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')
const filterDropdown = document.querySelector('.filter--buttons')
let filter = ProductTypeEnum.DEFAULT
const sortDropdown = document.querySelector('.sort--buttons');
let sortCriteria = 'default';  

function renderSortOptions() {
  sortDropdown.innerHTML = '';

  const label = document.createElement('label');
  label.for = 'sorts'
  label.innerText = 'Sort by:'

  const select = document.createElement('select');
  select.id = 'sortSelect';
  select.name = 'sorts'

  const defaultOption = document.createElement('option');
  defaultOption.value = 'default';
  defaultOption.innerText = 'Default'
  select.appendChild(defaultOption)

  const priceOption = document.createElement('option');
  priceOption.value = 'price';
  priceOption.innerText = 'Price'
  select.appendChild(priceOption)

  const alphabetOption = document.createElement('option');
  alphabetOption.value = 'alphabetically';
  alphabetOption.innerText = 'Alphabetically'
  select.appendChild(alphabetOption)

  const applySortButton = document.createElement('button');
  applySortButton.addEventListener('click', applySortOption);
  applySortButton.innerText = 'Apply Sort'

  sortDropdown.appendChild(label);
  sortDropdown.appendChild(select);
  sortDropdown.appendChild(applySortButton);
}


function renderFilterDropdown() {
  filterDropdown.innerHTML = '';
  
  const label = document.createElement('label');
  label.for = 'filters'
  label.innerText = 'Filter by:'
  
  const select = document.createElement('select');
  select.id = 'selectTEST'
  select.name = 'filters'
  
  const defaultOption = document.createElement('option');
  defaultOption.value = ProductTypeEnum.DEFAULT;
  defaultOption.innerText = 'Default'
  select.appendChild(defaultOption)
  
  const vegetableOption = document.createElement('option');
  vegetableOption.value = ProductTypeEnum.VEGETABLE;
  vegetableOption.innerText = 'Vegetables'
  select.appendChild(vegetableOption)
  
  const fruitOption = document.createElement('option');
  fruitOption.value = ProductTypeEnum.FRUIT;
  fruitOption.innerText = 'Fruits'
  select.appendChild(fruitOption)
  
  const applyFilterButton = document.createElement('button');
  applyFilterButton.addEventListener('click', applyFilterOption);
  applyFilterButton.innerText = 'Apply filter'
  
  filterDropdown.appendChild(label);
  filterDropdown.appendChild(select);
  filterDropdown.appendChild(applyFilterButton);
}

function applyFilterOption() {
  selectElement = document.querySelector('#selectTEST');
  selectedValue = selectElement.value;
  
  renderStoreItems(selectedValue)
}

function applySortOption() {
  const selectElement = document.querySelector('#sortSelect');
  sortCriteria = selectElement.value;

  renderStoreItems(filter);
}

function sortItems(items) {
  if (sortCriteria === 'price') {
    return items.sort((a, b) => a.price - b.price);
  } else if (sortCriteria === 'alphabetically') {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }
  return items; 
}
function renderStoreItems(filterType) {
  storeItemList.innerHTML = '';

  let filteredItems = state.items.filter((item) => {
    if (filterType === ProductTypeEnum.DEFAULT) {
      return true; 
    }
    return item.type === filterType;
  });

  let sortedItems = sortItems(filteredItems);

  sortedItems.forEach((item) => {
    const li = document.createElement('li');

    const divIcon = document.createElement('div');
    divIcon.className = 'store--item-icon';
    li.appendChild(divIcon);

    const img = document.createElement('img');
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;
    divIcon.appendChild(img);

    const button = document.createElement('button');
    button.textContent = 'Add to cart';
    li.appendChild(button);

    button.addEventListener('click', () => {
      addItemToCart(item);
    });

    storeItemList.appendChild(li);
  });
}


function renderCartItems() {
  cartItemList.innerHTML = '';

  state.cart.forEach((item) => {
    /*
      <li>
        <img
          class="cart--item-icon"
          src="assets/icons/001-beetroot.svg"
          alt="beetroot"
        />
        
        <p>beetroot</p>
        <button class="quantity-btn remove-btn center">-</button>
        <span class="quantity-text center">1</span>
        <button class="quantity-btn add-btn center">+</button>
      </li>
    */

    const li = document.createElement('li');

    // img
    const img = document.createElement('img');
    img.className = 'cart--item-icon'
    img.src = `assets/icons/${item.id}.svg`
    img.alt = `${item.name}`
    li.appendChild(img)

    // p
    const p = document.createElement('p');
    p.textContent = item.name
    li.appendChild(p)

    // decrement button
    const decrementButton = document.createElement('button');
    decrementButton.className = "quantity-btn remove-btn center"
    decrementButton.textContent = '-'
    decrementButton.addEventListener('click', () => {
      decrementItem(item);
    });
    li.appendChild(decrementButton)

    // span
    const span = document.createElement('span');
    span.className = "quantity-text center"
    span.textContent = item.quantity
    li.appendChild(span)

    // increment button
    const incrementButton = document.createElement('button');
    incrementButton.className = "quantity-btn add-btn center"
    incrementButton.textContent = '+'
    incrementButton.addEventListener('click', () => {
      incrementItem(item);
    });
    li.appendChild(incrementButton)

    cartItemList.appendChild(li)
  });
}

function addItemToCart(item) {
  const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);

  if (cartItem) {
      cartItem.quantity++;
  } else {
      state.cart.push({
        ...item,
        quantity: 1
      });
  }

  renderCartItems();
  calculateTotal();
}

function decrementItem(itemInCart) {
  const targetItem = state.cart.find((item) => item.id === itemInCart.id);
  targetItem.quantity--;

  if(targetItem.quantity === 0){
    const index = state.cart.findIndex((item) => item.id === itemInCart.id);
    state.cart.splice(index, 1);
    delete targetItem.quantity;
  }

  renderCartItems();
  calculateTotal();
}

function incrementItem(itemInCart) {
  const targetItem = state.cart.find((item) => item.id === itemInCart.id);
  targetItem.quantity++;

  renderCartItems();
  calculateTotal();
}

function calculateTotal() {
  let totalAmount = 0; 

  state.cart.forEach((item) => {
      totalAmount += item.price * item.quantity;
  })

  total.textContent = `£${totalAmount.toFixed(2)}`;
}

const addProductButton = document.querySelector('#show-form-btn');
const productForm = document.querySelector('#product-form');

addProductButton.addEventListener('click', () => {
  if (productForm.style.display === 'none') {
    productForm.style.display = 'block';
  } else {
    productForm.style.display = 'none';
  }
});

productForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newItem = {
    id: document.querySelector('#productId').value,
    name: document.querySelector('#productName').value,
    price: parseFloat(document.querySelector('#productPrice').value),
    type: document.querySelector('#productType').value
  };

  state.items.push(newItem);
  renderStoreItems(filter);

  productForm.reset();
  productForm.style.display = 'none';  
});


renderFilterDropdown();
renderStoreItems(filter);
renderCartItems();
calculateTotal();
renderSortOptions();
