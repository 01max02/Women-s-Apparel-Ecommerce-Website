
from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)

# In-memory product storage (list of dicts)
products = [
	{
		'id': 1,
		'name': 'Premium Cotton T-Shirt',
		'primaryImage': 'static/images/product_1.jpg',
		'secondaryImage': 'static/images/product_2.jpg',
		'colors': ['#000000', '#ffffff', '#ff4757', '#3742fa'],
		'price': '1,299',
		'originalPrice': '1,599',
		'category': 'Clothing',
	},
	{
		'id': 2,
		'name': 'Classic Denim Jacket',
		'primaryImage': 'static/images/product_3.png',
		'secondaryImage': 'static/images/product_1.jpg',
		'colors': ['#2C2C2C', '#ECE9E6'],
		'price': '2,499',
		'originalPrice': '2,999',
		'category': 'Clothing',
	},
]

@app.route('/')
def index():
	return render_template('index.html', products=products)


# Route for My Account page



# Route for My Account page
@app.route('/buyer/my_account')
def buyer_my_account():
	return render_template('buyer/my_account.html')

# Route for My Purchases page
@app.route('/buyer/my_purchase')
def buyer_my_purchase():
	return render_template('buyer/my_purchase.html')

# Route to add a product (GET shows form, POST adds product)
@app.route('/seller/add_product', methods=['GET', 'POST'])
def add_product():
	if request.method == 'POST':
		# Get form data
		name = request.form.get('productName')
		description = request.form.get('productDescription')
		category = request.form.get('productCategory')
		brand = request.form.get('productBrand')
		price = request.form.get('productPrice')
		stock = request.form.get('productStock')
		sku = request.form.get('productSKU')
		status = request.form.get('productStatus')
		tags = request.form.get('productTags')
		# For simplicity, use a placeholder image
		primaryImage = 'static/images/product_1.jpg'
		secondaryImage = 'static/images/product_2.jpg'
		colors = ['#000000', '#ffffff']
		# Add to products list
		new_id = max([p['id'] for p in products]) + 1 if products else 1
		products.append({
			'id': new_id,
			'name': name,
			'primaryImage': primaryImage,
			'secondaryImage': secondaryImage,
			'colors': colors,
			'price': price,
			'originalPrice': '',
			'category': category,
		})
		return redirect(url_for('index'))
	return render_template('seller/add_product.html')


if __name__ == '__main__':
	app.run(debug=True)
