import {getAllCanards} from '../controllers/canardController';

export default defineEventHandler(async (event) => {
    return await getAllCanards();
  })
  