import dotenv from 'dotenv';
import { CodegenConfig } from '@graphql-codegen/cli';
import yml from 'yaml';
import { writeFileSync } from 'fs';

// Use env variables
dotenv.config();

// Get schema config variables
const PORT = process.env.PORT;
const endpointURL = `http://localhost:${PORT}`;

// Create schema config object
const schemaConfig: CodegenConfig['schema'] = {};
schemaConfig[endpointURL] = {};

// Set empty config object (completed below)
const generatesConfig: CodegenConfig['generates'] = {};
const generatedDirectoryPath = 'src/graphql/codegen/';

// GraphQL schema output file
const graphQLFilePath = generatedDirectoryPath + 'schema.graphql';
const graphQLPlugins = ['schema-ast'];
generatesConfig[graphQLFilePath] = { plugins: graphQLPlugins };

// Typescript schema output file
const typescriptFilePath = generatedDirectoryPath + 'schema.ts';
const typeScriptPlugins = ['typescript', 'typescript-resolvers'];
generatesConfig[typescriptFilePath] = { plugins: typeScriptPlugins };

// JSON schema output file
const jsonFilePath = generatedDirectoryPath + 'schema.json';
const jsonPlugins = ['introspection'];
generatesConfig[jsonFilePath] = { plugins: jsonPlugins };

// Complete codegen config
const config: CodegenConfig = {
    schema: schemaConfig,
    generates: generatesConfig,
    // Overwrite existing files
    overwrite: true,
    // Required to run with ESM Typescript
    // SRC: https://the-guild.dev/graphql/codegen/docs/getting-started/esm-typescript-usage
    emitLegacyCommonJSImports: false,
};

// HACK: Save codegen config as a yml file to work around ESM issue with codegen
// This yml file will be what is actually run by the codegen CLI. It's a bit of a hack,
// but it lets us keep using ESM typescript for the rest of codegen
// SRC: https://github.com/dotansimha/graphql-code-generator/issues/8488#issuecomment-1340622934
const ymlConfigFilePath = generatedDirectoryPath + 'codegen.yml';
writeFileSync(ymlConfigFilePath, yml.stringify(config));

export default config;
