$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //清空本地存储中改的token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index);
        });
    })

})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功还是失败，最终都会调用complete函数
        // complete: function (res) {
        //     // console.log('执行了complete函数')
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })

}