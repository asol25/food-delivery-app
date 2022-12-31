import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateFavoriteProductDto } from "./../models/dtos/create-favorite-product.dto";
import { FavoriteProductsService } from "./../providers/favorite-products";

@ApiTags("favorite products")
@Controller("favorite-products")
export class FavoriteController {
	constructor(private favoriteProductsService: FavoriteProductsService) {}

	@Get("get/product/:userId")
	getFavoriteProducts(@Param() param) {
		const { userId } = param;
		return this.favoriteProductsService.getFavoriteProductsByUserID(userId);
	}

	@Post("create/product")
	createProduct(@Body() createFavoriteProductDto: CreateFavoriteProductDto) {
		return this.favoriteProductsService.createProduct(createFavoriteProductDto);
	}

	@Put("update/product")
	deleteProducts(@Body() updateFavoriteProductDto: CreateFavoriteProductDto) {
		return this.favoriteProductsService.updateProducts(
			updateFavoriteProductDto
		);
	}
}
