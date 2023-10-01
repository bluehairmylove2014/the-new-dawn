import { GetStaticPaths, GetStaticProps } from "next";

const download = () => {
  return <div>Download</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default download;
