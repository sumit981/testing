import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Topbar from './Topbar';
//import {tryItFree} from './FetchApi';
import {React_URL} from './FetchReactURL';
import {API_URL} from './FetchApi';
import $ from "jquery";
//import {update_profile } from '../actions/index';
//var url =require('./connection');
//var recordsarray = [];
class Dashboard extends Component {
	constructor(props) {
    super(props);
	
	this.state = {
		          recordsvalue: '',
				 };
 
    }
	
	
  
   componentWillReceiveProps(nextProps) {
        //this.setState({emailvalue:1});
    }
    
	
  componentDidMount() {
	var element = document.getElementById("divbody");
    element.classList.remove("signin-page");
	
	$(".loder_email").show();
	fetch(API_URL+'/getlistofdocs', {
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
				   var records = users.resultdata;
				   var recordsarray = [];
				   
				   //var date = new Date(records[0].Last_modified);
				   //var outputDate = date.getDate() + ' ' + Months[date.getMonth() - 1] + ', ' + date.getFullYear();
				   //alert(date.getFullYear());
				   //return true;
				   for (let i = 0; i < records.length; i++) {
						var last_modified = records[i].Last_modified;
						//var date = new Date(last_modified);
						
					   var date = new Date(last_modified).getDate();
					   var month = new Date(last_modified).getMonth() + 1;
					   var year = new Date(last_modified).getFullYear();
					 
						if(date<10)
						{
							date = '0'+date;
						}
						if(month<10)
						{
							month = '0'+month;
						}
						
						var outputDate = date + '/' + month + '/' + year;
						//var timefrom = allappointments[i].timefrom.split(':');
						//var timeto = allappointments[i].timeto.split(':');

						recordsarray.push({
						  id: records[i]._id,
						  last_modified: outputDate,
						  Words: records[i].Words,
						  Title : records[i].Title,
						  User_id: records[i].User_id,
						})
					}
					
					this.setState({recordsvalue:recordsarray});
					   //userprofileimg:'profile-image.png',
					   //this.setState({userprofileimg:'profile-image.png'});
				   
				   
					   //this.setState({userprofileimg:users.Profile_img});
				   
				   //this.setState({userprofileimg:users.Profile_img});
				   //this.setState({User_name:users.Username});
				   //return true;
				   //alert("Correct Email.");
				   //localStorage.setItem('storedemail', this.state.emailvalue);
				   //localStorage.setItem('IsLogin', true);
				   //window.location ="/Dashboard";
				   //return <Dashboard name={ this.state.emailvalue }/>
				   
			   }
			   //else if(users.status==false)
			   //{
				  // window.location ="/Login";  
			   //}
			   //alert(recordsarray[0].last_modified);
			  $('.loder_email').hide();
				
			   
            });
	
  }
  
  goToNewDocument(event)
  {
	  window.location ="/Newdoc";
  }
	
   render() {
	   
	   var islogin = localStorage.getItem('IsLogin');

       if(!islogin){
       window.location ='/Login';
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
				     <label ><h3>100/300 words today</h3></label><b><a href ="" style={{color:'#00acc1'}}>CHECK STATS</a></b>                             
				   </div>
				   </div>
					
                    <div className="row no-m-t no-m-b">	
                       <div className="col s12 center-align m-t-sm">
				     <input className="new_doc_btn" type="button" value="NEW DOCUMENT" onClick={(e)=>this.goToNewDocument(e)}/>                             
				   </div>
					</div>					
                    
					<div className="row no-m-t no-m-b">
                        <div className="col s12 m12 l12">
                            <div className="card invoices-card">
                                <div className="card-content" style ={{height:'400px',overflow:'auto'}}>
                                    <div className="card-options">
                                        <input hidden type="text" className="expand-search" placeholder="Search" autoComplete="off"/>
                                    </div>
                                    <span className="card-title"></span>
                                <table className="responsive-table bordered">
                                    <thead>
                                        <tr>
                                            <th data-field="id">Title</th>
                                            <th data-field="number">Last Modified</th>
                                            <th data-field="company">Words</th>
                                            
                                        </tr>
                                    </thead>
									{this.state.recordsvalue !== '' && this.state.recordsvalue.length > 0 &&
                                    <tbody>
									{this.state.recordsvalue.map((records, index) => (  
									   <tr key={index}>
									 
									  <td ><a>{records.Title}</a></td>
									  <td>{records.last_modified}</td>
									  <td>{records.Words}</td>
									  </tr>
									))}
									
									
                                        
                                        
                                        
                                        
                                       
                                        
                                    </tbody>
									}
                                </table>
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
export default Dashboard;