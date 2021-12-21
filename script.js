let cart = {}; //моя корзина

$('document').ready(function(){
    loadItems();
    checkCart();
    showMiniCart();
});

function loadItems() {
    //загружаю товары на страницу
    $.getJSON('items.json', function (data) {
        //console.log(data);
        let out = '';
        for (let key in data){
            out+='<div class="item">';
            out+='<div class="slider">';
            out+='<div class="slides">';
            out+='<input type="radio" name="r" id="'+data[key]['slide1']+'" checked>';
            out+='<input type="radio" name="r" id="'+data[key]['slide2']+'">';
            out+='<input type="radio" name="r" id="'+data[key]['slide3']+'">';
            out+='<input type="radio" name="r" id="'+data[key]['slide4']+'">';
            out+='<div class="slide '+data[key]['switcher']+'"><img src="'+data[key].image1+'" width="400" height="400" alt=""></div>';
            out+='<div class="slide"><img src="'+data[key].image2+'" width="400" height="400" alt=""></div>';
            out+='<div class="slide"><img src="'+data[key].image3+'" width="400" height="400" alt=""></div>';
            out+='<div class="slide"><img src="'+data[key].image4+'" width="400" height="400" alt=""></div>';
            out+='<div class="slider_nav">';
            out+='<label for="'+data[key]['slide1']+'" class="bar"></label>';
            out+='<label for="'+data[key]['slide2']+'" class="bar"></label>';
            out+='<label for="'+data[key]['slide3']+'" class="bar"></label>';
            out+='<label for="'+data[key]['slide4']+'" class="bar"></label>';
            out+='</div>';
            out+='</div>';
            out+='</div>';
            out+='<div class="item_about">';
            out+='<h3>'+data[key]['item_name']+'</h3>';
            out+='<p class="item_description">'+data[key]['item_description']+'</p>';
            out+='<div class="item_about_bottom">';
            out+='<p class="item_price">'+data[key]['item_price']+' руб.</p>';
            out+='<div class="item_buttons">';
            out+='<input type="text" name="size" class="size" placeholder="10 US">';
            out+='<button type="button" name="button_add_to_cart" class="button_add_to_cart" data-art="'+key+'">Купить</button>';
            out+='</div>';
            out+='</div>';
            out+='</div>';
            out+='</div>';

        }
        $('#items').html(out);
        $('button.button_add_to_cart').on('click', addToCart);
    });
}

function addToCart() {
    //добавляем товар в корзину
    let articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );
    //console.log(cart);
    showMiniCart();
}

function checkCart(){
    //проверяю наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart(){
    //показываю содержимое корзины
    let out ='';
    for (let i in cart){
        out += i + ' --- '+cart[i]+'<br>';
    }
    out+='<br><a href="cart.html">Корзина</a>';
    $('#mini-cart').html(out);
}