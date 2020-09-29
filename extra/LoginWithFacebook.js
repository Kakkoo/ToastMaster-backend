import React, { Component } from 'react'

export default class LoginWithFacebook extends Component {
  render() {
    return (
      <div>
 <div id="fb-root"></div>
 <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=708298873106928&autoLogAppEvents=1" nonce="uA9J6mZE"></script>

 <div class="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default"
   data-auto-logout-link="false" data-use-continue-as="true" data-width=""></div>

   <script>
    var finished_rendering = function () {
      console.log("finished rendering plugins");
       var spinner = document.getElementById("spinner");
      spinner.removeAttribute("style");
      spinner.removeChild(spinner.childNodes[0]);
    }
     FB.Event.subscribe('xfbml.render', finished_rendering);
   </script>
   <div id="spinner" style="
           background: #4267b2;
           border-radius: 5px;
           color: white;
          height: 40px;
           text-align: center;
           width: 250px;">
     Loading
     <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
       data-use-continue-as="true"></div>
   </div>
   <div class="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with"
     data-width="100%" data-scope="public_profile, email>"></div>

      </div>
    )
  }
}

// <!DOCTYPE html>
// <html>
//   <body>App ID: 708298873106928
// <div id="fb-root"></div>
// <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=708298873106928&autoLogAppEvents=1" nonce="uA9J6mZE"></script>

// <div class="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="default"
//   data-auto-logout-link="false" data-use-continue-as="true" data-width=""></div>

//   <script>
//     var finished_rendering = function () {
//       console.log("finished rendering plugins");
//       var spinner = document.getElementById("spinner");
//       spinner.removeAttribute("style");
//       spinner.removeChild(spinner.childNodes[0]);
//     }
//     FB.Event.subscribe('xfbml.render', finished_rendering);
//   </script>
//   <div id="spinner" style="
//           background: #4267b2;
//           border-radius: 5px;
//           color: white;
//           height: 40px;
//           text-align: center;
//           width: 250px;">
//     Loading
//     <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
//       data-use-continue-as="true"></div>
//   </div>
//   <div class="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with"
//     data-width="100%" data-scope="public_profile, email>"></div>
//   <!--Include the JavaScript SDK on your page once, ideally right after the opening body tag.-->
//   </body>
//   </html> 