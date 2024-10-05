import { GetServerSideProps } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from '@/components/similars/product-table-pages';
import { getProducts, type Product as ProductType } from '@/lib/db-pages';
import PagesLayout from '@/components/pages-layout';

interface ProductsPageProps {
  products: ProductType[];
  newOffset: number | null;
  totalProducts: number;
  search: string;
  offset: number;
}

export default function ProductsPage({
  products,
  newOffset,
  totalProducts,
}: ProductsPageProps) {
  return (
    <PagesLayout>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            totalProducts={totalProducts}
          />
        </TabsContent>
      </Tabs>
    </PagesLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const search = (query.q as string) ?? '';
  const offset = Number(query.offset) || 0;
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    offset
  );

  return {
    props: {
      products,
      newOffset,
      totalProducts,
      search,
      offset
    }
  };
};
