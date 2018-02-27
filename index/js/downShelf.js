/**
 * Created by haedu on 2017/4/12.
 */
$('.myRelease').on('click','.downShelf',function(){
    var pid = $(this).parents().siblings('.title').attr('pid');
    $.ajax({
        type:'POST',
        url:"data/downShelf.php?pid="+pid,
        success:function(text){
            if(text == 'succ'){
                $('.model-tips').css('display','block');
            }else{
                console.log('存在未知错误请重新下架');
            }
        }
    })
});