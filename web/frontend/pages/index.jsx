import {
  Card,
  Page,
  Layout,
  EmptyState,
  SkeletonBodyText,
} from "@shopify/polaris";
import { TitleBar, Loading } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

import { ProductIndex } from "../components";

export default function HomePage() {
  const {
    data: myProducts,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: `/api/products`,
    reactQueryOptions: {
      /* Disable refetching because the QRCodeForm component ignores changes to its props */
      refetchOnReconnect: false,
    },
  });

  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;

  const myProductsMarkup = myProducts?.length ? (
    <ProductIndex myProducts={myProducts} loading={isRefetching} />
  ) : null;

  const emptyStateMarkup =
    !isLoading && !myProducts?.length ? (
      <Card sectioned>
        <EmptyState
          heading="Fetching products from your store"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Wait some time while products are empty lorem text.</p>
        </EmptyState>
      </Card>
    ) : null;

  return (
    <Page fullWidth={!!myProductsMarkup}>
      <TitleBar
        title="My Products"
      />
      <Layout>
        <Layout.Section>
          {loadingMarkup}
          {myProductsMarkup}
          {emptyStateMarkup}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
