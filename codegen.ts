import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['./src/**/*.tsx'],
  generates: {
    './__generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },

  pluckConfig: {
    globalGqlIdentifierName: 'gql',
    modules: [
      {
        name: 'graphql-tag',
        identifier: 'gql',
      },
    ],
  },

  ignoreNoDocuments: true,
};

export default config;
