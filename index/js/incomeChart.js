/**
 * Created by haedu on 2017/4/28.
 */
$(function(){
    $.ajax({
        type:'POST',
        url:'data/incomeChart.php',
        data:{uname: sessionStorage['loginName']},
        success:function(data){
            $('#top-bar #welcome').html('您好！欢迎'+sessionStorage['loginName']+'来到我的驿站');
            new Chart(c13, {
                type: 'line',  //line、radar、pie、doughnut..
                data: {
                    labels:['01','02','03','04','05','06','07','08','09','10','11','12'],  //X轴上的提示文字
                    datasets: [{
                        label: ''+data.year+'年度销售额折线统计图',
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,1)",
                        data: [data.Jan,data.Feb,data.Mar,data.Apr,data.May,data.June,data.July,data.Aug,data.Sept,data.Oct,data.Nov,data.Dec],

                    }]
                },     //要绘制的数据
                options: {
                    responsive: false, //禁用响应式
                    Color:'#e4339c',
                    scales: {
                        yAxes: [{
                            ticks: {

                                beginAtZero: true//让Y轴从0开始

                            }
                        }]
                    }
                }   //图表相关选项
            });
        }
    })
});
