import type { FC } from "react";

type PageTitleProps = {
  title: string;
};

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className="w-full border-b border-r border-default px-4 py-2 text-2xl font-semibold capitalize">
      {title}
    </h1>
  );
};

export default PageTitle;
