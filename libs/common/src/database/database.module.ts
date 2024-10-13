import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})

//to take the models to create it into mongo
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
