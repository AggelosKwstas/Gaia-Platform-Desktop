import { useEffect, useState } from "react";
import * as Highcharts from 'highcharts-react/code/highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as ChartModuleMore from 'highcharts-react/code/highcharts-more';
import * as HCSoldGauge from 'highcharts-react/code/modules/solid-gauge';

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

const GaugeChart = ({ min, max, title, valueSuffix, measure }) => {
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        const gaugeOptions = {
            chart: {
                type: 'solidgauge',
                height: '400px',
                width: 200,
                backgroundColor: 'transparent',
            },
            title: {
                text: title,
            },
            pane: {
                center: ['50%', '30%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc',
                },
            },
            exporting: {
                enabled: false,
            },
            tooltip: {
                enabled: false,
            },
            credits: {
                enabled: false,
            },
            yAxis: {
                min: min,
                max: max,
                tickInterval: 0,
                stops: [
                    [0, '#01fb0a'],
                    [0.5, '#FFA500'],
                    [1, '#ff0032'],
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70,
                },
                labels: {
                    y: 16,
                },
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true,
                    },
                },
            },
            series: [
                {
                    data: [measure],
                    dataLabels: {
                        format:
                            '<div style="text-align:center"></br>' +
                            '<span style="font-size:19px"><b>{y}</b></span><br/>' +
                            `<span style="font-size:18px"><b>${valueSuffix}</b></span>` +
                            '</div>',
                    },
                    tooltip: {
                        valueSuffix: valueSuffix,
                    },
                },
            ],
        };

        setChartOptions(gaugeOptions);
    }, [min, max, title, valueSuffix, measure]);

    return (
        <div>
            {chartOptions && (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            )}
        </div>
    );
};

export default GaugeChart;
