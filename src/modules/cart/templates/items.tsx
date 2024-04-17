import { LineItem, Region } from '@medusajs/medusa';
import { Heading, Table } from '@medusajs/ui';

import Item from '@modules/cart/components/item';
import SkeletonLineItem from '@modules/skeletons/components/skeleton-line-item';

type ItemsTemplateProps = {
  items?: Omit<LineItem, 'beforeInsert'>[];
  region?: Region;
  dictionary: any;
};

const ItemsTemplate = ({ items, region, dictionary }: ItemsTemplateProps) => {
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">
          {dictionary.cartPage.itemsTemplate.heading}
        </Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus">
            <Table.HeaderCell className="!pl-0">
              {dictionary.cartPage.itemsTemplate.item}
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              {' '}
              {dictionary.cartPage.itemsTemplate.quantity}
            </Table.HeaderCell>
            <Table.HeaderCell className="hidden lg:table-cell">
              {dictionary.cartPage.itemsTemplate.price}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              {dictionary.cartPage.itemsTemplate.total}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items && region
            ? items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1;
                })
                .map((item) => {
                  return <Item key={item.id} item={item} region={region} />;
                })
            : Array.from(Array(5).keys()).map((i) => {
                return <SkeletonLineItem key={i} />;
              })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ItemsTemplate;
