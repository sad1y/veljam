import Link from 'next/link';
import { connect } from 'react-redux';

import Counter from './counter';
import Clock from './clock';

interface IOwnProps {
  linkTo: string;
  title: string;
  NavigateTo: any;
}

type Props = IOwnProps & State.ITestingState;

export const Page = ({ error, lastUpdate, light, linkTo, NavigateTo, placeholderData, title }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <Counter />
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      {placeholderData && (
        <pre>
          <code>{JSON.stringify(placeholderData, null, 2)}</code>
        </pre>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default connect((state: State.IRoot) => state.testing)(Page);
