import _ from "lodash";

import * as types from "../actions/types";
import {
  ClearConnectionState,
  SetConnectionState,
} from "../helpers/miscellaneous";

export const LocalConnectionState = (store) => (next) => (action) => {
  console.log(action);
  if (action.type === types.WALLET_CONNECTED) {
    const { address: wallet, chain_id, loader } = action.payload;
    SetConnectionState({ wallet, loader, chainId: chain_id });
  }

  if (action.type === types.WALLET_DISCONNECTED) {
    ClearConnectionState();
  }

  next(action);
};
