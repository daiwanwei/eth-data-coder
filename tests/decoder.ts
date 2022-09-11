import {AbiCoder} from "../src/coder";
import ERC20_ABI from "../src/abi/erc20.json"
import {Contract, ethers} from "ethers";
import {DataDecoder} from "../src/decoder";

describe("abi decoder test",()=>{
    let provider: ethers.providers.JsonRpcProvider;

    beforeEach(()=>{
        const uri="https://mainnet.infura.io/v3/877446b19dc84d898ff29fc401eea027"
        const usdcAddress="0xa47c8bf37f92abed4a126bda807a7b7498661acd"
        provider=new ethers.providers.JsonRpcProvider(uri)
        const contract=new Contract(usdcAddress,ERC20_ABI,provider)

    })

    it("decode log",async ()=>{
        const filter={
            address: "0xa47c8bf37f92abed4a126bda807a7b7498661acd",
            blockHash:"0xa072edb62c5ea0fb8943cd42957f9791e140354e083d9651e0860f8e99e78ef5"
        }
        const logs= await provider.getLogs(filter)
        const decoder=new DataDecoder(ERC20_ABI)
        for (let log of logs){
            const event=decoder.decodeEventLog(log)
            console.log(event)
        }

    })


})
