// JavaScript Document
Cookies={
	set:function(key,value,minsToExpire){
		var expires="";
		if(minsToExpire){
			var date=new Date();
			date.setTime(date.getTime()+(minsToExpire*60*1000));
			expires=";expires="+date.toGMTString();//expires=Sat,14 Mar 2009 17:45:33 GMT
			}
			//  /:表示当前网站下的所有页面  key:"a b"=>encodeURLComponent=>"a%20b"
			document.cookie=encodeURIComponent(key)+"="+encodeURIComponent(value)+expires+";path=/";
			return value;
		},
		get:function(key){
			var nameCompare=key+"=";//==>name=
			var cookieArr=document.cookie.split(";");//name=a%20b;expires=xxx;path=/ name=axxx
			for(var i=0;i<cookieArr.length;i++){
				var a=cookieArr[i].split("=");//a==>{"name","a%20b"}
				var currentKey=decodeURIComponent(a[0]);
				if(key==currentKey||" "+key==currentKey){
					return decodeURIComponent(a[1]);//取值 decodeURLCOMPONENT()解码
					}
				}
				return null;
			},
			isAvailable:function(){
				return (this.set('cookieTest','1')==this.get('cookieTest'));
				},
			del:function(key){
				this.set(key," ",-1);
				}
	}