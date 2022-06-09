import './sass-styles/Filters.scss'

export default function Filters (props) {
  return (
    <div className='filters-area'>
      <section className='filters'>
        Spicy language:
        <input 
          type='checkbox' 
          onClick={() => props.handleFilters()}
          checked={props.filters.showSpicyLanguage}
          />
      </section>
    </div>
  )
}
