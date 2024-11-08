import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { Prisma } from '@prisma/client';
import Scalars from './scalars';
import { prisma } from '../../connectors/db';
import { DateResolver, DateTimeResolver, JSONResolver } from 'graphql-scalars';

export const builder = new SchemaBuilder<{
    // Define Date and DateTime, which are not natively available in GraphQL
    Scalars: Scalars;
    // Define the expected Prisma types
    PrismaTypes: PrismaTypes;
}>({
    // Add Prisma plugins
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
    },
});

builder.addScalarType('Date', DateResolver, {});
builder.addScalarType('DateTime', DateTimeResolver, {});
builder.addScalarType('JSON', JSONResolver, {});

builder.scalarType('Decimal', {
    serialize: (value) =>
        parseFloat(new Prisma.Decimal(value).toDecimalPlaces(8).toString()),
    parseValue: (value) => {
        if (typeof value === 'string' || typeof value === 'number') {
            if (new Prisma.Decimal(value).isNaN()) {
                throw new TypeError(
                    `${String(value)} is not a valid decimal value`
                );
            } else {
                return new Prisma.Decimal(value);
            }
        }
        throw new TypeError('Decimal must be a string or number');
    },
});
builder.scalarType('SortOrder', {
    serialize: (value) => value,
    parseValue: (value) => {
        if (value === 'asc' || value === 'desc') {
            return value;
        }
        throw new TypeError('SortOrder must be "asc" or "desc"');
    },
});

builder.scalarType('true', {
    serialize: (value) => value,
    parseValue: (value) => {
        if (value === true) {
            return value;
        } else {
            throw new TypeError('Type true must be true or undefined');
        }
    },
});

// Set the queryType to default to empty
builder.queryType({});

// Set the mutationType to default to empty
builder.mutationType({});
