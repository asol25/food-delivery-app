import * as React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import FoodIcon from '../../img/favorite_food_icon.png';
import FoodProducts from './_FoodProducts';

interface IFoodContainerProps {}

const FoodContainer: React.FunctionComponent<IFoodContainerProps> = () => {
	return (
		<>
			<section className="section">
				<div className=" bg-orange-100 px-4 py-1 rounded-full w-fit flex items-center gap-2">
					<h1 className="capitalize text-base text-orange-500 font-semibold">food</h1>
					<img className="w-8 h-8 object-contain rounded-full" src={FoodIcon} alt="_food_icon"></img>
				</div>

				<Swiper
					slidesPerView={5}
					spaceBetween={20}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="mySwiper"
				>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
					<SwiperSlide>
						<FoodProducts />
					</SwiperSlide>
				</Swiper>
			</section>
		</>
	);
};

export default FoodContainer;
