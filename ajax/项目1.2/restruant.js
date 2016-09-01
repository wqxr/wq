// JavaScript Document
	function changebord(obj){
			
			obj.style.border="1px solid yellow";
			}
			
		function changeborder(obj1){
			obj1.style.border="1px solid #999";
			}
	
	
	var content=wq.$('content');
	var req1=wq.ajaxRequest('http://218.196.14.220:8080/res/resfood.action',
	{'method':'POST','send':'op=findAllFoods','jsonResponseListener':listener1});

	
	var divto=document.createElement("div");
	divto.setAttribute("id",'read');
	var pp=document.createElement("p");
	var total=wq.$('total1');
	function listener1(json){
		
		var boolean=true;
		var obj1=json.obj;
		wq.addEvent()
		var div=wq.$('table');
		
		
		var ul=document.createElement("ul");
		ul.setAttribute("class","ul_one");
			for(var i=0;i<obj1.length-6;i++){
				var li=document.createElement("li");
				li.setAttribute("class","mytable")
				li.innerHTML="<span class='li_style'>"+obj1[i].fname+"</span>"+"———————————￥"+obj1[i].realprice;
				ul.appendChild(li);
			}
			wq.prependChild('table',ul);
			
	
		
		//返回
		wq.addEvent('btn4','click',function(){
			divto.style.marginTop=30+"px"
			var total1=wq.$('total');
			ul.innerHTML="";
			total1.style.backgroundColor="#fff";
			ul.style.marginTop=50+"px";
			ul.setAttribute("class","one");
			//ul.style.marginLeft=500+"px";
			if(wq.$('pic')){
			wq.$('pic').innerHTML="";
			}
			// if(wq.$('divinfo')){
			// 	wq.$('divinfo').innerHTML="";
			// }
			for(var i=0;i<obj1.length;i++){
				var li=document.createElement("li");
				li.setAttribute("class","mytable")
				li.innerHTML="<span class='li_style'>"+obj1[i].fname+"</span>"+"———————————￥"+obj1[i].realprice;
				ul.appendChild(li);
				}
				total.appendChild(ul);
			})
			
		//加载更多	
		wq.addEvent('btn3','click',function(){
			var btn1=wq.$("btn1");
			//btn1.style.display='block';
			var img=wq.$("total1");
			if(img.style.display=='none'){
				img.style.display='block';
				}
			var div1=document.createElement("div");
			div1.setAttribute('id','first');
			var div=wq.$('table');
			var ul=document.createElement("ul");
			
			if(boolean){
				for(var j=obj1.length-1;j>5;j--){
					var li=document.createElement("li");
					li.setAttribute("class","mytable");
					li.innerHTML="<span class='li_style'>"+obj1[j].fname+"</span>"+"———————————￥"+obj1[j].realprice;
					ul.appendChild(li);
				}
				div1.appendChild(ul);
				//insertAfter(node,referenceNode)
				wq.insertAfter(div1,div);
				boolean=false;
			}
			lhz.$(btn3).style.display="none";
		});
		
		/*wq.addEvent('btn4','click',function(){
			var img=wq.$("total1");
			var img1=wq.$("total");
			var div=wq.$('table');
			//alert('div')
			
			})
			*/
		wq.addEvent("btn5","click",function(){
			var img=wq.$("total1");
			var img1=wq.$("total");
			var divtable=wq.$('table');
			var first=wq.$('first');
			img.innerHTML="";
			img1.style.backgroundColor='#fff';
			//divtable.innerHTML="";
			var ul=document.createElement("ul");
			ul.setAttribute('id','pic');
			/*ul.style.left=div.offsetLeft+"px";
			ul.style.Top=div.offsetTop+"px";*/
			ul.style.marginLeft=270+"px";
			ul.style.width=1200+"px";
			for(var i=0;i<obj1.length;i++){
				var li=document.createElement("li");
				li.style.border="1px solid #999";
				li.style.width=200+"px";
				li.style.marginTop=100+"px";
				li.style.height=280+"px";
				li.style.marginLeft=50+"px";
				li.setAttribute("onmouseover","changebord(this)");
				li.setAttribute("onmouseout",'changeborder(this)');


				var p=document.createElement("p");
				p.style.textAlign='center';
				p.innerHTML=obj1[i].fname+"     ￥<span style='font-size:20px;color:#F34949;font-weight:bloder'>"+obj1[i].realprice+"</span>";
				var p_real=document.createElement("p");
				p_real.style.textAlign='center';
				p_real.style.color="#C0C0C0";
				p_real.innerHTML="原价： <s>￥"+obj1[i].normprice+"</s>"
				var p1=document.createElement("p");
				var inp=document.createElement("input");
				var inp1=document.createElement("input");
				inp.type="button";
				inp.value="购买";
				inp.className="inp";
				inp1.type="button";
				inp1.value="查看详情";
				inp1.className="find";
				inp.style.marginLeft=20+"px";
				p1.appendChild(inp);
				p1.appendChild(inp1);
				li.style.marginLeft=50+"px";
				li.style.marginTop=100+"px";
				
				var startimg=document.createElement("img");
				startimg.style.width=153+"px";
				startimg.style.height=158+"px";
				
				startimg.style.paddingLeft=25+"px";
				startimg.style.marginTop=20+"px";
				startimg.style.borderRadius=15+"px";
				startimg.src="http://218.196.14.220:8080/res/images/"+obj1[i].fphoto;
				
				li.appendChild(startimg);
				li.appendChild(p);
				li.appendChild(p_real);
				li.appendChild(p1);
				ul.appendChild(li);
				//img.style.width=ul.style.width;
			}
		    img.appendChild(ul)	
			
			
			var inps=document.getElementsByClassName("inp"); 
			var table=document.getElementById("shop_table");
		for(var j=0;j<inps.length;j++){
			(function(index){
				lhz.addEvent(inps[index],'click',function(){
					//下订单
					var options={
						"completeListener":function(){
							alert(obj1[index].fname+"已添加至购物车");
						}
					};
					lhz.xssRequest("http://218.196.14.220:8080/res/resorder.action?num=1&op=order&fid="+obj1[index].fid,options);
				 
				 //添加到购物车
			tbody.innerHTML=null;
				var option={
					"completeListener":function(){
						if(this.responseJSON.obj){
						var obj=this.responseJSON.obj;
						for(var i=1;i<13;i++){
							if(obj[i]){
								var tbody=lhz.$("shop_body");
								var tr=document.createElement("tr");
									tr.data=i;

								var td1=document.createElement("td");
								td1.innerHTML=obj[i].food.fname;
								tr.appendChild(td1);

								var td2=document.createElement("td");
								td2.innerHTML=obj[i].food.realprice;
								tr.appendChild(td2);

								var td3=document.createElement("td");
								var input_add=document.createElement("input");
								input_add.setAttribute("onclick","addfood(this)");
								input_add.type="button";
								input_add.className="addfoodnum";
								input_add.value="+";

								td3.appendChild(input_add);
								tr.appendChild(td3);
								
								
								var td4=document.createElement("td");
								td4.innerHTML=obj[i].num;
								tr.appendChild(td4);

								var td5=document.createElement("td");
								var input_reduce=document.createElement("input");
								input_reduce.setAttribute("onclick","reducefood(this)");
								input_reduce.type="button";
								input_reduce.className="addfoodnum";
								input_reduce.value="-";

								td5.appendChild(input_reduce);
								tr.appendChild(td5);

								var td6=document.createElement("td");
								td6.innerHTML=obj[i].smallCount;
								tr.appendChild(td6);

								var td7=document.createElement("td");
								var input_del=document.createElement("input");
								input_del.setAttribute("onclick","del(this)");
								input_del.type="button";
								input_del.className="delete";
								input_del.value="X";
								td7.appendChild(input_del);
								tr.appendChild(td7);
								tbody.appendChild(tr);
								
								

								}

							}
							}
						}
						
						
					
				};
			lhz.xssRequest("http://218.196.14.220:8080/res/resorder.action?op=getCartInfo",option);

			 	 })
				
			})(j);

		}
			//查看详情
			var find1=document.getElementsByClassName("find");
			
			
			
			divto.style.width=250+"px";
			divto.style.height=400+"px";
			divto.style.float='left';
			divto.style.marginLeft=20+"px";
			divto.style.marginTop=100+"px";
			divto.style.border="1px solid #D7DBD6";
			divto.style.overflow="auto";
			
			divto.style.opacity="0.5";
			divto.appendChild(pp);
			var date=new Date();
			//判断是否登录
		
			
			
			for(var i=0;i<find1.length;i++){
			
				
				
				
				(function(index){
					/*wq.addEvent(find1[index],'mouseout',function(){
						 var divdetail=wq.$("detaildiv");
						 divdetail.style.display="none";
						})*/
					wq.addEvent(find1[index],"click",function(){
						//判断用户是否登录
						var date=new Date();
						var times=5;
						var options={
							"completeListener":function(){
								var code=this.responseJSON.code;
								//obj2=this.responseJSON.obj;
								
								
								
							if(code==0){
								alert("不好意思，您还没登录，请登录");
							}else{
								var uname=this.responseJSON.obj.username;
								document.getElementById('submit_t').style.display='none';
								document.getElementById("myform").style.display="none";
								var p_sub=document.getElementById('sub_result').innerHTML="欢迎您，"+uname;
								document.body.style.background="none";
								var p2=document.createElement("p");
								p.style.color="black";
								Cookies.set('foodName'+index,obj1[index].fname,times*24*60);
								Cookies.set('time'+index,date.getFullYear()+"-"	+(date.getMonth()+1)+"-"+date.getDate(),times*24*60);
								p2.innerHTML="<span style='font-size:14px;'>"+obj1[index].fname+"</span>"+"<span style='font-size:14px;float:right;padding-right:20px;'>"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"</span>";
								divto.appendChild(p2);
								var a=document.createElement("hr");
								divto.appendChild(a);
								
									
	
							}
						/*wq.addEvent(find1[index],"mouseout",function(){
						var bb=wq.$("detaildiv");
						bb.style.left=bb.offsetLeft+30+"px";
						bb.style.top=bb.offsetTop+30+"px";
						bb.style.display="none";
		*/
		
			
						
								
							}
							
						};
						
						yc.xssRequest("http://218.196.14.220:8080/res/resuser.action?op=checkLogin",options);
					
					})
					
					wq.addEvent(find1[index],'click',function(){
						var option={
								  "completeListener":function(){
										
									  var obj2=this.responseJSON.obj;	
									  var divdetail=wq.$("detaildiv");
									  var imgdetail=divdetail.getElementsByTagName('img')[0];
									  var pdetail=divdetail.getElementsByTagName('p');
									  imgdetail.src="http://218.196.14.220:8080/res/images/"+obj2.fphoto;
							
										pdetail[0].innerHTML=obj2.fname;
										pdetail[1].innerHTML=obj2.detail;
							
										divdetail.style.left=find1[index].offsetLeft+"px";
										divdetail.style.top=find1[index].offsetTop+"px";
										divdetail.style.display="block";
										divdetail.onclick=function(){
											divdetail.style.display="none";
											
										}
										
										
										
										
										}
									}
						
	yc.xssRequest("http://218.196.14.220:8080/res/resfood.action?op=findFood&fid="+obj1[index].fid,option);
						
						})
						
						
						
				})(i)
					
			
		
		
		
					
			}
			wq.prependChild('total1',divto);
			
		
			})
			
			
		/*(function(index){
			wq.addEvent(find2[index],'mouseout',function(){
				 var divdetail1=wq.$("detaildiv"); 
				 divdetail1.style.display="none";
				
				
				})
			
			})(i)
		*/
		}
		
		
		
	
	
	
	wq.addLoadEvent(function(){
		var pp=document.createElement('p');
			pp.style.color="red";
			pp.style.fontSize=20+"px";
			pp.innerHTML="浏览记录";
			divto.appendChild(pp);
			
				for(var i=0;i<12;i++){
					if(Cookies.get('foodName'+i)&&Cookies.get('time'+i)){
						var pi=document.createElement("p");
						var span=document.createElement("span");
						//<span style='color:#C96;font-size:18px;'>
						//span.style.color="#c96";
						span.style.fontSize='14px';
						span.innerHTML=Cookies.get('foodName'+i)
						pi.appendChild(span);
						var span1=document.createElement('span');
						//<span style='font-size:14px;float:right;padding-right:20px;'>"
						span1.style.fontSize=14+"px";
						span1.style.float='right';
						span1.style.paddingRight=20+'px';
						span1.innerHTML=Cookies.get('time'+i);
						pi.appendChild(span1);
						
						var hr=document.createElement("hr");
						
						divto.appendChild(pi);
						divto.appendChild(hr);
					
					
					
					
					
					
					
					
					
					
						}
						
				}
				
				
		
	
				
			})	
	/*
	(function(index){
					wq.addEvent(smalldiv[index],'mouseover',function(){
						smalldiv[index].style.backgroundColor='#ccc';
						});
						wq.addEvent(smalldiv[index],'mouseout',function(){
							smalldiv[index].style.backgroundColor='#fff';
							})
					})(i)
				
				}
	*/	
	
	
	lhz.addEvent('shop','click',function(){
		var div=document.getElementById("shoppingcar");
			if(div.style.display=="block"){
				div.style.display="none";
			}else{
				div.style.display="block";
			}
			
			

			
		})

