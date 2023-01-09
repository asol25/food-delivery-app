import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "../config/typeorm";
import { FavoriteProductsModule } from "./../models/favorite-products/favorite-products.module";
import { PaymentModule } from "./../payment/payment.module";
import { AddressesModule } from "./addresses.module";
import { CategoriesModule } from "./categories.module";
import { EmployerModule } from "./employer.module";
import { EventsModule } from "./events.module";
import { MessengerModule } from "./messsenger.module";
import { OrdersModule } from "./orders.module";
import { ProductsModule } from "./products.module";
import { ShoppingModule } from "./shopping.module";
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
		PaymentModule,
		ShoppingModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
