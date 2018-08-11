import * as React from 'react';
import AutoUpdateInput from './AutoUpdateInput';
import styled from 'styled-components';

interface TagEditorProps {
  onUpdate: (obj) => any;
  tags: string[];
  name: string;
}

export default class TagsEditor extends React.Component<TagEditorProps> {
  newTagInput: HTMLInputElement;

  removeHandler = (index: number) => {
    const tags = this.props.tags;
    const updated = [];

    for (let i = 0; i < tags.length; i++) {
      if (i === index) continue;
      updated.push(tags[i]);
    }

    this.props.onUpdate({ [this.props.name]: updated });
  };

  itemChangedHandler = patch => {
    const tags = this.props.tags;
    const updated = [];
    const hashSet = {};

    for (let i = 0; i < tags.length; i++) {
      const el = patch[i] !== undefined ? patch[i] : tags[i];

      if (!el || hashSet[el]) {
        continue;
      }

      hashSet[el] = true;
      updated.push(el);
    }

    this.props.onUpdate({ [this.props.name]: updated });
  };

  itemAddHandler = e => {
    const tags = this.props.tags;
    const newValue = this.newTagInput.value;

    if (e.keyCode === 13 && newValue && tags.indexOf(this.newTagInput.value) === -1) {
      this.props.onUpdate({ [this.props.name]: [...tags, newValue] });
      this.newTagInput.value = '';
    }
  };

  render() {
    return (
      <div>
        <NewItem innerRef={el => (this.newTagInput = el)} onKeyDown={this.itemAddHandler} />
        <List>
          {this.props.tags.map((f, index) => (
            <li key={f}>
              <AutoUpdateInput name={index} value={f} onUpdate={this.itemChangedHandler} />
              <RemoveIcon onClick={() => this.removeHandler(index)} />
            </li>
          ))}
        </List>
      </div>
    );
  }
}

const RemoveIcon = ({ onClick }) => {
  return (
    <span onClick={onClick} style={{ width: 14, height: 14, cursor: 'pointer' }}>
      &times;
    </span>
  );
};

const NewItem = styled.input`
  border: none;
  border-bottom: 1px solid #bbb;
  padding: 5px;
  outline: 0;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  > li {
    input {
      border: none;
      border-bottom: 1px solid #bbb;
      padding: 5px;
      outline: 0;
    }
  }
`;
