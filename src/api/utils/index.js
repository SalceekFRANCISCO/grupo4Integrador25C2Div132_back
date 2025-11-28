import {fileURLToPath} from "url";

import {dirname, join} from "path";

const _filename = fileURLToPath(import.meta.url);

const _dirname = join(dirname(_filename),"../../../") //grupo4Integrador25c2div132_Back

export {
    _dirname,
    join
}
