import { builder } from './builder';

export class BatchPayloadType {
    count: number;

    constructor(count: number) {
        this.count = count;
    }
}

export const BatchPayload = builder.objectType(BatchPayloadType, {
    name: 'BatchPayload',
    description: "Prisma's updateMany, createMany, deleteMany output",
    fields: (t) => ({
        count: t.exposeInt('count'),
    }),
});
