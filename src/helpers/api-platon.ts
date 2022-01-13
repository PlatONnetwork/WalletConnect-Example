import axios, { AxiosInstance } from "axios";
import { IAssetData, IParsedTx } from "./types";
// import * as utils from "./utils.min.js";

const api: AxiosInstance = axios.create({
  // baseURL: "http://192.168.120.146:6789",
  baseURL: "/api",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const hrp = window._platon.hrp
export async function apiGetAccountAssets(address: string): Promise<IAssetData[]> {
  address = window.Web3Utils.toBech32Address(hrp, address);
  const response = await api.post("", {
    jsonrpc: "2.0",
    method: "platon_getBalance",
    params: [address, "latest"],
    id: 1,
  });
  const { result } = response.data;
  return result;
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number,
): Promise<IParsedTx[]> {
  const response = await api.get(`/account-transactions?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}

export const apiGetAccountNonce = async (address: string): Promise<string> => {
  address = window.Web3Utils.toBech32Address(hrp, address);
  const response = await api.post("", {
    jsonrpc: "2.0",
    method: "platon_getTransactionCount",
    params: [address, "latest"],
    id: 1,
  });
  const { result } = response.data;
  return result;
};

export const apiGetGasPrices = async (): Promise<string> => {
  const response = await api.post("", {
    jsonrpc: "2.0",
    method: "platon_gasPrice",
    params: [],
    id: 1,
  });
  const { result } = response.data;
  return result;
};
