$(function () {
    initData();
    setInterval(initData,300000);
    //initCharts(1,0);
    $("#tab-adapter").click();
    initBox();
});

function initData(){
    $.ajax({
        url: "/user360/monitor/getTotalNum.do",
        data: {},
        dataType: "json",
        success: function(msg){
            //console.log(msg.data.id);
            var data = msg.data;
            $("#li-adapter .atom-detail h2").text(data.adaperCount);
            $("#li-dataCep .atom-detail h2").text(data.datacepCount);
            $("#li-handler .atom-detail h2").text(data.handlerCount);
            $("#li-dataControl .atom-detail h2").text(data.datacontrolCount);

        }
    })
}

function initBox(){
    $.ajax({
        url: "/user360/monitor/getOriginList.do",
        data: {},
        async:false,
        dataType: "json",
        success: function(msg){
            //console.log(msg.data);
            var data = msg.data;
            var li = "";
            for(var i = 0; i < data.length; i++){
                li += "<li><a id='"+data[i].id+"'>"+data[i].name+"</a></li>"
            }
            //console.log(li);
            $(".dropdown-menu").html(li);
        }
    })
}

document.getElementById("dropdown-menu").addEventListener("click",function(e) {
    // e.target是被点击的元素!
    // 如果被点击的是a元素
    if(e.target && e.target.nodeName == "A") {
        var text = $(e.target).text();
        console.log($(e.target));
        var event_type = $(e.target)[0].id;
        console.log(event_type);
        $('.btn-value').text(text);
        initCharts($(".atom-tab-active").index()+1, event_type);
    }
});

$('.atom-tab li').on('click', function (e) {
    $('.atom-tab li').removeClass('atom-tab-active');
    $(e.target).addClass('atom-tab-active');
    $('.atom-tab-panel').hide();
    var index = $('.atom-tab li').index($(e.target).eq(0));
    console.log(index);
    $('.btn-value').text("");
    if(index == 0 || index === 1){
        $(".atom-select-box").show();
    }else{
        $(".atom-select-box").hide();
    }
    var nowel = document.getElementsByClassName('atom-tab-panel');
    $(nowel[index]).show();
    initCharts(index+1, 0);
});

function initCharts(index, event_type){
    var myChartFlowDiagram = echarts.init(document.getElementById('flow-diagram'+index));
    var data = [];
    var datax = [];
    $.ajax({
        url: "/user360/monitor/getHourNum.do",
        data: {
            "type": index,
            "event_type": event_type
        },
        dataType: "json",
        async: false,
        success: function(msg){
            var datas = msg.data;
            for(var i = 0; i < datas.length; i ++){
                data.push({
                    name:datas[i].name,
                    value:[
                        datas[i].name,
                        datas[i].value
                        ]
                })
            }
        }
    });
    // for (var i = 0; i <= 30; i++) {
    //     datax.push(i * 2 + '');
    //     data.push([
    //         i * 2,
    //         parseInt(Math.random() * 80)
    //     ])
    // }
    console.log(data);
    //data = [["2017/10/31 10:12:00",  10] ,["2017/10/31 10:13:00",  20], ["2017/10/31 10:14:00",  30], ["2017/10/31 10:14:00",  0], ["2017/10/31 10:15:00",  0]];
    var option = {
        animation: false,
        title: {
            text: '数量(万)',
            textStyle: {
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            position: function (params) {
                params = params[0];
                //console.log(params);
                return [params, '10%'];
            },
            axisPointer: {
                animation: false
            }
        },
        legend: {
            right: '24px',
            data: [
                {
                    name: '流入总量',
                    // 强制设置图形为圆。
                    icon: 'circle',
                    textStyle: {
                        fonySize: '14px'
                    }
                }
            ]
        },
        snap: true,
        axisLine: {
            show: false
        },
        xAxis: {
            type: "time",
            //interval: 5,
            splitLine: {
                show: false
            },
            interval: new Date(30 * 1000),
            axisLabel: {
                inside: false,
                color:'#666'
            },
            axisLine:{
                lineStyle:{
                    color:'#ddd'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                inside: true
            },
            splitLine: {
                show: true,
                lineStyle:{
                    color:'#f6f6f6'

                }
            },
            axisLabel: {
                inside: false,
                color:'#666'
            },
            axisLine:{
                lineStyle:{
                    color:'#ddd'
                }
            }
        },
        grid: {
            top: 90,
            left: '3%',
            right: '4%'
        },
        series: [
            {
                name: '流入总量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#0099ff'
                    }
                },
                stack: 'a',
                // areaStyle: {
                //     normal: {
                //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //             {
                //                 offset: 0,
                //                 color: '#0099ff'
                //             }, {
                //                 offset: 1,
                //                 color: '#fff'
                //             }
                //         ])
                //     }
                // },
                data: data
            }
        ]
    };
    myChartFlowDiagram.resize();
    myChartFlowDiagram.setOption(option);
}