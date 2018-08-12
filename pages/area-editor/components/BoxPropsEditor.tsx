import * as React from 'react';
import { PropsEditorForm } from './styles';
import AutoUpdateInput from './AutoUpdateInput';
import TagsEditor from './TagsEditor';

interface BoxPropsEditorProps {
  box: IAreaObject;
  onUpdate: (patch: Partial<IAreaObject>) => any;
}

class BoxPropsEditor extends React.Component<BoxPropsEditorProps> {
  render() {
    const { box, onUpdate } = this.props;

    if (!box) return null;

    return (
      <PropsEditorForm>
        <label>color:</label>
        <AutoUpdateInput name="color" value={box.color} onUpdate={onUpdate} />
        <label>tags:</label>
        <TagsEditor name="tags" tags={box.tags} onUpdate={onUpdate} />
      </PropsEditorForm>
    );
  }
}

export default BoxPropsEditor;
