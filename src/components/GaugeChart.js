import { useEffect, useState } from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as ChartModuleMore from 'highcharts/highcharts-more';
import * as HCSoldGauge from 'highcharts/modules/solid-gauge';

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

const GaugeChart = ({ min, max, title, valueSuffix, measure }) => {
    const [chartOptions, setChartOptions] = useState(null);

    const gaugeOptions = {
        chart: {
            type: 'solidgauge',
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
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor,
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
            min: 0,
            max: 10,
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
    };

    useEffect(() => {
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