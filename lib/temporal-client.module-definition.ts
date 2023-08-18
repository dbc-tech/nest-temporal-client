import { ConfigurableModuleBuilder } from '@nestjs/common';
import { TemporalClientConfig } from './temporal-client.config';

export const { ConfigurableModuleClass, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<TemporalClientConfig>()
    .setClassMethodName('forRoot')
    .build();
