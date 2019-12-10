import Modules from "../../services/modules/modules";
import testDb from './mock';

it('works with resolves', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const moduleExist = 'mod-1';
  const userExist = 'user-1';
  const data = await moduleTable.get(userExist, moduleExist, (body) => body, (body) => body);
  expect(data).toEqual({
    moduleId: 'mod-1',
    userId: 'user-1'
  });
});
