import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Men's Perfumes", slug: "mens-perfumes" },
  { name: "Women's Perfumes", slug: "womens-perfumes" },
  { name: "Unisex Perfumes", slug: "unisex-perfumes" },
  { name: "Bakhoor", slug: "bakhoor" },
  { name: "Air Fresheners", slug: "air-fresheners" },
  { name: "Gift Sets", slug: "gift-sets" }
];

const products = [
  {
    name: "Midnight Oud",
    categorySlug: "mens-perfumes",
    price: 89,
    stockQuantity: 18,
    description:
      "A polished masculine blend of smoky oud, black pepper, saffron, and warm amber. Deep, elegant, and made for evening wear.",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    name: "Velvet Rose Elixir",
    categorySlug: "womens-perfumes",
    price: 76,
    stockQuantity: 24,
    description:
      "A luminous floral perfume with damask rose, pear nectar, vanilla musk, and a soft golden dry down.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    name: "Amber Silk",
    categorySlug: "unisex-perfumes",
    price: 82,
    stockQuantity: 12,
    description:
      "Balanced citrus, amber resin, sandalwood, and tonka bean. Smooth enough for daytime and rich enough for night.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    name: "Royal Bakhoor Majlis",
    categorySlug: "bakhoor",
    price: 42,
    stockQuantity: 30,
    description:
      "Premium bakhoor chips with oud, rosewood, and resinous spice notes for a refined home fragrance ritual.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    name: "Golden Citrus Room Mist",
    categorySlug: "air-fresheners",
    price: 28,
    stockQuantity: 40,
    description:
      "A crisp air freshener with bergamot, orange blossom, clean musk, and a touch of cedar for everyday luxury.",
    images: [
      "https://images.unsplash.com/photo-1608571423539-e951a50e0da5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    name: "Signature Discovery Gift Set",
    categorySlug: "gift-sets",
    price: 118,
    stockQuantity: 9,
    description:
      "A curated gift box featuring miniatures from Atrak's oud, rose, amber, and musk-inspired fragrance families.",
    images: [
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85"
    ]
  }
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.categorySlug }
    });

    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      update: {
        categoryId: category.id,
        description: product.description,
        price: product.price,
        imageUrl: product.images[0],
        stockQuantity: product.stockQuantity,
        isAvailable: product.stockQuantity > 0,
        images: {
          deleteMany: {},
          create: product.images.map((url, index) => ({
            url,
            sortOrder: index
          }))
        }
      },
      create: {
        id: product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.images[0],
        images: {
          create: product.images.map((url, index) => ({
            url,
            sortOrder: index
          }))
        },
        stockQuantity: product.stockQuantity,
        isAvailable: product.stockQuantity > 0,
        categoryId: category.id
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
