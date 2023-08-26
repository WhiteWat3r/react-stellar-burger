export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';




export type TOpenModalAction = {
  readonly type: typeof OPEN_MODAL;
};
export type TCloseModalAction = {
  readonly type: typeof CLOSE_MODAL;
};

export type TModalActions = TOpenModalAction | TCloseModalAction

export const openModal = (): TOpenModalAction => {
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = ():TCloseModalAction => {
  return {
    type: CLOSE_MODAL,
  };
};

