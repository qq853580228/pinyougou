window.addEventListener('load', function() {
    var search_fixed = document.querySelector('.search_fixed');
    var hotwords = document.querySelector('.header').children[3];
    var main = document.querySelector('.main');
    var mTop = main.offsetTop;
    var focus = document.querySelector('.focus');
    var ul = document.querySelector('.item_list');
    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');
    var ol = document.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;
    /* document.addEventListener('scroll', function() {
        if (window.pageYOffset >= mTop) {
            search_fixed.style.position = 'fixed';
            search_fixed.style.top = '0';
            hotwords.style.display = 'none';
        } else if (window.pageYOffset < mTop) {
            search_fixed.style.position = '';
            hotwords.style.display = 'block';
        }
    }); */
    // 鼠标经过轮播图区域显示左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    // 鼠标离开轮播图区域隐藏左右按钮
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    });
    // 动态生成小圆点
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            var index = this.getAttribute('index');
            // 鼠标点击圆点时改变样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            num = circle = index;
            // 点击小圆跳转到相应索引号的图片
            Time(ul, -index * focusWidth);
        });
    }
    // 把第一个小圆设置类名为current
    ol.children[0].className = 'current';
    // 复制一个li并插入到ul最后的位置
    var liClone = ul.children[0].cloneNode(true);
    ul.appendChild(liClone);
    // 点击右边按钮切换下一张图片
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[num].className = 'current';
            num++;
            Time(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();

        }
    });
    // 点击左边按钮切换上一张图片
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            Time(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });
    // 自动播放轮播图
    var timer = this.setInterval(function() {
        arrow_r.click();
    }, 2000);

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    function Time(obj, target, callback) {
        // callback=function(){}

        // 如果是用按钮触发定时器，就会一直开启新的定时器，导致有多个定时器一起执行
        // 解决方案 让元素只有一个定时器执行
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // step：补偿目标 => 步长公式：(目标值target-现在的位置obj.offsetLeft)/10
            var step = (target - obj.offsetLeft) / 10;
            // 注意：步长值在计算过程存在小数运算，所以需要手动把步长值进行取整
            // 步长值为正，步长值往上取整，步长值为负，步长值往下取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // 回调函数需要等定时器结束的时候才开始执行
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
});