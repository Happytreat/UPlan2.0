import Modules from "../../../services/modules/modules";
import testDb, { failure, moduleExist, userExist, success } from './mock';

it('Get Module Successfully if module exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.get({
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

it('Get module return failure if module does not exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.get({
    userId: 'userNotExist',
    moduleId: 'moduleNotExist',
    success,
    failure,
  });

  expect(data).toEqual({
    error: 'Item not found.',
  });
});
