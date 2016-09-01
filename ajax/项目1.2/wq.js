// JavaScript Document
(function(){
	if(!window.wq){
		window.wq={};
	}

})();
	
function $(){
		var elements=new Array();
		//alert(arguments.length);//arguments:是指传入的参数存在arguments里面
		for(var i=0;i<arguments.length;i++){
			
			var element=arguments[i];
			if(typeof element=="string"){
				element=document.getElementById(element);
				}if(arguments.length==1){
					return element;
					}
			elements.push(element);
			}
		return elements;
		}
	window["wq"]["$"]=$;
	
	

	
//将对象转化为json	
/*Object.prototype.toJsonString=function(){
	//需求：给object类的prototype添加一个功能，将属性的值以json格式输出
	//{"name":"zy","age":30,"sex":"男"}
	//for(var i in person) person[i]取出值
		//var obj=new Object();
		var strjson=JSON.stringify(this);
		return strjson;	
	}*/
//Object,array  js 中原生对象	
Object.prototype.toJsonString=function(){
		var strString=[]
		for(var i in this){
			if(this.hasOwnProperty(i)){
				strString.push("\""+i+"\""+":\""+this[i]+"\"");
			
			}
		}
		var r=strString.join(",");
		r="{"+r+"}";
		return r;
	};
	
Array.prototype.toJsonString=function(){
	var json=[];
	for(var i=0;i<this.length;i++){
		json[i]=(this[i]!=null)?this[i].toJsonString():"null";
		}
		return "["+json.join(",")+"]";
	}
	
String.prototype.toJsonString=function(){
	return '"'+this.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,function(){
		var a=arguments[0];
		return (a=='\n')?'\\n':(a=='\r')?'\\r':(a=='\t')?'\\t':""})+'"'
		}
	

	
function supplant(str,o){
	return str.replace(/{([a-z]*)}/g,function(a,b){
		//alert(a+"\t"+b);
		var r=o[b];
		return r;
		}
	);
};
window['wq']['supplant']=supplant;
	
function supplant1(str,o){
	for(var i in o){
		str=str.replace("{"+i+"}",o[i]);
		}
		return str;
	};
	window["wq"]["supplant1"]=supplant1;
/*function parseJson(str,filter){
	var result=eval("("+str+")");
	if(filter!=null&&typeof(filter)=='function'){
		for(var i in result){
			result[i]=filter(i,result[i]);
			}
		}
		return result;
	}	*/
function parseJson(str,filter){
	var result=eval("("+str+")");
	//alert(result);
	if(filter!=null&& typeof(filter)=="function"){
		for(var i in result){
			//alert(typeof(result[i]));
			if(typeof(result[i])=='object' && typeof(result[i])!="function"){
				var jsonstr=JSON.stringify(result[i]);
				alert(jsonstr);
				result[i]=parseJson(jsonstr,filter);
			}else{
				result[i]=filter(i,result[i]);
			}
		}
	}
	//console.log(result);
	return result;
}
window["wq"]["parseJson"]=parseJson;

