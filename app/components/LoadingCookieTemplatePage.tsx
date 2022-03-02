import { Layout, Spin } from 'antd';

import NavBlank from '~layouts/default/NavBlank';

const { Content } = Layout;
const LoadingCookieTemplatePage = () => {
  return (
    <>
      <NavBlank />
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    </>
  );
};

export default LoadingCookieTemplatePage;
