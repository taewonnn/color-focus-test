import React, { type PropsWithChildren } from 'react';
import { AppsInToss } from '@apps-in-toss/framework';
import { type InitialProps } from '@granite-js/react-native';
import { context } from '../require.context';
import { ReplayGateProvider } from './context/ReplayGateContext';

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
  return <ReplayGateProvider>{children}</ReplayGateProvider>;
}

export default AppsInToss.registerApp(AppContainer, {
  context,
});
