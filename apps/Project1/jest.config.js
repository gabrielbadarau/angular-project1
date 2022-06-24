const esModules = [
    '@angular',
    '@ngrx',
    'robust-predicates',
  ];
  
  module.exports = {
    displayName: 'Project1',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    },
    transform: {
      '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment',
    ],
    transformIgnorePatterns: [
      `node_modules/(?!.*\\.mjs$|${esModules.join('|')})`,
    ],
  };