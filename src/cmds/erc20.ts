import type { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'erc20 <command>';
export const desc: string = 'erc20 use case';

type Options = {
    command: string;
};

export const builder: CommandBuilder<Options,Options> = (yargs) =>
    yargs
        .commandDir('./erc20Cmds')

export  function handler(argv: Arguments<Options>){
};
