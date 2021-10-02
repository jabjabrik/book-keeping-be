import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { History } from './history.schema';

export type AccountingDocument = Accounting & mongoose.Document;

@Schema()
export class Accounting {
	@Prop({ required: true })
	month: string;

	@Prop({ required: true })
	beginningBalance: number;

	@Prop()
	history: History[];
}

export const AccountingSchema = SchemaFactory.createForClass(Accounting);
