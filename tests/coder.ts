import {AbiCoder} from "../src/coder";
import ERC20_ABI from "../src/abi/erc20.json"

describe("abi coder test",()=>{
    it("get event signature",()=>{
        const coder=new AbiCoder(ERC20_ABI)
        const sig=coder.getEventSignature("Transfer")
        console.log(sig)
    })

    it("get all event signature",()=>{
        const coder=new AbiCoder(ERC20_ABI)
        const list=coder.getListOfEventTopic()
        console.log(list)
        const map=coder.getMapOfEventTopic()
        console.log(map)
    })

    it("get all function signature",()=>{
        const coder=new AbiCoder(ERC20_ABI)
        const list=coder.getListOfFunctionSigHash()
        console.log(list)
        const map=coder.getMapOfFunctionSigHash()
        console.log(map)
    })


})
