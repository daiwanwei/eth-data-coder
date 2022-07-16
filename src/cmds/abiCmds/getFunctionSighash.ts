import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"
import fs from "fs";

type Options = {
    functionSignature?: string;
    abiPath: string;
};

export const command: string = 'getFunctionSighash';
export const desc: string = 'get Function Signature hash';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .option('fs', {
            alias: "functionSignature",
            type: 'string',
            demandOption: false,
            describe: 'signature of function'
        })
        .option('abiPath', {
            type: 'string',
            demandOption: true,
            describe: 'file path of abi'
        })


export function handler(argv: Arguments<Options>): void {
    const {functionSignature, abiPath} = argv;
    const abi = fs.readFileSync(abiPath).toString()
    const decoder = new DataDecoder(abi)
    if (!functionSignature) {
        const map = decoder.getMapOfFunctionSigHash()
        for (const [hash, sig] of map) {
            process.stdout.write(`method: ${sig} ,hash: ${hash} \n`);
        }
    } else {
        const hash = decoder.getFunctionSigHash(functionSignature)
        process.stdout.write(`method: ${functionSignature} ,hash: ${hash} \n`);
    }
    process.exit(0);
};
