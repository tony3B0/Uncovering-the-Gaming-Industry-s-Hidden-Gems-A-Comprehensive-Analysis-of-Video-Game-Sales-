function init() {
  let firstRegion = 'na_sales'
  barChart(firstRegion)
  pieChart(firstRegion)
  lineChart()
  carousel()
}

/////// BAR CHART FUNCTION ////////

function barChart(region) {
  // Read in data with JSON
  d3.json('/data').then((json_data) => {
    // Grab json data
    let data = json_data
    // Grab specific variables
    let sampleData = []
    let sampleRank = []
    let sampleNames = []
    let sampleSales = []
    let samplePublishers = []
    let sampleGenre = []
    let samplePlatform = []
    var regionName = ''
    // Loop through 50
    for (let i = 0; i <= 49; i++) {
      sampleData.push(data[i])
      sampleRank.push(data[i].rank)
      sampleNames.push(data[i].name)
      samplePublishers.push(data[i].publisher)
      sampleGenre.push(data[i].genre)
      samplePlatform.push(data[i].platform)
      if (region == 'na_sales') {
        sampleSales.push(data[i].na_sales)
        regionName = 'North America'
      } else if (region == 'eu_sales') {
        sampleSales.push(data[i].eu_sales)
        regionName = 'Europe'
      } else if (region == 'jp_sales') {
        sampleSales.push(data[i].jp_sales)
        regionName = 'Japan'
      } else if (region == 'other_sales') {
        sampleSales.push(data[i].other_sales)
        regionName = 'Other'
      } else if (region == 'global_sales') {
        sampleSales.push(data[i].global_sales)
        regionName = 'Global'
      }
    }
    let xticks = sampleRank
      .map((x) => +x)
      .slice(0, 50)
      .reverse()
    let barData = [
      {
        x: xticks,
        y: sampleSales,
        text: sampleNames,
        // base: [sampleSales],
        type: 'bar',
        hoverinfo: sampleNames.slice(0, 100).reverse(),
        marker: {
          color: [
            '#eeeec7',
            '#dec26d',
            '#cd9957',
            '#bd6b44',
            '#ac4136',
            '#6c3434',
            '#3e2d2e',
            '#6e4c49',
            '#94725d',
            '#bfa17a',
            '#ddcf95',
            '#96c083',
            '#5fa367',
            '#4a806b',
            '#3e625e',
            '#384d52',
            '#4c547a',
            '#676786',
            '#b1b0bf',
            '#786072',
            '#5a444e',
            '#eeeec7',
            '#dec26d',
            '#cd9957',
            '#bd6b44',
            '#ac4136',
            '#6c3434',
            '#3e2d2e',
            '#6e4c49',
            '#94725d',
            '#bfa17a',
            '#ddcf95',
            '#96c083',
            '#5fa367',
            '#4a806b',
            '#3e625e',
            '#384d52',
            '#4c547a',
            '#676786',
            '#b1b0bf',
            '#786072',
            '#5a444e',
            '#eeeec7',
            '#dec26d',
            '#cd9957',
            '#bd6b44',
            '#ac4136',
            '#6c3434',
            '#3e2d2e',
            '#6e4c49',
            '#94725d',
          ],
        },
      },
    ]
    let barLayout = {
      width: 800,
      height: 400,
      title: `${regionName} Sales Data`,
      xaxis: { title: 'Game Rank' },
      yaxis: {
        title: `${regionName} Sales ($)`,
        gridcolor: 'white',
        gridwidth: 1,
      },
      hovermode: sampleNames,
      plot_bgcolor: 'black',
      paper_bgcolor: '#0d0d0d',
      font: {
        color: 'white',
        family: 'Roboto, san-serif',
      },
    }
    Plotly.newPlot('bar', barData, barLayout)
  })
}

/////// PIE CHART FUNCTION ////////

