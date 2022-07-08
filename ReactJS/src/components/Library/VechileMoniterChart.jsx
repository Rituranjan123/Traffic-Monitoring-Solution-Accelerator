import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

class VechileMoniterChart extends React.Component {
  constructor(props) {
    super(props);

    if (this.props && this.props.MonitorData) {
      let res = this.props.MonitorData;
      let categoriesdata = res.map((item) => item['tAframe_timestamp']);
      let tAaccident = res.map((item) => item['taccident']);

      this.state = {
        series: [
          {
            data: tAaccident,
          },
        ],

        options: {
          chart: {
            type: 'line',
            height: 350,
          },
          stroke: {
            curve: 'stepline',
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: 'Accident Chart',
            align: 'left',
          },
          markers: {
            hover: {
              sizeOffset: 4,
            },
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

export default VechileMoniterChart;
