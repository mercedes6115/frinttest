import React, { Component } from 'react';
import BoardService from '../service/BoardService';
class SignInComponent extends Component {

constructor(props){

    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
}

changeEmailHandler= (event) => {
  this.setState({email: event.target.value});
  console.log(event.target.value);
  var emailCheck = event.target.value;
  if(emailCheck.includes('@')){
    console.log("valid email");
  }

}
changePasswordHandler= (event) => {
  this.setState({password: event.target.value});
}

logIn = (event) => {
  event.preventDefault();
  let logInForm = {
      email: this.state.email,
      password: this.state.password,
  };
  console.log("logInForm => "+ JSON.stringify(logInForm));
  BoardService.logIn(logInForm).then(res => {
      this.props.history.push('/board');
  });
}

render() {
        return (
            <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image">
            </img>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="form-outline mb-4" style={{marginTop: "70px"}}>
            <input type="email" id="form3Example3" className="form-control form-control-lg" value={this.state.email} onChange={this.changeEmailHandler}
              placeholder="Enter a valid email address" />
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>

          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" value={this.state.password} onChange={this.changePasswordHandler}
              placeholder="Enter password" />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight:"2.5rem"}} onClick={this.logIn}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/sign-up"
                className="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
            
        );
    }
}

export default SignInComponent