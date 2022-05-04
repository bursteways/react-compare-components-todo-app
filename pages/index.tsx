import { NextPage } from 'next';
import Head from 'next/head';

// Components
import { TODOViaClasses, TODOViaFunctions } from 'components';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>ReactCompare</title>
        <meta
          name="description"
          content="TODO app comparing class and functional components"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 m-4 sm:grid-cols-2">
          {/* CLASS COMPONENT */}
          <TODOViaClasses />

          {/* FUNCTIONAL COMPONENT */}
          <TODOViaFunctions />
        </div>
      </main>
    </>
  );
};

export default Index;
