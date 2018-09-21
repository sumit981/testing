export var API_URL = "https://writershq1.herokuapp.com:3001";

var result = "";

export function tryItFree(user_email) {
 
 //var result = "abcd";
fetch(API_URL+'/tryitfree', {
            method: 'POST',
             headers: {
             'Content-Type': 'application/json'
            },body: JSON.stringify({email:user_email}),
			
            }).then(res => {
                 return res.json()
            }).then(users => { 
               console.log(users.status);
			   if(users.status==true){
				   
				   result = true;
				   console.log("helloo");
				   return users.status;
			   }
			   else
			   {
				   result = false;
				   return users.status;
			   }
            });	
return result;
}
//module.exports = API_URL;