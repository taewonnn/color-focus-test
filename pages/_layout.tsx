import React, { type PropsWithChildren } from 'react';

function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

RootLayout.screenOptions = {
  headerShown: false,
};

export default RootLayout;
