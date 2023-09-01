export const ingredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 100,
    carbohydrates: 93,
    calories: 11,
    price: 111,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
}

export const data = [ingredient, ingredient]

export const user = {
    email: 'goirkopf@gmail.com',
    name: 'Ильasdasdsdfsdfsdsdasdasd',
  };

export const error = '';


export const order = {
    ingredients: Array(2), 
    _id: '64ecd46f82e277001bfabd13', 
    owner: user, status: 'done', 
    name: 'Space флюоресцентный бургер', 
    number: 18176, price: 1068
}






export const orderAnswer = {success: true, name: 'Space флюоресцентный бургер', order: order}

export const webSocketAnswer = {
    orders: [order, order],
    total: 9999,
    totalToday: 9090
}