$(function () {
    // 点击去注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登陆链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //从layui获取form元素，设置校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function (value) {
            var psw = $('.reg-box [name=password]').val()
            if (psw !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听表单注册事件，调用接口，发起用户注册请求
    $('#reg_form').on('submit', function (e) {
        //组织表单默认行为
        e.preventDefault()
        var data = { username: $('#reg_form [name=username]').val(), password: $('#reg_form [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#link_login').clicl()
        })
    })
    $('login_form').submit(function (e) {
        //组织表单默认行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})