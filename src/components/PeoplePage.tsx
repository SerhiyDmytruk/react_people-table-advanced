import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peoples, setPeople] = useState<Person[]>([]);
  const filteredPeople = peoples.filter((person: Person) => person);

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(err => {
        setError(true);
        throw err;
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  <p>
                    There are no people matching the current search criteria
                  </p>

                  {filteredPeople.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <PeopleTable peoples={filteredPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
