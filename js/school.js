(function ($) {
    function Picture(options) {
        this.init(options);
    };
    var TEMPLATEimg = '<div class="picture" data-index={{index}}><img src={{src}} alt="加载中"></div>';     //图集主页模板
    var TEMPLATElist = '<li><img src={{src}}></li>'                                     //进入图片每个图片模板
    var _DEFAULT = {
        rows: 4,                     //图集主页每一行显示多少张图片
        picLength: 800               //每张图片的宽度
    }

    Picture.prototype = {
        init: function (options) {
            this.container = options.container;   //container容器
            this.row = options.row;             //获取rowDom对象
            this.lists = options.lists;         //获取listsDom对象
            this.dots = options.dots;           //获取下面的小点
            this.btnprev = options.prev;           //上一张
            this.btnnext = options.next;           //下一张
            this.wrap = options.wrap;               //遮罩
            this.loadding = options.loadding;       //加载中
            this.showList = options.showList;
            this.temprow = $("<div class='row'></div>");      //每一行的dom对象
            this.getLists();                        //页面一进来就加载图集主页
            this.close();                           //关闭
            this.next();                         //点击下一张事件
            this.prev();                         //点击上一张事件
        },
        getLists: function () {
            var _this = this;
            this.reqData({"index":true}, function (data) {
                var rows = _DEFAULT.rows;
                var rownum = Math.floor(data.length / rows);        //获取一共有多少行显示
                for (var i = 0; i < rownum; i++) {//除最后一行外 其他进行加载
                    var row = _this.temprow.clone();                        //克隆
                    for (var j = 0; j < rows; j++) {
                        var temp = TEMPLATEimg;                  //模板
                        temp = temp.replace("{{src}}", data[i * rows + j].img);    //模板替换
                        temp = temp.replace("{{index}}", "" + parseInt(i * rows + j) + "");
                        row.append(temp);                   //添加到row中
                    }
                    _this.loadding.css("display","none");
                    _this.container.append(row);                //把这一行的row添加到容器中
                }
                var remain = data.length - (rownum) * rows;    //对最后一行剩下的进行添加
                if (remain) {
                    var row = _this.temprow.clone();
                    for (var i = remain; i < data.length; i++) {
                        var temp = TEMPLATEimg;
                        temp = temp.replace("{{src}}", "" + data[i].img + "");
                        temp = temp.replace("{{index}}", "" + i + "");
                        row.append(temp);

                    }
                    _this.container.append(row);
                }
                _this.entryPic();           //等图集加载完再绑定事件
            });
            //进入图集
        },
        reqData: function (data, callback) {
            $.ajax({
                url: URL+"/getMain",
                type: "POST",
                data: data,
                success: function (data) {
                    console.log(data.length);
                    callback(data);
                }
            });
        },
        entryPic: function () {
            var _this = this;
            _this.container.find(".picture").on("click", function () {
                var index = $(this).data("index");            //获取当前点击图片索引
                _this.container.css("display", "none");
                _this.wrap.fadeIn();
                _this.showList.fadeIn();
                _this.reqData({pos: index}, function (data) {
                    var length = data.length > 5 ? 5 : data.length;           //获取图片数量
                    _this.showdots(length);             //banner图底部dots
                    _this.lists.css({                   //改变外层ul的宽度
                        width: _this.picLength * length + 'px'
                    });
                     _this.showList.find(".picloadding").css("display","none"); //把加载按钮取消
                    for (var i = 0; i < length; i++) {      //对每张图片进行添加
                        var temp = TEMPLATElist;
                        temp = temp.replace("{{src}}", data[i].img);
                        _this.lists.append(temp);
                    }
                    _this.dotsevent();
                })
            });

        },
        prev: function () {
            var _this = this;
            _this.btnnext.on("click", function () {
                var lists = _this.lists.find("li");
                var width = lists.width();
                var length = lists.length;
                var index =  _this.dots.find(".active").index() + 1;
                index = index >=length?0:index;
                _this.lists.animate({left:-width * index},500);
                if(index)
                    _this.dots.find(".active").next().addClass("active").siblings().removeClass("active");
                else
                    _this.dots.find("li").eq(0).addClass("active").siblings().removeClass("active");
            })
        },
        next: function () {
            var _this = this;
            _this.btnprev.on("click", function () {
                var lists = _this.lists.find("li");
                var width = lists.width();
                var length = lists.length;
                var index =  _this.dots.find(".active").index() -1;
                index = index < 0 ?length-1:index;
                _this.lists.animate({left:-width * index},500);
                if(index != length-1)
                    _this.dots.find(".active").prev().addClass("active").siblings().removeClass("active");
                else
                    _this.dots.find("li").eq(length-1).addClass("active").siblings().removeClass("active");
            })
        },
        showdots: function (length) {
            var _this = this;
            for (var i = 0; i < length; i++) {
                var li = $(" <li></li>");
                _this.dots.append(li);
            }
            _this.dots.find("li").eq(0).addClass("active");             //默认显示第一张
        },
        close:function () {
            var _this = this;
            _this.wrap.on("click",function(e){
                if(e.target === this){
                    _this.wrap.fadeOut();
                    _this.showList.fadeOut();
                    _this.lists.empty();
                    _this.dots.empty();
                    _this.container.fadeIn();
                    _this.showList.find(".picloadding").css("display","block");
                }

            })
        },
        dotsevent:function(){
            var _this = this;
            _this.dots.find("li").on("click",function(){
                var width = _this.lists.find("li").width();
                var index = $(this).index();
                 _this.lists.animate({left:-width * index},500);
                 $(this).addClass("active").siblings().removeClass("active");
            });
        }

    }
    $.fn["picture"] = function (options) {
        new Picture(options)
    }
})(jQuery)
