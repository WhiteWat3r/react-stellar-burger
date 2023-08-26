export const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  feedUrl: 'wss:/norma.nomoreparties.space/orders/all',
  feedAuthUrl: 'wss://norma.nomoreparties.space/orders',
  
  headers: {
    'Content-Type': 'application/json',
  },
};


// if (wsUrl = 'wss:/norma.nomoreparties.space/orders/all') {
//   socket = new WebSocket(wsUrl)
// } else if (wsUrl = 'wss://norma.nomoreparties.space/orders'){
//   socket = new WebSocket(`${wsUrl}?token=${accessToken}`);

// }