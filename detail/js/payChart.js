/**
 * Created by Administrator on 2017/4/26.
 */
/**���ܵ�5��ҳ�������ɺ��첽����ǰ��¼�û�������ͳ�����ݣ�����SVGͳ��ͼ����ʹ�õ�������ͼ�⣺FusionCharts**/
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
        //list���磺[{label:'',value:xx},{}]
        //ʹ��FusionCharts����ͳ��ͼ
        console.log(list);
        var fc = new FusionCharts({
            type: 'column3d',//column2d��column3d��bar2d��bar3d��pie2d��pie3d��doughnut2d��doughnut3d
            width: '800',
            height: '400',
            caption:'���������ͳ��ͼ',
            xAxisName:'�·�',
            yAxisName:'��Ԫ��',
            dataSource: {     //ָ������Դ
                data: list
            }
        });
        fc.render('payChartInner'); //ָ����Ⱦ���ĸ�������
    }
});
