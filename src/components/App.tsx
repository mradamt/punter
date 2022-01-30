import Post from './Post';
import Form from './Form';
import './sass-styles/App.scss';

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
        <Post />
      </section>
    </main>
  );
}

export default App;
