import React, { Component } from 'react';
import './App.css';
import { callApi, setSession } from './api';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      captchaText: '',
      responseMessage: ''
    };
    this.userRegistration = this.userRegistration.bind(this);
    this.signin = this.signin.bind(this);
    this.generateCaptcha = this.generateCaptcha.bind(this);
  }

  componentDidMount() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.setState({ captchaText: captcha });
  }

  showsignin() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";

    let signin = document.getElementById("signin");
    signin.style.display = "block";
    let signup = document.getElementById("signup");
    signup.style.display = "none";

    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Login Here";
    this.generateCaptcha(); // regenerate CAPTCHA on opening login
  }

  showsignup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";

    let signin = document.getElementById("signin");
    signin.style.display = "none";
    let signup = document.getElementById("signup");
    signup.style.display = "block";

    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Create an Account";
  }

  closesignin(event) {
    if (event.target.id === "popup") {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    }
  }

  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";

    if (fullname.value === "") {
      fullname.style.border = "1px solid red";
      fullname.focus();
      return;
    }

    var data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      password: signuppassword.value,
      role: role.value
    });

    callApi("POST", "http://localhost:8030/users/signup", data, this.getResponse);
  }

  getResponse(res) {
    let resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      let signin = document.getElementById("signin");
      let signup = document.getElementById("signup");
      signup.style.display = "none";
      signin.style.display = "block";
    }
  }

  signin() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const captchaInput = document.getElementById("captchaInput");

    username.style.border = "";
    password.style.border = "";
    captchaInput.style.border = "";
    this.setState({ responseMessage: "" });

    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }

    if (password.value === "") {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }

    if (captchaInput.value !== this.state.captchaText) {
      captchaInput.style.border = "1px solid red";
      this.setState({ responseMessage: "Invalid CAPTCHA. Please try again." });
      this.generateCaptcha();
      return;
    }

    let data = JSON.stringify({
      email: username.value,
      password: password.value
    });

    callApi("POST", "http://localhost:8030/users/signin", data, this.signinResponse.bind(this));
  }

  signinResponse(res) {
    let rdata = res.split('::');
    if (rdata[0] === "200") {
      setSession("csrid", rdata[1], 1);
      window.location.replace("/dashboard");
    } else {
      this.setState({ responseMessage: rdata[1] });
      this.generateCaptcha();
    }
  }

  render() {
    return (
      <div id='container'>
        <div id='popup' onClick={this.closesignin}>
          <div id='popupwindow'>
            <div id='popupHeader'>Login</div>

            <div id='signin'>
              <label className='usernamelabel'>Username</label>
              <input type='text' id='username' />
              <label className='passwordlabel'>Password</label>
              <input type='password' id='password' />
              <label>Enter CAPTCHA</label>
              <div style={{ fontWeight: 'bold', fontSize: '18px', margin: '5px 0' }}>{this.state.captchaText}</div>
              <input type='text' id='captchaInput' placeholder='Enter CAPTCHA' />
              <div className='forgotpassword'>Forget <label>Password?</label></div>
              <button className='signinbutton' onClick={this.signin}>Signin</button>
              <div className='div2' id='responseDiv'>
                {this.state.responseMessage && (
                  <label style={{ color: 'red' }}>{this.state.responseMessage}</label>
                )}
              </div>
              <div className='div2'>Don't have an Account ?<br /><label onClick={this.showsignup}>Sign Up Now</label></div>
            </div>

            <div id='signup'>
              <label>Full Name*</label>
              <input type='text' id='fullname' />
              <label>Email*</label>
              <input type='text' id='email' /><br /><br />
              <label>Select Role*</label>
              <select id='role'>
                <option value=''> </option>
                <option value='1'>Admin</option>
                <option value='2'>Customer</option>
                <option value='3'>Dealer</option>
              </select><br /><br />
              <label>Password*</label>
              <input type='password' id='signuppassword' />
              <label>Confirm Password*</label>
              <input type='password' id='confirmpassword' />
              <button onClick={this.userRegistration}>Register</button><br /><br /><br />
              <div>&nbsp;Do You Already Have Account? <span onClick={this.showsignin}>SignIn Now</span></div>
            </div>
          </div>
        </div>

        <div id='header'>
          <img className='logo' src='/logo1.jpg' />
          <div className='logotext'><span>Travel</span> Ease</div>
          <img className='signinicon' src='/user.png' alt='' onClick={this.showsignin} />
          <div className='signintext' onClick={this.showsignin}>SignIn</div>
        </div>

      <div id="content">
  <div className="text1">Your Destination within Few Clicks</div>
  <div className="text2">Booking made easy with the best options!</div>
  <div className="text3">Discover Various Booking Options</div> 
  <img src="./train-image.jpeg" alt="Booking Train" />
</div>

        <div id='footer'>
          <div className='footertext'>Copyright @ 2025 , All rights reserved</div>
          <img className='socialmediaicons' src='/facebook.png' />
          <img className='socialmediaicons' src='/twitter.png' />
          <img className='socialmediaicons' src='/linkedin.png' />
        </div>
      </div>
    );
  }
}