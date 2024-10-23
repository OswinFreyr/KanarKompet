import {getAllCanards} from '../controllers/canardController';
import {db} from '../db';
import { getQuery, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
    await db.sync();
    try {
      const res = await getAllCanards(getQuery(event));
      setResponseStatus(event, res.status);
      return res.data;
    } catch (err) {
      setResponseStatus(event, 500);
    }
  })
  