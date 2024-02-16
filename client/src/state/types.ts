  
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
  date: Date;
  startTime: number;
  stopTime: number;
  totalTimeWorked: number;
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

export interface currentUser {
  rootReducer: any;
  firstName: Array<string>; 
  lastName: string;
  email: string;
  descriptionIds:Array<string>;
  lineItemIds:Array<string>;
  totalTimeWorked: number;
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

export interface clockedIn {
  firstName: string; 
  lastName: string;
  email: string;
  startTime: Date;
  rate: number;
  totalTimeWorked: number;
  descriptionIds:Array<string>;
  lineItemIds:Array<string>;
}
 
export interface createLineItem {
  firstName: string
  startTime:string;
  rate:Number;
  date: string
}
