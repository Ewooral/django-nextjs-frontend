import {serial, pgTable} from "drizzle-orm/pg-core";

export const bid = pgTable("ewooral_bids", {
    id: serial("id").primaryKey(),
});
