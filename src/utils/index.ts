/**
 * Copyright 2020 EMIT Foundation.
 This file is part of E.M.I.T. .

 E.M.I.T. is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 E.M.I.T. is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with E.M.I.T. . If not, see <http://www.gnu.org/licenses/>.
 */

import BigNumber from 'bignumber.js'
import {
    BRIDGE_CURRENCY, BRIDGE_NFT,
    CONTRACT_ADDRESS,
    DECIMAL_CURRENCY,
    DISPLAY_NAME,
    EXPLORER_URL,
    FULL_NAME,
    GAS_DEFAULT,
    GAS_PRICE_UNIT,
    META_TEMP,
    NOT_CROSS_TOKEN
} from "../config"
import {Attribute, ChainId, ChainType, DeviceMode, GasPriceLevel, MetaInfo, NftInfo} from "../types";
import rpc from "../rpc";
import * as utils from "../utils"

export function ellipsisStr(v: string,num?:number,left?:number,right?:number) {
    if (!v) return ""
    if(!num){
        num = 7
    }
    if(left && right){
        return v.slice(0,left) + "..."+v.slice(v.length-right,v.length);
    }
    if (v.length >= 15) {
        return v.slice(0, num) + " ... " + v.slice(v.length - num, v.length);
    }
    return v
}

export function arrayToObject(arr: Array<any>) {
    const ret: any = {};
    for (let o of arr) {
        ret[o.currency] = o.value;
    }
    return ret
}

export function formatValueString(value:string|BigNumber|number|undefined,fix:number = 3):string {
    if(!value){
        return "0"
    }
    return nFormatter(fromValue(value,18),fix)
}
export function fromValue(value: string | BigNumber | number | undefined, decimal: number): BigNumber {
    if (!value) {
        return new BigNumber(0)
    }
    return new BigNumber(value).dividedBy(10 ** decimal)
}

export function toValue(value: string | BigNumber | number, decimal: number): BigNumber {
    if (!value) {
        return new BigNumber(0)
    }
    return new BigNumber(value).multipliedBy(10 ** decimal)
}

export function getCyDecimal(cy: string, chainName: string): number {
    try {
        if (!cy || !chainName) {
            return 18
        }
        return DECIMAL_CURRENCY[chainName][cy];
    } catch (e) {
        console.log(e)
    }
    return 18
}

export function needApproved(chain: ChainType) {
    if (ChainType.ETH == chain || ChainType.TRON == chain || ChainType.BSC == chain) {
        return true
    }
    return false;
}

export function getDestinationChainID(chain: ChainType) {
    if (chain == ChainType.TRON) {
        return ChainId.TRON
    } else if (chain == ChainType.ETH) {
        return ChainId.ETH
    } else if (chain == ChainType.SERO) {
        return ChainId.SERO
    } else if (chain == ChainType.BSC) {
        return ChainId.BSC
    }
    return ChainId._
}

export function getResourceId(cy: string, from: string, to: string) {
    return BRIDGE_CURRENCY[cy][from]["RESOURCE_ID"][to];
}

export function getNFTResourceId(symbol: string,from:string,to:string) {
    return BRIDGE_NFT[symbol][from]["RESOURCE_ID"][to];
}

export function getCrossTargetAddress(fromChain:ChainType,resourceId: string, destinationChainID: any) {
    const symbols = Object.keys(BRIDGE_NFT)
    for (let symbol of symbols) {
        if (BRIDGE_NFT[symbol][ChainType[fromChain]]["RESOURCE_ID"][ChainId[destinationChainID]] == resourceId) {
            return CONTRACT_ADDRESS.ERC721[symbol]["ADDRESS"][ChainId[destinationChainID]]
        }
    }
    return ""
}

export function getCyName(cy: string, chain: string): string {
    try {
        return BRIDGE_CURRENCY[cy][chain]["CY"];
    } catch (e) {
        console.log(e)
    }
    return ""
}

export function getChainIdByName(chain: string): any {
    for (let key in ChainType) {
        if (ChainType[key] === chain) {
            return key;
        }
    }
    return ChainType._
}

export function getDestinationChainIDByName(chain: string): any {
    for (let key in ChainId) {
        if (ChainId[key] === chain) {
            return key;
        }
    }
    return ChainId._
}

