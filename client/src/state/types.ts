  
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
  firstName: Array<string>; 
  lastName: string;
  email: string;
  credentials: Object;
  descriptionIds:Array<string>;
  lineItemIds:Array<string>;
  createdAt: string;
  updatedAt: string;
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
 
