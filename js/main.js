
 function SetUP () { 
////////////////////////////////////////////////////////////////////////////////////////
   $('#chart1').highcharts({
         chart: {
             plotBackgroundColor: null,
             plotBorderWidth: null,
             plotShadow: false,
             type: 'pie'
         },
         title: {
             text: null
         },
         tooltip: {
             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         plotOptions: {
             pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 dataLabels: {
                     enabled: true,
                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                     style: {
                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                     }
                 }
             }
         },
         series: [{
             name: 'Brands',
             colorByPoint: true,
             data: [{
                 name: 'Material',
                 y: 56.33
             }, {
                 name: 'PA issue',
                 y: 24.03,
                 sliced: true,
                 selected: true
             }, {
                 name: 'Machine',
                 y: 10.38
             }, {
                 name: 'Reports',
                 y: 4.77
             }, {
                 name: 'Documentation',
                 y: 0.91
             }, {
                 name: 'Other',
                 y: 0.2
             }]
         }]
     });
///////////////////////////////////////////////////////////// 

     $('#chart4').highcharts({
         title: {
             text: 'Dead Time Metrics'
         },
         xAxis: {
             categories: ['Production Line 1', 'Production Line 2', 'Production Line 3', 'Production Line 4', 'Production Line 5']
         },
         labels: {
             items: [{
                 html: 'Total Dead Time (Hours)',
                 style: {
                     left: '50px',
                     top: '18px',
                     color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                 }
             }]
         },
         series: [{
             type: 'column',
             name: '1st Shift',
             data: [3, 2, 1, 3, 4]
         }, {
             type: 'column',
             name: '2nd Shift',
             data: [2, 3, 5, 7, 6]
         }, {
             type: 'column',
             name: '3rd Shift',
             data: [4, 3, 3, 9, 0]
         }, {
             type: 'spline',
             name: 'Average',
             data: [3, 2.67, 3, 6.33, 3.33],
             marker: {
                 lineWidth: 2,
                 lineColor: Highcharts.getOptions().colors[3],
                 fillColor: 'white'
             }
         }, {
             type: 'pie',
             name: 'Total consumption',
             data: [{
                 name: 'Jane',
                 y: 13,
                 color: Highcharts.getOptions().colors[0] // Jane's color
             }, {
                 name: 'John',
                 y: 23,
                 color: Highcharts.getOptions().colors[1] // John's color
             }, {
                 name: 'Joe',
                 y: 19,
                 color: Highcharts.getOptions().colors[2] // Joe's color
             }],
             center: [100, 80],
             size: 100,
             showInLegend: false,
             dataLabels: {
                 enabled: false
             }
         }]
     });

     /////////////////////////////////////////////////////////////////////////////
        $('#chart2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Average of generated Scrap, Represented in money. January, 2016 To June, 2016'
        },
        subtitle: {
            text: 'All the quantities X 1000 (Thousand Dollars) '
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total of Money'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'January',
                y: 50.33,
                drilldown: 'January'
            }, {
                name: 'February',
                y: 24.03,
                drilldown: 'February'
            }, {
                name: 'March',
                y: 10.38,
                drilldown: 'March'
            }, {
                name: 'April',
                y: 4.77,
                drilldown: 'April'
            }, {
                name: 'May',
                y: 0.91,
                drilldown: 'May'
            }, {
                name: 'June',
                y: 0.2,
                drilldown: null
            }]
        }],
        drilldown: {
            series: [{
                name: 'Microsoft Internet Explorer',
                id: 'Microsoft Internet Explorer',
                data: [
                    [
                        'v11.0',
                        24.13
                    ],
                    [
                        'v8.0',
                        17.2
                    ],
                    [
                        'v9.0',
                        8.11
                    ],
                    [
                        'v10.0',
                        5.33
                    ],
                    [
                        'v6.0',
                        1.06
                    ],
                    [
                        'v7.0',
                        0.5
                    ]
                ]
            }, {
                name: 'Chrome',
                id: 'Chrome',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ]
            }, {
                name: 'Firefox',
                id: 'Firefox',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ]
            }, {
                name: 'Safari',
                id: 'Safari',
                data: [
                    [
                        'v8.0',
                        2.56
                    ],
                    [
                        'v7.1',
                        0.77
                    ],
                    [
                        'v5.1',
                        0.42
                    ],
                    [
                        'v5.0',
                        0.3
                    ],
                    [
                        'v6.1',
                        0.29
                    ],
                    [
                        'v7.0',
                        0.26
                    ],
                    [
                        'v6.2',
                        0.17
                    ]
                ]
            }, {
                name: 'Opera',
                id: 'Opera',
                data: [
                    [
                        'v12.x',
                        0.34
                    ],
                    [
                        'v28',
                        0.24
                    ],
                    [
                        'v27',
                        0.17
                    ],
                    [
                        'v29',
                        0.16
                    ]
                ]
            }]
        }
    });
 }
