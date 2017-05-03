module.exports = Check;
function Check(){
	this.check = function(options){
		for(k in options){
			
			switch(k){
				case "mobilePhone":
							return this.checkIsMobile(options[k]);

				case "qq":
							return this.checkQQ(options[k]);

				case "name":
							return this.checkName(options[k]);

				case "email":
							return this.checkEmail(options[k]);

				case "ID":
							return this.checkID(options[k]);

				case "phone":
							return this.checkTelphone(options[k]);
			}
		}
		
	};
}
Check.prototype = {
	checkIsMobile : function(mobile){
		var reg =/^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/; 
	    if(!reg.test(mobile)) 
	  		return false; 
	    else
	       	return true;
	},
	checkQQ:function(qq){
		var reg=/^\d{5,10}$/;
	    if(!reg.test(qq))
	    	return false;
	    else
	    	return true;
	},
	checkName:function(name){
	    var reg =/^[\u4e00-\u9fa5]{2,4}$/;
	    if(!reg.test(name))
	    	return false;
	    else
	    	return true;
	},
	checkEmail:function(email){
    	var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    	if(!reg.test(email))
    		return false;
    	else
    		return true;
    },
    checkID:function(ID){
    	var eightteen=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    	var fifteen = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
    	if(!eightteen.test(ID) && !fifteen.test(ID))
   		 	return false;
   		 else
   		 	return true;
    },
    checkTelphone:function(telphone){
    	var reg = /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/;
    	if(!reg.test(telphone))
    		return false;
    	else
    		return true;
    }
};