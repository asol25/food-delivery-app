import { CategoriesModule } from "./categories.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "../config/typeorm";
import { EventsModule } from "./events.module";
import { ProductsModule } from "./products.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
		EventsModule,
		ProductsModule,
		CategoriesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
