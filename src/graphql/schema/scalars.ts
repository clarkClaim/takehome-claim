import { Prisma } from '@prisma/client';

// Technically any value is valid, but we'll be more explicit with input
// Note: This only works with the input value, since we can't predict
// anything about the output value of a json column
type JsonValueType = string | number | boolean | null;
type JsonValueArrayType = JsonValueType[];
type JsonObjectType = {
    [key: string]: JsonObjectType | JsonValueType | JsonValueArrayType;
};

// Used for order types
type SortOrder = 'asc' | 'desc';
type NullsOrder = 'first' | 'last' | undefined;

type Scalars = {
    Date: { Input: Date; Output: Date };
    DateTime: { Input: Date; Output: Date };
    Decimal: { Input: Prisma.Decimal; Output: Prisma.Decimal };
    SortOrder: { Input: SortOrder; Output: SortOrder };
    NullsOrder: { Input: NullsOrder; Output: NullsOrder };
    // Used for aggregate types where value is true or undefined (but not false)
    true: { Input: true; Output: true };
    JSON: {
        Input: JsonObjectType;
        // Using any here because JSON could be any type found within TypeScript
        // For example, in the generated types for the mobile client (which uses
        // the standard GQL -> TS generator), JSON is defined as any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Output: any;
    };
};
export default Scalars;
