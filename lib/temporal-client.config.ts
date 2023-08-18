import { ConnectionOptions } from '@temporalio/client';

export interface TemporalClientConfig {
  connectionOptions?: ConnectionOptions;
  namespace?: string;
  identity?: string;
}
