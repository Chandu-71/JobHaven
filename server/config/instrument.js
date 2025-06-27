import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: 'https://ef7def00242d49eb152ee13359f556e5@o4509484185878528.ingest.us.sentry.io/4509484210454528',

  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  // tracesSampleRate: 1.0,
});

export default Sentry;
