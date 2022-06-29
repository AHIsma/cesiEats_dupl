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
      document.querySelector('.log').innerHTML = 
      '<h5>Vous êtes connecté !</h5><a href="./parts/panel.html">Cliquez ici pour accéder à votre panel</a>';
      return true;
    } else {
      alert("Email ou mot de passe incorrect");
      return false;
    }
  });
}

const submitButton = document.querySelector('button[type="button"]');
submitButton.addEventListener('click', () => {
  loginUser(document.querySelector('input[type="email"]').value, document.querySelector('input[type="password"]').value);  
});
