import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { Accounting, AccountingSchema } from './schemas/accounting.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Accounting.name, schema: AccountingSchema }]),
		ScheduleModule.forRoot(),
	],
	controllers: [AccountingController],
	providers: [AccountingService],
})
export class AccountingModule {}
