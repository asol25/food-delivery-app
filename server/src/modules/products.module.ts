import { ProductsRepository } from "./../models/repositories/products.repository";
import { ProductsService } from "./../providers/products.service";
import { Module } from "@nestjs/common";
import { ProductsController } from "src/controllers/products.controller";

@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ProductsRepository],
	exports: [ProductsService],
})
export class ProductsModule {}
