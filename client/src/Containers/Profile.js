import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Topbar from './Topbar';
import $ from "jquery";
//import {tryItFree} from './FetchApi';
import {API_URL} from './FetchApi';
import {React_URL} from './FetchReactURL';

//import {update_profile } from '../actions/index';
//var url =require('./connection');

class Profile extends Component {
  constructor(props) {
    super(props);
 
    this.state ={
                  username:'',
          profileImg:'',
          user_id:'',
          userprofileimg:'',
          User_name :''
        };
    }
  
  
  
   componentWillReceiveProps(nextProps) {
        //this.setState({emailvalue:1});
    }
    
  
  componentDidMount() {
  var element = document.getElementById("divbody");
    element.classList.remove("signin-page");
  $(".loder_email").show();
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
           //this.setState({userprofileimg:users.Profile_img});
           this.setState({User_name:users.Username});
           //return true;
           //alert("Correct Email.");
           //localStorage.setItem('storedemail', this.state.emailvalue);
           //localStorage.setItem('IsLogin', true);
           //window.location ="/Dashboard";
           //return <Dashboard name={ this.state.emailvalue }/>
           
         }
         else if(users.status==false)
         {
           window.location ="/Login";  
         }
         $('.loder_email').hide();
        
         
            });
  }
  
  handleimgChange(e) {
      const file = e.target.files[0];
      this.setState({ profileImg:file });
    }
  
  handleUserNameChange(e) {
      this.setState({ username: e.target.value });
    }
  
  updateProfile(e){
    //e.preventDefault();
      //const {dispatch} = this.props
      if($('#username').val()=="") {
      alert('Username cannot be left blank.');
      return false; 
      }
   
      var userid = localStorage.getItem('userid');
    //this.setState({ user_id:userid });
    
    
        /*var formData = new FormData();
        formData.append('userid', user_id);
        formData.append('fname', this.state.fname);
        formData.append('email', this.state.email);
        formData.append('cpass', this.state.cpassword);
        formData.append('profileImg', this.state.profileImg);*/
    
      var formData = new FormData();
        formData.append('userid', userid);
        formData.append('username', $('#username').val());
        formData.append('profileImg', this.state.profileImg);
    
      $('.loder_email').show();
      fetch(API_URL+'/updateprofile', {
            method: 'POST',
             body: formData,
            
            }).then(res => {
               return res;
            }).then(users => {
               //console.log(users.message);
              
                 
                 //localStorage.setItem('storedemail', this.state.emailvalue);
                 //return true;
                 //localStorage.setItem('IsLogin', true);
                 alert("Your Profile has been successfully updated.");
                 window.location = '/profile';
                 $('.loder_email').hide();
              
             
          });
          
       /*var fe = fetch('http://localhost:5000/UpdateProfile', {
          method: 'POST',
            headers: {
          
            'Content-Type': 'multipart/form-data'
          },body:formData
          
        }).then(res => {
           
                return res.json()
             })
            .then(users => { 
              
              this.setState({ users })

              });*/
        
      //dispatch(update_profile(this.state))


            //console.log("======this.state.profileImg=======");
   // localStorage.setItem('FirstName',this.state.fname);
      //$('.profile_success').show();$('.profile_success h5').html("You have successfully update profile");setTimeout(function(){ $(".profile_success").fadeOut(); window.location = 'http://localhost:8080/Dashboard';}, 3000);
    //return true;
 
           



  }
  
  
   render() {
     
     var islogin = localStorage.getItem('IsLogin');

       if(!islogin){
       window.location = React_URL+"/Login";
    }else{
    
    return (
    <div>
         <div className="loader-bg"></div>
     
     <div className="loder_email" style={{display:'none'}}><img className="loder_email_img" src="../../assets/images/loader2.gif" /></div>
     
        <div className="loader">
            <div className=" big active">
                <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                    <div className="circle"></div>
                    </div><div className="circle-clipper right">
                    <div className="circle"></div>
                    </div>
                </div>
                <div className="spinner-layer spinner-teal lighten-1">
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
        <div className="mn-content fixed-sidebar">
    
            <Topbar/>
    
            <main className="mn-inner inner-active-sidebar">
                <div className="middle-content">
                     
          
                    <div className="row no-m-t no-m-b">
          
           <div className="card-content col s12 center-align m-t-sm">
             <label ><h3>PROFILE</h3></label>                            
           </div>
           </div>
          
                    <div className="row no-m-t no-m-b"> 
                       <div className="col s12 center-align m-t-sm">
                                      
           </div>
          </div>          
                    
          <div className="row no-m-t no-m-b">
                        <div className="col s12 m12 l12">
                            <div className="card invoices-card">
                                <div className="card-content">
                                    
                                
                  <span className="card-title"></span><br/>
                                <div className="row">
                                    <form className="col s12">
                                        
                    <div className="row">
                                            <div className="input-field col s12">
                      
                                            <img src={React_URL+"/assets/images/ProfileImages/"+ this.state.userprofileimg} className="circle" alt="Profile Image" style={{width:'200px',height:'200px'}}/>
                                                
                                            </div>
                                        </div>
                    
                    <div className="row">
                                            <div className="input-field col s12">
                      <i className="material-icons prefix">file_upload</i>
                                                <input id="fileupload" type="file" className="validate" onChange={(e)=>this.handleimgChange(e)}/>
                                                
                                            </div>
                                        </div><br/>
                    
                    <div className="row">
                                            <div className="input-field col s12">
                      <i className="material-icons prefix">account_circle</i>
                                                <input id="username" type="text" className="validate" onChange={(e)=>this.handleUserNameChange(e)} defaultValue ={this.state.User_name}/>
                          {this.state.User_name==""&&
                            <label htmlFor="username">Username</label>
                          }
                                                
                                            </div>
                                        </div>
                    
                                        <div className="row">
                                            <div className="input-field col s12">
                      <i className="material-icons prefix">email</i>
                                                <input defaultValue = {localStorage.getItem('storedemail')} disabled id="email" type="text" className="validate"/>
                                               
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="input-field col s12">
                      &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                                                <input id="updatebtn" type="Button" defaultValue="Update" className="profile_update_btn" onClick={(e)=>this.updateProfile(e)}/>
                                               
                                            </div>
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
        <div className="left-sidebar-hover"></div>
     
    </div>
      );
  }
     
      
   }
}
export default Profile;