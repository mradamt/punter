import './sass-styles/Filters.scss'

export default function Filters (props) {

  return (
    <section className='filter-posts'>
      Filters:
      <button>Spicy language</button>
      Sort by:
      <button>Date</button>
      <button>Most liked</button>
      <button>Least liked</button>
      <button>Author</button>
    </section>
  )
}
