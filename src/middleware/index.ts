import { Application } from '../declarations';
// Don't remove this comment. It's needed to format import lines nicely.
import schema from './schema'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export default function (app: Application): void {
  schema(app);
}
