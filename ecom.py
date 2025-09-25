
from flask import Flask, render_template, request, redirect, url_for



app = Flask(__name__)

# Navigation items for header (pass to all templates that use the header)
nav_items = [
	{
		'name': 'Clothing',
		'active': True,
		'dropdown': {
			'sections': [
				{
					'title': 'WOMEN TOPS',
					'subitems': [
						'T-Shirts', 'Blouses', 'Sandals', 'Tank Tops ', 'Crop Tops', 'Tube Tops', 'Tunics', 'Wrap Tops', 'Peplum Tops', 'Bodysuits', 'Sweaters', 'Cardigans', 'Sweatshirts  Hoodies'
					]
				}
			],
			'categories': ['Tops', 'Bottoms', 'Dresses', 'Outwear', 'Activewear', 'Sleepwear', 'Undergarments', 'Swimwear', 'Occasionwear'],
			'promo': {
				'title': 'READY. SET. GIFT.',
				'subtitle': 'MORE THAN ESSENTIAL',
				'description': 'Extra roominess makes the On My Level Carryall the must-have for all your must-haves.',
				'button': 'SHOP SHOES'
			}
		}
	},
	{
		'name': 'Shoes',
		'dropdown': {
			'sections': [
				{
					'title': 'HEELS',
					'subitems': [
						'Stilettos', 'Pumps', 'Block Heels', 'Wedge Heels', 'Kitten Heels', 'Platform Heels', 'Ankle Strap Heels', 'Mules', 'Peep Toe Heels', 'Slingbacks'
					]
				}
			],
			'categories': [
				'Heels',
				'Flats',
				'Sandals',
				'Sneakers',
				'Boots',
				'Slippers & Comfort Wear',
				'Occasion / Dress Shoes'
			],
			'promo': {
				'title': 'READY. SET. GIFT.',
				'subtitle': 'MORE THAN ESSENTIAL',
				'description': 'Extra roominess makes the On My Level Carryall the must-have for all your must-haves.',
				'button': 'SHOP ACCESORIES'
			}
		}
	},
	{
		'name': 'Accessories',
		'dropdown': {
			'sections': [
				{
					'title': 'ACCESSORIES',
					'subitems': [
						'Handbags', 'Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches / Evening Bags', 'Backpacks', 'Wallets & Pouches'
					]
				}
			],
			'categories': [
				'Bags',
				'Jewelry',
				'Hair Accessories',
				'Belts',
				'Scarves & Wraps',
				'Hats & Caps',
				'Eyewear',
				'Watches',
				'Gloves',
				'Others'
			],
			'promo': {
				'title': 'READY. SET. GIFT.',
				'subtitle': 'MORE THAN ESSENTIAL',
				'description': 'Extra roominess makes the On My Level Carryall the must-have for all your must-haves.',
				'button': 'SHOP CLOTHES'
			}
		}
	},
	{
		'name': "What's New",
		'dropdown': {
			'sections': [
				{
					'title': "NEW ARRIVALS",
					'subitems': [
						'Latest Clothing', 'Latest Shoes', 'Latest Accessories'
					]
				}
			],
			'categories': ['All New', 'Trending', 'Featured'],
			'promo': {
				'title': 'JUST IN',
				'subtitle': 'FRESH STYLES',
				'description': 'Discover the latest trends and new arrivals for the season.',
				'button': 'SHOP NEW'
			}
		},
		'bold': True
	}
]

# In-memory product storage (list of dicts)
products = [
	{
		'id': 1,
		'name': 'Premium Cotton T-Shirt',
		'primaryImage': 'static/images/product_1.jpg',
		'secondaryImage': 'static/images/product_2.jpg',
		'colors': ['#000000', '#ffffff', '#ff4757', '#3742fa'],
		'price': 1299.00,
		'originalPrice': 1599.00,
		'category': 'Clothing',
	},
	{
		'id': 2,
		'name': 'Classic Denim Jacket',
		'primaryImage': 'static/images/product_3.png',
		'secondaryImage': 'static/images/product_1.jpg',
		'colors': ['#2C2C2C', '#ECE9E6'],
		'price': 2499.00,
		'originalPrice': 2999.00,
		'category': 'Clothing',
	},
]



# Home page
@app.route('/')
def index():
	return render_template('base.html', products=products, nav_items=nav_items)

# Shop All Clothing page
@app.route('/shop/all/clothing')
def shop_all_clothing():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing')

