import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  formatDateMMDDYY,
  postApiWithoutReqAsyn,
  postApiFileUploadWithoutReqAsyn,
  postApiWithoutReqAsynNoLoader,
  checkEditRights,
} from '../Services/PostAPI';
import DatePicker from 'react-datepicker';
import { UILabel, PageURL } from './typeofassets';
import { SetRefDate } from '../Store/GetDropdown';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import { getMenuData } from '../Services/MenuAccess';
import SelectSearch from 'react-select-search';
import { GetDropdown, GetDropdownpost } from '../Store/GetDropdown';
import editImg from '../../images/edit_video.png';
import deleteImg from '../../images/delete_video.png';
import { Link } from 'react-router-dom';
import { FormLabel } from '../DataEntryFormLabel';
import TrendChartLine from './TrendChartLine';
import VechileMoniterChart from './VechileMoniterChart';
import Dashboard from '../Dashboard/Dashboard';
import { getApiBodyWithoutReqAsyn, getApiBody } from '../Services/GetAPI';
//import { Iframe2} from './Iframe2'

const cookies = new Cookies();

class Livevideo extends CreateParent {
  constructor(props) {
    super(props);
    this.EditVideo = this.EditVideo.bind(this);
    this.intervel = null;
    this.state = {
      iframe_key: 0,
      iframe_url: './powerbiReport2.html', //Your URL here
      UIValues: {
        cameraVideo: {
          processSasURL:
            'https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/cam04.mp4?sp=r&st=2022-05-31T14:29:07Z&se=2022-10-27T22:29:07Z&sv=2020-08-04&sr=b&sig=UffEjSERsU95h4QdGQYtyMYyoarUlTOf%2FJWOwdGDBGQ%3D',
        },
      },
      initinalFormFill: {},
      formOption: {},
      errors: {},
      CameraValue: {
        processSasURL: '',
      },

      initinalFormFill: {},
    };
    this.handelInit();
  }

  state = { count: 0 };

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState(prevState => {
        return {
          
          count: prevState.count + 1,
        };
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(intervalId);
  }

  handelInit = () => {
    const { UIValues, formOption } = this.state;

    formOption.currentDate =
      cookies.get('REFERENCE_DATE') === undefined
        ? new Date()
        : new Date(cookies.get('REFERENCE_DATE'));
    formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';

    this.setState({ UIValues: UIValues });
  };

  handelMessage = (Message, Boll) => {
    const { formOption } = this.state;
    formOption[Boll] = true;
    formOption['Message'] = Message;
    this.setState(
      {
        formOption: formOption,
      },
      function () {
        setTimeout(
          function () {
            formOption[Boll] = false;
            this.setState({
              formOption: formOption,
            });
          }.bind(this),
          3000
        );
      }
    );
  };

  getUpdate = () => {
    console.log('test');
    let reqData = {};

    if (this.props.match) {
      if (this.props.match.params.id) {
        reqData = {
          ID: this.props.match.params.id,
        };
        this.getPowerBIData(reqData.ID);
        // this.setState({ CameraValue: res });
      }
    }
  };

  getPowerBIData = async (id) => {
    let VideoID = { VideoID: id };
    const { initinalFormFill } = this.state;

    // let res = await getApiBodyWithoutReqAsyn('/Vehicletrend/' + id, VideoID);
    if (window.lastcurrenttimestamp) {
      window.lastcurrenttimestamp = 0;
    }
    let reqData = {
      cameraId: id,
      currenttimestamp: window.lastcurrenttimestamp,
    };
    let res = await postApiWithoutReqAsynNoLoader(
      '/VehicletrendLive/GetBycameraId',
      reqData
    );
    if (res.length > 0) {
      window.lastcurrenttimestamp = res[res.length - 1].current_time;
      //window.TrendData.push(res);
      if (initinalFormFill['TrendData']) {
        let data = initinalFormFill['TrendData'];
        //initinalFormFill['TrendData'] = initinalFormFill['TrendData'].push(res);
        Array.prototype.push.apply(data, res);
        // initinalFormFill['TrendData']=[];
        // this.setState((prevState) => {
        //   // let { initinalFormFill } = prevState;
        //   // prevState.initinalFormFill = initinalFormFill;
        //   // initinalFormFill = initinalFormFill;
        //   return { ...prevState, initinalFormFill:initinalFormFill };
        // });
  
        initinalFormFill['TrendData'] = data;
      } else {
        initinalFormFill['TrendData'] = res;
      }

      // if(initinalFormFill['TrendData'].length>200){
      //   initinalFormFill['TrendData']=[];
      // }

      this.setState((prevState) => {
        let { initinalFormFill } = prevState;
        initinalFormFill = initinalFormFill;
        return { initinalFormFill };
      });

      // this.setState({ initinalFormFill: initinalFormFill });
    }
  };

  // Handle Searchable dropdowns
  handleSeachableDropdonw1 = (val, name) => {
    const { UIValues } = this.state;
    UIValues[name] = val;
    this.setState({
      [UIValues]: UIValues,
    });
  };

  iframeRefresh() {
    var url =
      this.state.iframe_url +
      '&video=' +
      this.state.initinalFormFill['processSasURL'];
    url = './powerbiReport2.html';
    this.setState({
      iframe_key: this.state.iframe_key + 1,
      iframe_url1: url,
      a: this.state.iframe_url,
    });
  }
  getDataMenu = async () => {
    let res = await getMenuData();
    this.setState({
      MenuData: res.GROUP_AUTHORIZATION,
    });
  };


  componentDidMount() {
    const { initinalFormFill } = this.state;

    // initinalFormFill['MonitorData'] =await getApiBodyWithoutReqAsyn('/TrafficAnalysis/' + 17, VideoID);;
    // this.setState({ initinalFormFill: initinalFormFill });
    this.intervel = setInterval(this.getUpdate.bind(this), 10000);
  }
  componentWillUnmount() {
    if (this.setInterval != null) clearInterval(this.intervel);
  }

  render() {
    const {
      UIValues,
      formOption,
      errors,
      MenuData,
      CameraValue,
      initinalFormFill,
      iframe_key,
      iframe_url,
    } = this.state;
    //CameraValue.processSasURL=https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/cam04.mp4?sp=r&st=2022-05-31T14:29:07Z&se=2022-10-27T22:29:07Z&sv=2020-08-04&sr=b&sig=UffEjSERsU95h4QdGQYtyMYyoarUlTOf%2FJWOwdGDBGQ%3D'
    return (
      <div className="databox1">
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '12px 2px',
              }}
            ></div>
            {initinalFormFill.TrendData ? (
              <TrendChartLine
                TrendData={initinalFormFill.TrendData}
              ></TrendChartLine>
            ) : null}
            {initinalFormFill.MonitorData ? (
              <VechileMoniterChart
                MonitorData={initinalFormFill.MonitorData}
              ></VechileMoniterChart>
            ) : null}
          </Col>
        </Row>

        <div className="clr"></div>
      </div>
    );
  }
}

export default Livevideo;
