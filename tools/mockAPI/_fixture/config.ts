
export const fixtureConfig: IFixtureConfigModel = {
  APP: {
    PATH: './tools/mockAPI/_fixture/app',
    prefix: 'app',
  },
  // ADMIN: {
  //   PATH: './tools/mockAPI/_fixture/ope',
  //   prefix: 'ope',
  // },
};

interface IFixtureConfigModel {
  APP: IFixtureModel;
  //ADMIN: IFixtureModel;
}

interface IFixtureModel {
  PATH: string;
  prefix: string;
}
