CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "checksum" TEXT NOT NULL,
    "finished_at" DATETIME,
    "migration_name" TEXT NOT NULL,
    "logs" TEXT,
    "rolled_back_at" DATETIME,
    "started_at" DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO "_prisma_migrations" (
    "id",
    "checksum",
    "finished_at",
    "migration_name",
    "logs",
    "rolled_back_at",
    "started_at",
    "applied_steps_count"
) VALUES (
    '20260623122000-init-local-sqlite',
    '424f3c57f62949f6d1016d4f784c0f412b97a8846d5436d9406dfc304a01ccdc',
    CURRENT_TIMESTAMP,
    '20260623122000_init',
    NULL,
    NULL,
    CURRENT_TIMESTAMP,
    1
);
