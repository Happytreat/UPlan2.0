import Modules from "../../../services/modules/modules";
import testDb, { failure, sampleModule, success } from './mock';

it('Create Module Successfully', async () => {
  expect.assertions(1);
  const moduleTable = new Modules(testDb, "moduleTable");
  const data = await moduleTable.create({
    item: sampleModule,
    success,
    failure,
  });
  expect(data).toEqual(sampleModule);
});
