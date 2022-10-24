import { useMedia } from "@shopify/react-hooks";
import {
  Card,
  IndexTable,
  Stack,
  TextStyle,
  Thumbnail,
  UnstyledLink,
} from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { Navigate } from "react-router-dom";

function SmallScreenCard({
  id,
  title,
  createdAt,
  option1,
  price,
  imageSource,
}) {
  return (
    <UnstyledLink>
      <div
        style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #E1E3E5" }}
      >
        <Stack>
          <Stack.Item>
            <Thumbnail
              source={imageSource || ImageMajor}
              alt="placeholder"
              color="base"
              size="small"
            />
          </Stack.Item>
          <Stack.Item fill>
            <Stack vertical={true}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "3" }}>
                  <TextStyle variation="subdued">Price</TextStyle>
                  <p>{price || "-"}</p>
                </div>
                <div style={{ flex: "2" }}>
                  <TextStyle variation="subdued">Option 1</TextStyle>
                  <p>{option1 || "-"}</p>
                </div>
              </div>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <p>
              <TextStyle variation="strong">{truncate(title, 35)}</TextStyle>
            </p>
            <p>{truncate(title, 35)}</p>
            <p>{dayjs(createdAt).format("MMMM D, YYYY")}</p>
          </Stack.Item>
        </Stack>
      </div>
    </UnstyledLink>
  );
}

export function ProductInfo({ Product, loading }) {
  const isSmallScreen = useMedia("(max-width: 640px)");

  const smallScreenMarkup = Product.variants?.map((variant) => {
    const imageSource = Product.images.find(
      (image) => image.id === variant.image_id
    );
    return (
      <SmallScreenCard
        key={variant.id}
        imageSource={imageSource?.src}
        {...variant}
      />
    );
  });

  const rowMarkup = Product.variants?.map((variant, index) => {
    /* The form layout, created using Polaris components.*/
    const imageSource = Product.images.find(
      (image) => image.id === variant.image_id
    );
    return (
      <IndexTable.Row id={variant.id} key={variant.id} position={index}>
        <IndexTable.Cell>
          <Thumbnail
            source={imageSource?.src || ImageMajor}
            alt="placeholder"
            color="base"
            size="small"
          />
        </IndexTable.Cell>
        <IndexTable.Cell>{truncate(Product.title, 25)}</IndexTable.Cell>
        <IndexTable.Cell>{variant.price}</IndexTable.Cell>
        <IndexTable.Cell>{variant.option1}</IndexTable.Cell>
        <IndexTable.Cell>
          {dayjs(variant.createdAt).format("MMMM D, YYYY")}
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  return (
    <Card>
      <Stack style={{marginBottom: '50px'}}>
        <Stack.Item>
          <Thumbnail
            source={Product.images[0]?.src || ImageMajor}
            alt="placeholder"
            color="base"
            size="large"
          />
        </Stack.Item>
        <Stack.Item fill>
          <Stack vertical={true}>
            <Stack.Item>
              <p>
                <TextStyle variation="strong">
                  {truncate(Product.title, 35)}
                </TextStyle>
              </p>
            </Stack.Item>
            <div>
              <TextStyle variation="subdued">DESCRIPTION</TextStyle>
              <p>{parse(Product.body_html || '')}</p>
            </div>
          </Stack>
        </Stack.Item>
      </Stack>
      {isSmallScreen ? (
        smallScreenMarkup
      ) : (
        <IndexTable
          itemCount={Product.variants.length}
          headings={[
            { title: "Thumbnail", hidden: true },
            { title: "Title" },
            { title: "Price" },
            { title: "Option 1" },
            { title: "createdAt" },
          ]}
          selectable={false}
          loading={loading}
        >
          {rowMarkup}
        </IndexTable>
      )}
    </Card>
  );
}

/* A function to truncate long strings */
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "…" : str;
}
