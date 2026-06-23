const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRawUnsafe(
    "select table_name from information_schema.tables where table_schema = 'public' order by table_name"
  );
  const [categories, products, images, migrations] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.productImage.count(),
    prisma.$queryRawUnsafe("select migration_name from _prisma_migrations order by started_at")
  ]);

  console.log(JSON.stringify({ tables, categories, products, images, migrations }));
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
