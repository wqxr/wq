//绑定登录事件
lhz.addEvent('submit_t',"click",function(){
	document.getElementById("myform").style.display="block";
	lhz.$(shop).style.display="none";
	lhz.$(menu).style.display="none";
	document.body.style="background:rgba(0,0,0,0.5);";
})

//图片更改
function change_pic(){
	var img=document.getElementById("code_img");
	img.src="http://218.196.14.220:8080/res/verifyCodeServlet?"+Math.random();
}

//登录操作
function add(){
 	var myform=document.myform;
 	var parama=lhz.serialize(myform);
	var options={
		"completeListener":function(){
			var code=this.responseJSON.code;
			if(code==0){
				alert(responseJSON.msg);
				}else{
				document.getElementById('submit_t').style.display='none';
				var uname=lhz.$("uname").value;
				document.getElementById("myform").style.display="none";
				var p_sub=document.getElementById('sub_result').innerHTML="欢迎您，"+uname;
				lhz.$(shop).style.display="block";
				document.body.style.background="none";
				lhz.$(menu).style.display="none";

				}
			}
		}
	
	yc.xssRequest("http://218.196.14.220:8080/res/resuser.action?"+parama,options);
}
 //alert(parama);
/*var denglu=lhz.ajaxRequest('http://218.196.14.220:8080/res/resuser.action',{'method':'POST','send':parama,'jsonResponseListener':listener});

	function listener(json){
		//alert(json.code);
		if(json.code==0){
			alert(json.msg);
		}else{
		document.getElementById('submit_t').style.display='none';
		var uname=document.getElementsByTagName("input")[1].value;
		document.getElementById("myform").style.display="none";
		var p_sub=document.getElementById('sub_result').innerHTML="欢迎您，"+uname;
		document.body.style.background="none";

		}
	}
}
*/
//取消登录
lhz.addEvent('btn2',"click",function(){
	document.getElementById("myform").style.display="none";
	document.body.style.background="none";
	lhz.$(menu).style.display="block";
	lhz.$(shop).style.display="block";

})



 


// 用户退出
lhz.addEvent('out','click',function(){
	var options={
		"completeListener":function(){
			var code=this.responseJSON.code;
			if(code==1){
			document.getElementById('submit_t').style.display='block';
			var p_sub=document.getElementById('sub_result').innerHTML=null;
			}
			
		}
	}
	yc.xssRequest("http://218.196.14.220:8080/res/resuser.action?op=logout",options);

	/*function listener1(json){
		if(json.code==1){
			document.getElementById('submit_t').style.display='block';
			var p_sub=document.getElementById('sub_result').innerHTML=null;
		}
	}*/
})




//用户登录检查
// var cek=lhz.ajaxRequest('http://218.196.14.220:8080/res/resuser.action',{'method':'POST','send':'op= checkLogin','jsonResponseListener':listener2});

// function listener2(json){
// 	if(json.code==0){
// 		alert("请登录");
// 	}
// }

// function move(word){
// 	var xpos=parseInt(word.style.left);

// 	var dist=0;
// 	if(xpos<final_x &&){
// 		dist=(final_x-xpos)/10;
// 		xpos=xpos+dist;
// 	}
// 	if(xpos==final_x ){
// 		dist=(xpos-final_x)/10;
// 		xpos=xpos-dist;
// 	}
// }
//欢迎语


/*function welcomeToFoodWeb(){
	if(!lhz.$("welcome_word")) return false;
	var word=lhz.$("welcome_word");
	word.style.cssText="position:relative;left:130px;top:60px";
	
	//lhz.moveElement("welcome_word",600,60,10);


}
lhz.addLoadEvent(welcomeToFoodWeb);*/

