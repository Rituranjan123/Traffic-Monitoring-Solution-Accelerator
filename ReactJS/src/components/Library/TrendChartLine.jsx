import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class TrendChartLine extends React.Component {
  constructor(props) {
    super(props);
  }

  //componentDid
  // state = { count: 0 };

  // componentDidMount() {
  //   const intervalId = setInterval(() => {
  //     this.setState(prevState => {
  //       return {
  //         count: prevState.count + 1,
  //       };
  //     });
  //   }, 10000);
  // }

  // componentWillUnmount(){
  //   clearInterval(intervalId);
  // }

  render() {
    let options = {};

    if (this.props && this.props.TrendData) {
      let res = this.props.TrendData;

      let categoriesdata = res.map((item) => item['frame_timestamp']);
      let Car = res.map((item) => item['car']);
      let Bus = res.map((item) => item['bus']);
      let Truck = res.map((item) => item['truck']);
      let Motorbike = res.map((item) => item['motorbike']);
      this.state = {
        options: {
          // title: {
          //   text: 'My chart'
          // },
          series: [
            {
              name: 'Car',
              type: 'line',
              data: Car,
              color: '#FEB326',
            },

            {
              name: 'Bus',
              type: 'line',
              data: Bus,
              color: '#E84D8A',
            },
            {
              name: 'Truck',
              type: 'line',
              data: Truck,
              color: '#64C5EB',
            },

            {
              name: 'Motorbike',
              type: 'line',
              color: '#7F58AF',
              data: Motorbike,
            },
          ],

          dataLabels: {
            enabled: false,
          },
          chart: {
            type: 'line',
            height: 350,
            marginRight: 50,
            marginLeft: 50,
          },
          stroke: {
            width: [0, 4],
            curve: 'smooth',
            //  dashArray: [0, 0, 0],
          },
          title: {
            text: 'Vehicle Trends',
            align: 'center',
          },
          fill: {
            opacity: 4,
            type: 'solid',
          },
          legend: {
            tooltipHoverFormatter: function (val, opts) {
              return (
                'Second:'+val +
                ' - ' +
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                ''
              );
            },
          },
          markers: {
            size: 0,
            height: 350,
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
            borderColor: '#000',
          },
        },
      };
    }

    return (
      <div id="chart">
        <HighchartsReact
          options={this.state.options}
          // series={this.state.series}
          // type="line"
          width={1200}
          height={450}
          highcharts={Highcharts}
        />
      </div>
    );
  }
}

export default TrendChartLine;
