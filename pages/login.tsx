import LogIn from '~common/components/Login';
import { Viewer } from '~types/globalTypes';

interface Props {
  setViewer: (viewer: Viewer) => void;
}
function LoginPage({ setViewer }: Props) {
  return <LogIn setViewer={setViewer} />;
}

export default LoginPage;
