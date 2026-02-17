import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function toggleSex(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sex', value);
    setSearchParams(params);
  }

  function toggleCentury(date: string) {
    const params = new URLSearchParams(searchParams);

    const newCentury = centuries.includes(date)
      ? centuries.filter(cn => cn !== date)
      : [...centuries, date];

    params.delete('century');
    newCentury.forEach(cent => params.append('century', cent));

    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className="is-active"
          to="#/people"
          onClick={() => {
            toggleSex('');
          }}
        >
          All
        </Link>
        <Link
          className=""
          to="#/people?sex=m"
          onClick={() => {
            toggleSex('?sex=m');
          }}
        >
          Male
        </Link>
        <Link
          className=""
          to="#/people?sex=f"
          onClick={() => {
            toggleSex('?sex=f');
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(date => (
              <Link
                key={date}
                data-cy="century"
                className="button mr-1"
                to={`centuries=${date}`}
                onClick={() => toggleCentury(date)}
              >
                {date}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={clearCenturies}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
