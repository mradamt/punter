import Button from "./FilterButton";
import './sass-styles/Filters.scss'

export default function Filters (props) {
  return (
    <section className='filter-posts'>
      Include mature language:
      <input 
        type='checkbox' 
        onClick={() => props.handleFilters()}
        checked={props.filters.showSpicyLanguage}
        />

    </section>
  )
}
