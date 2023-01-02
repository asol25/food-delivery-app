export interface ICategory {
	id: number;
	name: string;
	thumbnail: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProducts {
	id: number;
	title: string;
	desc: string;
	status?: any;
	thumbnail: string;
	rating: number;
	cost: number;
	sale: number;
	views: number;
	like?: boolean;
	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
	category?: ICategory;
}

export interface IOrder {
	[x: string]: any;
	id: number;
	userId: number;
	productId: number;
	product: IProducts;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
}
