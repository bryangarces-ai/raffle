// environment.prod.ts (Production)
export const environment = {
    production: true,
    apiUrl: 'https://172.16.0.37/nutrition/api',
    featureFlags: {
      newFeatureEnabled: false, 
    },
    loggingLevel: 'warn',
  };