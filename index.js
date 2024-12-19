const url = 'https://6764432352b2a7619f5bfef7.mockapi.io/products'

async function fetchData() {
	try {
		// запрос к API
		const response = await fetch(url)

		// проверить статус ответа
		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`);
		} else {
			const products = await response.json()
			renderProduct(products)
		}
	}

	catch (error) {
		console.error(`Произошла ошибка: ${error}`)
	}
}

let cart = []

const itemsPerPage = 10
let currentPage = 1

function renderProduct(products) {
	// products.slice(0, 6)
	const startIndex = (currentPage - 1) * itemsPerPage // 0 * 6 = 0
	const endIndex = startIndex + itemsPerPage // 0 + 6 = 6
	const productsToShow = products.slice(startIndex, endIndex) // c 0 по 6

	const productsList = document.querySelector('.products__content')
	productsList.innerHTML = ''

	productsToShow.forEach((product, index) => {
		const productCard = document.createElement('div')

		productCard.classList.add('product__card')

		productCard.innerHTML = `
      <h4>${product.name}</h4>
			<div>
			<img src=${product.imageURL} alt="">
      <p>${product.description}</p>
	  
			<p>Цена: ${product.price} рублей</p>
      </div>
			<button onclick="addToCart(${products},${index})" class="header__login">Добавить в корзину</button>
    `

		productsList.appendChild(productCard)
	})

	updatePagination()
}

function updatePagination() {
	const totalPages = Math.ceil(products.length / itemsPerPage) // 2

	document.getElementById("currentPage").innerText = currentPage
	document.getElementById("prevPage").disabled = currentPage == 1 // true либо false
	document.getElementById("nextPage").disabled = currentPage == totalPages

	currentPage.innerHTML = totalPages
}

document.getElementById("prevPage").addEventListener('click', () => {
	if (currentPage > 1) {
		currentPage--
		renderProduct()
	}
})

document.getElementById("nextPage").addEventListener('click', () => {
	const totalPages = Math.ceil(products.length / itemsPerPage)
	if (currentPage < totalPages) {
		currentPage++
		renderProduct()
	}
})

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


// let animals = ["Cat", "Dog", "Bird", "Monkey", "JavaScript"]

// // slice(start, end)
// console.log(animals.slice(0, 3))
// let numbers = [1, 2, 3, 4, 5]

// // splice(start, deleteCount, items: n)
// console.log(`Array before splice: ${numbers}`)
// numbers.splice(0, 2, 11, 12)
// console.log(`Array after splice: ${numbers}`)

// // unshift(items)
// let array = [2, 3]
// console.log(`Array before unshift: ${array}`)
// let newArray = array.unshift(1)
// console.log(`Array after unshift: ${array}`)

// // shift(item)
// let arrayTwo = [111, 2, 3]
// let firstElement = arrayTwo.shift()
// console.log(firstElement)

fetchData()