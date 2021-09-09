/* eslint-disable import/extensions */
import React from 'react';
import LogIn from '~views/ui/LogIn';
//import styled from 'styled-components'
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
