import Modules from "../../../services/modules/modules";
import testDb, { failure, userExist, success } from './mock';

it('Get Module List Successfully if user exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.getAll({
    userId: userExist,
    success,
    failure,
  });
  expect(data.modules).toEqual({ 'sem-1': [{
      moduleId: 'mod-1',
      userId: 'user-1',
      semesterId: 'sem-1'
    }]});
});

it('Get module list return empty object if user does not exists', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.getAll({
    userId: 'userNotExist',
    success,
    failure,
  });

  expect(data).toEqual({ modules: {} });
});
