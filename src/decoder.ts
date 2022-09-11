import {BytesLike, utils} from "ethers"
import {Fragment, JsonFragment} from "@ethersproject/abi";
import {AbiCoder} from "./coder";


/*
    https://docs.ethers.io/v5/api/utils/abi/interface/
*/

export interface Log {
    data: BytesLike
    topics: Array<string>
}

export class DataDecoder extends AbiCoder{
    constructor(abi: string | ReadonlyArray<Fragment | JsonFragment | string>) {
        super(abi)
    }

    decodeFunctionData(data: string): utils.Result {
        const method = data.slice(0, 10)
        const result = this.iface.decodeFunctionData(method, data)
        return result
    }

    decodeEventLog(log: Log): utils.Result {
        const event=log.topics[0]
        console.log(log)
        const result = this.iface.decodeEventLog(event, log.data,log.topics)
        return result
    }

}

//
// function deepRemoveUnwantedArrayProperties (arr:utils.Result):Array<any> {
//     return [...arr.map(item => {
//         if (Array.isArray(item)) return deepRemoveUnwantedArrayProperties(item)
//         return item
//     })]
// }
