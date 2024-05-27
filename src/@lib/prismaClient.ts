import "server-only";

/* eslint-disable init-declarations -- disabled */
/* eslint-disable @typescript-eslint/init-declarations -- disabled */
/* eslint-disable import/no-mutable-exports -- disabled */
/* eslint-disable @typescript-eslint/strict-boolean-expressions -- disabled */
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    // @ts-expect-error -- any type is fine for this
    if (!global.prisma) {
        // @ts-expect-error -- any type is fine for this
        global.prisma = new PrismaClient();
    }
    // @ts-expect-error -- any type is fine for this
    prisma = global.prisma;
}

export default prisma;
