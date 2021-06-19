const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('pwd');
const submitBtn = document.querySelector('.submit');

//variables for the user-details

submitBtn.addEventListener('click', () => {
  let userEmail = email.value;
  let userPwd = password.value;
  let fname = firstName.value;
  let lname = lastName.value;

  errorTxt = "";
	submitBtn.disabled = true;
	var successMsg = document.getElementById("success-message");
	var errorMsg = document.getElementById("error-message");
	successMsg.innerHTML = "Loading....";
	errorMsg.innerHTML = "";

	//fetch post request
	fetch("/api/auth/register", {
		method: 'POST',
		body: JSON.stringify({
      firstName: fname,
	    lastName: lname,
			email: userEmail,
			password: userPwd
		}),

		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
    console.log(data);
		if(data.errors){
			for(const key in data.errors){
        if(data.errors[key] !== ""){
          errorTxt += data.errors[key] + "<br>";
        }
        
      }
			successMsg.innerHTML = "";
			errorMsg.innerHTML = errorTxt;
		}else{
			successMsg.innerHTML = "Registration Successful";
			errorMsg.innerHTML = "";
      window.location.href = "/src/html/home.html";

		}
		submitBtn.disabled = false;
	}).catch(err => {
    console.log(err);
		errorTxt += "Error registering user <br>";
		successMsg.innerHTML = "";
		errorMsg.innerHTML = errorTxt;
		submitBtn.disabled = false;
	})
});
