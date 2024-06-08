var checkStoreId = $('.checkStoreId').val();
$(function () {
    $('.remove-item-cart').click(function(){
        var psId = $(this).attr('data-id');
        if(psId > 0){
            removeCart(psId);
        }
    });

})

/*** END CART SCRIPT ***/
function removeCart(prodId) {
    if(in_array(checkStoreId, [15113, 43017])) {
        $.post(
            '/cart/remove',
            {
                'psId' : prodId
            },
            function(rp){
                document.location.href= '/cart'
            }
        );
    }else {
        var check = confirm('Bạn muốn xóa sản phẩm ra khỏi giỏ hàng ?');
        if(check) {
            $.post(
                '/cart/remove',
                {
                    'psId' : prodId
                },
                function(rp){
                    document.location.href= '/cart'
                }
            );
        }
    }

}