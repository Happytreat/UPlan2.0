import Modules from "../../../services/modules/modules";
import testDb, { failure, userExist, success } from './mock';

it('Update Module Successfully', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.update({
    userId: userExist,
    data: {},
    success,
    failure,
  });
  expect(data).toEqual({ updated: {} });
});
