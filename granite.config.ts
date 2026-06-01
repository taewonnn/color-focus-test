import { router } from '@granite-js/plugin-router';
import { hermes } from '@granite-js/plugin-hermes';
import { appsInToss } from '@apps-in-toss/plugins';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  appName: 'color-focus-test',
  scheme: 'intoss',
  plugins: [
    router(), 
    hermes(), 
    ...appsInToss({
      appType: 'general',
      brand: {
        displayName: '청기백기',
        primaryColor: '#3182F6',
        icon: 'https://static.toss.im/appsintoss/33837/6e73dee2-c778-416a-b6b7-e8b24cc30019.png',
      },
      permissions: [],
      navigationBar: {
        withBackButton: true,
      },
    }),
  ],
});
