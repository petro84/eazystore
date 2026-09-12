import PageTitle from "./PageTitle";

export default function PageHeading({ title, children }) {
  return (
    <div className="text-center max-w-xl mx-auto px-4 py-6">
      <PageTitle title={title} />
      <p className="font-primary leading-6 text-gray-600 dark:text-lighter">{children}</p>
    </div>
  );
}
