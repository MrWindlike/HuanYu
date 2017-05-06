(function ($) {
    var TEMPLATE = `
         <div class="left">
                    <span class="date">{{day}}</span><br>
                    <span class="month">{{month}}</span><br>
                    <span class="year">{{year}}</span>
                </div>
                
                <div class="middle">
                    <div class="title">
                        <a href="javascript:;">{{title}}</a>
                    </div>
                    <div class="detail">
                        <span>发布者:{{publisher}}</span>
                        <span>发布时间：{{time}}</span>
                    </div>
                    <div class="content">
                       {{content}}
                    </div>
                </div>`;
    var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function ShowArticle() {
        this.init();

    }

    ShowArticle.prototype = {
        init: function () {

            this.getArticle();
        },
        getMonth: function (month) {       //把日期转为英文显示
            return monthArr[parseInt(month)];
        },
        timeChange: function (time) {              //改变时间 - 由于时区差别，这里需要再加8个时区
            var data = time.slice(0, 10) + " ";    //年月日
            var newtime = (parseInt(time.slice(12, 13)) + 8);   //由于时区差别，这里需要再加8个时区
            newtime = newtime >= 10 ? newtime : "0" + newtime;      //判断时间是否大于10 没有大于10补0
            var minute = time.slice(13, 16);                        //截取分钟数
            return data + newtime + minute;
        },
        getArticle: function () {
            var _this = this;
            var url = window.location.search.slice(4);
            console.log(url);
            $.ajax({
                url: "http://www.guozewei.cn/detail",
                type: "POST",
                data: {
                    _id: url
                },
                success: function (data) {
                    data = data[0];
                    console.log(data);
                    var temp = TEMPLATE;                //模板
                    for (var key in data) {
                        switch (key) {
                            case "create_date":
                                var str = data[key];
                                temp = temp.replace("{{year}}", str.slice(0, 4));
                                temp = temp.replace("{{month}}", _this.getMonth(str.slice(5, 7)));
                                temp = temp.replace("{{day}}", str.slice(8, 10));
                                temp = temp.replace("{{time}}", _this.timeChange(str));
                                break;
                            case "title":
                            case "publisher":
                                temp = temp.replace("{{" + key + "}}", data[key]);
                                break;
                            case "content":
                                var content = data.content;
                                var re = /<img([\d])>/g;
                                var arr = data.img;
                                content = content.replace(re, function (a, b) {
                                    var index = parseInt(b) - 1;
                                    return "<div class='pic'> <img src=" + arr[index] + "> </div>";
                                });
                                temp = temp.replace("{{content}}", content);
                        }
                    }
                    $(".loadding").hide();
                    $(".artical").append(temp);
                }
            });
        }
    }
    window.ShowArticle = ShowArticle;
})(window.jQuery)