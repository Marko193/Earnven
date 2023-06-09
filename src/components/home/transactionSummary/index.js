import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StyledNukeOnProgress } from './styles';

class confirmSwap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledNukeOnProgress>
        <div className="swap-loading-container">
          <div className="close-button">
            <svg
              onClick={this.props.closeModal}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="svg-token">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="loading-spinner">
            <Spinner
              animation="border"
              style={{ width: '100px', height: '100px' }}
              variant="primary"
            />
          </div>
          <div className="confirmation-header">Transaction on Progress...</div>
          <div className="swapping-content">
            Swapping tokens for {`${this.props.value} ${this.props.targetToken}`}
          </div>
          <div className="wallet-confirm">Confirm this transaction in your wallet</div>
        </div>
      </StyledNukeOnProgress>
    );
  }
}

confirmSwap.propTypes = {
  closeModal: PropTypes.any,
  value: PropTypes.any,
  targetToken: PropTypes.string,
};

export default confirmSwap;
