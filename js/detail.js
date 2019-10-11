window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var big_img = document.querySelector('.big_img');
    // 鼠标经过小盒子显示遮挡层和放大镜大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    // 鼠标离开小盒子隐藏遮挡层和放大镜大盒子
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 让遮挡层跟随鼠标一起移动
    preview_img.addEventListener('mousemove', function(e) {
        // 获取鼠标在小盒子内的坐标,***鼠标的x和y需要分别减去小盒子offsetLeft和offsetTop的坐标
        x = e.pageX - preview_img.offsetLeft;
        y = e.pageY - preview_img.offsetTop;
        // 让鼠标位与遮挡层的中心位置
        maskX = x - mask.offsetWidth / 2;
        maskY = y - mask.offsetHeight / 2;
        // 遮挡层沿着X轴可移动的最大距离maskMaxX，遮挡层沿着Y轴可移动的最大距离maskMaxY
        maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        // 遮挡层只能在小盒子内部移动
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX;
        }
        if (maskY <= 0) {
            maskY = 0
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 图片可移动的最大距离big_imgMaxX和big_imgMaxY
        big_imgMaxX = big_img.offsetWidth - big.offsetWidth;
        big_imgMaxY = big_img.offsetHeight - big.offsetHeight;
        // 遮挡层的可移动距离/遮挡层可移动的最大距离=图片的可移动距离/图片可移动的最大距离
        // 这种技巧可以让图片和遮挡层存在比例关系从而让图片跟随遮挡层一起移动
        // 图片可移动距离big_imgX和big_imgY
        big_imgX = maskX * big_imgMaxX / maskMaxX;
        big_imgY = maskY * big_imgMaxY / maskMaxY;
        big_img.style.left = -big_imgX + 'px';
        big_img.style.top = -big_imgY + 'px';
    });
});