export function toHex(value: string | number | BigNumber, decimal?: number) {
    if (value === "0x") {
        return "0x0"
    }
    if (decimal) {
        return "0x" + toValue(value, decimal).toString(16);
    }
    return "0x" + new BigNumber(value).toString(16)
}

export function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export function defaultGas(chain: ChainType) {
    return GAS_DEFAULT[ChainType[chain]]
}

export function gasUnit(chain: ChainType) {
    return GAS_PRICE_UNIT[ChainType[chain]]
}

export function getCyType(chain: string, cy: string) {
    return BRIDGE_CURRENCY[cy][chain]["CY_TYPE"];
}

export function getCyDisplayName(key: string) {
    if (DISPLAY_NAME[key]) {
        return DISPLAY_NAME[key]
    } else {
        return key;
    }
}

export function getCrossEventStatus(status: string) {
    //{Inactive, Active, Passed, Executed, Cancelled}
    if (status == "1") {
        return "Active"
    } else if (status == "2") {
        return "Passed"
    } else if (status == "3") {
        return "Executed"
    } else if (status == "4") {
        return "Cancelled"
    } else {
        return "Deposited"
    }
}

export function getExplorerTxUrl(chain: ChainType, hash: string) {
    if (chain == ChainType.ETH) {
        if (new Date().getTimezoneOffset() / 60 == -8) {
            return `${EXPLORER_URL.TRANSACTION.ETH.CN}${hash}`
        } else {
            return `${EXPLORER_URL.TRANSACTION.ETH.EN}${hash}`
        }
    }
    return EXPLORER_URL.TRANSACTION[ChainType[chain]] + hash
}

export function getExplorerBlockUrl(chain: ChainType, hash: string, num: number) {
    if (chain == ChainType.ETH) {
        if (new Date().getTimezoneOffset() / 60 == -8) {
            return `${EXPLORER_URL.BLOCK.ETH.CN}${num}`
        } else {
            return `${EXPLORER_URL.BLOCK.ETH.EN}${num}`
        }
    }
    return EXPLORER_URL.BLOCK[ChainType[chain]] + num
}

