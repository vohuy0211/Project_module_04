export interface IBook {
  id: number;
  img: string;
  price: number;
  nameBook: string;
  quantity: number;
  author: string;
  description: string;
  category: string;
}

export interface IEditBook {
  id: number;
  img: string;
  price: number;
  nameBook: string;
  quantity: number;
  author: string;
  description: string;
  category: string;
}

export interface OrderItem {
  id: number;
  oderDate: string;
  quantity: number;
  Book: {
    nameBook: string;
  }
  price: number;
  status: number;
  oder: {
    User: {
      username: string;
      address: string;
      phoneNumber: number;
    };
  };
}