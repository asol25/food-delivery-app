export interface Sender {
	id: string;
}

export interface Receiver {
	id: string;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	sender: Sender;
	receiver: Receiver;
}
