import { IQueryParams } from '../../../core/domain/interfaces/queryParamsInterface';
import { Nulldefined } from '../../../core/domain/types/NulldefinedType';

export class QueryParams implements IQueryParams {
	readonly skip: number;
	readonly take: number;
	readonly orderField: string | Nulldefined;
	readonly valueField?: string;
	readonly toDate: string | Nulldefined;
	readonly fromDate: string | Nulldefined;
	readonly isActive?: boolean;
	readonly conditionalField: string | Nulldefined;
	constructor(params: {
		skip: number;
		take: number;
		orderField?: string | Nulldefined;
		toDate?: string | Nulldefined;
		fromDate?: string | Nulldefined;
		isActive?: boolean;
		conditionalField?: string | Nulldefined;
	}) {
		this.skip = params.skip | 0;
		this.take = params.take | 5;
		this.orderField = params.orderField;
		this.toDate = params.toDate;
		this.fromDate = params.fromDate;
		this.isActive = params.isActive;
		this.conditionalField = params.conditionalField;
	}

	toPrimitives() {
		console.log(this.orderField);
		
		return {
			skip: this.skip,
			take: this.take,
			orderField: null,
			// orderField: this.orderField ? JSON.parse(this.orderField) : { id: 'ASC' },
			toDate: this.toDate,
			fromDate: this.fromDate,
			isActive: this.isActive,
			conditionalField:  null
		};
	}
}
