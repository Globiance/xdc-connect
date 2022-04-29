import _ from "lodash";

import * as types from "../actions/types";
import * as actions from "../actions";
import { VALID_CHAINS } from "../helpers/constant";
import { IsHex } from "../helpers/math";
import { FormatChainId } from "../helpers/miscellaneous";

export const NetworkValidation = (store) => (next) => (action) => {
  next(action);

  if (types.WALLET_CONNECTED === action.type) {
    const { address } = action.payload;
    if (_.isUndefined(address)) store.dispatch(actions.WalletDisconnected());
    else {
      let { chain_id } = action.payload;
      if (!_.isUndefined(chain_id)) {
        chain_id = FormatChainId(chain_id);

        if (VALID_CHAINS.includes(chain_id)) {
          store.dispatch(actions.NetworkValid());
        } else {
          console.log("invalid network");
          store.dispatch(actions.NetworkInValid());
        }
      }
    }
  }

  if (action.type === types.WALLET_CHAIN_CHANGED) {
    let { chain_id } = action.payload;

    chain_id = FormatChainId(chain_id);
    if (VALID_CHAINS.includes(chain_id)) {
      store.dispatch(actions.NetworkValid());
    } else {
      console.log("invalid network");
      store.dispatch(actions.NetworkInValid());
    }
  }
};
