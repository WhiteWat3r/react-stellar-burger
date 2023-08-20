export type TUser = {
  email: string;
  name: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqueId?: string
};


export type TOrder = {
  number: number
}


export type TCreatedOrder = {
  success: boolean;
  name: string;
  order: TOrder
}

