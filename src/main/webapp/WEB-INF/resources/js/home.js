/**
 * Created by syw on 2017/5/18.
 */
    //			------   首页 图表------
var chartBar = null;
window.onload = function() {
    var home_echart_one = document.getElementById("home_echart_one").getContext("2d");
    chartBar = new Chart(home_echart_one).Bar(data_one);
    var home_echart_two = document.getElementById("home_echart_two").getContext("2d");
    chartBar = new Chart(home_echart_two).Bar(data_two);
    var home_echart_three = document.getElementById("home_echart_three").getContext("2d");
    chartBar = new Chart(home_echart_three).Bar(data_three);

}
//			------   首页 图表1------
var data_one = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"],
    datasets: [{
        barItemName: "name1",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        data: [1000, 12000, 50000, 40000, 5600, 50500, 10000, 90000,6000,4000,10000,30000]
    },

    ]
};
//			------   首页 图表2----732--
var data_two = {
    labels: ["3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
    datasets: [{
        barItemName: "name2",
        fillColor: " #cebbf5",
        strokeColor: "rgba(220,220,220,1)",
        data: [1001, 2000, 5220, 5550, 1000, 5900, 5770, 1632]
    },

    ]
};
var  data_two_beta = [
    {
        value: 30,
        color:"#F38630"
    },
    {
        value : 50,
        color : "#E0E4CC"
    },
    {
        value : 100,
        color : "#69D2E7"
    }
]
//			------   首页 图表3------
var data_three = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"],
    datasets: [{
        barItemName: "name1",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        data: [100, 80, 120, 60, 140, 10, 190, 100,110,90,100,100]
    },

    ]

};
/**banner***/
/**
 * Created by syw on 2017/3/29.
 */


$(document).ready(function () {
    var length,
        currentIndex = 0,
        interval,
        hasStarted = false, //是否已经开始轮播
        t = 3000; //轮播时间间隔
    length = $('.slider-panel').length;
    //将除了第一张图片隐藏
    $('.slider-panel:not(:first)').hide();
    //将第一个slider-item设为激活状态
    $('.slider-item:first').addClass('slider-item-selected');
    //隐藏向前、向后翻按钮
    $('.slider-page').hide();
    //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
    $('.slider-panel, .slider-pre, .slider-next').hover(function () {
        stop();
        $('.slider-page').show();
    }, function () {
        $('.slider-page').hide();
        start();
    });
    $('.slider-item').hover(function (e) {
        stop();
        var preIndex = $(".slider-item").filter(".slider-item-selected").index();
        currentIndex = $(this).index();
        play(preIndex, currentIndex);
    }, function () {
        start();
    });
    $('.slider-pre').unbind('click');
    $('.slider-pre').bind('click', function () {
        pre();
    });
    $('.slider-next').unbind('click');
    $('.slider-next').bind('click', function () {
        next();
    });
    /**
     * 向前翻页
     */
    function pre() {
        var preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        play(preIndex, currentIndex);
    }

    /**
     * 向后翻页
     */
    function next() {
        var preIndex = currentIndex;
        currentIndex = ++currentIndex % length;
        play(preIndex, currentIndex);
    }

    function play(preIndex, currentIndex) {
        $('.slider-panel').eq(preIndex).fadeOut(500)
            .parent().children().eq(currentIndex).fadeIn(1000);
        $('.slider-item').removeClass('slider-item-selected');
        $('.slider-item').eq(currentIndex).addClass('slider-item-selected');
    }

    /**
     * 开始轮播
     */
    function start() {
        if (!hasStarted) {
            hasStarted = true;
            interval = setInterval(next, t);
        }
    }

    /**
     * 停止轮播
     */
    function stop() {
        clearInterval(interval);
        hasStarted = false;
    }
    //开始轮播
    start();
});
$(document.body).css({
    "overflow-x": "hidden",

});