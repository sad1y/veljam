import styled from 'styled-components';

interface IRulerProps {
  size: number;
}

const RulerLine = styled.div`
  position: absolute;
  border: 1px solid #999;
  background-color: #eee;
  overflow: hidden;
  white-space: nowrap;

  .inner {
    height: 100%;
    background-color: #eee;
    > div {
      position: relative;
    }
    div {
      display: inline-block;
      position: relative;

      &:after {
        content: ' ';
        position: absolute;

        background-color: #999;
      }

      i {
        display: inline-block;
        box-sizing: border-box;
        font-style: normal;
        border: 0 solid #999;
        font-size: 10px;
      }

      label {
        vertical-align: top;
        font-size: 10px;
        font-weight: 100;
        position: absolute;
      }
    }
  }
`;

export const LeftRulerLine = styled(RulerLine)`
  left: 0;
  top: ${(props: IRulerProps) => props.size}px;
  width: ${(props: IRulerProps) => props.size}px;
  bottom: 0;
  border-left: 0;
  border-bottom: 0;

  .inner {
    div {
      display: block;

      &:after {
        bottom: 0px;
        width: 100%;
        height: 1px;
      }
    }

    label {
      display: block;
      left: -20px;
      margin-top: 20px;
      transform: rotate(270deg);

      span {
        width: 50px;
        display: inline-block;
        text-align: right;
      }
    }

    i {
      display: block;
      width: 8px;
      right: 0;
      border-bottom-width: 1px;
      margin-left: auto;

      &:last-child {
        border-width: 0;
      }
    }
  }
`;

export const TopRulerLine = styled(RulerLine)`
  top: 0;
  left: ${(props: IRulerProps) => props.size}px;
  right: 0;
  height: ${(props: IRulerProps) => props.size}px;

  border-top: 0;
  border-right: 0;

  .inner {
    height: 100%;
    label {
      padding-left: 2px;
    }
    div {
      height: 100%;
      &:after {
        right: 0px;
        width: 1px;
        height: 100%;
      }

      i {
        border-right-width: 1px;
        margin-bottom: -2px;
        height: 8px;
        vertical-align: bottom;

        &:last-child {
          border-width: 0;
        }
      }
    }
  }
`;
