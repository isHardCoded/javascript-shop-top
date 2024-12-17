let products = [
	{
		name: 'Игровая мышь',
		description: 'Описание игровой мыши',
		price: 1500,
	},
	{
		name: 'Игровая клавиатура',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
	{
		name: 'Игровое кресло',
		description: 'Описание игровой клавиатуры',
		price: 2000,
	},
]

let cart = []

function renderProduct() {
	const productsList = document.querySelector('.products__content')

	products.forEach((product, index) => {
		const productCard = document.createElement('div')

		productCard.classList.add('product__card')

		productCard.innerHTML = `
      <h4>${product.name}</h4>
			<div>
      <p>${product.description}</p>
			<p>Цена: ${product.price} рублей</p>
      </div>
			<button onclick="addToCart(${index})" class="header__login">Добавить в корзину</button>
    `

		productsList.appendChild(productCard)
	})
}
const cartList = document.querySelector('.cart__content')

if (cart.length === 0) {
	cartList.innerHTML = `<p>Корзина пуста!</p>`
}

function renderCart() {
	cartList.innerHTML = ''

	let totalPrice = 0

	cart.forEach(item => {
		totalPrice += item.product.price * item.quantity

		const cartItem = document.createElement('div')
		cartItem.classList.add('product__cart')

		cartItem.innerHTML = `
						<div class="desc__wrapper">
							<h4>${item.product.name}</h4>
							<p>Цена: ${item.product.price} рублей</p>
						</div>
						<div class="counter__wrapper">
							<button onclick="removeFromCart('${item.product.name}', ${
			item.product.index
		})">-</button>
							<p>${item.quantity}</p>
							<button onclick="addToCart('${products.indexOf(item.product)}')">+</button>
						</div>
    `

		cartList.appendChild(cartItem)
	})

	cartList.innerHTML += `<h3>Общая стоимость: ${totalPrice} рублей`
}

function addToCart(productIndex) {
	const product = products[productIndex]
	const existingProduct = cart.find(item => item.product.name === product.name)

	if (existingProduct) {
		existingProduct.quantity += 1
	} else {
		cart.push({ product, quantity: 1 })
	}

	renderCart()
}

function removeFromCart(productName) {
	const existingProduct = cart.find(item => item.product.name === productName)

	if (existingProduct) {
		existingProduct.quantity -= 1

		if (existingProduct.quantity <= 0) {
			cart = cart.filter(item => item.product.name !== productName)
		}
		renderCart()
	}
}

renderProduct()
