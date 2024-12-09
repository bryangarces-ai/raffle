// environment.ts (Development)
export const environment = {
    production: false,
    //local
    //apiUrl: 'https://localhost:7021/api',
    //server
    // apiUrl: 'https://172.16.0.37/api',
    //server
     apiUrl: 'http://davnorsystems.gov.ph:7339/RAFFLEAPI/api',
    featureFlags: {
      newFeatureEnabled: true,
    },
    loggingLevel: 'debug',
  };