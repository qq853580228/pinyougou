$(function() {
    noCheckedCount();
    $(".checkall").change(function() {
        var checked = $(this).prop("checked");
        $(".j-checkbox,.checkall").prop("checked", checked);
        if ($(this).prop("checked")) {
            count();
            $(".cart-item").addClass("check-cart-item");
        } else {
            noCheckedCount();
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            count();
            $(".checkall").prop("checked", true);
        } else {
            noCheckedCount();
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // var price = $(this).parent().parent().siblings(".p-price").html();
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        price = price.substr(1);
        var priceCount = (price * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + priceCount);
        /* if ($(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop("checked")) {

        } */
        count();
    });
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        price = price.substr(1);
        var priceCount = (price * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + priceCount);
        count();
    });
    $(".itxt").change(function() {
        var n = $(this).val();
        if (n < 1) {
            return false;
        }
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        price = price.substr(1);
        var priceCount = (price * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + priceCount);
        count();
    });

    $(".p-action").click(function() {
        $(this).parent().remove();
        count();
    });
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        count();
    });
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        count();
    })

    // 复选框没有选中时默认 已选0件，总计0元
    function noCheckedCount() {
        $(".amount-sum>em").text(0);
        $(".price-sum>em").text("￥" + 0);
    }
    // 
    function count() {
        let count = 0; //已选商品的总量
        let sum = 0; //已选商品的总价
        $(".itxt").each(function(index, domEle) {
            count += parseInt($(domEle).val());
        });
        $(".p-sum").each(function(index, domEle) {
            sum += parseFloat($(domEle).text().substr(1));
        });
        $(".amount-sum>em").text(count);
        $(".price-sum>em").text("￥" + sum.toFixed(2));
    }
});