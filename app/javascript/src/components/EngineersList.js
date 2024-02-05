import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEngineers, engineersState } from '../redux/engineers/engineersSlice';
import { Link } from 'react-router-dom';

function EngineersList() {
  const dispatch = useDispatch();
  const { engineers, error, status } = useSelector(engineersState);
  const [showIds, setShowIds] = useState([1, 2, 3]);

  const handlePrevClick = (ids) => {
    if (showIds[0] > 1) {
      setShowIds(engineers.map((engineer) => engineer.id).filter((id) => id < ids[0]).slice(-3));
    }
  };

  const handleNextClick = (ids) => {
    if (showIds[showIds.length - 1] < engineers.length) {
      setShowIds(engineers.map((engineer) => engineer.id).filter((id) => id > ids[2]).slice(0, 3));
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEngineers());
    }
  }, [dispatch, status]);

  if (status === 'succeeded') {
    return (
      <div className="engineers-list">
        <button type="button" className={`prev carousel-btn ${showIds[0] === 1 ? 'disabled' : ''}`} onClick={() => handlePrevClick(showIds)}>
          { /* eslint-disable jsx-a11y/control-has-associated-label */ }
          <i className="bi bi-caret-left" />
        </button>
        {engineers.map((engineer) => {
          const {
            name, id, photo, speciality,
          } = engineer;
          return (
            <div key={id} id={id} className={showIds.includes(engineer.id) ? 'active-item' : 'item'}>
              
              <div className="engineer-img-container">
                <img className="engineer-img" src={photo} alt={name} />
              </div>
              <Link to={`engineersList/${engineer.id}`} className='engineer text-black'>
              <p>{name}</p>
                <p>{speciality}</p>
                </Link>
            </div>
          );
        })}
        <button type="button" className={`next carousel-btn ${showIds[showIds.length - 1] === engineers.length ? 'disabled' : ''}`} onClick={() => handleNextClick(showIds)}>
          { /* eslint-disable jsx-a11y/control-has-associated-label */ }
          <i className="bi bi-caret-right" />
        </button>
      </div>
    );
  }
  if (status === 'failed') {
    return (<p>{ error }</p>);
  }
}

export default EngineersList;
