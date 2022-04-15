// @ts-nocheck

import { useMutation } from '@apollo/react-hooks';

import { LogOut as LogOutData } from '~graphql/mutations/__generated__/LogOut';
import { LOG_OUT } from '~graphql/mutations/mutations';
import { displaySuccessNotification, displayErrorMessage } from '~lib/utils';
import { Viewer } from '~types/globalTypes';

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const LogOutButton = ({ setViewer, children }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        // sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage("Sorry! We weren't able to log you out. Please try again later!");
    },
  });

  const handleLogOut = () => {
    logOut();
  };
  return <div onClick={handleLogOut}>{children}</div>;
};
