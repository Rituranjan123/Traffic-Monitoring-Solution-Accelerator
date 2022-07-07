import React from 'react';
import SnackbarError from '../common/SnackbarError';
import SnackbarSuccess from '../common/SnackbarSuccess';
import './CameraAdd.css';
import {
  Button,
  Col,
  Form,
  Row,
  Modal,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import { formatDateMMDDYY, postApiWithoutReqAsyn } from '../Services/PostAPI';
import CreateParent from '../Store/components/CreateParent';
import Cookies from 'universal-cookie';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

const cookies = new Cookies();
let istSearchList = '';
class CameraGrid extends CreateParent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      typeofassets: 'CameraGrid ',
      typeofassetsdisplay: 'CameraGrid',
      errorBoll: false,
      legalBoll: false,
      errorMessage: '',
      successMessage: '',
      Data: [],
      PageNumber: 1,
      PageSize: 10,
      pageCount: 0,
      deleteModal: false,
      itemtodelete: '',
      search: '',
      MenuData: [],
    };
  }

  handleChange = (val, name) => {
    this.setState((prevState) => {
      let { typeofassets, typeofassetsdisplay } = prevState;
      typeofassets = val;
      typeofassetsdisplay = name.name;

      return { typeofassets, typeofassetsdisplay };
    });
  };
  getCameraGrid = async () => {
    const { PageNumber, PageSize } = this.state;
    let reqData = {
      PAGE_NUMBER: PageNumber,
      PAGE_SIZE: PageSize,
    };
    let APIPost = '/Camera/GetAllCameraDetails';

    let result = await postApiWithoutReqAsyn(APIPost, reqData);
    this.setState({ Data: result });
  };
  async componentDidMount() {
    this.getCameraGrid();
  }

  render() {
    const { Data, search, PageNumber, PageSize, deleteModal } = this.state;
    const {
      legalBoll,
      pageCount,
      errorBoll,
      errorMessage,
      successMessage,
      MenuData,
    } = this.state;
    return (
      <div>
        <SnackbarError errorBoll={errorBoll} errorMessage={errorMessage} />

        <SnackbarSuccess
          legalBoll={legalBoll}
          successMessage={successMessage}
        />
        {/*<div className="pagetitle">Camera Grid</div> */}

        <div className="databox">
          <h2></h2>

          <div className="securitiesTablegrid">
            <div className="listtopbar">
              <div className="other">camera Name</div>
              <div className="other">Ip Address</div>
              <div className="other">state</div>
              <div className="other">city</div>
              <div className="other">latitude</div>
              <div className="other">longitude</div>
            </div>

            {Data.map((item) => (
              <div className="listdata" key={item.cameraId}>
                <div className="other">{item.cameraIp}</div>
                <div className="other">{item.iP_Address}</div>
                <div className="other">{item.state}</div>
                <div className="other" style={{ paddingLeft: '35px' }}>
                  {item.city}
                </div>
                <div className="other" style={{ paddingLeft: '35px' }}>
                  {item.latitude}
                </div>
                <div className="other" style={{ paddingLeft: '35px' }}>
                  {item.longitude}
                </div>

                <div className="action" style={{ paddingLeft: '100px' }}>
                  <div className="edit">
                    <Link to={{ pathname: `/UpdateCamera/${item.cameraId}` }}>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="paginationData">
              <div className="leftpage">
                <div className="showing">
                  <span>Showing: </span>
                  {PageSize * PageNumber + 1 - PageSize} -
                  {PageSize > istSearchList
                    ? istSearchList
                    : PageSize * PageNumber > istSearchList
                    ? istSearchList
                    : PageSize * PageNumber}{' '}
                  <span> of</span> {istSearchList} <span>Currency</span>{' '}
                </div>

                <div className="rowperpage">
                  <Form.Group>
                    <Form.Label>Items per page:</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.handleResultperpage}
                      name="PageSize"
                      value={PageSize}
                    >
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>50</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>

              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />

              <div className="clr"></div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CameraGrid;
