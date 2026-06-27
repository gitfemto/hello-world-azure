const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

app.http('hello', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'hello',
    handler: async (request, context) => {
        try {
            const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
            const container = client.database('hellodb').container('messages');
            const { resource } = await container.item('1', '1').read();
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: resource?.message ?? 'Hello from Azure!' })
            };
        } catch (err) {
            context.log('Cosmos DB error:', err.message);
            return {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
});
