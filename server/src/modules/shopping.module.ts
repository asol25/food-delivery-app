import { ShoppingController } from "./../controllers/shopping.controller";
import { Module } from "@nestjs/common";
import { ShoppingCartRepository } from "./../models/repositories/shopping-cart.repository";
import { ShoppingService } from "./../providers/shopping.service";

@Module({
	controllers: [ShoppingController],
	providers: [ShoppingService, ShoppingCartRepository],
})
export class ShoppingModule {}
