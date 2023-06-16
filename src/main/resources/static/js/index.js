//copiar elementos del slider hasta completar la pantalla 2 veces para hacer efecto bucle infinito
function slider() {
    var container = document.querySelector(".container");
    var elements = container.querySelectorAll(".element");
    var containerWidth = container.offsetWidth;
    var totalElementWidth = 0;

    container.style.setProperty("--element-count", elements.length);

    elements.forEach(function (element) {
      totalElementWidth += element.offsetWidth;
    });

    var numberOfElements = Math.ceil(containerWidth / totalElementWidth);
    console.log(numberOfElements);

    for (var i = 0; i < numberOfElements * 2; i++) {
      elements.forEach(function (element) {
        var clone = element.cloneNode(true);
        container.appendChild(clone);
      });
    }
  }

  $(document).ready(function () {

    //peticion para obtener los indices
    $.ajax({
      url: "/api/indices",
      type: "GET",
      dataType: "json",
      success: function (response) {

        //iniciar div de el slider
        $("body").prepend("<div class='container'></div>");


        for (let index = 0; index < response["listaResult"].length; index++) {
          const element = response["listaResult"][index];

          //poner primeros elementos del slider
          $(".container").append(
            "<div class='element "+(element["Variacion"]<0?"negative":"positive")+"'><p>" +
              element["Nombre"] +
              "</p><p>" +
              element["Valor"] +
              "</p><p>" +
              element["Variacion"] +
              "</p></div>"
          );


          //setear los valores de las tarjetas con la informacion de los indices
          $(".indices-container").append(
            "<div class='indice-element'>" +
              "<div class='card'>" +
              "<div class='indice-name'> " +
              element["Nombre"] +
              "</div>" +
              "<hr>" +
              "<div class='indice-valor'>Valor: " +
              element["Valor"] +
              "</div>" +
              "<div class='indice-mayor'>Mayor: " +
              element["Mayor"] +
              "</div>" +
              "<div class='indice-menor'>Menor: " +
              element["Menor"] +
              "</div>" +
              "<div class='indice-variacion'>Variacion: " +
              element["Variacion"] +
              "</div>" +
              "</div>" +
              "</div>"
          );
        }

        slider();
      },
    });
  });