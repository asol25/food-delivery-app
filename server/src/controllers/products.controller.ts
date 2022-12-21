import { GetProductsPaginationDto } from "src/models/dtos/get-products-pagination.dto";
import { CreateProductDto } from "./../models/dtos/create-product.dto";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetProductsFilterDto } from "src/models/dtos/get-product-filter.dto";
import { ProductsService } from "./../providers/products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@Get("search/:search")
	getProductsByName(@Param() getProductsFilterDto: GetProductsFilterDto) {
		return this.productsService.getProductsByName(getProductsFilterDto);
	}

	@Get("order/views/")
	getProductsByViews() {
		return this.productsService.getProductsByViews();
	}

	@Get("pagination/:page/:limit")
	getProductsWithPagination(
		@Param() getProductsPaginationDto: GetProductsPaginationDto
	) {
		return this.productsService.getProductsWithPagination(
			getProductsPaginationDto
		);
	}

	@Post("create/product/")
	async createProduct(@Body() createProductDto: CreateProductDto) {
		return this.productsService.createProduct(createProductDto);
	}
}
