var working = false;

function verifyLogin() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if(httpRequest.status === 200) {
      document.location("panel.html");
    }
  }
}

$('.login').on('submit', function() {
  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:4000/api/users/login', true);
    httpRequest.send(JSON.stringify({email: $('.username').val(), password: $('.password').val()}));
    httpRequest.onreadystatechange = verifyLogin;
}
});