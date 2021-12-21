let cart = {}; //корзина


$.getJSON('items.json', function (data) {
    let items = data; //все товары в массиве
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); //вывожу товары на страницу

    function showCart() {
        if ($.isEmptyObject(cart)) {
            //корзина пуста
            let out = '<p class="cart_is_empty">Корзина пуста...</p>';
            $('#my-cart').html(out);
        }
        else {
            let out = '';
            for (let key in cart) {
                out += '<div class="cart_item">';
                out += '<button class="delete" data-art="' + key + '" >x</button>';
                out += '<div class="cart_item_image"><img src="' + items[key].image1 + '" width="200"></div>';
                out += '<p class="cart_item_name">'+items[key].item_name+'</p>';
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += '<p class="cart_item_amount">'+cart[key]+'</p>';
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += '<p class="total_item_cost">'+cart[key] * items[key].item_price+' руб.</p>';
                out += '<br>';
                out += '</div>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusItems);
            $('.minus').on('click', minusItems);
            $('.delete').on('click', deleteItems);
        }
    }

    function plusItems() {
        let articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }

    function minusItems() {
        let articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }

    function deleteItems() {
        let articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }


});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function sendMail(){
	buyer_name=$('#buyer_name').val()
	buyer_email=$('#buyer_email').val()
	buyer_size=$('#buyer_size').val()

	
	if (!$.isEmptyObject(cart)){
		if (buyer_name!='' && buyer_email!='' && buyer_size!='')
		{
			$.post(
			"http://localhost:5500/php/mail.php",
			{
			"buyer_name": buyer_name,
			"buyer_email": buyer_email,
			"buyer_size": buyer_size,
			"cart": cart
			},
			function(data) {
                console.log(data);
				if (data==1)
				{alert('Заказ принят')
				cart = {}
				saveCartToLS()
				document.location.href="index.html"
				}
				else 
				{alert('Заказ не принят')}
			}
            )
            .fail(function(response) {
                console.log(response);
                });
			
		}
		else {alert('Заполните поля')}
		}
	else {alert('Корзина пуста!')}
}


$(document).ready(function(){
    checkCart();
	$('.send_mail').on('click', sendMail);
})