function addfood(obj){
	var tr=obj.parentNode.parentNode;
	var td=obj.parentNode;
				var option={
						"completeListener":function(){
					tr.childNodes[3].innerHTML++;
					tr.childNodes[5].innerHTML=tr.childNodes[3].innerHTML*tr.childNodes[1].innerHTML;
						}
					}
					lhz.xssRequest("http://218.196.14.220:8080/res/resorder.action?op=orderJson&num=1&fid="+tr.data,option);
				
				
}
function reducefood(obj){
	var tr=obj.parentNode.parentNode;
	var td=obj.parentNode;
				var option={
						"completeListener":function(){
				if(tr.childNodes[3].innerHTML>=1){
					tr.childNodes[3].innerHTML--;
					tr.childNodes[5].innerHTML=tr.childNodes[3].innerHTML*tr.childNodes[1].innerHTML;
						}
					}
				}
					lhz.xssRequest("http://218.196.14.220:8080/res/resorder.action?op=orderJson&num=-1&fid="+tr.data,option);
}

function del(obj){
	var tr=obj.parentNode.parentNode;
	var tbody=tr.parentNode;
				var option={
						"completeListener":function(){
					tbody.removeChild(tr);
						}
					}
					lhz.xssRequest("http://218.196.14.220:8080/res/resorder.action?op=delorder&fid="+tr.data,option);
}		

