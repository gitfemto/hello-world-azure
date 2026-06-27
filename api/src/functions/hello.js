const { app } = require('@azure/functions');

app.http('hello', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'hello',
    handler: async (request, context) => {
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Hello from Azure Functions!' })
        };
    }
});
