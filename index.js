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
]

function renderProduct() {
	const productsList = document.querySelector('.products__content')

	products.forEach(product => {
		const productCard = document.createElement('div')

		productCard.classList.add('product__card')

		productCard.innerHTML = `
      <h4>${product.name}</h4>
			<div>
      <p>${product.description}</p>
			<p>Цена: ${product.price} рублей</p>
      </div>
			<button class="header__login">Добавить в корзину</button>
    `

		productsList.appendChild(productCard)
	})
}

renderProduct()
