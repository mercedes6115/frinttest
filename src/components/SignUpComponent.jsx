import * as react from 'react';
import { Component } from 'react';
import BoardService from '../service/BoardService';



class SignUpComponent extends Component {


    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
    }

    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }
    changeConfirmPasswordHandler= (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    signUp = (event) => {
        event.preventDefault();
        let signUpForm = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword:this.state.confirmPassword
        };
        console.log("signUpForm => "+ JSON.stringify(signUpForm));
        BoardService.signUp(signUpForm).then(res => {
            this.props.history.push('/board');
        });
    }
    
    render() {
        return (                          
            <section className="vh-100" style={{backgroundColor: "#eee"}}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black" style={{borderRadius: "25px"}}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>  
                          <form className="mx-1 mx-md-4">         
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c" className="form-control" value={this.state.name} onChange={this.changeNameHandler} />
                                <label className="form-label"  htmlFor='form3Example1c' >Your Name</label>
                              </div>
                            </div>
          
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="email" id="form3Example3c" value={this.state.email} onChange={this.changeEmailHandler} className="form-control" />
                                <label className="form-label" htmlFor='form3Example3c'>Your Email</label>
                              </div>
                            </div>
          
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4c" value={this.state.password} onChange={this.changePasswordHandler} className="form-control" />
                                <label className="form-label" htmlFor='form3Example4c'>Password</label>
                              </div>
                            </div>
          
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4cd" value={this.state.confirmPassword} onChange={this.changeConfirmPasswordHandler} className="form-control" />
                                <label className="form-label" htmlFor='form3Example4cd'>Repeat your password</label>
                              </div>
                            </div>
        
                            <div className="form-check d-flex justify-content-center mb-5">
                              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                              <label className="form-check-label" htmlFor="form2Example3">
                                I agree all statements in <a href="#!">Terms of service</a>
                              </label>
                            </div>
          
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="button" onClick={this.signUp} className="btn btn-primary btn-lg">Register</button>
                            </div>
          
                          </form>
          
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
          
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="img-fluid" alt="Sample image">
                                </img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );          
    }
}

export default SignUpComponent;


