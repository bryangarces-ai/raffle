// environment.ts (Development)
export const environment = {
    production: false,
    //local
    //apiUrl: 'https://localhost:7021/api',
    //server
     apiUrl: 'https://172.16.0.37/api',
    featureFlags: {
      newFeatureEnabled: true,
    },
    loggingLevel: 'debug',
  };