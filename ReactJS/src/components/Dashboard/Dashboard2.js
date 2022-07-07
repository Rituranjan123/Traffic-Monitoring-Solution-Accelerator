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

import { SetRefDate } from '../Store/GetDropdown';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import { getMenuData } from '../Services/MenuAccess';
import SelectSearch from 'react-select-search';
import { GetDropdown, GetDropdownpost } from '../Store/GetDropdown';

import { Link } from 'react-router-dom';
import { FormLabel } from '../DataEntryFormLabel';

//import { Iframe2} from './Iframe2'

const cookies = new Cookies();

class Dashboard extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      iframe_key: 0,
      iframe_url: './powerbiReport.html', //Your URL here

      formOption: {},
      errors: {},

      initinalFormFill: {},
    };
    this.handelInit();
  }
  handelInit = () => {
    const { UIValues, formOption } = this.state;

    formOption.currentDate = formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';

    this.setState({ UIValues: UIValues });
  };

  iframeRefresh() {
    var url =
      this.state.iframe_url + '&video=' + this.state.initinalFormFill['sasURL'];
    url =
      'http://localhost:3000/index2.html?video=https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/cam04.mp4?sp=r&st=2022-05-31T14:29:07Z&se=2022-10-27T22:29:07Z&sv=2020-08-04&sr=b&sig=UffEjSERsU95h4QdGQYtyMYyoarUlTOf%2FJWOwdGDBGQ%3D';
    this.setState({
      iframe_key: this.state.iframe_key + 1,
      iframe_url1: url,
      a: this.state.iframe_url,
    });
  }

  async componentDidMount() {}
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
    //CameraValue.sasURL=https://msstorageblob.blob.core.windows.net/microsofttraficmgmt/cam04.mp4?sp=r&st=2022-05-31T14:29:07Z&se=2022-10-27T22:29:07Z&sv=2020-08-04&sr=b&sig=UffEjSERsU95h4QdGQYtyMYyoarUlTOf%2FJWOwdGDBGQ%3D'
    return (
      <div className="datagrid">
        <SnackbarError
          errorBoll={formOption.errorBoll}
          errorMessage={formOption.Message}
        />

        <SnackbarSuccess
          legalBoll={formOption.legalBoll}
          successMessage={formOption.Message}
        />

        <div className="databox">
          <Row>
            <Col md={12}>
              <Fragment>
                <iframe
                  frameBorder="0"
                  allowfullscreen
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  key={this.state.iframe_key}
                  src={this.state.iframe_url}
                >
                  {' '}
                </iframe>

                <button
                  onClick={() => {
                    this.iframeRefresh();
                  }}
                >
                  Refresh
                </button>
              </Fragment>
            </Col>
          </Row>

          <div className="clr"></div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
