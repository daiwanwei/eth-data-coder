import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"
import fs from "fs";

type Options = {
    eventSignature?: string;
    abiPath: string;
};

export const command: string = 'getEventTopic';
export const desc: string = 'get Event Topic';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .option('es', {
            alias: "eventSignature",
            type: 'string',
            demandOption: false,
            describe: 'signature of event'
        })
        .option('abiPath', {
            type: 'string',
            demandOption: true,
            describe: 'file path of abi'
        })


export function handler(argv: Arguments<Options>): void {
    const {eventSignature, abiPath} = argv;
    const abi = fs.readFileSync(abiPath).toString()
    const decoder = new DataDecoder(abi)
    if (!eventSignature) {
        const map = decoder.getMapOfEventTopic()
        for (const [hash, sig] of map) {
            process.stdout.write(`method: ${sig} ,hash: ${hash} \n`);
        }
    } else {
        const hash = decoder.getEventTopic(eventSignature)
        process.stdout.write(`method: ${eventSignature} ,hash: ${hash} \n`);
    }
    process.exit(0);
};