export function getEthCyByContractAddress(address: string) {
    const keys = Object.keys(CONTRACT_ADDRESS.ERC20.ETH);
    // const keys2 = Object.keys(CONTRACT_ADDRESS.CROSS.ETH);
    // const keys = keys1.concat(keys2);
    for (let key of keys) {
        if (CONTRACT_ADDRESS.ERC20.ETH[key] && CONTRACT_ADDRESS.ERC20.ETH[key].toLowerCase() == address.toLowerCase()) {
            return key
        }
        // if(CONTRACT_ADDRESS.CROSS.ETH[key] && CONTRACT_ADDRESS.CROSS.ETH[key].toLowerCase() == address.toLowerCase()){
        //     return key
        // }
    }
    return "ETH"
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
// export function getMobileOperatingSystem() {
//     // @ts-ignore
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//
//     // Windows Phone must come first because its UA also contains "Android"
//     if (/windows phone/i.test(userAgent)) {
//         return "Windows Phone";
//     }
//
//     if (/android/i.test(userAgent)) {
//         return "Android";
//     }
//
//     // iOS detection from: http://stackoverflow.com/a/9039885/177710
//     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//         return "iOS";
//     }
//
//     return "unknown";
// }

// export function IsAPP() {
//     return getMobileOperatingSystem() == "iOS" || getMobileOperatingSystem() == "Android";
// }

export async function defaultGasPrice(chain: ChainType) {
    let defaultGasPrice;
    let data: GasPriceLevel = {};
    if (chain == ChainType.ETH) {
        // @ts-ignore
        data = await rpc.post("eth_gasTracker", [], chain)
    }
    if (chain == ChainType.BSC) {
        // @ts-ignore
        const defaultGasPrice: any = await rpc.post("eth_gasPrice", [], chain)
        data = {
            AvgGasPrice: {
                gasPrice: utils.fromValue(defaultGasPrice, 9).toString(10),
                second: 3,
            }
        }
    } else if (chain == ChainType.SERO) {
        data = {
            AvgGasPrice: {
                gasPrice: "1",
                second: 15,
            }
        }
    } else if (chain == ChainType.TRON) {
        //TODO
    }
    defaultGasPrice = data.AvgGasPrice ? data.AvgGasPrice?.gasPrice : "1"
    return defaultGasPrice;
}

export function getCategoryBySymbol(symbol: string, chain: string): string {
    return CONTRACT_ADDRESS.ERC721[symbol]["SYMBOL"][chain];
}

export function crossAbleBySymbol(symbol: string): boolean {
    console.log(symbol)
    return CONTRACT_ADDRESS.ERC721[symbol]["CROSS_ABLE"];
}

export function getAddressBySymbol(symbol: string, chain: string): string {
    return CONTRACT_ADDRESS.ERC721[symbol]["ADDRESS"][chain];
}

export function getAddressByCategory(category: string, chain: string): string {
    const keys = Object.keys(CONTRACT_ADDRESS.ERC721);
    for (let k of keys) {
        const address = CONTRACT_ADDRESS.ERC721[k]["ADDRESS"];
        const symbol = CONTRACT_ADDRESS.ERC721[k]["SYMBOL"];
        if (symbol[chain] == category) {
            return address[chain]
        }
    }
    return ""
}

export function isNFTAddress(add: string, chain: string): boolean {
    const keys = Object.keys(CONTRACT_ADDRESS.ERC721);
    for (let k of keys) {
        const address = CONTRACT_ADDRESS.ERC721[k]["ADDRESS"];
        if (address[chain] && address[chain].toLowerCase() == add.toLowerCase()) {
            return true
        }
    }
    return false
}

export function notCrossToken(cy: string) {
    return NOT_CROSS_TOKEN.indexOf(cy) == -1
}

export function getPrefix(chain: ChainType) {
    if (chain == ChainType.BSC) {
        return "eth"
    } else {
        return ChainType[chain].toLowerCase();
    }
}

export function defaultCy(chain: ChainType) {
    if (chain == ChainType.BSC) {
        return "BNB"
    } else {
        return ChainType[chain];
    }
}

export function getCrossChainByCy(cy: string): Array<any> {
    const obj = BRIDGE_CURRENCY[cy];
    if (obj) {
        const keys = Object.keys(obj)
        const arr = []
        for (let k of keys) {
            for (let j of keys) {
                if (k !== j && (!obj[k].EXCEPT || obj[k].EXCEPT.indexOf(j) == -1)) {
                    arr.push({
                        from: k,
                        to: j
                    })
                }
            }
        }
        return arr;
    }
    return [{}]
}


export function getCrossNFTBySymbol(symbol: string): Array<any> {
    const obj = BRIDGE_NFT[symbol];
    if (obj) {
        const keys = Object.keys(obj)
        const arr = []
        for (let k of keys) {
            for (let j of keys) {
                if (k !== j && (!obj[k].EXCEPT || obj[k].EXCEPT.indexOf(j) == -1)) {
                    arr.push({
                        from: k,
                        to: j
                    })
                }
            }
        }
        return arr;
    }
    return [{}]
}

export function getChainFullName(chain: ChainType) {
    if (FULL_NAME[ChainType[chain]]) {
        return FULL_NAME[ChainType[chain]]
    }
    return ChainType[chain]
}

export async function getShortAddress(shotAddress: string) {
    const rest: any = await rpc.post("sero_getShortAddress", [shotAddress], ChainType.SERO);
    return rest
}

export function getDeviceLv(rate: string | undefined) {
    if (rate) {
        return utils.fromValue(rate, 16).toFixed(2, 1)
    }
    return "0";
}

export const ticketKey = (chain:ChainType) => {
    return ["nft_ticket", chain].join("_");
}

export const ticketArrKey = (chain:ChainType) => {
    return ["nft_ticket_arr", chain].join("_");
}

export function nFormatter(n: number | BigNumber | string | undefined, digits: number) {
    if(!n){
        return "0"
    }
    const num = new BigNumber(n).toNumber();
    const si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "K"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "G"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function calcLandRate(landLevel:string){
    const l = Math.ceil(new BigNumber(landLevel).multipliedBy(256).dividedBy(25).toNumber())
    return l > 255?255:l
    // if(!landCap){
    //     return 0
    // }
    // const base = new BigNumber(0.391);
    // const cap = fromValue(landCap,18);
    // const num = base.minus(
    //     new BigNumber(((cap.multipliedBy(2).toNumber())**0.455)).dividedBy(cap)
    // ).dividedBy(base).multipliedBy(1000).toNumber();
    // if(num<0){
    //     return 0
    // }
    // console.log("cal land rate >>> ",landCap,Math.ceil(num));
    // return Math.ceil(num)
}