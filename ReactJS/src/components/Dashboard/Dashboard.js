import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { getAsyncPowerBi, getAsyncPowerBiToken } from '../Services/GetAPI';
import { MsalProvider, MsalContext } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import * as pbi from 'powerbi-client';

const cookies = new Cookies();

class Dashboard extends Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);

    this.state = {
      embedUrl: '',
      token: '',
    };
    //alert(this.props.powerBIEmbedUrl);
  }

  getPoswerBI = async () => {
    const { instance } = this.context;
    let accounts = cookies.get('accounts');

    let request = {
      ...loginRequest,
      account: accounts[0],
    };
    await instance.acquireTokenSilent(request).then((response) => {
      this.setState({
        token: response.accessToken,
      });
    });

    let res = await getAsyncPowerBi(
      `https://api.powerbi.com/v1.0/myorg/reports/75336daa-c388-4cdd-bc4e-cab4d9a2b4d8`,
      this.state.token
    );
    console.log('PowerBI', res);
  };
  componentDidMount() {
    //this.getPoswerBI();
  }

  render() {
    if (cookies.get('token') == null || cookies.get('token') === undefined) {
      return <Redirect to="/" />;
    }

    let embedUrl = this.props.powerBIEmbedUrl;
    if (cookies.get('USER_NAME') !== 'Dev Team') {
      embedUrl = this.props.powerBIEmbedUrl;
    }
    if (this.props.powerBIEmbedUrlID) {
      embedUrl =
        'https://app.powerbi.com/reportEmbed?reportId=50c7d0a6-628a-409e-a7a6-643432a34524&autoAuth=true&filterPanelEnabled=False&pageName=ReportSection448d1f7e04e377060bcd&$filter=Vehicletrend/videoID eq ' +
        this.props.powerBIEmbedUrlID;
    }
    const { Data, token } = this.state;
    return (
      <>
        {/* {this.props.powerBIEmbedUrlID ? ( */}
        <iframe
          id="test"
          name="test"
          width="1000"
          height="400"
          frameBorder="0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          className="reportContainner"
          title="Chart"
          src="./Vforward/dist/examples/elephantsdream/index.html"
          allowFullScreen="true"
        ></iframe>
        {/* ) : null} */}

        {/* 
<PowerBIEmbed
	embedConfig = {{
		type: 'report',  
		id: Data.id,
		embedUrl: Data.embedUrl,
		accessToken: undefined,
		tokenType: models.TokenType.Aad,
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: false
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = { 
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}]
		])
	}
		
	cssClassName = { "reportContainner" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}
/> */}
      </>
    );
  }
}

export default Dashboard;
