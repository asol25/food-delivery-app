import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetProductsFilterDto } from "src/models/dtos/get-product-filter.dto";
import { ProductsService } from "./../providers/products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@Get("search/:search")
	async getProductsByName(@Param() search: GetProductsFilterDto) {
		return await this.productsService.getProductsByName(search);
	}
}
