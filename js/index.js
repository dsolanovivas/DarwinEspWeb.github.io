$(document).ready(function () {
  $("#form-login").submit(function (event) {
    event.preventDefault();
    autenticarUsuario();
  });

  $("#form-register").submit(function (event) {
    event.preventDefault();
    registrarUsuario();
  });
});

function autenticarUsuario() {
  let username = $("#usuario").val();
  let contrasena = $("#contrasena").val();

  document.location.href = "home.html?username=" + username;
}
function registrarUsuario() {
  let username = $("#input-username").val();
  let contrasena = $("#input-contrasena").val();
  let contrasenaConfirmacion = $("#input-contrasena-repeat").val();
  let nombre = $("#input-nombre").val();
  let apellidos = $("#input-apellidos").val();
  let email = $("#input-email").val();
  let saldo = $("#input-saldo").val();
  let premium = $("#input-premium").prop("checked");

  if (contrasena == contrasenaConfirmacion) {
    document.location.href = "home.html?username=" + username;
  } else {
    $("#register-error").removeClass("d-none");
    $("#register-error").html("Las contraseñas no coinciden");
  }
}
