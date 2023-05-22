var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {
  fillUsuario().then(function () {
    $("#user-saldo").html("$" + user.saldo.toFixed());

    getAlquiladas(user.username);
  });

  $("#reservar-btn").attr("href", `home.html?username=${username}`);

  $("#form-modificar").on("submit", function (event) {
    event.preventDefault();
    modificarUsuario();
  });

  $("#aceptar-eliminar-cuenta-btn").click(function () {
    eliminarCuenta().then(function () {
      location.href = "index.html";
    });
  });
});

async function fillUsuario() {
  user = {
    username: username,
    contrasena: "123456",
    nombre: "Juan Carlos",
    apellidos: "Perez Martinez",
    email: "Juanperez@gmail.com",
    saldo: 5000000,
    premium: true,
  };
  let parsedResult = user;

  user = parsedResult;

  $("#input-username").val(parsedResult.username);
  $("#input-contrasena").val(parsedResult.contrasena);
  $("#input-nombre").val(parsedResult.nombre);
  $("#input-apellidos").val(parsedResult.apellidos);
  $("#input-email").val(parsedResult.email);
  $("#input-saldo").val(parsedResult.saldo.toFixed(2));
  $("#input-premium").prop("checked", parsedResult.premium);
}

function getAlquiladas(username) {
  //mostrarHistorial();
}

function mostrarHistorial(peliculas) {
  //TO DO
}

function devolverPelicula(id) {
  location.reload();
}

function modificarUsuario() {
  let username = $("#input-username").val();
  let contrasena = $("#input-contrasena").val();
  let nombre = $("#input-nombre").val();
  let apellidos = $("#input-apellidos").val();
  let email = $("#input-email").val();
  let saldo = $("#input-saldo").val();
  let premium = $("#input-premium").prop("checked");

  setTimeout(function () {
    location.reload();
  }, 3000);
}

async function eliminarCuenta() {
  console.log("Usuario eliminado");
}
