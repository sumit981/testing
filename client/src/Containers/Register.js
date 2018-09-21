import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
    super(props);
    
    }
	
	
  
    
	
     
	
	
	
	
   render() {
      return (
	  <div>
         <div className="loader-bg"></div>
        <div className="loader">
            <div className="preloader-wrapper big ">
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
                                      <span className="card-title">Registration</span>
                                       <div className="row">
                                           <form className="col s12">
                                               <div className="input-field col s12">
                                                   <input id="email" type="email" className="validate" autoComplete ="off"/>
                                                   <label htmlFor="email">Email</label>
                                               </div>
                                               <div className="input-field col s12">
                                                   <input id="password" type="password" className="validate"/>
                                                   <label htmlFor="password">Password</label>
                                               </div>
											   
											   <div className="input-field col s12">
                                                   <input id="cpassword" type="password" className="validate"/>
                                                   <label htmlFor="cpassword">Confirm Password</label>
                                               </div>
											   
                                               <div className="col s12 right-align m-t-sm">
                                                  
                                                   <a className="waves-effect waves-light btn teal">Register</a>
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
export default Register;