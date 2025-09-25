document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.add-to-cart').forEach(function(btn) {
		btn.addEventListener('click', function() {
			const productId = this.getAttribute('data-product-id');
			alert('Added product ' + productId + ' to cart!');
		});
	});
});
