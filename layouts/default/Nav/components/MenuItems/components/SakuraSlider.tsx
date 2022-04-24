// @ts-nocheck
/* eslint-disable */
import { useState } from 'react';

import { Switch } from 'antd';

export function SakuraSlider() {
  function onChange(checked) {
    checked ? window.sakura.start(true) : window.sakura.stop(true);
  }
  return <Switch onChange={onChange} />;
}
