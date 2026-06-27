const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const container = client.database('hellodb').container('messages');

app.http('hello', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'hello',
    handler: async (request, context) => {
        const { resource } = await container.item('1', '1').read();
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: resource?.message ?? 'Hello from Azure!' })
        };
    }
});
