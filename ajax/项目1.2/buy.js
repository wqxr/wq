//购买
var div=document.getElementById("shoppingcar");

var table=document.createElement("table");
							table.cellSpacing=0;
							table.cellPadding=0;
							table.style.border="none";
							table.setAttribute('id','shop_table');
				var thead=document.createElement("thead");
				var tr=document.createElement("tr");
				tr.setAttribute("class","shop_tr");
							var str1="<tr>";
							str1+="<td>食物名</td><td>价格</td><td>增加</td><td>数量</td><td>减少</td><td>小计</td><td>取消订购</td>";
							str1+="</tr>"
							tr.innerHTML=str1;
							thead.appendChild(tr);
				table.appendChild(thead);
				var tbody=document.createElement("tbody");
				tbody.setAttribute('id','shop_body');
				table.appendChild(tbody);
				div.appendChild(table);
				var input=document.createElement("input");
				input.setAttribute('id','refirm_buy');
				input.value="确认购买";
				input.type="button";

				div.appendChild(input);

		
		
		//可在此设置一个延时器让购物车自动隐藏
		// var shop_car=lhz.$('shoppingcar');
		// shop_car.onfocus=function(){
		// 	div.style.display="block";
		// }
		// shop_car.onblur=function(){
		// 	div.style.display="none";
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


// function welcomeToFoodWeb(){
// 	if(!lhz.$("welcome_word")) return false;
// 	var word=lhz.$("welcome_word");
// 	word.style.cssText="position:relative;left:130px;top:60px";
	
// 	//lhz.moveElement("welcome_word",600,60,10);


// }
// lhz.addLoadEvent(welcomeToFoodWeb);
