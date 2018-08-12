import * as React from 'react';

interface AutoUpdateInputProps {
  value: string | number;
  name: string | number;
  type?: string;
  onUpdate: (obj) => any;
}

interface AutoUpdateInputState {
  text: string | number;
  originValue: string | number;
}

export default class AutoUpdateInput extends React.Component<AutoUpdateInputProps, AutoUpdateInputState> {
  input: HTMLInputElement;
  state = {
    text: '',
    originValue: null
  };

  static getDerivedStateFromProps(nextProps: AutoUpdateInputProps, state: AutoUpdateInputState) {
    return state.originValue !== nextProps.value
      ? {
          text: nextProps.value,
          originValue: nextProps.value
        }
      : null;
  }

  blurHandler = () => {
    if (this.props.value === this.state.text) {
      return;
    }

    this.props.onUpdate({ [this.props.name]: this.state.text });
  };

  changeHandler = () => {
    const text = this.input.value;
    this.setState(() => ({
      text
    }));
  };

  render() {
    return (
      <input
        type={this.props.type || 'text'}
        ref={ref => (this.input = ref)}
        onBlur={this.blurHandler}
        onChange={this.changeHandler}
        value={this.state.text}
      />
    );
  }
}
