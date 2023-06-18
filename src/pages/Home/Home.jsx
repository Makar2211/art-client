import React, { useState, useEffect } from 'react';
import { Filter } from '../../components/Filter/Filter';
import style from './Home.module.scss';
import { fetchArtworks } from '../../redux/slices/artwork.js';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import { BsBasket3Fill } from 'react-icons/bs';
import queryString from 'query-string';

export const Home = () => {
  const dispatch = useDispatch();

  const artworks = useSelector((state) => state.artworks);
  const allItems = useSelector((state) => state.artworks.allitems.item);
  const isLoadingItems = artworks.status === 'loading' || allItems.length === 0;

  const [filters, setFilters] = useState({
    technique: '',
    material: '',
  });

  const [filteredItems, setFilteredItems] = useState(allItems);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, []);
  useEffect(() => {
    applyFilters();
  }, [filters, allItems]);

  const handleFilterChange = (updatedFilters) => {
    const newFilters = { ...filters, ...updatedFilters };
    setFilters(newFilters);

    const query = queryString.stringify(newFilters);
    const url = `${window.location.pathname}?${query}`;
    window.history.pushState({ path: url }, '', url);
  };

  const applyFilters = () => {
    // Получение query-параметров из URL
    const queryParams = new URLSearchParams(window.location.search);
    const techniqueFilter = queryParams.get('technique');
    const materialFilter = queryParams.get('material');

    // Применение фильтров
    const filtered = allItems.filter((item) => {
      if (techniqueFilter && !item.technique.includes(techniqueFilter)) {
        return false;
      } else if (materialFilter && !item.material.includes(materialFilter)) {
        return false;
      }

      return true;
    });

    setFilteredItems(filtered);
  };

  return (
    <div className='container'>
      <div className={style.shop}>
        <Filter artworks={artworks} onFilterChange={handleFilterChange} />
        <div className={style.carts}>
          {isLoadingItems ? (
            <h2>Идет загрузка</h2>
          ) : filteredItems.length === 0 ? (
            <div>товаров нет</div>
          ) : (
            filteredItems.map((obj) => (
              <div className={style.card} key={obj._id}>
                {obj.image.map((image) => (
                  <img src={`http://localhost:8888/${image}`} alt='art-img' />
                ))}
                <div className={style.infoCart}>
                  <h2 className={style.title}>{obj.title}</h2>
                  <h3 className={style.technique}>
                    {obj.technique.map((item, index) => (
                      <React.Fragment key={index}>
                        <span>{item}</span>
                        {index !== obj.technique.length - 1 ? (
                          <span style={{ marginRight: '2px' }}>,</span>
                        ) : (
                          <span> painting</span>
                        )}
                      </React.Fragment>
                    ))}
                  </h3>
                  <h4>{obj.size} cm</h4>
                  <div className={style.footerCart}>
                    <div>
                      <b>${obj.price}</b>
                    </div>
                    <div className={style.btns}>
                      <button className={style.heart}>
                        <AiFillHeart className={style.img} />
                      </button>
                      <button className={style.backet}>
                        <BsBasket3Fill className={style.img} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
