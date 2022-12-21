import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Categories } from "src/models/tables/categories";
import { CreateCategoriesDto } from "./../models/dtos/create-categories.dto";
import { CategoriesRepository } from "./../models/repositories/categories.repository";

@Injectable()
export class CategoriesService {
	logger: Logger;
	constructor(private categoriesRepository: CategoriesRepository) {
		this.logger = new Logger(CategoriesRepository.name);
	}

	async getCategories(): Promise<Categories[]> {
		try {
			const categories: Categories[] =
				await this.categoriesRepository.getCategories();

			if (!Array.isArray(categories) || categories.length == 0) {
				throw new NotFoundException("No data");
			}
			return categories;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
	async createCategory(createCategoriesDto: CreateCategoriesDto) {
		try {
			const categories: Categories =
				await this.categoriesRepository.createCategory(createCategoriesDto);
			return categories;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}
}
