import * as React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FoodIcon from "../../img/favorite_food_icon.png";
import { IProducts } from "../../services/types/products";
import CircularUnderLoad from "../CircularUnderLoad";
import FoodProducts from "./_FoodProducts";

interface IFoodContainerProps {
	title: string;
	products: IProducts[];
}

const FoodContainer: React.FunctionComponent<IFoodContainerProps> = (props) => {
	const { title, products } = props;
	return (
		<>
			<section className="section">
				<div className=" bg-orange-100 px-4 py-1 rounded-full w-fit flex items-center gap-2 section-container ">
					<h1 className="capitalize text-base text-orange-500 font-semibold">
						{title} food
					</h1>
					<img
						className="w-8 h-8 object-contain rounded-full"
						src={FoodIcon}
						alt="_food_icon"
					/>
				</div>

				{/* Desktop */}
				<Swiper
					slidesPerView={5}
					spaceBetween={20}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="mySwiper hidden md:block"
				>
					{products.length > 0 ? (
						products.map((product: IProducts) => (
							<SwiperSlide key={product.id}>
								<FoodProducts product={product} />
							</SwiperSlide>
						))
					) : (
						<CircularUnderLoad />
					)}
				</Swiper>

				{/* Mobile */}
				<Swiper
					spaceBetween={30}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="mySwiper block md:hidden"
				>
					{products.length > 0 ? (
						products.map((product: IProducts) => (
							<SwiperSlide key={product.id}>
								<FoodProducts product={product} />
							</SwiperSlide>
						))
					) : (
						<CircularUnderLoad />
					)}
				</Swiper>
			</section>
		</>
	);
};
export default FoodContainer;
