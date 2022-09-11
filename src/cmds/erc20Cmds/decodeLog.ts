import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"

type Options = {
    data: string;
    topics: string;
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


export function handler(argv: Arguments<Options>): void {
    const {data,topics} = argv;
    const topicList=topics.split(",")
    const decoder = new DataDecoder(ERC20_ABI)
    const decodedData = decoder.decodeEventLog({data,topics:topicList})
    const signature = decoder.getEventSignature(topicList[0])
    process.stdout.write(`signature: ${signature} ,decodedData: ${decodedData} \n`);
    process.exit(0);
};
