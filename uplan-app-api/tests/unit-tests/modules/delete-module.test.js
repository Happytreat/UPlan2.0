import Modules from "../../../services/modules/modules";
import testDb from './mock';

it('Delete Module Successfully if Exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const moduleExist = 'mod-1';
  const userExist = 'user-1';
  const data = await moduleTable.delete({
    userId: userExist,
    moduleId: moduleExist,
    success: (body) => body,
    failure: (body) => body,
  });
  expect(data).toEqual({
    moduleId: 'mod-1',
    userId: 'user-1'
  });
});

it('delete modules fails if module does not exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const moduleNotExist = 'mod-2';
  const userNotExist = 'user-2';
  const data = await moduleTable.delete({
    userId: userNotExist,
    moduleId: moduleNotExist,
    success: (body) => body,
    failure: (body) => body,
  });

  expect(data).toEqual({
    error: 'Item not found.'
  });
});
