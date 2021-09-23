/* eslint-disable import/extensions */
import NavBlank from '~views/components/NavBlank';
import LogIn from '~views/ui/LogIn';

function loginPage({ setViewer, viewer }) {
  return (
    <div>
      <NavBlank viewer={viewer} />
      <LogIn setViewer={setViewer} />
    </div>
  );
}

export default loginPage;
