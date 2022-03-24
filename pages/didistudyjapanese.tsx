import { Radio } from 'antd';

const DidIStudyJapanesePage = () => {
  return (
    <Radio.Group buttonStyle="solid" defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  );
};

export default DidIStudyJapanesePage;
