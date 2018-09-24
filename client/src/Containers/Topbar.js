import React, { Component } from 'react';
import Profile from './Profile';
//import {Link} from 'react-router-dom';
//import {tryItFree} from './FetchApi';
import {API_URL} from './FetchApi';
import {React_URL} from './FetchReactURL';

//import {update_profile } from '../actions/index';
//var url =require('./connection');

class Topbar extends Component {
	constructor(props) {
    super(props);
	
	this.state = {
		          logeduseremail: '',
				  userprofileimg:'profile-image.png',
				  Username:'',
				 };
 
    }

  componentWillMount() {
	var element = document.getElementById("divbody");
    element.classList.remove("signin-page");
	//this.setState({logeduseremail:localStorage.getItem('storedemail')});
	//alert(localStorage.getItem('storedemail'));
	//;
	
	fetch(API_URL+'/getprofiledata', {
            method: 'POST',
             headers: {
             'Content-Type': 'application/json'
            },body: JSON.stringify({userid:localStorage.getItem('userid')}),
			
            }).then(res => {
                 return res.json()
            }).then(users => { 
               //console.log(users.status);
			   if(users.status==true){
				   //$('.loder_email').hide();
				  // alert("ok");
				   
				   if(users.Profile_img==null)
				   {
					   //userprofileimg:'profile-image.png',
					   this.setState({userprofileimg:'profile-image.png'});
				   }
				   else
				   {
					   this.setState({userprofileimg:users.Profile_img});
				   }
				   
				   this.setState({Username:users.Username});
				   //return true;
				   //alert("Correct Email.");
				   //localStorage.setItem('storedemail', this.state.emailvalue);
				   //localStorage.setItem('IsLogin', true);
				   //window.location ="/Dashboard";
				   //return <Dashboard name={ this.state.emailvalue }/>
				   
			   }
			   //else if(users.status==false)
			   //{
				   //$('.loder_email').hide();
				 //  alert("Wrong.");
			   //}
			   
            });
  }
  
  logOut(event) {
	  //localStorage.setItem('IsLogin', false);
	  localStorage.removeItem('IsLogin');
	  window.location = "/login";
  }
  goToProfile(event)
  {
	  window.location = "/profile";
  }
	
   render() {
	   
      return (
            <header className="mn-header navbar-fixed">
                <nav className="cyan darken-1">
                    <div className="nav-wrapper row">
                        
                        <div className=" col s3 m3">      
                            <span className="chapter-title">WritersHQ</span>
                        </div>
						<div className=" col s3 m3">      
                           
                        </div>
						<div className=" col s3 m3">      
                            
                        </div>
						<div className=" col s3 m3">    
						
                           <ul>
						   
						<li style={{display: 'inline'}}><a href="/Dashboard">Dash</a></li>
						<li style={{display: 'inline'}}><a >Critics</a></li>	
	
						<li className="hide-on-small-and-down"><a href="javascript:void(0)" data-activates="dropdown1" className="dropdown-button dropdown-right show-on-large">Profile</a></li>
						
						<ul id="dropdown1" className="dropdown-content notifications-dropdown">
                            <li className="notificatoins-dropdown-container">
                                <ul>
                                    <li className="notification-drop-title">
                                        
                                        <div className="sidebar-profile">
											<div className="sidebar-profile-image">
											
												<img src={React_URL+"/assets/images/ProfileImages/"+ this.state.userprofileimg} className="circle" alt=""/>
												
												
											</div>
											<div className="sidebar-profile-info">
												<a href="javascript:void(0);" className="account-settings-link"><br/>
													<p> </p>
													<span>{localStorage.getItem('storedemail')}</span>
												</a>
											</div>
										</div>
                                      
                                   </li>
								    <li className="notification-drop-title">
									
									 <input onClick={(e)=>this.logOut(e)} className ="sign_out_btn" type="button" value="Sign Out"/>  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  
									 <input onClick={(e)=>this.goToProfile(e)} className ="sign_out_btn" type="button" value="Profile"/>
									 
									 </li>
                               </ul>
                           </li>
                       </ul>	
						
						
			  </ul>
					
							
                        </div>
						
  
                    </div>
					
                </nav>
            </header>           
      );
   }
}
export default Topbar;