import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highchartsAssets/highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as exporting from 'highchartsAssets/modules/exporting';
import * as exportData from 'highchartsAssets/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

export default function Graph({ xValues, yValues, title, measurementUnit }) {
    const chartRef = useRef(null);

    const generateData = (xValues, yValues) => {
        const data = [];
        for (let i = 0; i < yValues.length; i++) {
            data.push([xValues[i], yValues[i]]);
        }
        return data;
    };

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current.chart;

            chart.series[0].setData(generateData(xValues, yValues));

            chart.xAxis[0].setCategories(xValues);

            chart.reflow();
        }
    }, [xValues, yValues]);

    const options = {
        colors: ['#30730e'],
        title: {
            text: title,
        },
        series: [
            {
                data: [],
                name: title,
                marker: {
                    radius: 3,
                },
                animation: {
                    duration: 700,
                    easing: 'easeOutBounce',
                    defer: 500,
                },
            },
        ],
        credits: {
            enabled: false,
        },
        accessibility: {
            enabled: false,
        },
        xAxis: {
            categories: [],
            tickInterval: 4,
            labels: {
                formatter: function () {
                    const dateTime = new Date(this.value);
                    const hours = dateTime.getHours();
                    const minutes = dateTime.getMinutes();
                    let time = '';

                    if (hours >= 12) {
                        time = (hours === 12 ? '12' : hours - 12) + ':' + ('0' + minutes).slice(-2) + ' PM';
                    } else {
                        time = hours + ':' + ('0' + minutes).slice(-2) + ' AM';
                    }

                    return time;
                },
            },
        },
        yAxis: {
            title: {
                text: null,
            },
        },
        tooltip: {
            valueSuffix: ' ' + measurementUnit,
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadPDF']
                },
            },
        },
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
        </div>
    );
}