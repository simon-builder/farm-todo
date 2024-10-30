import ListDisplay from './components/ListDisplay';
import { getLists } from './actions';

export default async function Page() {
  const lists = await getLists();
  return <ListDisplay lists={lists} />;
}