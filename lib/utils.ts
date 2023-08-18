import { Client, Connection } from '@temporalio/client';
import { TemporalClientConfig } from './temporal-client.config';

export async function createConnection(
  config: TemporalClientConfig,
): Promise<Connection> {
  return await Connection.connect(config.connectionOptions);
}

export async function createClient(
  config: TemporalClientConfig,
): Promise<Client> {
  const connection = await createConnection(config);
  return new Client({
    connection,
    namespace: config.namespace,
    identity: config.identity,
  });
}
