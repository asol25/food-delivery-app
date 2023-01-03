import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateCategoriesDto } from "../dtos/create-categories.dto";
import { Categories } from "../tables/categories";

@Injectable()
export class CategoriesRepository extends Repository<Categories> {
	constructor(private dataSource: DataSource) {
		super(Categories, dataSource.createEntityManager());
	}

	async getCategories(): Promise<Categories[]> {
		return await this.find();
	}

	async createCategory(createCategoriesDto: CreateCategoriesDto): Promise<Categories> {
		const { name, thumbnail } = createCategoriesDto;

		const category = new Categories();
		category.name = name;
		category.thumbnail = thumbnail;

		try {
			await category.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return category;
	}
}
