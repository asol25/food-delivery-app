import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateProductDto } from "../dtos/create-product.dto";
import { GetProductsFilterDto } from "../dtos/get-product-filter.dto";
import { GetProductsPaginationDto } from "../dtos/get-products-pagination.dto";
import { PaginatedResult } from "../dtos/paginated-result.dto";
import { Products } from "../tables/products";

@Injectable()
export class ProductsRepository extends Repository<Products> {
	constructor(private dataSource: DataSource) {
		super(Products, dataSource.createEntityManager());
	}

	async getProducts(filterDto: GetProductsFilterDto): Promise<Products[]> {
		const { search } = filterDto;
		const query = this.createQueryBuilder("product");

		if (search) {
			query.andWhere("(product.title LIKE :search)", { search: `%${search}%` });
		}

		const products = await query.getMany();
		return products;
	}

	async getProductsWithPagination(
		getProductsPaginationDto: GetProductsPaginationDto
	): Promise<PaginatedResult<Products>> {
		const { page, limit } = getProductsPaginationDto;
		const query = this.createQueryBuilder("product");

		const totalCount = await query.getCount();
		query.leftJoinAndSelect("product.category", "category");
		query.offset((page - 1) * limit);
		query.limit(limit);

		const products = await query.getMany();

		return {
			data: products,
			pagination: {
				totalCount,
				page,
				limit,
			},
		};
	}

	async createProduct(createProductDto: CreateProductDto): Promise<Products> {
		const { title, desc, thumbnail, cost, sale, category } = createProductDto;

		const product = new Products();
		product.title = title;
		product.desc = desc;
		product.thumbnail = thumbnail;
		product.cost = cost;
		product.sale = sale;
		product.categoryId = category;

		try {
			await product.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return product;
	}
}
