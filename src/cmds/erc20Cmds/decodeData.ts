import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"

type Options = {
    data: string;
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


export function handler(argv: Arguments<Options>): void {
    const {data} = argv;
    const decoder = new DataDecoder(ERC20_ABI)
    const decodedData = decoder.decodeFunctionData(data)
    const signature = decoder.getFunctionSignature(data)
    process.stdout.write(`signature: ${signature} ,decodedData: ${decodedData} \n`);
    process.exit(0);
};
