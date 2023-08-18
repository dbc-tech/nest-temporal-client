# nest-temporal-client

`nest-temporal-client` provides Nest integration module for Temporal Client.

## Get started

Install the Nest package & Temporal Client:

```bash
npm install @dbc-tech/nest-temporal-client @temporalio/client
```

## Register the module

The easiest way is to register `TemporalClientModule` in the `AppModule` using `forRoot` which works out-of-the-box with Temporal CLI:

```typescript
@Module({
  imports: [
    TemporalClientModule.forRoot({}),
  ]
})
```

However, it's more likely the Temporal Client connections will be provided via a `.env` file, in which case you'll be using `forRootAsync` and `ConfigService`:

```
TEMPORAL_HOST=localhost:7233
TEMPORAL_NAMESPACE=default
TEMPORAL_IDENTITY=nest
```

In which case this can be passed via `ConfigService` using module's `forRootAsync` method:

```typescript
@Module({
  imports: [
    TemporalClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          namespace: config.get('TEMPORAL_NAMESPACE'),
          identity: config.get('TEMPORAL_IDENTITY'),
          connectionOptions: {
            address: config.get('TEMPORAL_HOST'),
          },
        };
      },
    }),
  ]
})
```

The module will be globally registered.

## Using Temporal Client

Once the `TemporalClientModule` is registered, the `Client` service should be available to inject into your services using the special decorator `InjectTemporalClient`:

```typescript
export default class MyService {
  constructor(@InjectTemporalClient() private readonly client: Client) {}

  async start() {
    await this.client.workflow.start('MyWorkflow', {
      args: [],
      taskQueue: 'MyQueue',
      workflowId: `MyWorkflow-123`,
    });
  }
}
```
