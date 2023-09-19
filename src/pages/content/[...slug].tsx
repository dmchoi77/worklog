import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import PanelRight from '~/components/panel/PanelRight';

const Content = ({ slug }: IParams) => {
  return (
    <div>
      <PanelRight slug={slug} />
    </div>
  );
};

export default Content;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;

  return {
    props: { slug },
  };
};