//下订单直接显示地址 
	var imgcute=document.createElement("img");
	imgcute.src="images/cute.png";
	imgcute.style.float="left";
	var refirm_buy=lhz.$("refirm_buy");
	
	
	wq.addEvent("refirm_buy","click",function(){
		var shoplogo=wq.$("shop_body");
		var tr=shoplogo.getElementsByTagName("tr");
		if(tr.length==0){
			alert("您好，您还没选择食物，请重新确认");
		}else{
		var img=wq.$("total1");
		var divinfo=wq.$('divinfo');
		img.innerHTML="";
		divinfo.style.display='block';
		img.appendChild(imgcute);
		img.appendChild(divinfo);
		var tel=wq.$("span1").value;
		var address=wq.$('span2').value;
		var deliverytime=wq.$("span3").value;
		var ps=wq.$("span4").value;
  
		var options5={
			"completeListener":function(){
				 var code=this.responseJSON.code;
				  
				if(code==0){
				  alert("不好意思，您还没登录，请登录");
			 	}else{
					
				var username=this.responseJSON.obj.username;		
				document.getElementById('submit_t').style.display='none';
				document.getElementById("myform").style.display="none";
				var p_sub=document.getElementById('sub_result').innerHTML="欢迎您，"+username;
				document.body.style.background="none";
							var refirmBuy={
								"completeListener":function(){
									var code1=this.responseJSON.code;
								wq.addEvent("ofcourse","click",function(){
								if(code1==0){
								alert("hello");
								}else{
									alert("您购买成功，欢迎下次光临");
									}
									
									})	

								}
						}
						
lhz.xssRequest("http://218.196.14.220:8080/res/cust/custOp.action?op=confirmOrder&address="+address+"&tel="+tel+"&deliverytime="+deliverytime+"&ps="+ps,refirmBuy);
					}
				}
			
			
			}
		yc.xssRequest("http://218.196.14.220:8080/res/resuser.action?op=checkLogin",options5);
			
		}
		})	
	
	function change(){
		var d1=wq.$("content");
		var u2=wq.$("content1");
		var total=wq.$("total");
		var speed=3;
		var timer=null;
		var l2=u2.getElementsByTagName("li");
		
			u2.innerHTML=u2.innerHTML+u2.innerHTML;
			u2.style.width=l2[0].offsetWidth*(l2.length)+150+"px";
			
			function move(){
			if(u2.offsetLeft<-u2.offsetWidth/2){
				u2.style.left='0';
				}
			if(u2.offsetLeft>0){
				u2.style.left=-u2.offsetWidth/2+"px";
				}
			u2.style.left=u2.offsetLeft+speed+"px";
			}
		 	timer=setInterval(move,40);
			var aa=total.getElementsByTagName('a');
			aa[0].onmousemove=function(){
			speed=-2;
			
			}
			aa[1].onmousemove=function(){
			speed=2;
			
			}
		
			d1.onmouseout=function(){
			timer=setInterval(move,40);
			}
			d1.onmouseover=function(){
			clearInterval(timer);
			}
		
		}
	
	wq.addLoadEvent(change);
		
	
	//用户如果有登陆，就直接显示	
	wq.addLoadEvent(function(){
			var options6={
			"completeListener":function(){
				 var code=this.responseJSON.code;
				if(code==0){
				  alert("不好意思，您还没登录，请登录");
			 	}else{
						var username=this.responseJSON.obj.username;
						document.getElementById('submit_t').style.display='none';
						document.getElementById("myform").style.display="none";
						var p_sub=document.getElementById('sub_result').innerHTML="欢迎您，"+username;
						document.body.style.background="none";
					}
				}
			
			
			}
		yc.xssRequest("http://218.196.14.220:8080/res/resuser.action?op=checkLogin",options6);
			
		
		})	

		
		
	