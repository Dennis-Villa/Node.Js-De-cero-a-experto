import { writeFileSync, mkdirSync } from 'fs';
import { yarg } from './config/plugins/args.plugin';

const createHeader = ( base: number ): string => {
    const header = `
================================================
                Tabla del ${base}
================================================
    \n`;

    return header;
};

const createTable = ( base: number, limit: number ): string => {
    let table = '';

    for (let index = 1; index <= limit; index++) {
        table = table.concat(`${base} x ${index} = ${base*index} \n`);
    }

    return table;
};

const showTable = ( table: string ): void => {
    console.log(table);
};

const { b: base, l: limit, s: show } = yarg;

let message = createHeader(base);
message += createTable(base, limit);

if (show) showTable(message);

const outputPath = `outputs`;

mkdirSync(outputPath, { recursive: true });
writeFileSync(`${outputPath}/tabla-${base}.txt`, message);