import { NextPage } from 'next';

// Components
import { TODOViaClasses, TODOViaFunctions } from 'components';

const Index: NextPage = () => {
  return (
    <main className="grid grid-cols-2 gap-4 m-4">
      {/* CLASS COMPONENT */}
      <TODOViaClasses />

      {/* FUNCTIONAL COMPONENT */}
      <TODOViaFunctions />
    </main>
  );
};

export default Index;