function pieChart(region) {
  d3.json('/data').then((json_data) => {
    // Grab json data
    let data = json_data
    let sampleGenre = []
    let sampleSales = []
    let regionName = ''
    // Loop through 100
    for (let i = 0; i <= 49; i++) {
      sampleGenre.push(data[i].genre)
      if (region == 'na_sales') {
        sampleSales.push(data[i].na_sales)
        regionName = 'North America'
      } else if (region == 'eu_sales') {
        sampleSales.push(data[i].eu_sales)
        regionName = 'Europe'
      } else if (region == 'jp_sales') {
        sampleSales.push(data[i].jp_sales)
        regionName = 'Japan'
      } else if (region == 'other_sales') {
        sampleSales.push(data[i].other_sales)
        regionName = 'Other'
      } else if (region == 'global_sales') {
        sampleSales.push(data[i].global_sales)
        regionName = 'Global'
      }
    }
    // Setting Values for pie chart
    let pieValues = sampleGenre.slice(0, 10)
    // Setting Data points
    let pieData = [
      {
        values: sampleSales,
        labels: pieValues,
        type: 'pie',
        hole: 0.3,
        textinfo: 'label+percent',
        textposition: 'outside',
        marker: {
          colors: [
            '#3e2d2e',
            '#6e4c49',
            '#94725d',
            '#bfa17a',
            '#ddcf95',
            '#96c083',
            '#5fa367',
            '#4a806b',
            '#3e625e',
            '#384d52',
          ],
        },
      },
    ]

    let pieLayout = {
      height: 400,
      width: 550,
      margin: { t: 90, b: 50, l: 0, r: 0, pad: 2 },
      title: {
        text: `Top Played Genres in Region: ${regionName}`,
      },
      showlegend: true,
      plot_bgcolor: 'black',
      paper_bgcolor: '#0d0d0d',
      font: {
        color: 'white',
        family: 'Roboto, san-serif',
      },
    }

    Plotly.newPlot('pie', pieData, pieLayout)
  })
}
/////// LINE GRAPH FUNCTION ////////

function lineChart() {
  d3.json('/linedata').then((json_data) => {
    let data = json_data

    let sampleYear = []
    let sampleNASales = []
    let sampleEUSales = []
    let sampleJPSales = []
    let sampleOtherSales = []
    let sampleGlobalSales = []
    let sampleSales = []
    let regionName = ''

    for (let i = 0; i <= 8; i++) {
      sampleYear.push(data[i].year)
      sampleNASales.push(data[i].na_sales)
      sampleEUSales.push(data[i].eu_sales)
      sampleJPSales.push(data[i].jp_sales)
      sampleOtherSales.push(data[i].other_sales)
      sampleGlobalSales.push(data[i].global_sales)
    }

    var trace1 = {
      x: sampleYear,
      y: sampleNASales,
      type: 'scatter',
      name: 'NA Sales',
      marker: {
        color: '#dec26d',
        width: 5,
        size: 8,
      },
    }

    var trace2 = {
      x: sampleYear,
      y: sampleEUSales,
      type: 'scatter',
      name: 'EU Sales',
      marker: {
        color: '#ac4136',
        width: 5,
        size: 8,
      },
    }

    var trace3 = {
      x: sampleYear,
      y: sampleJPSales,
      type: 'scatter',
      name: 'JP Sales',
      marker: {
        color: '#5fa367',
        width: 5,
        size: 8,
      },
    }

    var trace4 = {
      x: sampleYear,
      y: sampleOtherSales,
      type: 'scatter',
      name: 'Other Sales',
      marker: {
        color: '#6c3434',
        width: 5,
        size: 8,
      },
    }

    var trace5 = {
      x: sampleYear,
      y: sampleGlobalSales,
      type: 'scatter',
      name: 'Global Sales',
      marker: {
        color: '#4c547a',
        width: 5,
        size: 8,
      },
    }

    let lineData = [trace1, trace2, trace3, trace4, trace5]

    let lineLayout = {
      width: 550,
      height: 400,
      title: `Video Game Sales Data`,
      xaxis: {
        title: 'Year',
        gridcolor: 'white',
        gridwidth: 1,
        autotick: false,
        ticks: 'outside',
        tick0: 0,
        dtick: 1,
        ticklen: 8,
        tickwidth: 2,
        tickcolor: '#FFF',
        tickangle: 45,
      },
      yaxis: {
        title: `Sales Data ($)`,
        gridcolor: 'white',
        gridwidth: 1,
      },
      hovermode: sampleSales,
      plot_bgcolor: 'black',
      paper_bgcolor: '#0d0d0d',
      showlegend: true,
      font: {
        color: 'white',
        family: 'Roboto, san-serif',
      },
      margin: {
        pad: 4,
      },
    }
    Plotly.newPlot('line', lineData, lineLayout)
  })
}

/////// DROPDOWN FUNCTION ////////
function optionChanged(newRegion) {
  // Fetch new data each time a new sample is selected
  barChart(newRegion)
  pieChart(newRegion)
}
/////// CAROUSEL FUNCTION ////////

function carousel() {
  var owl = $('.owl-carousel')
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
  })
  $('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [2000])
  })
  $('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
  })
}
/////// INITIALIZING ALL FUNCTIONS TO RUN ////////

init()
