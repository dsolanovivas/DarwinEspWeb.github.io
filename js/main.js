var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  getUsuario().then(function () {
    $("#mi-perfil-btn").attr("href", "profile.html?username=" + username);

    $("#user-saldo").html(user.saldo.toFixed(2) + "$");

    getPeliculas(false, "ASC");

    $("#ordenar-genero").click(ordenarPeliculas);
  });
});

async function getUsuario() {
  user = {
    username: username,
    contrasena: "123456",
    nombre: "Juan Carlos",
    apellidos: "Perez Martinez",
    email: "Juanperez@gmail.com",
    saldo: 5000000,
    premium: true,
  };
}
function getPeliculas(ordenar, orden) {
  $.getJSON("/assets/peliculas.json", function (data) {
    var peliculas = data;
    console.log(peliculas.data);
    mostrarPeliculas(peliculas.data);
  });
}
function mostrarPeliculas(peliculas) {
  let contenido = "";

  $.each(peliculas, function (index, pelicula) {
    //pelicula = JSON.parse(pelicula);
    let precio;

    if (pelicula.copias > 0) {
      if (user.premium) {
        if (pelicula.novedad) {
          precio = 2 - 2 * 0.1;
        } else {
          precio = 1 - 1 * 0.1;
        }
      } else {
        if (pelicula.novedad) {
          precio = 2;
        } else {
          precio = 1;
        }
      }

      contenido +=
        '<tr><th scope="row">' +
        pelicula.id +
        "</th>" +
        "<td>" +
        pelicula.titulo +
        "</td>" +
        "<td>" +
        pelicula.genero +
        "</td>" +
        "<td>" +
        pelicula.autor +
        "</td>" +
        "<td>" +
        pelicula.copias +
        "</td>" +
        '<td><input type="checkbox" name="novedad" id="novedad' +
        pelicula.id +
        '" disabled ';
      if (pelicula.novedad) {
        contenido += "checked";
      }
      contenido +=
        "></td>" +
        "<td>" +
        precio +
        "</td>" +
        '<td><button onclick="alquilarPelicula(' +
        pelicula.id +
        "," +
        precio +
        ');" class="btn btn-success" ';
      if (user.saldo < precio) {
        contenido += " disabled ";
      }

      contenido += ">Reservar</button></td></tr>";
    }
  });
  $("#peliculas-tbody").html(contenido);
}

function ordenarPeliculas() {
  if ($("#icono-ordenar").hasClass("fa-sort")) {
    getPeliculas(true, "ASC");
    $("#icono-ordenar").removeClass("fa-sort");
    $("#icono-ordenar").addClass("fa-sort-down");
  } else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
    getPeliculas(true, "DESC");
    $("#icono-ordenar").removeClass("fa-sort-down");
    $("#icono-ordenar").addClass("fa-sort-up");
  } else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
    getPeliculas(false, "ASC");
    $("#icono-ordenar").removeClass("fa-sort-up");
    $("#icono-ordenar").addClass("fa-sort");
  }
}
function alquilarPelicula(id, precio) {
  restarDinero(precio).then(function () {
    location.reload();
  });
}

async function restarDinero(precio) {
  user.saldo = user.saldo - precio;
}
