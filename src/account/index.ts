import detectEthereumProvider from "@metamask/detect-provider";
export enum ChainId{
    _,
    ETH,
    SERO,
    TRON,
    BSC,
    EMIT
}

export interface AccountInfo {
    chainId: ChainId
    address: string
}
export interface IAccount {
    getAccounts: () => Promise<Array<AccountInfo>>;

    getChainId: () => Promise<number | undefined>;

    //cb(Array<AccountInfo>)
    onAccountChanged: (cb: Function) => void;

    onChainChanged: (cb: Function) => void;

    jsonRpc: (method: string, params: any) => Promise<any>;
}

export class MetaMaskAccount implements IAccount{
    constructor() {
    }

    getAccounts = async (): Promise<Array<AccountInfo>> => {
        if(! await this._installed()){
           return Promise.reject("Metamask not install.");
        }
        //@ts-ignore
        const accounts:Array<string> = await ethereum.request({ method: 'eth_requestAccounts' });
        //@ts-ignore
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        const ret:Array<AccountInfo> = [];
        for(let act of accounts){
            ret.push({
                chainId: chainId,
                address: act
            })
        }
        return ret;
    }

    getChainId = async (): Promise<number | undefined> => {
        if(! await this._installed()){
            return Promise.reject("Metamask not install.");
        }
        //@ts-ignore
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        return chainId;
    }

    onAccountChanged(cb: Function): void {
        //@ts-ignore
        ethereum.on('accountsChanged', (accounts)=>{
            //@ts-ignore
            ethereum.request({ method: 'eth_chainId' }).then(chainId=>{
                const ret:Array<AccountInfo> = [];
                for(let act of accounts){
                    ret.push({
                        chainId: chainId,
                        address: act
                    })
                }
                cb(ret)
            }).catch(e=>{
                console.error(e)
            })
        })
    }

    onChainChanged(cb: Function): void {
        //@ts-ignore
        ethereum.on('chainChanged', (chainId)=>{
            cb(chainId);
        })
    }

    protected _installed = async () :Promise<boolean> =>{
        const provider = await detectEthereumProvider();
        return !!provider;
    }

    jsonRpc = async (method: string, params: any): Promise<any> => {
        //@ts-ignore
        const rest = await ethereum
            .request({
                method: method,
                params,
            })
        console.log(rest,"rest::")
        return rest;
    }
}

export enum AccountType {
    _,
    EMIT_ACCOUNT,
    METAMASK,
}