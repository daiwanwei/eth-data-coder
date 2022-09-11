import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"
import fs from "fs";

type Options = {
    data: string;
    topics: string;
    abiPath: string;
};

export const command: string = 'decodeLog <data> <topics>';
export const desc: string = 'decode log';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional('data', {
            type: 'string',
            demandOption: true,
            describe: 'log data'
        })
        .positional('topics', {
            type: 'string',
            demandOption: true,
            describe: 'log topics'
        })
        .option('abiPath', {
            type: 'string',
            demandOption: true,
            describe: 'file path of abi'
        })


export function handler(argv: Arguments<Options>): void {
    const {data,topics, abiPath} = argv;
    console.log(`--------${data}`)
    const topicList=topics.split(",")
    console.log(`--------${data}`)
    const abi = fs.readFileSync(abiPath).toString()
    const decoder = new DataDecoder(abi)
    const event = decoder.decodeEventLog({data,topics:topicList})
    const signature = decoder.getEventSignature(topicList[0])
    process.stdout.write(`signature: ${signature} ,decodedData: ${event} \n`);
    process.exit(0);
};
