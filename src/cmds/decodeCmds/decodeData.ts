import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"
import fs from "fs";

type Options = {
    data: string;
    abiPath: string;
};

export const command: string = 'decodeData <data>';
export const desc: string = 'decode data';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('data', {
            type: 'string',
            demandOption: true,
            describe: 'function data'
        })
        .option('abiPath', {
            type: 'string',
            demandOption: true,
            describe: 'file path of abi'
        })


export function handler(argv: Arguments<Options>): void {
    const {data, abiPath} = argv;
    const abi = fs.readFileSync(abiPath).toString()
    const decoder = new DataDecoder(abi)
    const decodedData = decoder.decodeFunctionData(data)
    const signature = decoder.getFunctionSignature(data)
    process.stdout.write(`signature: ${signature} ,decodedData: ${decodedData} \n`);
    process.exit(0);
};
