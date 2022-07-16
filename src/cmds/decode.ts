import type { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'decode <command>';
export const desc: string = 'decode use case';

type Options = {
    command: string;
};

export const builder: CommandBuilder<Options,Options> = (yargs) =>
    yargs
        .commandDir('./decodeCmds')

export  function handler(argv: Arguments<Options>){
};
