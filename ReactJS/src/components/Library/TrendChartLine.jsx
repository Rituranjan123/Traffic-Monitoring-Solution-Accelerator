import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

class TrendChartLine extends React.Component {
  constructor(props) {
    super(props);
    if (this.props && this.props.TrendData) {
      let res = this.props.TrendData;

      let categoriesdata = res.map((item) => item['frame_timestamp']);
      let Car = res.map((item) => item['car']);
      let Bus = res.map((item) => item['bus']);
      let Truck = res.map((item) => item['truck']);
      let Motorbike = res.map((item) => item['motorbike']);
      this.state = {
        series: [
          {
            name: 'Car',
            data: Car,
          },

          {
            name: 'Bus',
            data: Bus,
          },
          {
            name: 'Truck',
            data: Truck,
          },

          {
            name: 'Motorbike',
            data: Motorbike,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: [5, 7, 5],
            curve: 'straight',
            dashArray: [0, 8, 5],
          },
          title: {
            text: 'Vechile Trends',
            align: 'left',
          },
          legend: {
            tooltipHoverFormatter: function (val, opts) {
              return (
                val +
                ' - ' +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ''
              );
            },
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6,
            },
          },
          xaxis: {
            categories: categoriesdata,
          },
          tooltip: {
            y: [
              {
                title: {
                  formatter: function (val) {
                    return val + ' (mins)';
                  },
                },
              },
              {
                title: {
                  formatter: function (val) {
                    return val + ' ';
                  },
                },
              },
              {
                title: {
                  formatter: function (val) {
                    return val;
                  },
                },
              },
            ],
          },
          grid: {
            borderColor: '#f1f1f1',
          },
        },
      };
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default TrendChartLine;
