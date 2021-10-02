type History = {
	date: number;
	income: number;
	expenditure: number;
	difference: number;
	currentBalance: number;
	isActive: boolean;
};

export class AccountingDto {
	month: string;
	beginningBalance: number;
	history: History[];
}
