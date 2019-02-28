let testsContext = require.context('./tests/unit', true, /-spec\.js$/);
testsContext.keys().forEach(testsContext);
