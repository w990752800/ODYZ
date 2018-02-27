/**
 * Created by haedu on 2017/4/25.
 */
$(function() {
    $.ajax({
        type: 'POST',
        url: '../data/stuVerify.php',
        data:{uname:sessionStorage['loginName']},
        success:function(data){
            $('header ul li span').html(sessionStorage['loginName']);
            var html='';
            if(data==''){
                html=`
            <p>
            <label for="school">学校：</label>
            <input type="text" id="school" name="school"/>
          </p>
          <p>
            <label for="college">学院：</label>
            <input type="text" id="college" name="college"/>
          </p>
          <p>
            <label for="stuId">学号：</label>
            <input type="text" id="stuId" name="stuId"/>
          </p>
          <p>
            <label for="stuName">姓名：</label>
            <input type="text" id="stuName" name="stuName"/>
          </p>
          <div style="overflow: hidden;height: 100px;">
            <label style="float:left;">学生证照片：</label>
            <div id="headerImg">
              <input type="file" class="upfile" id="Img"/>
              <div id="headerImgView">
                <span>添加照片</span>
              </div>
            </div>
            <br/>
            <span>照片要求学生本人持学生证信息页，并能看清学生证信息</span>
          </div>
          <input type="button" id="stu"style="background: #3C83C5;color:#fff; margin:65px 0 0 163px;" value="认证"/>
                `;
            }else{
                $.each(data,function(i,d){
                    if(d.verifyStatus==0){
                        html=`
                       <p>
            <label for="school">学校：</label>
            <input type="text" id="school" name="school" value="${d.stuSchool}"/>
          </p>
          <p>
            <label for="college">学院：</label>
            <input type="text" id="college" name="college" value="${d.stuCollege}"/>
          </p>
          <p>
            <label for="stuId">学号：</label>
            <input type="text" id="stuId" name="stuId" value="${d.stuNumber}"/>
          </p>
          <p>
            <label for="stuName">姓名：</label>
            <input type="text" id="stuName" name="stuName" value="${d.stuName}"/>
          </p>
          <div style="overflow: hidden;height: 100px;">
            <label style="float:left;">学生证照片：</label>
            <div id="headerImg">
              <input type="file" class="upfile" id="Img"/>
              <div id="headerImgView">
                <img src="${d.stuImg}" alt=""/>
              </div>
            </div>
            <br/>
            <span style="color:red">状态：已通过认证！</span>
            <br/>
            <br/>
            <span>照片要求学生本人持学生证信息页，并能看清学生证信息</span>
          </div>
          <input type="button" id="stu" style="background: #3C83C5;color:#fff; margin:65px 0 0 163px;"value="认证"/>
                       `;
           }else if(d.verifyStatus==1){
            html=`
            <p>
            <label for="school">学校：</label>
            <input type="text" id="school" name="school" value="${d.stuSchool}"/>
            </p>
            <p>
            <label for="college">学院：</label>
            <input type="text" id="college" name="college" value="${d.stuCollege}"/>
            </p>
             <p>
            <label for="stuId">学号：</label>
            <input type="text" id="stuId" name="stuId" value="${d.stuNumber}"/>
             </p>
             <p>
                <label for="stuName">姓名：</label>
                <input type="text" id="stuName" name="stuName" value="${d.stuName}"/>
            </p>
          <div style="overflow: hidden;height: 100px;">
            <label style="float:left;">学生证照片：</label>
            <div id="headerImg">
              <input type="file" class="upfile" id="Img"/>
              <div id="headerImgView">
                <img src="${d.stuImg}" alt=""/>
              </div>
            </div>
            <br/>
            <span style="color:red">状态：未认证！</span>
            <br/>
            <br/>
            <span>照片要求学生本人持学生证信息页，并能看清学生证信息</span>
          </div>
          <input type="button" id="stu" style="background: #3C83C5; margin:65px 0 0 163px;color:#fff;" value="认证"/>
                       `;
                    }else if(d.verifyStatus==2){
                        html=`
                       <p>
            <label for="school">学校：</label>
            <input type="text" id="school" name="school" value="${d.stuSchool}"/>
          </p>
          <p>
            <label for="college">学院：</label>
            <input type="text" id="college" name="college" value="${d.stuCollege}"/>
          </p>
          <p>
            <label for="stuId">学号：</label>
            <input type="text" id="stuId" name="stuId" value="${d.stuNumber}"/>
          </p>
          <p>
            <label for="stuName">姓名：</label>
            <input type="text" id="stuName" name="stuName" value="${d.stuName}"/>
          </p>
          <div style="overflow: hidden;height: 100px;">
            <label style="float:left;">学生证照片：</label>
            <div id="headerImg">
              <input type="file" class="upfile" id="Img"/>
              <div id="headerImgView">
                <img src="${d.stuImg}" alt=""/>
              </div>
            </div>
            <br/>
            <span style="color:red">状态：未通过！</span>
            <br/>
            <br/>
            <span>照片要求学生本人持学生证信息页，并能看清学生证信息</span>
          </div>
          <input type="button" id="stu" style="background: #3C83C5; margin:65px 0 0 163px;color:#fff;" value="认证"/>
                       `;
                    }
                });
            }
            $('#stuTest').html(html);
            $(' .upfile').on('change',function() {
                var fd = new FormData();
                fd.append("upload", 0);
                fd.append("upfile", $(".upfile").get(0).files[0]);
                $.ajax({
                    url: "../data/headerImg.php",
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: fd,
                    success: function(d) {
                        var html="";
                        html=`<img src="../${d}" />`;
                        $('#headerImgView').html(html);
                    }
                });
            });

            $('#stu').click(function(){
                var school=$('#school').val();
                var college=$("#college").val();
                var stuId=$("#stuId").val();
                var stuName=$("#stuName").val();
                var headerImg=$('#headerImgView img').attr('src');
                $.ajax({
                    type: 'POST',
                    url: '../data/stuVerify2.php',
                    data: {headerImg:headerImg,uname:sessionStorage['loginName'],school:school,college:college,stuId:stuId,stuName:stuName},
                    success: function(data){
                        $('#model-tips').css('display','block');
                        $('#model-tips p').html(data.msg);
                        $('#model-tips .sure-btn').click(function(){
                            location.href='../html/stuCertification.html?loginName='+loginName;
                        });
                    }
                });
            });
        }
    });
});


