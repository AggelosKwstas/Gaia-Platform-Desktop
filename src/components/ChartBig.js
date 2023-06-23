import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highcharts-react/code/highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as exporting from 'highcharts-react/code/modules/exporting';
import * as exportData from 'highcharts-react/code/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);


export default function Graph({ xValues, yValues, title, measurementUnit }) {
    const chartRef = useRef(null);

    const generateData = (xValues, yValues) => {

        const data = [];
        for (let i = 0; i < yValues.length; i++) {
            data.push([i, yValues[i]]);
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

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.chart.destroy();
            }
        };
    }, []);

    const options = {
        chart: {
            zoomType: "x",
            type: 'line',
            plotBorderWidth: 1, // Add border width for the chart plot area
            plotBorderColor: 'white', // Specify border color for the chart plot area
            borderRadius: 4, // Optional: Add border radius to the plot area
        },
        colors: ['#30730e'],
        title: {
            text: title,
        },
        series: [
            {
                data: generateData(xValues, yValues),
                name: title,
                marker: {
                    radius: 2,
                },
            },
        ],
        credits: {
            enabled: false,
        },
        accessibility: {
            enabled: false,
        },
        plotOptions: {
            series: {
                lineWidth: 2,
                dataGrouping: {
                    enabled: true,
                    forced: true,
                }
            },
        },
        xAxis: {
            categories: xValues,
            tickInterval: 10,
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
        <div style={{ height: '100%', width: '100%',borderRadius:'4px' }}>
            <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
        </div>
    );
}