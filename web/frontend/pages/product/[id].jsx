import { useParams } from "react-router-dom";
import { useAppQuery } from "../../hooks";
import { Card, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { Loading, TitleBar } from "@shopify/app-bridge-react";
import { useMedia } from "@shopify/react-hooks";
import { ProductInfo } from "../../components";

export default function ProductPage() {
  const breadcrumbs = [{ content: "WATCH PRODUCT", url: "/" }];
  const { id } = useParams();

  const {
    data: Product,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: `/api/products/${id}`,
    reactQueryOptions: {
      /* Disable refetching because the QRCodeForm component ignores changes to its props */
      refetchOnReconnect: false,
    },
  });

  const myProductMarkup = Product?.variants?.length ? (
    <ProductInfo Product={Product} loading={isRefetching} />
  ) : null;

  /* Loading action and markup that uses App Bridge and Polaris components */
  if (isLoading || isRefetching) {
    return (
      <Page>
        <TitleBar
          title="Product"
          breadcrumbs={breadcrumbs}
          primaryAction={null}
        />
        <Loading />
        <Layout>
          <Layout.Section>
            <Card sectioned title="Title">
              <SkeletonBodyText />
            </Card>
            <Card title="Product">
              <Card.Section>
                <SkeletonBodyText lines={1} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={3} />
              </Card.Section>
            </Card>
            <Card sectioned title="Discount">
              <SkeletonBodyText lines={2} />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page>
      <TitleBar
        title="Product"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      {myProductMarkup}
    </Page>
  );
}
