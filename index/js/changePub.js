/**
 * Created by ���� on 2017/5/14.
 */
//�޸���Ʒ��Ϣ
var puburl=window.location.search;
var productId=puburl.split("=")[1];
$.ajax({
    url:"data/changePub.php",
    data:{uname: sessionStorage['loginName'],productId:productId},
    success:function(data){
        $('#top-bar #welcome').html('您好！'+sessionStorage['loginName']+'欢迎来到偶的驿站！');
        var html='';

            html=`
            <div class="clearfix">
                    <div class="lf fill">
                        <div class="form-group"><label>商品名称：</label><input type="text" name="pname" value="${data.PNAME}"/></div>
                        <div class="form-group"><label>一级分类：</label>
                            <input name="pone" id="pone" value="${data.PONE}" />


                        </div>
                        <div class="form-group"><label>二级分类：</label><input type="text" name="ptwo" value="${data.PTWO}"/></div>
                        <div class="form-group"><label>商品价格：</label><input type="text" name="price" value="${data.PRICE}"/></div>
                        <div class="form-group"><label>新旧程度：</label><input type="text" name="newold" value="${data.NEWOLD}"/></div>
                        <div class="form-group"><label>发布时间：</label><input type="text" name="pubtime" disabled value="${data.PUBTIME}"/></div>
                        <div class="form-group"><label>下架时间：</label><input type="date" name="retaintime" disabled value="${data.RETAINTIME}"/></div>
                    </div>
                    <div class="rt pInfo clearfix" >
                        <div class="form-group">
                            <label>商品描述：</label> <textarea name="pdesc"  cols="30" rows="10" >${data.PDESC}</textarea>
                        </div>
                        <div class="form-group"> <label>发布理由：</label> <textarea name="pres"  cols="30" rows="10" >${data.PRES}</textarea></div>
                        <div class="form-group">
                            <label>上传图片：</label>
                            <div class="upPic" name="pic">
                                <ul class="clearfix">
                                    <li>
                                        <div id="preview1" class="previewImg"><img src="${data.PIC1}" alt=""/></div>
                              <input  id="stt1" name="pic1" class="upfile" type="file"/>
                                    </li>
                                    <li class="li-center">
                                        <div id="preview2" class="previewImg">
                                        <img src="${data.PIC2}" alt=""/>
                                        </div>
                                        <input  id="stt2" name="pic2" class="upfile2" type="file"/>
                                    </li>
                                    <li>
                                        <div id="preview3" class="previewImg">
                                        <img src="${data.PIC3}" alt=""/>
                                        </div>
                                        <input  id="st3" name="pic3"  class="upfile3" type="file"/>
                                    </li>
                                    <li>
                                        <div id="preview4" class="previewImg">
                                        <img src="${data.PIC4}" alt=""/>
                                        </div>
                                        <input  id="st4" name="pic4" class="upfile4" type="file"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pubBtn"><input type="button" id="updatePub" value="确认修改"></div>
            `;
        //});
        $("form").html(html);
    }
});
$('form').on('click','#updatePub',function(){
    var pic1=$('#preview1 img').attr('src');
    var pic2=$('#preview2 img').attr('src');
    var pic3=$('#preview3 img').attr('src');
    var pic4=$('#preview4 img').attr('src');
    var pname=$('.fill input[name="pname"]').val();
    var pone=$('.fill input[name="pone"]').val();
    var ptwo=$('.fill input[name="ptwo"]').val();
    var price=$('.fill input[name="price"]').val();
    var newold=$('.fill input[name="newold"]').val();
    var pdesc=$('form textarea[name="pdesc"]').val();
    var pres=$('form textarea[name="pres"]').val();
    $.ajax({
        type:'POST',
        url:'data/updateProduct.php',
        data:{uname:sessionStorage['loginName'],productId:productId,pic1:pic1,pic2:pic2,pic3:pic3,pic4:pic4,pname:pname,pone:pone,ptwo:ptwo,price:price,newold:newold,pdesc:pdesc,pres:pres},
        success:function(txt){
            $('#model-tips').css('display','block');
            $('#model-tips p').html(txt);
            $('#closePub').click(function(){
                location.reload();
            })
        }
    })
});