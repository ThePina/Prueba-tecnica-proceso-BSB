var indexList = {};
var valuesChart;
var variationChart;

//obtner datos de para el grafico1, dependiendo del los indices seleccionados
function getChartValues(selectedIndex) {
  var indexFilter = indexList.filter(function (objeto) {
    return selectedIndex.includes(objeto["Nombre"]);
  });

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

  for (let i = 0; i < indexFilter.length; i++) {
    datasets[0].data.push(indexFilter[i]["Valor"]);
    datasets[1].data.push(indexFilter[i]["Mayor"]);
    datasets[2].data.push(indexFilter[i]["Menor"]);
    labels.push(indexFilter[i]["Nombre"]);
  }

  return { labels: labels, datasets: datasets };
}

//obtner datos de para el grafico2, dependiendo del los indices seleccionados
function getChartVariationData(selectedIndex) {
  var indexFilter = indexList.filter(function (objeto) {
    return selectedIndex.includes(objeto["Nombre"]);
  });

  const labels = [];
  const datasets = [
    {
      label: "Variacion",
      data: [],
      borderWidth: 1,
    },
  ];

  for (let i = 0; i < indexFilter.length; i++) {
    datasets[0].data.push(indexFilter[i]["Variacion"]);
    labels.push(indexFilter[i]["Nombre"]);
  }

  return { labels: labels, datasets: datasets };
}

//actualizar grafico
function updateChart(selectedIndex) {
  valuesChart.data = getChartValues(selectedIndex);
  valuesChart.update();
  variationChart.data = getChartVariationData(selectedIndex);
  variationChart.update();

  valuesChart.update();
}

$(document).ready(function () {
  //peticion para obtener los indices
  $.ajax({
    url: "/api/indices",
    type: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response["listaResult"]);
      indexList = response["listaResult"];

      //indices disponibles

      for (let index = 0; index < response["listaResult"].length; index++) {
        const element = response["listaResult"][index];

        //lista de indices
        $(".lista-indices").append(
          "<li>" +
            "<input type='checkbox' id=" +
            element["Nombre"] +
            " name='items' value=" +
            element["Nombre"] +
            " />" +
            "<label for=" +
            element["Nombre"] +
            ">" +
            element["Nombre"] +
            "</label>" +
            "</li>"
        );
      }

      // datos vacios para inicializar graficos
      var emptyData = {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            borderWidth: 1,
          },
        ],
      };

      // Iniciar grafico de valores vacio
      valuesChart = new Chart(document.getElementById("valuesChart"), {
        type: "bar",
        data: emptyData,
        responsive: true,
        options: {
          indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Iniciar grafico de variacion vacio
      variationChart = new Chart(document.getElementById("variationChart"), {
        type: "bar",
        data: emptyData,
        responsive: true,
        options: {
          indexAxis: "x",
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });

      //listner para las indices seleccionados
      $('input[name="items"]').change(function () {
        var selectedItems = [];

        $('input[name="items"]:checked').each(function () {
          var label = $('label[for="' + $(this).attr("id") + '"]').text();
          selectedItems.push(label);
        });

        updateChart(selectedItems);
      });
    },
  });
});
