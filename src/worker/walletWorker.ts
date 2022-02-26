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

import {AccountModel, ChainType} from "../types";
import selfStorage from "../utils/storage";

//TODO inject account plugins

class WalletWorker {

    constructor() {

    }

    async accounts(){
        return new Promise((resolve, reject)=>{
        })
    }

    async accountInfo(accountId?:any):Promise<AccountModel>{
        if(!accountId){
            accountId = selfStorage.getItem("accountId");
        }
        return new Promise((resolve, reject)=>{
            if(accountId) {
                const data:any = selfStorage.getItem(accountId);
                if(data){
                    if(!data.addresses[ChainType.BSC]){
                        data.addresses[ChainType.BSC] = data.addresses[ChainType.ETH]
                    }
                    if(selfStorage.getItem("sero_address")){
                        data.addresses[ChainType.SERO]=selfStorage.getItem("sero_address")
                    }
                    if(selfStorage.getItem("bsc_address")){
                        data.addresses[ChainType.BSC]=selfStorage.getItem("bsc_address")
                    }
                    if(selfStorage.getItem("eth_address")){
                        data.addresses[ChainType.ETH]=selfStorage.getItem("eth_address")
                    }
                    if(selfStorage.getItem("tron_address")){
                        data.addresses[ChainType.TRON]=selfStorage.getItem("tron_address")
                    }
                    resolve(data);
                }
            }
        })
    }

    async signTx(accountId:string,password:string,chainType:any,params:any,chainParams?:any){
        return new Promise((resolve, reject)=>{
        })
    }

    async isLocked(){
        return new Promise((resolve, reject) =>{
        })
    }

    async lockWallet(){
        return new Promise((resolve, reject) =>{

        })
    }


}

const walletWorker = new WalletWorker();
export default walletWorker