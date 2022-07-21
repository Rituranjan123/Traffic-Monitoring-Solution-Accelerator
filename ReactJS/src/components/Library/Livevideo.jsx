import React, { Fragment } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  formatDateMMDDYY,
  postApiWithoutReqAsyn,
  postApiFileUploadWithoutReqAsyn,
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

  getUpdate = async () => {
    let reqData = {};

    if (this.props.match) {
      if (this.props.match.params.id) {
        reqData = {
          ID: this.props.match.params.id,
        };
        let res = await postApiWithoutReqAsyn(
          '/Video/GetVideoByID',
          reqData.ID
        );
        await this.getPowerBIData(reqData.ID);
        this.setState({ CameraValue: res });
      }
    }
  };

  getPowerBIData = async (id) => {
    let VideoID = { VideoID: id };
    const { initinalFormFill } = this.state;
    let res = await getApiBodyWithoutReqAsyn('/Vehicletrend/' + id, VideoID);
    var res1 = res;
    initinalFormFill['TrendData'] = res;
    res = await getApiBodyWithoutReqAsyn('/TrafficAnalysis/' + id, VideoID);
    var res1 = res;
    initinalFormFill['MonitorData'] = res;
    this.setState({ initinalFormFill: initinalFormFill });
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

  EditVideo = async () => {
    const { CameraValue } = this.state;
    //this.setState({ item: event });
    this.handleModalClose();
  };
  DeleteVideo = async () => {
    const { CameraValue } = this.state;
    var video = {};
    var UIValues = await postApiWithoutReqAsyn(
      '/Video/DeleteFileBlobAPI',
      CameraValue
    );
    var Msg = 'Record(s) Delete Successfully';
    this.parenthandelMessage(Msg, 'legalBoll');
  };

  handleSeachableDropdonw = async (val, name) => {
    const { initinalFormFill, CameraValue } = this.state;
    if (name === 'State') {
      var state = { statename: val };
      let result = await GetDropdownpost('/USCity/GetCity', val, 'city');
      initinalFormFill['city'] = result.city;
    }
    if (name === 'City') {
      var cameraDetails = { state: CameraValue.State, city: val };
      let result = await GetDropdownpost(
        '/Camera/GetCameraByCity',
        cameraDetails,
        'CameraIp'
      );
      initinalFormFill['CameraIp'] = result.CameraIp;
    }
    if (name === 'CameraIp') {
      var cameraDetails = {
        state: CameraValue.State,
        city: CameraValue.City,
        CameraIp: val,
      };
      let result = await postApiWithoutReqAsyn(
        '/Video/GetCameraVideo',
        cameraDetails,
        'CameraIp'
      );

      CameraValue.processSasURL = ''; //undefined;
      CameraValue['processSasURL'] = result.processSasURL;
    }
    CameraValue[name] = val;

    this.setState(
      { CameraValue: CameraValue, initinalFormFill: initinalFormFill },
      () => console.log('a')
    );
    // alert('aa'))
  };
  async componentDidMount() {
    await this.getUpdate();
    const script = document.createElement('script');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    script.type = 'text/javascript';
    script.src =
      'https://www.bing.com/api/maps/mapcontrol?key=AuU1ciWa-v2D4MXrLhXxgbVY6676TOmemFJ3LpCO52P5Mnx8_KIdez1M7G2j0ZIN'; // + this.props.apiKey;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    setTimeout(
      () =>
        (script.onload = function () {
          window.addEventListener('load', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            window.getMediaPlayer();
          });
          // window.GetMap();
        }),
      0
    );
  }
  handleModalClose = async () => {
    this.setState((prevState) => {
      let { show, item } = prevState;
      show = prevState.show === false ? true : false;
      if (show === false) {
        item = '';
      }
      return {
        show,
        item,
      };
    });
    await this.getAllVidoe();
  };
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