//判断当前浏览器是否兼容这个库：浏览器检测能力
function isCompatible(other){
	if(other===false||!Array.prototype.push||!Object.hasOwnProperty||!document.createElement||!document.getElementsByTagName){
			return false;
		}
			return true;
};
	window["wq"]["isCompatible"]=isCompatible;
	
	//增加事件：node节点 type：事件类型  listener：监听器函数
	
	function addEvent(node,type,listener){
		if(!isCompatible()){return false}
		if(!(node=$(node))){return false}
		if(node.addEventListener){
			node.addEventListener(type,listener,false);
			}else if(node.attachEvent){
				node['e'+type+listener]=listener;
				node[type+listener]=function(){
					node['e'+type+listener](window.event);
					}
					node.attachEvent('on'+type,node[type+listener]);
				}
		};
		
		window['wq']['addEvent']=addEvent;
		//移除事件
		
	function removeEvent(node,type,listener){
		if(!(node=$(node))){return false;}
		if(node.removeEventListener){
			node.removeEventListener(type,listener,false);
			return true;
			}else if(node.detachEvent){
				node.detachEvent('on'+type,node[type+listener]);
				node[type+listener]=null;
				return true;
				}
				return false;
		};
		window['wq']['removeEvent']=removeEvent;
		//注意点，添加事件和删除事件是要用同一个函数
		/*wq.addEvent("show","click",function(){
			alert("heloo");
			});	
		wq.removeEvent("show","click",function(){
		alert("heloo");
		});	以上错误，无法移除，因为匿名函数是两个函数*/
		
		function addLoadEvent(func){
				//将现有的window。load事件处理函数的值存入变量oldLoad
				var oldOnLoad=window.onload;
				//如果在这个处理函数上还没有绑定任何函数，就像平时那样把函数添加个给他
				if(typeof window.onload!='function'){
					window.onload=func;
					}else{ 
					//如果在这个处理函数上已经绑定了一些函数，则将新函数追加到现有指令的尾部
					window.onload=function(){
						oldOnLoad();
						func();
					}
				}
				
			}
			window['wq']['addLoadEvent']=addLoadEvent;
		
		
	function getElementsByClassName(className,tag,parent){
		parent=parent||document;
		if(!(parent=$(parent))){
			return false;
			}
			//查看所有的标签
		var allTags=(tag=="*"&&parent.all)?parent.all:parent.getElementsByTagName(tag);
		var matchingElement=new Array();
		//创建一个正则表达式来判断className是否正确 ^a ||  a
		var regex=new RegExp("(^|\\s)"+className+"(\\s|$)");
		var element;
		//检查每个元素
		for(var i=0;i<allTags.length;i++){
			element=allTags[i];
			if(regex.test(element.className)){
				matchingElement.push(element);
				}
			}
			return matchingElement;
		};
		window['wq']['getElementsByClassName']=getElementsByClassName;
		
		
		
		function toggleDisplay(node,value){
			if(!(node=$(node))){return false;}
			if(node.style.display!="none"){
				node.style.display="none";
				}else{
					node.style.display=value||"";
					}
					return true;
			};
			window['wq']['toggleDisplay']=toggleDisplay;
			
		function insertAfter(node,referenceNode){
			if(!(node=$(node))){return false;}
			if(!(referenceNode=$(referenceNode))){return false;}
			var parent=referenceNode.parentNode;
			if(parent.lastChild==referenceNode){
				parent.appendChild(node);
				}else{
					parent.insertBefore(node,referenceNode.nextSibling);
					}
			};
		window['wq']['insertAfter']=insertAfter;
		
	function removeChildren(parent){
		if(!(parent=$(parent))){return false;}
		while(parent.firstChild){
			parent.removeChild(parent.firstChild);
			}
			return parent;
			
		};
		window['wq']['removeChildren']=removeChildren;
		
	function prependChild(parent,newChild){
		if(!(parent=$(parent))){return false;}
		if(!(newChild=$(newChild))){return false;}
		if(parent.firstChild){
			parent.insertBefore(newChild,parent.firstChild);
			}else{
				parent.appendChild(newChild);
				}
				return parent;
		};
		window['wq']['prependChild']=prependChild;
	
	
	//word-word转化为wordWord
	
	
	function camelize(s){
		return s.replace(/-(\w)/g,function(strMatch,p){
			return p.toUpperCase();
			});
		}
	window["wq"]["camelize"]=camelize;
	//wordWord转化为word-word
	function uncamelize(s,sep){
		sep=sep||"-";
		return s.replace(/([a-z])([A-Z])/g,function(match,p1,p2){
			return p1+sep+p2.toLowerCase();
			});
		}
		window["wq"]["uncamelize"]=uncamelize;
		
		//通过id改变单个元素的样式{"backgroundColor":"red"}加行列样式
		function setStyleById(element,styles){
			//取得对象的引用
			if(!(element=$(element))){return false;}
			for(property in styles){
				if(!styles.hasOwnProperty(property)){
					continue;
					}
					//遍历styles对象的引用
					if(element.style.setProperty){
						//setProperty("background-color")
						//DOM2样式规范 setproperty(propertyName,value,priority)
						element.style.setProperty(uncamelize(property,'-'),styles[property],null);
						}else{
							//备用方法 element.style["backgroundColor"]="red";
							element.style[camelize(peoperty)]=styles[property];
							}
				}
				return true;
			}
			window['wq']['setStyleById']=setStyleById;
			window['wq']['setStyle']=setStyleById;
			
	/*通过标签名修改多个样式：调用举例：yc.setStylesByTagName('a',{'color':'red'});
	tagName:标签名
	styles:样式对象
	parent：父标签的id号
	*/
	function setStylesByTagName(tagName,styles,parent){
		parent=$(parent)||document;
		var elements=parent.getElementsByTagName(tagName);
		for(var i=0;i<elements.length;i++){
			setStyleById(elements[i],styles);
			}
		}
		window['wq']['setStylesByTagName']=setStylesByTagName;
	/*通过类名修改多个元素的样式
	parent:父标签名
	tag：标签名
	className：标签上的类名
	style：样式对象
	*/		
	function setStyleByClassName(parent,tag,className,styles){
		if(!(parent=$(parent))){return false;}
		var elements=getElementsByClassName(className,tag,parent);
		for(var e=0;e<elements.length;e++){
			setStyleById(elements[e],styles);
			}
			return true;
		}
		window['wq']['setStyleByClassName']=setStyleByClassName;
		
	function getClassNames(element){
		if(!(element=$(element))){
			return false;
			}
		return element.className.replace(/\s+/,' ').split(' ');
		}		
	window['wq']['getClassNames']=getClassNames;
	
	function hasClassName(element,className){
		if(!(element=$(element))){
			return false;
		}
		var classes=getClassNames(element);//得到所有的类名
		for(var i=0;i<classes.length;i++){
			if(classes[i]===className){
				return true;
				}
			}
			return false;
	}
	window['wq']['hasClassName']=hasClassName;
	
	function addClassName(element,className){
		if(!(element=$(element))){
			return false;
			}
		var space=element.className?' ':'';
		element.className+=space+className;
		return true;
		}
		window['wq']['addClassName']=addClassName;
		
		//删除类样式
	function removeClassName(element,className){
		if(!(element=$(element))){return false;}
		//先获取所有的类
		var classes=getClassNames(element);
		//循环遍历数组删除匹配的项、因为从数组中删除项会是数组变短，所以要反向删除
		var length=classes.length;
		var a=0;
		for(var i=length-1;i>=0;i--){
			if(classes[i]===className){
				delete(classes[i]);
				a++;
				}
			}
			element.className=classes.join('');
			//判断删除是否成功
			return (a>0?true:false);
		}
		window['wq']['removeClassName']=removeClassName;
	//获取所由的外部样式表	
	function getStyleSheets(url,media){
		var sheets=[];
		for(var i=0;i<document.styleSheets.length;i++){
			if(!document.styleSheets[i].href){
				continue;
				}
			if(url&&document.styleSheets[i].href.indexOf(url)==-1){
				continue;
				}
				
				if(media){//"screen,   print"
					media=media.replace(/,\s*/,',');
					var SheetMedia;
					if(document.styleSheets[i].media.mediaText){
					SheetMedia=document.styleSheets[i].media.mediaText.replace(/,\s*/,',');
					SheetMedia=SheetMedia.replace(/,\s*$/,'');
				}else{
						SheetMedia=document.styleSheets[i].media.replace(/,\s*/,',');
						
						}
						if(media!=SheetMedia){
							continue;
							}
					}
					sheets.push(document.styleSheets[i]);
			}
			return sheets;
		}
		window['wq']['getStyleSheets']=getStyleSheets;
		
		//添加样式表
		function addStyleSheet(url,media){
			media=media?media:'screen';
			var links=document.createElement("LINK");
			links.href=url;
			links.media=media;
			links.type="text/css";
			links.rel="stylesheet";
			document.getElementsByTagName("head")[0].appendChild(links);
			}
			window['wq']['addStyleSheet']=addStyleSheet;
		
		
		//移除样式表
		function removeStyleSheet(url,media){
			var styles=getStyleSheets(url,media);
			for(var i=0;i<styles.length;i++){
				var node=styles[i].ownerNode||styles[i].owningElement;
				styles[i].disabled=true;
				node.parentNode.removeChild(node);
				}
			}
			window['wq']['removeStyleSheet']=removeStyleSheet;
			
			
			//添加规则 如果存在多个样式表，可使用urlmedia
			function addCSSRule(selector,styles,index,url,media){
				var declaration='';
				//根据styles参数构建声明字符串
				for(property in styles){
					if(!styles.hasOwnProperty(property)){
						continue;
					}
						declaration+=property+":"+styles[property]+";";
				}
					//根据urlmedia获取样式表
					var styleSheets=getStyleSheets(url,media);
					//alert(styleSheets.length);
					var newIndex;
					//循环所有满足条件的样式表 ，添加样式规则
					for(var i=0;i<styleSheets.length;i++){
						//添加规则
						if(styleSheets[i].insertRule){
							//计算规则添加的索引位置
							newIndex=(index>=0?index:styleSheets[i].cssRules.length);
							//rules.insertRule("div{font-size:12px;}",0);
							styleSheets[i].insertRule(selector+'{'+declaration+'}',newIndex);
							//DOM样式规则的添加方法 
							}else if(styleSheets[i].addRule){
								newIndex=(index>=0?index:-1);
									styleSheets[i].addRule(selector,declaration,newIndex);
							}
						}
				   }
				   window['wq']['addCSSRule']=addCSSRule;
				   
				  function editCSSRule(selector,styles,url,media){
					  var styleSheets=getStyleSheets(url,media);
					  //循环每条样式中的每条规则
					  for(var i=0;i<styleSheets.length;i++){
						  //取得规则列表
						  var rules=styleSheets[i].cssRules||styleSheets[i].rules;
						  if(!rules){
							  continue;
							  }
							  selector=selector.toUpperCase();
							  for(var j=0;j<rules.length;j++){
								  //检查规则中的选择器是否匹配
								  if(rules[j].selectorText.toUpperCase()==selector){
									  for(property in styles){
										  if(!styles.hasOwnProperty(property)){
											  continue;
											  }
											  rules[j].style[camelize(property)]=styles[property];
										  }
									  }
								  }
						  }
					  }
					 window['wq']['editCSSRule']=editCSSRule;
					 
			function getStyle(element,property){
				if(!(element=$(element))){return false;}
				var value=element.style[camelize(property)];
				if(!value){
					if(document.defauleView&&document.defaultView.getComputedStyle){
						var css=document.defaultView.getComputedStyle(element,null);
						value=css?css.getPropertyValue(property):null;
						
						}else if(element.currentStyle){
							value=element.currentStyle[camelize(property)];
							}
					}
					return value='auto'?'':value;
				}
				window['wq']['setStyleById']=setStyleById;
				window['wq']['setStyle']=setStyleById;
				
				function setStyleByTagName(tagname,styles,parent){
					parent=$(parent)||document;
					var element=parent.getElementsByTagName(tagname);
					for(var e=0;e<elements.length;e++){
						setStyleById(elements[e],styles);
						}
					}
			
			/*
			通过类名修改多个元素的样式
			parent：父元素的id
			tag：标签名
			classMame：标签上的类名
			style：样式对象
			
			*/
			
			
			
			function moveElement(element,final_x,final_y,interval){
				if(!(isCompatible())){return false;}
				if(!$(element)){return false;}
				var elements=$(element);
				if(elements.movement){
					clearTimeout(elements.movement);
					}
				//var speed=1;
				var startx=parseInt(elements.style.left);//styleoffsetLeft取出的是数值
				var starty=parseInt(elements.style.top);
				if(startx==final_x&&starty==final_y){
					return true;
					}
					var dist;
				if(startx<final_x){
					
					dist=(final_x-startx)/10;
					startx=startx+dist;
				}
				if(startx>final_x){
					dist=(startx-final_x)/10
					startx=startx-dist;
					}
				if(starty<final_y){
					dist=(final_y-starty)/10;
					starty=dist+starty;
					}
				if(starty>final_y){
					dist=(final_y-starty)/10
					starty=starty-dist;
					}
				elements.style.left=startx+"px";
				elements.style.top=starty+"px";
				//moveElement(element,final_x,final_y,interval){
					//"wq.moveElement("+element+","+final_x+","+final_y+","+interval+")";
				var repeat="wq.moveElement('"+element+"',"+final_x+","+final_y+","+interval+")";
				elements.movement=setTimeout(repeat,interval);
				
				
				}
				window['wq']['moveElement']=moveElement;
				
				//对参数字符串进行编码 针对get请求
				//操作
		//从xml文档的对象类中按xpath规则提出要求的节点
		 function selectXMLNodes(xmlDoc,xpath){
			 if('\v'=='v'){
				 xmlDoc.setProperty("SelectionLanguage","Xpath");//将当前的xml文档的查找方式改为 xpath
				 return xmlDoc.documentElement.selectNodes(xpath);
				 }else{
					 var evaluator=new XPathEvaluator();
					 var resultSet=evaluator.evaluate(xpath,xmlDoc,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
					 var finalArray=[];
					 if(resultSet){
						 var el=resultSet.iterateNext();//循环街道的结果
						 while(el){
							 finalArray.push(el);
							 el=resultSet.iterateNext();
							 }
							 return finalArray;
						 }
					 }
			 	}
				window['wq']['selectXMLNodes']=selectXMLNodes;
				//在xml dom中不能使用getElementById方法，所以这里自己要实现一个相似功能的函数
				
				//在xml dom中不能使用getElementById方法，所以这里自己实现一个相似功能的函数
	 function getElementByIdXML(rootnode,id){
		 //先获取所有的元素
		 nodeTags=rootnode.getElementsByTagName('*');
		 for(var i=0;i<nodeTags.length;i++){
			 if(nodeTags[i].hasAttribute('id')){
				 if(nodeTags[i].getAttribute('id')==id)
				 return nodeTags[i];
				 }
			 }
		 }
		 window['wq']['getElementByIdXML']=getElementByIdXML;
		 
		 //将xml的字符串反序列化转为xml Dom节点对象 以便使用getElementsByTagName()等函数来操作
		 
		 function parseTextToXmlDomObject(str){
			 if('\v'=='v'){
				 var xmlNames=['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.4.0','MSXML2.XMLHttp.3.0','MSXML2.DOMDocument','Microsoft.xmlDOM','MSXML.XMLHttp'];
				 for(var i=0;i<xmlNames.length;i++){
					 try{
						 var xmlDoc=new ActiveXObject(xmlNames[i]);
						 break;
						 
						 }catch(e){
							 
							 }
					 }
					 xmlDoc.async=false;
					 xmlDoc.loadXML(str);
				 }else{
					 try{
						 //firefox Mozilla,Opera,Webkit
						 var parser=new DOMParser();
						 var xmlDoc=parser.parseFromString(str,"text/xml");
						 }catch(x){
							 alert(x.message);
							 return ;
							 }
					 }
					 return xmlDoc;
			 }
			 window['wq']['parseTextToXmlDomObject']=parseTextToXmlDomObject;
		
		
		//将xml DOM对象序列化转为xml字符串
		function parseXmlDomObjectToText(xmlDom){
			if(xmlDOM.xml){
				return xmlDOM.xml;//xml文件内容
				}else{
					var serializer=new XMLSerializer();
					return serializer.serializeToString(xmlDOM,"text/xml");
					}
			}
			window['wq']['parseXmlDomObjectToText']=parseXmlDomObjectToText;
			
			
			//对参数字符串编码 针对get请求 	
			function addUrlParam(url,name,value){
				url+=(url.indexOf("?")==-1?"?":"&");
				url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
				return url;
				}
				
				
				//序列化表单
			function serialize(form){
				var parts=new Array();
				var field=null;
				//form。elements表单的所有的元素
				for(var i=0,len=form.elements.length;i<len;i++){
					field=form.elements[i];//取出每个元素
					switch(field.type){
						case "select-one":
						case "select-multiple":
							for(var j=0,optLen=field.options.length;j<optLen;j++){
							var option=field.options[j];
							if(option.selected){
								var optValue="";
								if(option.hasAttribute){
									optValue=(option.hasAttribute("value") ? option.value: option.text);
									
									} else{
										optValue=(option.attributes["value"].specified ? option.value:option.text);
								}
								parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
							}
						}
						break;
						case undefined:
						case "file":
						case "submit":
						case "reset":
						case "button":
						case "image":
						break;
						case "checkbox":
						case "radio":
						if(!field.checked){
							break;
							
							}
						default:
							parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(field.value));

					}
				}
			return parts.join("&");
		}
		window['wq']['serialize']=serialize;
		
		/*
		parseJSON(string,filter)
			String:要求转换的字符串
			filter：用于过滤和转换结果的可选参数
			案列
			如果键中有date，则将值转为date对象
			myData=parseJson(string,function(key,value){
					return key.indexOf('date')>0?new Date(value):value;
				})
		*/
		function parseJSON(s,filter){
			var j;
			//递归函数
			function walk(k,v){
				var i;
				if(v&&typeof v==='object'){
					for(i in v){
						if(v.hasOwnProperty(i)){
							v[i]=walk(i,v[i]);
							}
						}
					}
					return filter(k,v);//回调过滤函数。完过滤操作
				}
				//转换分成三个阶段，第一个阶段通过正则表达式检测json文本，查找非json字符，其中特别是（） new，因为他门会引起语句的调用，还又=，他会导致赋值，为了安全 我们拒绝所有不希望出现的字符
				/*
				首先这个串分成两部分，看中间的或符号（|）
				
				*/
				if(/^(["'](\\.|[^"\\\n\r])*?["']|[,:{}\[\]0-9.\-+Eaeflnr-u\n\r\t])+?$/.test(s)){
					//第二阶段，将json字符串转为js结构
					try{
						j=eval('('+s+')');
						}catch(e){
							throw new SyntaxError("eval parseJSON");
						}
				}else{
					throw new SyntaxError("parseJSON");
					}
					//第三阶段，递归遍历了新生成的结构，将每个名/值对船体一个过滤函数
					if(typeof filter==='function'){
						j=walk('',j);
						}
						return j;
			};
			window['wq']['parseJSON']=parseJSON;
			
			/*
				发送ajax请求XMLHttpRequest
				option对象的结构{
						'method':'GET/POST',
						'send':发送的参数
						'loadListener':初始化回调 readyState=1
						'loadedListener':加载完回调 readyState=1；
						'interactiveListener'：交汇是回调
						一下是readyState=4的处理
						‘jsResponseListener’：结果是一个javascritp代码是的回调处理函数
						'jsonResponseListener':结果是json时的回调处理
						‘xmlResponseListener’ 结果是一个xml时的回调函数
						‘htmlResponseListener‘结果是一个html时的回调处理函数
						’completeListener‘ 处理完成后的回调
						statu==500
						'errorListener' 响应吗不为200时
					}
			
			*/
			
			function ajaxRequest(url,options){
				var req=getRequestObject(url,options);
				req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				return req.send(options.send);
			}
			
		window['wq']['ajaxRequest']=ajaxRequest;
		
		/*
		通用的获取 xmlHttpRequest对象的函数
		
		*/
		function getRequestObject(url,options){
			//初始化请求对象
			var req=false;
			if(window.XMLHttpRequest){
				var req=new window.XMLHttpRequest();//ie7+ ff.chrom
				}else if(window.AcitveXObject){
					var req=new window.ActiveXObject('Microsoft.XMLHTTP');//ie7以下
					}
					if(!req) return false;//如果无法创建request对象，则返回
					//定义默认选项
					options=options||{};
					options.method=options.method||'POST';
					options.send=options.send||null;
					//定义默认选项
					//定义请求的不同状态时的回调函数
					req.onreadystatechange=function(){
						switch (req.readyState){
							case 1:
							//请求初始化
							if(options.loadListener){
								options.loadListener.apply(req,arguments);
								}
								break;
								case 2:
								//加载完成
								if(options.loadedListener){
									options.loadedListener.apply(req,arguments);
									}
									break;
								case 3:
									//交互
									if(options.ineractiveListener){
										options.ineractiveListener.apply(req,arguments);
										
										}
										break;
								case 4:
								//完成交互时的回调操作
								try{
									if(req.status&&req.status==200){
										//获取响应头部分
										var contentType=req.getResponseHeader('Content-Type');
										//截取出；前面的部分这些表示的是内容的类型
										var mimeType=contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];
										switch(mimeType){
											case 'text/javascript':
											case 'application/javascript':
											//表示会送的数据是一个javascript代码
											if(options.jsResponseListener){
												options.jsResponseListener.call(req,req.responseText);
												}
											break;
										case 'text/plain':
                                        case 'application/json':
											if(options.jsonResponseListener){
												var json;
												try{
													 json=parseJSON(req.responseText);
												}catch(e){
													 json=false;
												}
												options.jsonResponseListener.call(req,json);
											}
												break;
											
											case 'text/xml':
											case 'application/xml':
											case 'application/xhtml+xml':
											//响应的结果是xml字符串
											if(options.xmlResponseListener){
												options.xmlResponseListener.call(req,req.responseXML);
												}
												break;
											case 'text/html':
											//响应的结果是html
											if(options.htmlResponseListener){
												options.htmlResponseListener.call(req,req.responseText);
												}
												break;
											}
											//完成后的监听器
											 if(options.completeListener){
												 options.completeListener.call(req,req.responseText);
												 }
											}else{
												//响应吗不为200，
												if(options.errorListener){
													options.errorListener.apply(req,arguments);
													}
												}
										}catch(e){
											//内部处理有错误时
											alert(e);
											}
											break;	
										}
									};
									//打开请求
									req.open(options.method,url,true);
									//在这里可以加入自己的头部信息（可以随便加）
									//req.setRequestHeader('X-YC-Ajax-Request','AjaxRequest');
									return req;
								}
								window['wq']['getRequestObject']=getRequestObject;
		