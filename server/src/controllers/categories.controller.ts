import { CategoriesService } from "./../providers/categories.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateCategoriesDto } from "./../models/dtos/create-categories.dto";
import { CategoriesRepository } from "./../models/repositories/categories.repository";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	@Get("get/all")
	getCategories() {
		return this.categoriesService.getCategories();
	}

	@Post("create/category")
	createProduct(@Body() body: CreateCategoriesDto) {
		return this.categoriesService.createCategory(body);
	}
}
