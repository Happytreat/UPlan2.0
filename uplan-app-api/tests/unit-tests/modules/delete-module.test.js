import Modules from "../../../services/modules/modules";
import testDb, { failure, moduleExist, userExist, success } from './mock';

it('Delete Module Successfully if Exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.delete({
    userId: userExist,
    moduleId: moduleExist,
    success,
    failure,
  });
  expect(data).toEqual({
    moduleId: 'mod-1',
    userId: 'user-1'
  });
});

it('delete modules fails if module does not exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.delete({
    userId: 'userNotExist',
    moduleId: 'moduleNotExist',
    success,
    failure,
  });

  expect(data).toEqual({
    error: 'Item not found.'
  });
});
