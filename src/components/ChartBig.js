import React, { useEffect, useRef } from 'react';
import Highcharts, { time } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import boost from 'highcharts/modules/boost';

exporting(Highcharts);
exportData(Highcharts);
boost(Highcharts);

export default function Graph({ xValues, yValues, title, measurementUnit }) {
    const chartRef = useRef(null);

    const generateData = (yValues) => {
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
            zoomType: 'x',
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
                    radius: 4,
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
                },
            },
        },
        xAxis: {
            tickInterval: 20,
            labels: {
                formatter: function () {
                    const index = Math.round(this.value);
                    if (index >= 0 && index < xValues.length) {
                        const dateTime = new Date(xValues[index]);
                        const hours = dateTime.getHours();
                        const minutes = dateTime.getMinutes();
                        let time = '';

                        if (hours >= 12) {
                            time = (hours === 12 ? '12' : hours - 12) + ':' + ('0' + minutes).slice(-2) + ' PM';
                        } else {
                            time = hours + ':' + ('0' + minutes).slice(-2) + ' AM';
                        }

                        return time;
                    }
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
                    menuItems: ['downloadPNG'],
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
