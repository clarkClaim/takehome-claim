export function removeNullsFromType<T>(
    obj: T
): Omit<T, keyof { [K in keyof T as null extends T[K] ? K : never]: T[K] }> {
    // NOTE: We can't actually delete all null properties because there are where/update inputs
    // that have valid null values. Deleting only valid null properties is a tech debt that
    // we'll have to address later.
    const newObj = { ...obj };
    return newObj;
}
