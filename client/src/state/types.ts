  
export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetLineItemResponse {
  id: string;
  _id: string;
  __v: number;
  date: Number;
  startTime: string;
  stopTime: string;
  rate:number;
  userIds: Array<string>;
  createdAt: string;
  updatedAt: string;
} 

export interface response200 {
  message: string;
}
  
export interface GetUserResponse {
  id: string;
  _id: string;
  __v: number;
  // oauthId: number;
  // accessToken: number;
  // refreshToken: Array<string>;
  firstName: string; 
  lastName: string;
  email: string;
  password: string;
  totalTimeWorked: number;
  descriptionIds:Array<string>;
  lineItemIds:Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface updateTHW {
    userId: string,
    lineItemId: string  ,
}

export interface currentUser {
  rootReducer: any;
  firstName: Array<string>; 
  lastName: string;
  email: string;
  descriptionIds:Array<string>;
  lineItemIds:Array<string>;
  totalTimeWorked: number;
}
export interface lineItems {
  	_id: string,
		startTime: string,
		stopTime: string,
    totalEarnings:Number,
		userIds:Array<string>
		createdAt: string,
		updatedAt:string,
		rate: Number,
		id: string
	}
 

export interface GetDescriptionResponse {
  id: string;
  _id: string;
  __v: number;
  workDescription: string;
  mood: string;
  userIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface clockedOut {
 	userId:String,
	lineItemId:String,
	stopTime:String
}
export interface clockIn {
 	userId:String,
	lineItemId:String,
	startTime:String
}
 
export interface createLineItem {
  id:string;
  rate:string;
  date: Number;
  startTime:String
}
