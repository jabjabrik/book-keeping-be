import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class History {
	@Prop({ type: Number, required: true, unique: true })
	date: number;

	@Prop({ type: Number, required: true })
	income: number;

	@Prop({ type: Number, required: true })
	expenditure: number;

	@Prop({ type: Number, required: true })
	difference: number;

	@Prop({ type: Number, required: true })
	currentBalance: number;

	@Prop({ type: Boolean, required: true })
	isActive: boolean | string | number;
}
