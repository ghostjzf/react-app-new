import React, {useState, useCallback} from 'react';
import {Radio} from "antd"

export default () => {
  const [theme, setTheme] = useState(0);

  const onThemeChange = useCallback((ev) => {
    setTheme(ev.target.value)
  }, [])

  return (
    <div>
      <h3>主题</h3>
      <Radio.Group
        onChange={onThemeChange}
        defaultValue={theme} 
        options={[
        {label: "默认", value: 0}, 
        {label: "自动", value: 1},
        {label: "自定义", value: 2}
      ]} />
      {theme === 2 && <input type="color" />}
    </div>
  );
};
