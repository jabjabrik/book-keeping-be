import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, Timeout } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Accounting, AccountingDocument } from './schemas/accounting.schema';

@Injectable()
export class AccountingService {
	constructor(
		@InjectModel(Accounting.name)
		private readonly model: Model<AccountingDocument>,
	) {}

	getInfoTime() {
		const current = new Date();
		const month = current.getMonth();
		const year = current.getFullYear();

		const totalDate = new Date(year, month + 1, 0).getDate();
		const currMonth = current.toLocaleString('default', { month: 'long' }).toLowerCase();
		const currDate = current.getDate();
		current.setMonth(month - 1);
		const prevMonth = current.toLocaleString('default', { month: 'long' }).toLowerCase();
		return { currDate, totalDate, currMonth, prevMonth };
	}

	// @Cron('0 0 1 * *', { timeZone: 'Asia/Jakarta' })
	// @Timeout(1000)
	// async createBalanceMonthly() {
	// 	const { prevMonth, currMonth: month, totalDate } = this.getInfoTime();
	// 	try {
	// 		const prevBalance = (await this.model.findOne({ month: prevMonth })).history.slice(-1)[0]
	// 			.currentBalance;
	// 		const accounting = { month, beginningBalance: prevBalance, history: [] };
	// 		for (let i = 1; i <= totalDate; i++) {
	// 			accounting.history.push({
	// 				date: i,
	// 				income: 0,
	// 				expenditure: 0,
	// 				difference: 0,
	// 				currentBalance: 0,
	// 				isActive: false,
	// 			});
	// 		}
	// 		return await this.model.create(accounting);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// @Cron('4 14 * * *', { timeZone: 'Asia/Jakarta' })
	// @Cron('0 1 * * *', { timeZone: 'Asia/Jakarta' })
	@Timeout(1000)
	async activatingStatusDate() {
		try {
			const { currDate, currMonth: month } = this.getInfoTime();
			const accounting = await this.model.findOne({ month: 'september' });
			accounting.history.map((acc) => {
				if (acc.date <= 30) acc.isActive = true;
			});
			await new this.model(accounting).save();
		} catch (error) {
			console.log(error);
		}
	}

	test() {
		return this.getInfoTime();
	}

	getAllBalance() {
		return this.model.find().exec();
	}

	getBalanceMonthly(month: string) {
		return this.model.findOne({ month }).exec();
	}

	async addBalanceMonthly(month: string, date: number, income: number, expenditure: number) {
		try {
			const accounting = await this.model.findOne({ month });
			const { history, beginningBalance } = accounting;
			const difference = income - expenditure;

			for (let i = 0; i < history.length; i++) {
				const currentBalance = (history[i - 1]?.currentBalance || beginningBalance) + difference;
				if (history[i].date === date) {
					if (!history[i].isActive) return { msg: 'failed' };
					history[i] = {
						...history[i],
						income,
						expenditure,
						difference,
						currentBalance,
					};
				}
			}
			// return accounting;
			return await new this.model(accounting).save();
			// return { month, date, income, expenditure, name: 'update' };
		} catch (error) {
			console.log(error);
		}
	}

	async updateBalanceMonthly(month: string, date: number, income: number, expenditure: number) {
		try {
			const accounting = await this.model.findOne({ month });
			const { history, beginningBalance } = accounting;
			const difference = income - expenditure;
			for (let i = 0; i < history.length; i++) {
				const currentBalance = (history[i - 1]?.currentBalance || beginningBalance) + difference;

				if (date > history.length || date < 1) return 'The date entered does not match ';

				if (history[i].date === date) {
					history[i] = { ...history[i], income, expenditure, difference, currentBalance };
				}

				if (history[i].date > date && history[i].isActive && history[i].currentBalance) {
					history[i].currentBalance = history[i - 1].currentBalance + history[i].difference;
				}
			}
			// return accounting;

			return await new this.model(accounting).save();
			// return { month, date, income, expenditure, name: 'update' };
		} catch (error) {
			console.log(error);
		}
	}
}
