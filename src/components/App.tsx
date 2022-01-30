import Posts from './Posts';
import Form from './Form';
import './sass-styles/App.scss';

import db from '../fauxdb.json'

function App() {
  return (
    <main className='App'>
      <section className='submission-form'>
        <Form />
      </section>
      <section className='filter-posts'>
        Filters
      </section>
      <section className='posts'>
        <Posts 
          posts={db.posts}
        />
      </section>
    </main>
  );
}

export default App;
