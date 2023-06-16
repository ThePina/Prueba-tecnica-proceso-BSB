//graficos
function getChartData(json) {
  const labels = [];
  const datasets = [
    {
      label: "Valor",
      data: [],
      borderWidth: 1,
    },
    {
      label: "Mayor",
      data: [],
      borderWidth: 1,
    },
    {
      label: "Menor",
      data: [],
      borderWidth: 1,
    },
   
  ];
  for (let i = 0; i < json.length; i++) {
    datasets[0].data.push(json[i]["Valor"]);
    datasets[1].data.push(json[i]["Mayor"]);
    datasets[2].data.push(json[i]["Menor"]);
    labels.push(json[i]["Nombre"]);
  }
  return { labels: labels, datasets: datasets };
}

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

      //barra de valores
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
      }
      barra();

      

      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "bar",
        data: getChartData(response["listaResult"]),

        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  });
});
