import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  Icon,
  IndexTable,
  Stack,
  TextStyle,
  Thumbnail,
  UnstyledLink,
} from "@shopify/polaris";
import { DiamondAlertMajor, ImageMajor } from "@shopify/polaris-icons";
/* useMedia is used to support multiple screen sizes */
import { useMedia } from "@shopify/react-hooks";
/* dayjs is used to capture and format the date a product code was created or modified */
import dayjs from "dayjs";
/* Markup for small screen sizes (mobile) */
export function SmallScreenCard({
  id,
  title,
  createdAt,
  navigate,
  vendor,
  variants,
  images,
}) {
  return (
    <UnstyledLink
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      <div
        style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #E1E3E5" }}
      >
        <Stack>
          <Stack.Item>
            <Thumbnail
              source={images[0]?.src || ImageMajor}
              alt="placeholder"
              color="base"
              size="small"
            />
          </Stack.Item>
          <Stack.Item fill>
            <Stack vertical={true}>
              <Stack.Item>
                <p>
                  <TextStyle variation="strong">
                    {truncate(title, 35)}
                  </TextStyle>
                </p>
                <p>{truncate(title, 35)}</p>
                <p>{dayjs(createdAt).format("MMMM D, YYYY")}</p>
              </Stack.Item>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "3" }}>
                  <TextStyle variation="subdued">Vendor</TextStyle>
                  <p>{vendor || "-"}</p>
                </div>
                <div style={{ flex: "2" }}>
                  <TextStyle variation="subdued">SKU</TextStyle>
                  <p>{variants[0]?.sku}</p>
                </div>
              </div>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>
    </UnstyledLink>
  );
}
export function ProductIndex({ myProducts, loading }) {
  /* Check if screen is small */
  const isSmallScreen = useMedia("(max-width: 640px)");

  const navigate = useNavigate();

  /* Map over Product for small screen */
  const smallScreenMarkup = myProducts.map((product) => (
    <SmallScreenCard key={product.id} navigate={navigate} {...product} />
  ));

  const rowMarkup = myProducts.map(
    ({ id, title, createdAt, vendor, variants, images }, index) => {
      /* The form layout, created using Polaris components.*/
      return (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          style={{ cursor: "pointer" }}
        >
          <IndexTable.Cell>
            <Thumbnail
              source={images[0]?.src || ImageMajor}
              alt="placeholder"
              color="base"
              size="small"
            />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <UnstyledLink url={`/product/${id}`}>{truncate(title, 25)}</UnstyledLink>
          </IndexTable.Cell>
          <IndexTable.Cell>
            {dayjs(createdAt).format("MMMM D, YYYY")}
          </IndexTable.Cell>
          <IndexTable.Cell>{variants[0].price}</IndexTable.Cell>
          <IndexTable.Cell>{vendor}</IndexTable.Cell>
          <IndexTable.Cell>{variants[0].sku}</IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  /* A layout for small screens, built using Polaris components */
  return (
    <Card>
      {isSmallScreen ? (
        smallScreenMarkup
      ) : (
        <IndexTable
          itemCount={myProducts.length}
          headings={[
            { title: "Thumbnail", hidden: true },
            { title: "Title" },
            { title: "CreatedAt" },
            { title: "Price" },
            { title: "Vendor" },
            { title: "SKU" },
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
