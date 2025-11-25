import {fileURLToPath} from "url";

import {dirname, join} from "path";

const _filename = fileURLToPath(import.meta.url);

const _dirname = join(dirname(_filename),"../../../")

export {
    _dirname,
    join
}
