import { UpdateProductsDto } from "./../models/dtos/update-products.dto";
import { CreateProductDto } from "./../models/dtos/create-product.dto";
import { GetProductsFilterDto } from "./../models/dtos/get-product-filter.dto";
import { Products } from "./../models/tables/products";
import { ProductsRepository } from "./../models/repositories/products.repository";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { GetProductsPaginationDto } from "src/models/dtos/get-products-pagination.dto";
import { PaginatedResult } from "src/models/dtos/paginated-result.dto";

@Injectable()
export class ProductsService {
	logger: Logger;
	constructor(private productsRepository: ProductsRepository) {
		this.logger = new Logger(ProductsService.name);
	}

	async getProductsWithPagination(
		getProductsPaginationDto: GetProductsPaginationDto
	): Promise<PaginatedResult<Products>> {
		try {
			const products: PaginatedResult<Products> =
				await this.productsRepository.getProductsWithPagination(
					getProductsPaginationDto
				);

			if (!Array.isArray(products.data) || products.data.length == 0) {
				throw new NotFoundException("No data");
			}

			return products;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}

	async getProductsByViews(): Promise<Products[]> {
		try {
			const row = 0;
			const limit = 10;
			const products: Products[] = await this.productsRepository.find({
				order: {
					views: "asc",
				},
				take: limit,
				skip: row,
			});

			if (!Array.isArray(products) || products.length == 0) {
				throw new NotFoundException("No data");
			}

			return products;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}

	async getProductsByName(search: GetProductsFilterDto): Promise<Products[]> {
		try {
			const products: Products[] = await this.productsRepository.getProducts(
				search
			);

			if (!Array.isArray(products) || products.length == 0) {
				throw new NotFoundException("No data");
			}

			return products;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}

	async createProduct(createProductDto: CreateProductDto) {
		try {
			const product: Products = await this.productsRepository.createProduct(
				createProductDto
			);

			return product;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}

	async updateProduct(updateProductDto: UpdateProductsDto) {
		try {
			const product: Products = await this.productsRepository.updateProduct(
				updateProductDto
			);

			return product;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}
}
