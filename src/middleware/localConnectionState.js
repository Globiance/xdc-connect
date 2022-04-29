import _ from "lodash";

import * as types from "../actions/types";
import {
  ClearConnectionState,
  FormatChainId,
  SetConnectionState,
  SetConnectionStateAddress,
  SetConnectionStateChainId,
} from "../helpers/miscellaneous";

export const LocalConnectionState = (store) => (next) => (action) => {
  if (action.type === types.WALLET_CONNECTED) {
    const { address: wallet, chain_id, loader } = action.payload;
    SetConnectionState({ wallet, loader, chainId: chain_id });
  }

  if (action.type === types.WALLET_DISCONNECTED) {
    ClearConnectionState();
  }

  if (action.type === types.WALLET_CHAIN_CHANGED) {
    let { chain_id } = action.payload;

    chain_id = FormatChainId(chain_id);
    SetConnectionStateChainId({ chainId: chain_id });
  }

  if (action.type === types.WALLET_ADDRESS_CHANGED) {
    let { address } = action.payload;
    if (!_.isUndefined(address)) {
      SetConnectionStateAddress({ wallet: address });
    }
  }

  next(action);
};
