import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class TrendChartLine extends React.Component {
  constructor(props) {
    super(props);
    // let res={};
    // res.frame_timestamp=[0,1,2,3,4,5,6,7,8,9,10,11]
    // let res2={};
    // res2['frame_timestamp']=[]
    // for(let i=0;i<res.frame_timestamp.length;i++){
    // if((i+1)<res.frame_timestamp.length){
    // let frame_timestamp2=res.frame_timestamp[i]+res.frame_timestamp[i+1];
    // res2['frame_timestamp'].push(frame_timestamp2);
    // console.log(frame_timestamp2)
    // }
    // }
    if (this.props && this.props.TrendData) {
      let res = this.props.TrendData;
      // let res2 = [];
      // // res2['frame_timestamp']=[]
      // for (let i = 0; i < res.length; i += 2) {
      //   if (i + 1 < res.length) {
      //     let frame_timestamp2 =
      //       res[i].frame_timestamp + res[i + 1].frame_timestamp;
      //     let car2 = res[i].car + res[i + 1].car;
      //     let bus2 = res[i].bus + res[i + 1].bus;
      //     let truck2 = res[i].truck + res[i + 1].truck;
      //     let motorbike2 = res[i].motorbike + res[i + 1].motorbike;

      //     let t = {};
      //     t['frame_timestamp'] = frame_timestamp2;
      //     t['car'] = car2;
      //     t['bus'] = bus2;
      //     t['truck'] = truck2;
      //     t['motorbike'] = motorbike2;
      //     res2.push(t);
      //     console.log(frame_timestamp2);
      //   }
      // }
      // res = res2;
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
                val +
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
  }

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
