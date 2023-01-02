import { OrdersModule } from "./orders.module";
import { FavoriteProductsModule } from "./../models/favorite-products/favorite-products.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "../config/typeorm";
import { AddressesModule } from "./addresses.module";
import { CategoriesModule } from "./categories.module";
import { EmployerModule } from "./employer.module";
import { EventsModule } from "./events.module";
import { MessengerModule } from "./messsenger.module";
import { ProductsModule } from "./products.module";
import { UsersModule } from "./users.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
		EventsModule,
		MessengerModule,
		ProductsModule,
		CategoriesModule,
		UsersModule,
		AddressesModule,
		EmployerModule,
		FavoriteProductsModule,
		OrdersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
