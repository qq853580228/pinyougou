$(function() {
    // 当我们点击了小li，此时不需要执行页面滚动里面的li类名的添加或移除
    // 使用节流阀（互斥锁）实现
    var recommendTop = $(".recommend").offset().top;
    var likeTop = $(".like").offset().top;
    // 节流阀开关
    var flag = true;
    winLoad();
    // 点击左侧电梯导航的小li，让当前小li添加current类名，移除兄弟的current类名
    $(".fixedtool ul li").click(function() {
        flag = false;
        var index = $(this).index();
        var floor = $(".floor .w");
        $("body,html").animate({
            scrollTop: $(floor).eq(index).offset().top
        }, 300, function() {
            flag = true;
        });
        $(this).addClass("current").siblings("li").removeClass("current");
    });

    $(window).scroll(function() {
        winLoad();

        // 页面滚动到某个区域，左侧的电梯导航小li相应添加current类名，兄弟移除current类名
        if (flag) {
            $(".floor .w").each(function(index, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool ul li").eq(index).addClass("current").siblings("li").removeClass("current");
                }
            });
        }
    });
    // 显示与隐藏电梯导航   
    function winLoad() {
        if ($(document).scrollTop() >= recommendTop) {
            $(".fixedtool").stop().fadeIn(200);
        } else {
            $(".fixedtool").stop().fadeOut(200);
        }
    }
});