type Params = Promise<{ slug: string }>;

const DashboardPage = async (props: { params: Params }) => {
  const params = await props.params;
  const slug = params.slug;
  return <div>This is Dashboard</div>;
};

export default DashboardPage;
