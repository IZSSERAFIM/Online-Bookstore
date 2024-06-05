import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
const Notice = () => (
  <Alert
    banner
    message={
      <Marquee pauseOnHover gradient={false}>
        用户每下单一次，用户等级提升一级，最高不限
      </Marquee>
    }
  />
);
export default Notice;