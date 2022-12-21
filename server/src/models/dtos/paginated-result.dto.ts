export interface PaginatedResult<T> {
	data: T[];
	pagination: {
		totalCount: number;
		page: number;
		limit: number;
	};
}
