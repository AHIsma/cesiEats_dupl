// login user
const loginUser = async(mail, pass) => {
  fetch('http://localhost:4000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({email: mail, password: pass})
  })
  .then(response => response.json())
  .then(data => {
    if(data.response === true) {
      window.location.replace('./parts/panel.html');
    } else {
      alert("Email ou mot de passe incorrect");
    }
  });
}

var form = document.getElementById("admin-login");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', () => {
  loginUser(document.querySelector('input[type="email"]').value, document.querySelector('input[type="password"]').value);  
});
