import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Topbar from './Topbar';
import $ from "jquery";
//import {tryItFree} from './FetchApi';
//import {API_URL} from './FetchApi';
import {React_URL} from './FetchReactURL';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {API_URL} from './FetchApi';


//import {update_profile } from '../actions/index';
//var url =require('./connection');

class Newdocument extends Component {
	constructor(props) {
    super(props);
 
    this.state ={
                  editorState: EditorState.createEmpty()
				  
				};
	this.onChange = this.onChange.bind(this);
    //var onChange = (editorState) => this.setState({editorState});
    }
	
	onChange(editorState)
	{
		this.setState({editorState});
		//alert(this.state.editorState);
	}
  
   componentWillReceiveProps(nextProps) {
        //this.setState({emailvalue:1});
    }
    
	saveDoc (evt) {
		
	  evt.preventDefault();
	//alert(publicdoc);
	 //alert(created_date);
		//return;
	//var convertedData = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
	
	var convertedDataJSON = convertToRaw(this.state.editorState.getCurrentContent());
	var jsonStringify = JSON.stringify(convertedDataJSON['blocks']);
	var jsonObj = JSON.parse(jsonStringify);
	var checkbodyempty = (jsonObj[0]['text'].trim().length);
	//
	
	var wordscount = 0;
	//alert(jsonObj[0]['text'].split(' ').length);
	//alert(jsonStringify);
	for(var i = 0; i < jsonObj.length; i++)
	{
		if(jsonObj[i]['text'] !="")
		{
			 wordscount += jsonObj[i]['text'].trim().split(' ').length;
			
			//Characters calculate
			//wordscount += jsonObj[i]['text'].length;
		}
		
	}
	//alert(wordscount);
	//return false;
	
	
	//
	if(document.getElementById("title").value == '')
	{
		alert("Title cannot be left blank.");			
		return false;
	}
	if(checkbodyempty==0)
	{
		alert("Title body cannot be left blank.");			
		return false;
	}
		 
	  var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
 
    if(date<10)
	{
		date = '0'+date;
	}
	if(month<10)
	{
		month = '0'+month;
	}
     
	var created_date = year + '-' + month + '-' + date;
	var modified_date = year + '-' + month + '-' + date;
	var userid = localStorage.getItem('userid');
	var words = wordscount;
	var title = document.getElementById("title").value;
	var body = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
	var publicdoc = 0; 
		 
		 //$('.loder_email').css('block');
		 $(".loder_email").css("display", "block");
		
		fetch(API_URL+'/savenewdoc', {
            method: 'POST',
             headers: {
             'Content-Type': 'application/json'
            },body: JSON.stringify({userid:userid,created_date:created_date,modified_date:modified_date,words:words,title:title,body:body,publicdoc:publicdoc}),
			
            }).then(res => {
                 return res.json()
            }).then(users => { 
               //console.log(users.status);
			   if(users.status==true){
				   $('.loder_email').hide();
				   
				   //return true;
				   alert("Document saved successfully.");
				   //localStorage.setItem('storedemail', this.state.emailvalue);
				   //localStorage.setItem('IsLogin', true);
				   //localStorage.setItem('userid', users.UserId);
				   window.location ="/Newdoc";
				   //return <Dashboard name={ this.state.emailvalue }/>
				   
			   }
			   else if(users.status==false)
			   {
				   $('.loder_email').hide();
				   alert("Document not saved.");
			   }

            });	
	
	//alert(convertedData);
	
	//{draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
	
	//var convertedDataJSON = convertToRaw(this.state.editorState.getCurrentContent());
	//var jsonStringify = JSON.stringify(convertedDataJSON['blocks']);
	//var jsonObj = JSON.parse(jsonStringify);
	//alert(jsonObj[0]['text'].length);
	
	 /*var jsonStringify = '[{"availability_id":"109465","date":"2017-02-21","price":"430000"},{"availability_id":"109466","date":"2017-02-22","price":"430000"},{"availability_id":"109467","date":"2017-02-23","price":"430000"}]';

	var jsonObj = JSON.parse(jsonStringify);

	for(var i = 0; i < jsonObj.length; i++)
	{
		alert(jsonObj[i]['price']);
	}*/
	  
	  
    }
	
  componentWillMount() {
	var element = document.getElementById("divbody");
    element.classList.remove("signin-page");
  }

	
	
   render() {
	   
	   var islogin = localStorage.getItem('IsLogin');

       if(!islogin){
       window.location = React_URL+'/Login';
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
				     <label ><h3>NEW DOCUMENT</h3></label>                            
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
											<i className="material-icons prefix">title</i>
                                                <input id="title" type="text" className="validate"/>
											    <label htmlFor="title">Title</label>
                                                
                                            </div>
                                        </div>
										
                                        <div className="row" style={{height:'300px',overflow:'auto'}}>
                                            <Editor
        editorState={this.state.editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onChange}
		toolbar={{options: ['inline', 'blockType', 'link'],inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic']
  },link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link']
  },blockType: {
    inDropdown: false,
    options: ['Blockquote'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  }}}
      />
											
                                        </div>
                                        <div className="row"> </div>
                                        <div className="row">
                                            <div className="input-field col s12">
											&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                                                <input id="savebtn" type="Button" defaultValue="Save" className="profile_update_btn" onClick={(e)=>this.saveDoc(e)}/>
                                               
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
export default Newdocument;