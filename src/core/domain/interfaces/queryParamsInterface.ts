import { Nulldefined } from '../types/NulldefinedType';

export interface IQueryParams {
	skip: number;
	take: number;
	orderField?: string | Nulldefined;
	toDate?: string | Nulldefined;
	fromDate?: string | Nulldefined;
	isActive?: boolean | true;
	conditionalField?: string | Nulldefined;
}
