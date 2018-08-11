import * as React from 'react';
import { PropsEditorForm } from './styles';
import AutoUpdateInput from './AutoUpdateInput';

interface AreaPropsEditorProps {
  area: IArea;
  onUpdate: (patch: Partial<IArea>) => any;
}

class AreaPropsEditor extends React.Component<AreaPropsEditorProps> {
  render() {
    const { area, onUpdate } = this.props;

    if (!area) return null;

    return (
      <PropsEditorForm>
        <label>name:</label>
        <AutoUpdateInput name="name" value={area.name} onUpdate={onUpdate} />
        <label>width:</label>
        <AutoUpdateInput name="width" type="number" value={area.size.width} onUpdate={onUpdate} />
        <label>height:</label>
        <AutoUpdateInput name="height" type="number" value={area.size.height} onUpdate={onUpdate} />
      </PropsEditorForm>
    );
  }
}

export default AreaPropsEditor;