# Shop All Shoes page
@app.route('/shop/all/shoes')
def shop_all_shoes():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes')

# Shop All Accessories page
@app.route('/shop/all/accessories')
def shop_all_accessories():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories')

# Shop Bags page
@app.route('/shop/accessories/bags')
def shop_accessories_bags():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='bags')

# Shop Jewelry page
@app.route('/shop/accessories/jewelry')
def shop_accessories_jewelry():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='jewelry')

# Shop Hair Accessories page
@app.route('/shop/accessories/hair-accessories')
def shop_accessories_hair_accessories():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='hair-accessories')

# Shop Belts page
@app.route('/shop/accessories/belts')
def shop_accessories_belts():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='belts')

# Shop Scarves & Wraps page
@app.route('/shop/accessories/scarves-&-wraps')
def shop_accessories_scarves_wraps():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='scarves-&-wraps')

# Shop Hats & Caps page
@app.route('/shop/accessories/hats-&-caps')
def shop_accessories_hats_caps():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='hats-&-caps')

# Shop Eyewear page
@app.route('/shop/accessories/eyewear')
def shop_accessories_eyewear():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='eyewear')

# Shop Watches page
@app.route('/shop/accessories/watches')
def shop_accessories_watches():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='watches')

@app.route('/shop/accessories/gloves')
def shop_accessories_gloves():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='gloves')

@app.route('/shop/accessories/others')
def shop_accessories_others():
	return render_template('base.html', products=products, nav_items=nav_items, category='accessories', subcategory='others')

# Shop Tops page
@app.route('/shop/clothing/tops')
def shop_clothing_tops():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='tops')

# Shop Bottoms page
@app.route('/shop/clothing/bottoms')
def shop_clothing_bottoms():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='bottoms')

# Shop Dresses page
@app.route('/shop/clothing/dresses')
def shop_clothing_dresses():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='dresses')

# Shop Outerwear page
@app.route('/shop/clothing/outwear')
def shop_clothing_outwear():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='outwear')

# Shop Activewear page
@app.route('/shop/clothing/activewear')
def shop_clothing_activewear():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='activewear')

# Shop Sleepwear page
@app.route('/shop/clothing/sleepwear')
def shop_clothing_sleepwear():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='sleepwear')

# Shop Undergarments page
@app.route('/shop/clothing/undergarments')
def shop_clothing_undergarments():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='undergarments')

# Shop Swimwear page
@app.route('/shop/clothing/swimwear')
def shop_clothing_swimwear():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='swimwear')

# Shop Occasionwear page
@app.route('/shop/clothing/occasionwear')
def shop_clothing_occasionwear():
	return render_template('base.html', products=products, nav_items=nav_items, category='clothing', subcategory='occasionwear')

# Shop Heels page
@app.route('/shop/shoes/heels')
def shop_shoes_heels():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='heels')

# Shop Flats page
@app.route('/shop/shoes/flats')
def shop_shoes_flats():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='flats')

# Shop Sandals page
@app.route('/shop/shoes/sandals')
def shop_shoes_sandals():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='sandals')

# Shop Sneakers page
@app.route('/shop/shoes/sneakers')
def shop_shoes_sneakers():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='sneakers')

# Shop Boots page
@app.route('/shop/shoes/boots')
def shop_shoes_boots():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='boots')

# Shop Slippers page
@app.route('/shop/shoes/slippers')
def shop_shoes_slippers():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='slippers')

# Shop Occasion/Dress Shoes page
@app.route('/shop/shoes/occasion-shoes')
def shop_shoes_occasion_shoes():
	return render_template('base.html', products=products, nav_items=nav_items, category='shoes', subcategory='occasion-shoes')

# Test Heels page
@app.route('/test/heels')
def test_heels():
	return render_template('test_heels.html')




# Route for My Account page

@app.route('/buyer/my_account')
def buyer_my_account():
	return render_template('buyer/my_account.html', nav_items=nav_items)

# Route for My Purchases page

@app.route('/buyer/my_purchase')
def buyer_my_purchase():
	return render_template('buyer/my_purchase.html', nav_items=nav_items)

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
			'price': float(price) if price else 0.0,
			'originalPrice': 0.0,
			'category': category,
		})
		return redirect(url_for('index'))
	return render_template('seller/add_product.html', nav_items=nav_items)


if __name__ == '__main__':
	app.run(debug=True)
