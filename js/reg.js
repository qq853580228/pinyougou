window.onload = function() {
    // 手机号码正则表达式
    var regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    // qq号的正则表达式
    var regqq = /[1-9][0-9]{4,}/;
    // 昵称的正则表达式
    var regname = /^[\w\u4e00-\u9fa5]{1,8}$/;
    // 短信验证码的正则表达式
    var regmsg = /^\d{6}$/;
    // 登录密码的正则表达式
    var regpwd = /^\w{6,16}$/;
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var name = document.querySelector('#name');
    var sendbtn = document.querySelector('.send');
    var second = 60;
    var msg = document.querySelector('#duanxin');
    var pwd = document.querySelector('#pwd');
    var repwd = document.querySelector('#repwd');
    regexp(tel, regtel);
    tel.onblur = function() {
        if (regtel.test(this.value)) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_ico">√</i>';
            sendbtn.style.display = 'inline-block';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_ico"></i>格式不正确，请重新输入！';
            sendbtn.style.display = 'none';
        }
    }
    sendbtn.addEventListener('click', function() {
        this.disabled = true;
        var time = setInterval(function() {
            if (second == 0) {
                clearInterval(time);
                sendbtn.disabled = false;
                sendbtn.innerHTML = '发送';
                second = 60;
            } else {
                sendbtn.innerHTML = '还剩' + second + '秒可再次发送';
                second--;
            }
        }, 1000);

    });
    repwd.onblur = function() {
        if (this.value !== pwd.value) {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_ico"></i>密码不一致，请重新输入！';
        } else {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_ico">√</i>';
        }
    }
    regexp(qq, regqq);
    regexp(name, regname);
    regexp(msg, regmsg);
    regexp(pwd, regpwd);

    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                ele.nextElementSibling.className = 'success';
                ele.nextElementSibling.innerHTML = '<i class="success_ico">√</i>';
            } else {
                ele.nextElementSibling.className = 'error';
                ele.nextElementSibling.innerHTML = '<i class="error_ico"></i>格式不正确，请重新输入！';
            }
        }
    };
}