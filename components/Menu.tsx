// import Router from 'next/router';
import Link from 'next/link';

{
  /* Click <span onClick={() => Router.push('/area-editor')}>here</span> to read more */
}
export default () => (
  <ul>
    <li>
      <Link href="/area-editor">Area</Link>
    </li>
    <li>
      <Link href="/path-builder-jps-trace">JSP Trace</Link>
    </li>
    {/* <div>
      <a onClick={() => Router.push('/path-builder-jps-trace')}>JPS trace</a>
    </div> */}
  </ul>
);
