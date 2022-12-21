import { Module } from "@nestjs/common";
import { CategoriesController } from "./../controllers/categories.controller";
import { CategoriesRepository } from "./../models/repositories/categories.repository";
import { CategoriesService } from "./../providers/categories.service";

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService, CategoriesRepository],
	exports: [CategoriesService],
})
export class CategoriesModule {}
