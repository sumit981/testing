import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {tryItFree} from './FetchApi';
import {API_URL} from './FetchApi';
import Dashboard from './Dashboard';
import $ from "jquery";

//import {update_profile } from '../actions/index';
//var url =require('./connection');

class Login extends Component {
	constructor(props) {
    super(props);
	
	this.state = {
		          emailvalue: '',
				  password:''
				 };
    this.handleChange = this.handleChange.bind(this);
    }
	
	handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    localStorage.setItem('email', this.state.emailvalue);
    }
  
    tryItFreeEvent(event) {
		 //alert(this.state.emailvalue);
		//const API_URL = 'http://localhost:5000';
		
		if(document.getElementById("email").value == '')
	    {
            alert("Email cannot be left blank.");			
     		return false;
		}
		 var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		 
		 if (!filter.test(document.getElementById("email").value))
	     {
			alert("Please provide a valid email address.");
			document.getElementById("email").value ="";
		    return false; 
         }
		 //$('.loder_email').css('block');
		 $(".loder_email").css("display", "block");
		
		fetch(API_URL+'/tryitfree', {
            method: 'POST',
             headers: {
             'Content-Type': 'application/json'
            },body: JSON.stringify({email:this.state.emailvalue,password:this.state.password}),
			
            }).then(res => {
                 return res.json()
            }).then(users => { 
               //console.log(users.status);
			   if(users.status==false)
			   {
				   $('.loder_email').hide();
				   alert("A verification email has been sent to your email id.");
				   
				   fetch(API_URL+'/sendemailverify', {
						method: 'POST',
						 headers: {
						 'Content-Type': 'application/json'
						},body: JSON.stringify({email:this.state.emailvalue,password:this.state.password}),
						
						}).then(res => {
							 return res.json()
						}).then(users => {
						   console.log(users.message);
						   if(users.message=="send"){
							   //$('.loder_email').hide();
							   localStorage.setItem('storedemail', this.state.emailvalue);
							   //return true;
							   localStorage.setItem('IsLogin', true);
							   localStorage.setItem('userid', users.UserId);
							  // alert("A verification email has been sent to your email id.");
							   
						   }
					   else
					   {
						   alert("Not Send.");
						   $('.loder_email').hide();
						   //return false;
					   }
					});
			   }
			   
			   else if(users.status==true){
				   $('.loder_email').hide();
				   
				   //return true;
				   //alert("Correct Email.");
				   //alert(users.UserId);
				   localStorage.setItem('storedemail', this.state.emailvalue);
				   localStorage.setItem('IsLogin', true);
				   localStorage.setItem('userid', users.UserId);
				   //return false;
				   window.location ="/Dashboard";
				   //return <Dashboard name={ this.state.emailvalue }/>
				   
			   }
			   else if(users.status==="notverified")
			   {
				   localStorage.setItem('storedemail', this.state.emailvalue);
				   $('.loder_email').hide();
				   alert("Email is not verified yet.");
			   }
			   else if(users.status==="notmatched")
			   {
				   localStorage.setItem('storedemail', this.state.emailvalue);
				   $('.loder_email').hide();
				   alert("Email or Password is not correct.");
			   }
			   
            });	

    }
    
	goToDashboard(event) {
		
		if(document.getElementById("email").value == '')
	    {
            alert("Email cannot be left blank.");			
     		return false;
		}
		 var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		 
		 if (!filter.test(document.getElementById("email").value))
	     {
			alert("Please provide a valid email address.");
			document.getElementById("email").value ="";
		    return false; 
         }
		 
		 if(document.getElementById("password").value == '')
	    {
            alert("Password cannot be left blank.");			
     		return false;
		}
		 //$('.loder_email').css('block');
		 $(".loder_email").css("display", "block");
		
		fetch(API_URL+'/gotodashboard', {
            method: 'POST',
             headers: {
             'Content-Type': 'application/json'
            },body: JSON.stringify({email:this.state.emailvalue,password:this.state.password}),
			
            }).then(res => {
                 return res.json()
            }).then(users => { 
               //console.log(users.status);
			   if(users.status==true){
				   $('.loder_email').hide();
				   
				   //return true;
				   //alert("Correct Email.");
				   localStorage.setItem('storedemail', this.state.emailvalue);
				   localStorage.setItem('IsLogin', true);
				   localStorage.setItem('userid', users.UserId);
				   window.location ="/Dashboard";
				   //return <Dashboard name={ this.state.emailvalue }/>
				   
			   }
			   else if(users.status==false)
			   {
				   $('.loder_email').hide();
				   alert("Please enter a valid verified email address.");
			   }
			   
			   else if(users.status=="notmatched")
			   {
				   $('.loder_email').hide();
				   alert("Email or Password is not correct.");
			   }
			   
            });	

    }
     
	
	
	
	
   render() {
      return (
	  <div>
         <div className="loader-bg"></div>
		 <div className="loder_email" style={{display:'none'}}><img className="loder_email_img" src="../../assets/images/loader2.gif" /></div>
        <div className="loader">
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                    <div className="circle"></div>
                    </div><div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                </div>
                <div className="spinner-layer spinner-red">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                    <div className="circle"></div>
                    </div><div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                </div>
                <div className="spinner-layer spinner-yellow">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                    <div className="circle"></div>
                    </div><div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                </div>
                <div className="spinner-layer spinner-green">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                    <div className="circle"></div>
                    </div><div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mn-content valign-wrapper">
            <main className="mn-inner container">
                <div className="valign">
                      <div className="row">
                          <div className="col s12 m6 l4 offset-l4 offset-m3">
                              <div className="card white darken-1">
                                  <div className="card-content ">
                                      <span className="card-title">Login</span>
                                       <div className="row">
                                           <form className="col s12">
                                               <div className="input-field col s12">
											   
                                                   <input id="email" type="email" className="validate" name="emailvalue" autoComplete ="off" value={this.state.emailvalue} onChange={this.handleChange}/>
                                                   <label htmlFor="email">Email</label>
                                               </div>
                                             
											   
											   <div className="input-field col s12">
											   
                                                   <input id="password" type="password" className="validate" name="password" autoComplete ="off" onChange={this.handleChange}/>
                                                   <label htmlFor="password">Password</label>
                                               </div>
											 
                                              
											  
											   
											   <div className="col s12 right-align m-t-sm">
											   <input className="try_it_free_btn" onClick={(e)=>this.goToDashboard(e)} type="button" value="Login"/>
											   
                                                   
                                               </div>
											   
                                           </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                    </div>
                </div>
            </main>
        </div>
		</div>
      );
   }
}
export default Login;