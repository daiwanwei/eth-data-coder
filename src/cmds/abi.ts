import type { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'abi <command>';
export const desc: string = 'abi use case';

type Options = {
    command: string;
};

export const builder: CommandBuilder<Options,Options> = (yargs) =>
    yargs
        .commandDir('./abiCmds')

export  function handler(argv: Arguments<Options>){
};
