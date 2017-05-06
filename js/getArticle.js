(function ($) {

    var TEMPLATE = `
    <div class="artical clearfix">
            <div class="left">
                <span class="date">{{day}}</span><br>
                <span class="month">{{month}}</span><br>
                <span class="year">{{year}}</span>
            </div>

            <div class="middle">
                <div class="title">
                    <a target="_blank" href="http://localhost:63342/artical/view.html?id={{_id}}">{{title}}</a>
                </div>
                <div class="detail">
                    <span>发布者:{{publisher}}</span>
                    <span>发布时间：{{time}}</span>
                </div>
                <div class="content">
                    <p> {{content}}
                        <a target="_blank" href="http://localhost:63342/artical/view.html?id={{_id}}">[显示详情]</a></p>
                </div>
            </div>
        </div>
`;
    var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function GetArticle() {
        this.init();
    }

    var Default = {
        limit: "5"           //每次加载的文章的数量

    }
    GetArticle.prototype = {
        init: function () {
            $.extend(this, Default);
            this.count = 0;
            this.page = 0;
            this.isClick = true;
            this.getData();
            this.btnClick();
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
        getData: function () {              //获取数据
            var _this = this;
            $.ajax({
                type: "POST",
               url: "http://www.guozewei.cn/allArticle",
                data: {
                    page: _this.page,
                    limit: _this.limit
                },
                success: function (message) {           //成功回调函数
                    console.log(message);
                    var data = message.data;
                    _this.totalCount = message.totalCount;
                    _this.page++;
                    var temp;
                    for (var i = 0; i < data.length; i++) {
                        temp = TEMPLATE;                //模板
                        for (var key in data[i]) {
                            if (key === "content") {
                                var content = data[i][key].replace(/<[^>]+>/g, "");//去掉所有的html标记
                                content = content.slice(0, 99) + "...";
                                temp = temp.replace("{{" + key + "}}", content);    //替换内容
                            } else if (key === "create_date") {
                                var str = data[i][key];
                                temp = temp.replace("{{year}}", str.slice(0, 4));
                                temp = temp.replace("{{month}}", _this.getMonth(str.slice(5, 7)));
                                temp = temp.replace("{{day}}", str.slice(8, 10));
                                temp = temp.replace("{{time}}", _this.timeChange(str));
                            }
                            else {
                                temp = temp.replace("{{" + key + "}}", data[i][key]);
                            }
                        }
                        $(".content_wrap").append(temp);
                        _this.isClick = true;
                        $(".more").find("span").html("加载更多");
                        $(".more").find(".loadding").hide();
                    }
                    if (_this.page >= _this.totalCount) {
                        $(".more").find("span").html("没有更多了").end().css("cursor", "not-allowed");
                    }
                    var html = $(".content_wrap").html();
                    var state = {};
                    state.html = html;
                }
            });
        },
        getMore: function () {                     //获取更多
            var _this = this;
            _this.getData();
        },
        btnClick: function () {                    //点击加载更多
            var _this = this;
            $(".more").on("click", function () {
                if (_this.isClick) {
                    _this.getMore();
                    $(this).find("span").html("加载中");
                    $("this").find(".loadding").show();
                    _this.isClick = false;
                }
                else
                    return;
            });
        }
    }
    
    window.GetArticle = GetArticle;
})(jQuery);