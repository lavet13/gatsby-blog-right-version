import React, { FC } from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { NonNullableFields } from '../common/types/types';

type SeoProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  pathname?: string;
};

const SEO: FC<SeoProps> = ({ title, children, description, pathname }) => {
  const data = useSiteMetadata() as NonNullableFields<
    ReturnType<typeof useSiteMetadata>
  >;

  const seo = {
    title: title || data.title,
    description: description || data.description,
    url: `${data.siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />
      {children}
    </>
  );
};

export default SEO;
