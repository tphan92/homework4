// starts on document ready
$(function() {
	renderPizzas(com.dawgpizza.menu.pizzas);
	renderDrinks(com.dawgpizza.menu.drinks);
	renderDesserts(com.dawgpizza.menu.desserts);
});

// adds items to Pizza Menu HTML Template
function renderPizzas(pizzas) {
    var instance;
	var idx;
	var pizza;
	var type;
	var myTemplate = $('.template.pizzas');
	var container = $('.menu.pizzas');
	for (idx = 0; idx < pizzas.length; ++idx) {
    	pizza = pizzas[idx];
    	instance = myTemplate.clone();
	    if (pizza.vegetarian) {
	    	container = $('.vegetarian.menu.pizzas');
	    } else {
	    	container = $('.meat.menu.pizzas');
	    }
    	instance.find('.name').html(pizza.name);
    	instance.find('.description').html(pizza.description);
    	var priceList = pizza.prices;
	    instance.find('.small.price').html("$" + priceList[0] + " /");
	    instance.find('.reg.price').html("$" + priceList[1] + " /");
	    instance.find('.big.price').html("$" + priceList[2]);
	    container.append(instance);
	}
}

// adds items to Drinks Menu HTML Template
function renderDrinks(drinks) {
	var instance;
	var idx;
	var drink;
	var myTemplate = $('.template.drinks');
	var container = $('.menu.drinks');
	for (idx = 0; idx < drinks.length; ++idx) {
    	drink = drinks[idx];
    	instance = myTemplate.clone();
    	instance.find('.name').html(drink.name);
	    instance.find('.price').html("$" + drink.price);
		container.append(instance);
	}

}

// adds items to Desserts Menu HTML Template
function renderDesserts(desserts) {
	var instance;
	var idx;
	var dessert;
	var myTemplate = $('.template.desserts');
	var container = $('.menu.desserts');
	for (idx = 0; idx < desserts.length; ++idx) {
    	dessert = desserts[idx];
    	instance = myTemplate.clone();
    	instance.find('.name').html(dessert.name);
	    instance.find('.price').html("$" + dessert.price);
		container.append(instance);
	}
}