import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { AccountingService } from './accounting.service';

@Controller('accounting')
export class AccountingController {
	constructor(private readonly accountingService: AccountingService) {}

	@Get()
	getAllBalance() {
		return this.accountingService.getAllBalance();
	}

	@Get(':month')
	getBalanceMonthly(@Param('month') month: string) {
		return this.accountingService.getBalanceMonthly(month);
	}

	@Post('update')
	async updateBalanceMonthly(@Query() { month, date, income, expenditure }) {
		// async updateBalanceMonthly(@Body() { month, date, income, expenditure }) {
		return this.accountingService.updateBalanceMonthly(
			month,
			parseInt(date),
			parseInt(income),
			parseInt(expenditure),
		);
	}

	@Post('add')
	async addBalanceMonthly(@Query() { month, date, income, expenditure }) {
		// async addBalanceMonthly(@Body() { month, date, income, expenditure }) {
		return this.accountingService.addBalanceMonthly(
			month,
			parseInt(date),
			parseInt(income),
			parseInt(expenditure),
		);
	}
}
