
from flask import Flask, render_template

app = Flask(__name__)

# Sample product data (store only image filename)
products = [
	{
		'id': 1,
		'name': 'Red Dress',
		'price': 49.99,
		'image': 'product_1.jpg',
		'description': 'A beautiful red dress for any occasion.'
	},
	{
		'id': 2,
		'name': 'Blue Jeans',
		'price': 39.99,
		'image': 'product_1.jpg',
		'description': 'Classic blue jeans with a modern fit.'
	},
]

@app.route('/')
def index():
	return render_template('index.html', products=products)

@app.route('/products')
def product_list():
	return render_template('product_list.html', products=products)

if __name__ == '__main__':
	app.run(debug=True)
