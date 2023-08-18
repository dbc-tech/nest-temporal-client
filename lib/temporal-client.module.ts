import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TEMPORAL_CLIENT } from './constants';
import { TemporalClientConfig } from './temporal-client.config';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} from './temporal-client.module-definition';
import { createClient } from './utils';

@Module({})
export class TemporalClientModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const provider: Provider = {
      provide: TEMPORAL_CLIENT,
      useValue: createClient(options),
    };

    return {
      global: true,
      module: TemporalClientModule,
      providers: [provider],
      exports: [provider],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const provider: Provider = {
      provide: TEMPORAL_CLIENT,
      inject: options.inject,
      useFactory: (options?: TemporalClientConfig) => createClient(options),
    };

    return {
      global: true,
      module: TemporalClientModule,
      imports: options.imports,
      providers: [provider],
      exports: [provider],
    };
  }
}
