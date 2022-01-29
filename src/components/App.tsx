import Post from './Post';
import './App.scss';

function App() {
  return (
    <main className='App'>
      <section className='submission-form'>
        Submission form
      </section>
      <section className='posts'>
        <Post />
      </section>
    </main>
  );
}

export default App;
