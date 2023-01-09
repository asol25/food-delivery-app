/* eslint-disable @typescript-eslint/no-var-requires */
import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import * as moment from "moment";

@ApiTags("payment")
@Controller("payment")
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post("create/payment/checkout")
	create(@Body() createPaymentDto: CreatePaymentDto, @Req() req) {
		const ipAddr =
			req.headers["x-forwarded-for"] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
		console.log(createPaymentDto);

		const secretKey = String(process.env.PAYMENT_SECRET_KEY);
		let vnpUrl = process.env.PAYMENT_URL;
		const time = moment().format("YYYYMMDDHHmmss");

		const currCode = "VND";
		let vnp_Params = {};
		vnp_Params["vnp_Version"] = "2.1.0";
		vnp_Params["vnp_Command"] = "pay";
		vnp_Params["vnp_TmnCode"] = String(process.env.PAYMENT_CODE);
		vnp_Params["vnp_Locale"] = createPaymentDto.language;
		vnp_Params["vnp_CurrCode"] = currCode;
		vnp_Params["vnp_TxnRef"] = time;
		vnp_Params["vnp_OrderInfo"] = createPaymentDto.orderInfo;
		vnp_Params["vnp_OrderType"] = "topup";
		vnp_Params["vnp_Amount"] = createPaymentDto.amount;

		vnp_Params["vnp_ReturnUrl"] = createPaymentDto.redirectUri;
		vnp_Params["vnp_IpAddr"] = ipAddr;
		vnp_Params["vnp_CreateDate"] = time;
		if (createPaymentDto.bankCode !== null && createPaymentDto.bankCode !== "") {
			vnp_Params["vnp_BankCode"] = createPaymentDto.bankCode;
		}

		vnp_Params = this.paymentService.sortObject(vnp_Params);

		const querystring = require("qs");
		const signData = querystring.stringify(vnp_Params, { encode: false });
		const crypto = require("crypto");
		const hmac = crypto.createHmac("sha512", secretKey);
		const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

		vnp_Params["vnp_SecureHash"] = signed;
		vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

		return vnpUrl;
	}
}
