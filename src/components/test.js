function gaugeChart(targetElementId, measurementName, measurementValue, min, max, unit) {
    var gaugeOptions = {
        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '90%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },
        // the value axis
        yAxis: {
            stops: [
                [0.3, '#55BF3B'], // green
                [0.6, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 40
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    var chartSpeed = Highcharts.chart(targetElementId, Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: min,
            max: max,
            tickInterval: 0,
            title: {
                text: measurementName
            },
        },

        credits: {
            enabled: false
        },

        series: [{
            name: measurementName,
            data: [measurementValue],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">' + decodeEntities(unit) + '</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: decodeEntities(unit)
            }
        }]

    }));

}