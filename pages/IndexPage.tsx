import { trpc } from '~lib/utils/trpc';

export default function IndexPage() {
  const hello = trpc.useQuery(['findUserVotedResourceIds', { id: 1 }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  console.log(hello.data.resources);
  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
