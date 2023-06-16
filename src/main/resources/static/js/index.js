function barra() {
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
    $.ajax({
      url: "/api/indices",
      type: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response["listaResult"]);
        $("body").prepend("<div class='container'></div>");
        for (let index = 0; index < response["listaResult"].length; index++) {
          const element = response["listaResult"][index];
          $(".container").append(
            "<div class='element'><p>" +
              element["Nombre"] +
              "</p><p>" +
              element["Valor"] +
              "</p><p>" +
              element["Variacion"] +
              "</p></div>"
          );
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

        barra();
      },
    });
  });