import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.LayoutQuery>(graphql`
    query Layout {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const siteMetadata = data.site!.siteMetadata!;

  return siteMetadata;
};
