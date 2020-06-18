import { Radio } from 'antd';
import React, { useState } from 'react';
import './Radio.scss';

// const plainOptions = ["Apple", "Pear", "Orange"];

const transformOptions = (options: any) =>
  options.map((elem: any) => {
    return { label: elem.text, value: elem.id };
  });

function App(props: any) {
  const { options, value, onChange } = props;
  const [state, setState] = useState(value);

  const transformedOptions = transformOptions(options);

  const setValue = (e: any) => {
    onChange(e.target.value);
    setState(e.target.value);
  };

  return (
    <Radio.Group
      options={transformedOptions}
      onChange={setValue}
      value={state}
      className="Radio-Container"
    />
  );
}

export default App;
