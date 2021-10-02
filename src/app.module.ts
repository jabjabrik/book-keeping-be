import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountingModule } from './accounting/accounting.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			// 'mongodb://127.0.0.1:27017/accounting',
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@accounting.ajilh.mongodb.net/accounting?retryWrites=true&w=majority`,
		),
		AccountingModule,
	],
})
export class AppModule {}
