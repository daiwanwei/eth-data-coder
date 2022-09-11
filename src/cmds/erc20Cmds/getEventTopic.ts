import type {Arguments, CommandBuilder} from 'yargs';
import {DataDecoder} from "../../decoder";
import ERC20_ABI from "../../abi/erc20.json"

type Options = {
    eventSignature?: string;
};

export const command: string = 'getEventTopic';
export const desc: string = 'get Event Topic';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .option('es', {
            alias:"eventSignature",
            type: 'string',
            demandOption: false,
            describe: 'signature of function'
        })


export  function handler(argv: Arguments<Options>): void {
    const {eventSignature} = argv;
    const decoder = new DataDecoder(ERC20_ABI)
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
