export enum EventRole {
	NONE = "there_is_nothing",
	BUY = "customer_buy_order",
	CANCEL = "customer_cancel_order",
	REFUND = "customer_refund_order",
	SCHEDULE = "customer_created_schedule",
	SHIPPER_RETRIEVE = "shipper_retrieve",
	SHIPPER_GOING_TO = "shipper_going_to",
	SHIPPER_SUCCESSFULLY = "shipper_successfully",
}

export enum MessagesType {
	USER = "USER",
	CHANNEL = "EMPLOYEE",
}
