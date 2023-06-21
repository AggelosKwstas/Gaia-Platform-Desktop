import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highchartsAssets/highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as exporting from 'highchartsAssets/modules/exporting';
import * as exportData from 'highchartsAssets/modules/export-data';

// Initialize the exporting module
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
            zoomType: "x"
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
            tickInterval: 100,
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