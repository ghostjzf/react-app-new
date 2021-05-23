import React from 'react';
import ReactDOM from 'react-dom';
import { Spin, Row, Col } from 'antd';
import './style.scss';

const Loading = () => {
  return (
    <Row style={{ width: '100%', height: '100%' }} justify="center" align="middle">
      <Col>
        <Spin />
      </Col>
    </Row>
  );
};

function GlobalLoading() {
  return (
    <div id="global-loading">
      <div id="global-loading-content">
        <div className="loader"></div>
      </div>
    </div>
  );
}

Loading.global = function (visible: boolean) {
  const body = document.querySelector('body') as HTMLElement;
  const el = document.createElement('div');
  el.className = 'app-loading-global';
  if (visible) {
    body.appendChild(el);
    ReactDOM.render(<GlobalLoading />, el);
  } else if (visible === false) {
    const removeElCollects = document.getElementsByClassName('app-loading-global') as HTMLCollectionOf<Element>;
    Array.from(removeElCollects).forEach((elment) => {
      document.body.removeChild(elment);
    });
  }
};

export default Loading;
