import React from 'react';
import styled from 'styled-components';

const pad = n => (n < 10 ? `0${n}` : n);

const format = t => {
  const hours = t.getUTCHours();
  const minutes = t.getUTCMinutes();
  const seconds = t.getUTCSeconds();
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const Clock = ({ lastUpdate, light }) => {
  return <ClockDisplay className={light ? 'light' : ''}>{format(new Date(lastUpdate))}</ClockDisplay>;
};

const ClockDisplay = styled.div`
  div {
    padding: 15px;
    display: inline-block;
    color: #82fa58;
    font: 50px menlo, monaco, monospace;
    background-color: #000;
  }
  .light {
    background-color: #999;
  }
`;

export default Clock;
