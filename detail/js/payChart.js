/**
 * Created by Administrator on 2017/4/26.
 */
/**功能点5：页面加载完成后，异步请求当前登录用户的消费统计数据，绘制SVG统计图——使用第三方绘图库：FusionCharts**/
$.ajax({
    type: 'GET',
    url: '../data/payChart.php',
    data: {uname: sessionStorage['loginName']},
    success: function(obj){
        $('#top_box span').html(sessionStorage['loginName']);
    }
});
$.ajax({
    type: 'GET',
    url: '../data/payChart1111111111.php',
    data: {uname: sessionStorage['loginName']},
    success: function(list){
        //list形如：[{label:'',value:xx},{}]
        //使用FusionCharts绘制统计图
        console.log(list);
        var fc = new FusionCharts({
            type: 'column3d',//column2d、column3d、bar2d、bar3d、pie2d、pie3d、doughnut2d、doughnut3d
            width: '800',
            height: '400',
            caption:'本年度消费统计图',
            xAxisName:'月份',
            yAxisName:'金额（元）',
            dataSource: {     //指定数据源
                data: list
            }
        });
        fc.render('payChartInner'); //指定渲染在哪个容器中
    }
});
