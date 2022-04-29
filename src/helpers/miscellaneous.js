import { CONNECTION_STATE } from "./constant";
import { IsHex } from "./math";

export const ObjToArr = (obj) => Object.keys(obj).map((key) => obj[key]);

export const FilterStructResp = (obj) =>
  Object.keys(obj)
    .filter((e, i) => {
      if (i < Object.keys(obj).length / 2) return false;
      return true;
    })
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

export const IsJson = (abi) => {
  try {
    JSON.parse(abi);
  } catch (e) {
    return false;
  }
  return true;
};

export const WithTimeout = (
  cb,
  { timeout = 5000, onTimeout = undefined } = {
    timeout: 4999,
    onTimeout: undefined,
  }
) => {
  return new Promise((resolve, reject) => {
    let int = setTimeout(() => {
      if (onTimeout) return resolve(onTimeout);
      reject("timeout");
    }, timeout);

    cb()
      .then((resp) => {
        clearTimeout(int);
        resolve(resp);
      })
      .catch(reject);
  });
};

export const GetBrowser = () => {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") != -1 ||
    !!document.documentMode == true
  ) {
    //IF IE > 10
    return "IE";
  } else {
    return "unknown";
  }
};

export function ClearConnectionState() {
  localStorage.removeItem(CONNECTION_STATE);
}

export function SetConnectionState({ loader, wallet, chainId }) {
  localStorage.setItem(
    CONNECTION_STATE,
    JSON.stringify({
      loader,
      wallet,
      chainId,
    })
  );
}

export function SetConnectionStateChainId({ chainId }) {
  let existing = localStorage.getItem(CONNECTION_STATE);

  if (!existing) return;
  existing = JSON.parse(existing);

  localStorage.setItem(
    CONNECTION_STATE,
    JSON.stringify({
      ...existing,
      chainId,
    })
  );
}

export function SetConnectionStateAddress({ wallet }) {
  let existing = localStorage.getItem(CONNECTION_STATE);
  if (!existing) return;
  existing = JSON.parse(existing);
  localStorage.setItem(
    CONNECTION_STATE,
    JSON.stringify({
      ...existing,
      wallet,
    })
  );
}

export const FormatChainId = (chain_id) => {
  chain_id = `${chain_id}`;

  if (String(chain_id).startsWith("0x") && IsHex(chain_id))
    chain_id = parseInt(chain_id, 16);

  return parseInt(chain_id);
};

Object.defineProperty(Object.prototype, "partialMatch", {
  value: function (fields) {
    for (let key of Object.keys(fields)) {
      if (Object.keys(this).includes(key)) {
        if (this[key] === fields[key]) continue;
        return false;
      } else {
        return false;
      }
    }
    return true;
  },
});

Object.defineProperty(Array.prototype, "includesPartial", {
  value: function (fields) {
    for (let i = 0; i < this.length; i++) {
      const obj = this[i];
      console.log("objobj", obj);
      if (obj.partialMatch(fields)) {
        return i;
      }
    }
    return null;
  },
});
