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

export interface AccountModel {
    accountId?: string
    name: string
    password?: string
    avatar?: string
    hint?: string
    addresses?: any
}

export enum ChainType {
    _,
    SERO,
    ETH,
    TRON,
    BSC
}

export enum ChainId {
    _,
    ETH,
    SERO,
    TRON,
    BSC
}

export interface Transaction {
    hash?: string
    from: string
    to: string
    cy: string
    value?: string
    data?: string
    gas?: string
    gasPrice?: string
    chain: ChainType
    nonce?: string
    chainId?: any
    amount: any
    feeCy: string
    feeValue?: string
    input?: string
    tickets?: Array<any>
    catg?: string
    tkt?: string
}

export interface GasPriceLevel {
    SafeGasPrice?: costTime
    ProposeGasPrice?: costTime
    FastGasPrice?: costTime
    AvgGasPrice?: costTime
}

export interface costTime {
    gasPrice: string
    second: number
}

export interface Ticket {
    Value: string
    Category: string
}

export interface DeviceMode {
    style: string
    category: string
}

export interface NftInfo {
    chain: ChainType
    category:string
    symbol: string
    tokenId: string
    meta: MetaInfo
}

export interface MetaInfo {
    name: string
    description: string
    image: string
    attributes: any
    alis: string
}

export interface Meta {
    name: string
    description: string
    image: string
    attributes: Array<Attribute>

    image_data?:string
    external_url?:string;//refer url for NFT Platform,it refer to link another url
    background_color?:string;
    animation_url?:string;
}

export interface Attribute {
    trait_type:string
    display_type:string;//boost_number,boost_percentage,number,date
    value:any
}

export * from './stargrid'