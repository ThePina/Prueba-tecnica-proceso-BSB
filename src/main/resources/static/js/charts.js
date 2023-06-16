var listaIndices = {};
var myChart;
var myChart2;
//obtner datos de para el grafico, dependiendo del los indices seleccionados
function getChartData(indicesSeleccionados) {
  var indicesFilter = listaIndices.filter(function (objeto) {
    return indicesSeleccionados.includes(objeto["Nombre"]);
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

  for (let i = 0; i < indicesFilter.length; i++) {
    datasets[0].data.push(indicesFilter[i]["Valor"]);
    datasets[1].data.push(indicesFilter[i]["Mayor"]);
    datasets[2].data.push(indicesFilter[i]["Menor"]);
    labels.push(indicesFilter[i]["Nombre"]);
  }

  return { labels: labels, datasets: datasets };
}

//obtner datos de para el grafico, dependiendo del los indices seleccionados
function getChart2Data(indicesSeleccionados) {

    var indicesFilter = listaIndices.filter(function (objeto) {
      return indicesSeleccionados.includes(objeto["Nombre"]);
    });
  
    const labels = [];
    const datasets = [
      {
        label: "Variacion",
        data: [],
        borderWidth: 1,
      },
    
    ];
  
    for (let i = 0; i < indicesFilter.length; i++) {
      datasets[0].data.push(indicesFilter[i]["Variacion"]);
      labels.push(indicesFilter[i]["Nombre"]);
    }
  
    return { labels: labels, datasets: datasets };
  }


//actualizar grafico
function updateChart(indicesSeleccionados) {
  if (indicesSeleccionados.length === 0) {
    console.log(getChartData(indicesSeleccionados));
    myChart.data = getChartData(indicesSeleccionados);


    myChart.update();
  } else {
    console.log(getChart2Data(indicesSeleccionados))

    myChart.data = getChartData(indicesSeleccionados);
    myChart.update();
    myChart2.data = getChart2Data(indicesSeleccionados);
    myChart2.update();
  }
}

$(document).ready(function () {
  $.ajax({
    url: "/api/indices",
    type: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response["listaResult"]);
      listaIndices = response["listaResult"];

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
 

      // datos vacios para inicializar grafico
      var datosVacios = {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            borderWidth: 1,
          },
        ],
      };

      // Iniciar grafico1 vacio
      myChart = new Chart(document.getElementById("myChart"), {
        type: "bar",
        data: datosVacios,
        responsive: true,
        options: {
          indexAxis: "y", // Configurar el eje de índice como el eje y
          scales: {
            y: {
              beginAtZero: true, // Empezar en cero en el eje y
            },
          },
        },
      });


      // Iniciar grafico2 vacio
      myChart2 = new Chart(document.getElementById("myChart2"), {
        type: "bar",
        data: datosVacios,
        responsive: true,
        options: {
          indexAxis: "x", // Configurar el eje de índice como el eje y
          scales: {
            x: {
              beginAtZero: true, // Empezar en cero en el eje y
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
