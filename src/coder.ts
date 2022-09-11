import {utils} from "ethers"
import {EventFragment, Fragment, FunctionFragment, JsonFragment} from "@ethersproject/abi";


/*
    https://docs.ethers.io/v5/api/utils/abi/interface/
*/

export class AbiCoder {
    protected iface: utils.Interface;

    constructor(abi: string | ReadonlyArray<Fragment | JsonFragment | string>) {
        this.iface = new utils.Interface(abi);
    }

    getFunctionSigHash(fn: FunctionFragment | string): string {
        const result = this.iface.getSighash(fn)
        return result
    }

    getListOfFunctionSigHash(): Array<string> {
        const list = []
        for (const [name, val] of Object.entries(this.iface.functions)) {
            list.push(this.getFunctionSigHash(name))
        }
        return list
    }

    getMapOfFunctionSigHash(): Map<string, string> {
        const map = new Map()
        for (const [name, val] of Object.entries(this.iface.functions)) {
            map.set(this.getFunctionSigHash(name), name)
        }
        return map
    }

    getFunctionSignature(data: string): string {
        const method = data.slice(0, 10)
        const result = this.iface.getFunction(method)
        return result.format()
    }

    getEventTopic(event: EventFragment| string): string {
        const result = this.iface.getEventTopic(event)
        return result
    }

    getMapOfEventTopic(): Map<string, string> {
        const map = new Map()
        for (const [name, val] of Object.entries(this.iface.events)) {
            map.set(this.getEventTopic(name), name)
        }
        return map
    }

    getListOfEventTopic():Array<string>{
        const list = []
        for (const [name, val] of Object.entries(this.iface.events)) {
            list.push(this.getEventTopic(name))
        }
        return list
    }

    getEventSignature(eventHash:string): string {
        const result = this.iface.getEvent(eventHash)
        return result.format()
    }
}
