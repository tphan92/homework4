//document ready function
$(function(){
    renderPizzas(com.dawgpizza.menu.pizzas);
    renderDrinks(com.dawgpizza.menu.drinks);
    renderDesserts(com.dawgpizza.menu.desserts);

    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-container'));
    });

    $('.place-order').click(function(){      
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the

        var signupForm = $('.customer-form');
        var addr1Input = signupForm.find('input[name="addr-1"]');
        var addr1Value = addr1Input.val();
        var nameInput = signupForm.find('input[name="name"]');
        var nameValue = nameInput.val();
        var phoneInput = signupForm.find('input[name="phone"]');
        var phoneValue = phoneInput.val();
        var zipInput = signupForm.find('input[name="zip"]');
        var zipValue = zipInput.val();

        cart.name = nameValue;
        cart.address1 = addr1Value;
        cart.phone = phoneValue;
        cart.zip = zipValue;

        if (addr1Value && nameValue && phoneValue && zipValue) {
            var idx; 
            var subTotal = Number(0);
            for (idx = 0; idx < cart.items.length; ++idx) {
                subTotal += Number(cart.items[idx].price);
            }
            if (subTotal > 20.00) {
                $('.all-info').val(JSON.stringify(cart));
                $('.final-submit').submit();
            } else {
                alert('You need to have a total of 20 dollars to continue.');
              return false;
            }
        } else {
            alert('Please fill out all of your fields');
            return false;
        }
    });

}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
function renderCart(cart, container) {
    var idx, item;
    
    //empty the container of whatever is there currently
    container.empty();
    var myTemplate = $('.cart-item-template');
    var pricing = $('.cart-footer');
    var instance;
    var subTotal = Number(0);

    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        instance = myTemplate.clone();
        instance.find('.title').html(item.name);
        if (item.type == "Pizza") {
            instance.find('.size').html("(" + item.size + ")");
        }
        instance.find('.price').html(item.price);
        instance.find('.remove-item').attr({
            'data-index': idx
        });
        subTotal = (Number(subTotal) + Number(item.price)).toFixed(2);
        container.append(instance);
    }

    pricing.find('.subtotal-price').html(subTotal);
    var tax = (Number(subTotal) * .095).toFixed(2);
    pricing.find('.tax-price').html(tax);
    var total = (Number(tax) + Number(subTotal)).toFixed(2);
    pricing.find('.total-price').html(total);

    $('.remove-item').click(function() {
        var idxToRemove = this.getAttribute('data-index');
        cart.items.splice(idxToRemove, 1);
        renderCart(cart, $('.cart-container'));
    });
} //renderCart()

function renderPizzas(pizzas) {
    var instance;
    var idx;
    var pizza;
    var type;
    var myTemplate = $('.template.pizzas');
    var container;
    for (idx = 0; idx < pizzas.length; ++idx) {
        pizza = pizzas[idx];
        instance = myTemplate.clone();
        if (pizza.vegetarian) {
            container = $('.order.vegetarian.pizzas');
        } else {
            container = $('.order.meat.pizzas');
        }
        instance.find('.name').html(pizza.name);
        instance.find('.description').html(pizza.description);
        var priceList = pizza.prices;
        instance.find('.small.price').html("$" + priceList[0]);
        instance.find('.reg.price').html("$" + priceList[1]);
        instance.find('.big.price').html("$" + priceList[2]);
        instance.find('.small.add-to-cart').attr({
            'data-type': 'pizza',
            'data-name': pizza.name,
            'data-size': 'small',
            'data-price': priceList[0]
        });
        instance.find('.medium.add-to-cart').attr({
            'data-type': 'pizza',
            'data-name': pizza.name,
            'data-size': 'medium',
            'data-price': priceList[1]
        });
        instance.find('.large.add-to-cart').attr({
            'data-type': 'pizza',
            'data-name': pizza.name,
            'data-size': 'large',
            'data-price': priceList[2]
        });
        container.append(instance);
    }
}

// adds items to Drinks Menu HTML Template
function renderDrinks(drinks) {
    var instance;
    var idx;
    var drink;
    var myTemplate = $('.template.drinks');
    var container = $('.order.drinks');
    for (idx = 0; idx < drinks.length; ++idx) {
        drink = drinks[idx];
        instance = myTemplate.clone();
        instance.find('.name').html(drink.name);
        instance.find('.price').html("$" + drink.price);
        instance.find('.add-to-cart').attr({
            'data-type': 'drink',
            'data-name': drink.name,
            'data-size': null,
            'data-price': drink.price
        });
        container.append(instance);
    }
}

// adds items to Desserts Menu HTML Template
function renderDesserts(desserts) {
    var instance;
    var idx;
    var dessert;
    var myTemplate = $('.template.desserts');
    var container = $('.order.desserts');
    for (idx = 0; idx < desserts.length; ++idx) {
        dessert = desserts[idx];
        instance = myTemplate.clone();
        instance.find('.name').html(dessert.name);
        instance.find('.price').html("$" + dessert.price);
        instance.find('.add-to-cart').attr({
            'data-type': 'dessert',
            'data-name': dessert.name,
            'data-size': null,
            'data-price': dessert.price
        });
        container.append(instance);
    }
}