/**
 * Created by haedu on 2017/4/24.
 */
//发布商品
$('.fill input[name="pubtime"]').focus(function(){
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    $(this).val(''+getNowFormatDate()+'');

});
$('#pub').click(function(){
    //var pubData = $('form').serialize();
    //console.log(pubData);
    var pic1=$('#preview1 img').attr('src');
    var pic2=$('#preview2 img').attr('src');
    var pic3=$('#preview3 img').attr('src');
    var pic4=$('#preview4 img').attr('src');
    var pname=$('.fill input[name="pname"]').val();
    var pone=$('.fill select[name="pone"]').val();
    var ptwo=$('.fill input[name="ptwo"]').val();
    var price=$('.fill input[name="price"]').val();
    var newold=$('.fill input[name="newold"]').val();
    var pubtime=$('.fill input[name="pubtime"]').val();
    var retaintime=$('.fill input[name="retaintime"]').val();
    var pdesc=$('form textarea[name="pdesc"]').val();
    var pres=$('form textarea[name="pres"]').val();
    $.ajax({
        type:'POST',
        url:'data/pub.php',
        data:{uname:sessionStorage['loginName'],pic1:pic1,pic2:pic2,pic3:pic3,pic4:pic4,pname:pname,pone:pone,ptwo:ptwo,price:price,newold:newold,pubtime:pubtime,retaintime:retaintime,pdesc:pdesc,pres:pres},
        success:function(txt){
                $('#model-tips').css('display','block');
                $('#model-tips p').html(txt);

        }
    })
});

$('#model-tips .sure-btn').click(function(){
    $(this).parents('#model-tips').css('display','none');
});
