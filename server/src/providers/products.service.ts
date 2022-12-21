import { GetProductsFilterDto } from "./../models/dtos/get-product-filter.dto";
import { Products } from "./../models/tables/products";
import { ProductsRepository } from "./../models/repositories/products.repository";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ProductsService {
	logger: Logger;
	constructor(private productsRepository: ProductsRepository) {
		this.logger = new Logger(ProductsService.name);
	}

	async getProductsByName(search: GetProductsFilterDto): Promise<Products[]> {
		try {
			const products: Products[] = await this.productsRepository.getProducts(
				search
			);

			if (!Array.isArray(products) || products.length == 0) {
				throw new Error("No data");
			}

			return products;
		} catch (error) {
			this.logger.error(error.message);
		}
	}
}
