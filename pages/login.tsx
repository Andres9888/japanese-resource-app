/* eslint-disable import/extensions */
import LogIn from '~features/login';
import NavBlank from '~views/components/NavBlank';

function loginPage({ setViewer, viewer }) {
  return (
    <div>
      <NavBlank viewer={viewer} />
      <LogIn setViewer={setViewer} />
    </div>
  );
}

export default loginPage;
