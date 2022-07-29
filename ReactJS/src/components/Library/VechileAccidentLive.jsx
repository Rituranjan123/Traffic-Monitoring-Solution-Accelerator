import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class VechileAccidentLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyid: 1,
    }
    
    if (this.props && this.props.MonitorData) {
      let res = this.props.MonitorData;
      // let res2 = [];
      // for (let i = 0; i < res.length; i += 2) {
      //   if (i + 1 < res.length) {
      //     let tAframe_timestamp2 =
      //       res[i].tAframe_timestamp + res[i + 1].tAframe_timestamp;
      //     let taccident2 = res[i].taccident + res[i + 1].taccident;
      //     let t = {};
      //     //t['frame_timestamp']=frame_timestamp2;
      //     t['tAframe_timestamp'] = tAframe_timestamp2;
      //     t['taccident'] = taccident2;

      //     res2.push(t);
      //     // console.log(frame_timestamp2)
      //   }
      // }
      // res = res2;
      let categoriesdata = res.map((item) => item['tAframe_timestamp']);
      //let tAaccident =[0,0,0,0,0,0,0,0,0] //res.map((item) => item['tAccidentStatus']);
      let tAaccident =res.map((item) => item['tAccidentStatus']);
      var labels = [0, 1];
        debugger;
      this.state = {
        options: {
          plotOptions: {
            line: {
            lineWidth: 2,
           // softThreshold: false
            }
           },
         
          series: [
            {
              data: tAaccident,
            },
          ],
            
          chart: {
            type: 'line',          
            plotBorderWidth: 1,
            height: 350,
            // width: auto,
            marginRight: 50,
            marginLeft: 50,
          },
          stroke: {
            curve: 'stepline',
            type: 'line',
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: 'Accident Chart',
            align: 'center',
          },

          yAxis: {
            max: 1,
            labels: {
              formatter: function () {
                return labels[this.pos];
              },
            },
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
   
  getUpdate = () => {
      const {keyid}=this.state;
      if (keyid==1){
       
        this.setState({keyid:0})
      }
  };


  render() {
    console.log('tet'+this.props.keyid);
   // this.setState({keyid:1})
    //this.getUpdate();
    return (
      <div id="chart">
        <HighchartsReact
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
          highcharts={Highcharts}
        />
      </div>
    );
  }
}

export default VechileAccidentLive;
