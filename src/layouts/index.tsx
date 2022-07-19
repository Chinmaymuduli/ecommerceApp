import {COLORS} from 'configs';
import {useActions} from 'hooks';
import {AlertDialog, Spinner} from 'native-base';
import React from 'react';

export default function AppProvider({children}: {children: JSX.Element}) {
  const closeRef = React.useRef(null);

  const {loading} = useActions(state => state);
  return (
    <>
      <AlertDialog leastDestructiveRef={closeRef} isOpen={loading}>
        <AlertDialog.Content>
          <AlertDialog.Header>Please wait...</AlertDialog.Header>
          <AlertDialog.Body>
            <Spinner size="lg" color={COLORS.cgcolor} />
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
      {children}
    </>
  );
}
