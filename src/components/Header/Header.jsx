import React from 'react';
import style from './Header.module.scss';
import { BsBasket3 } from 'react-icons/bs';
import { CiSearch, CiHeart } from 'react-icons/ci';

export const Header = () => {
  const [showInfo, setShowInfo] = React.useState(false);
  const [hoveredElement, setHoveredElement] = React.useState(null);

  const header = ['Paintings', 'Artists'];

  const handleMouseEnter = (event) => {
    setShowInfo(true);
    setHoveredElement(event.target.innerText);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };
  const getInfoText = () => {
    switch (hoveredElement) {
      case 'Paintings':
        return (
          <div className={style.navPaintist}>
            <div className={style.firstTr}>
              <div className={style.info}>Style</div>
              <ul className={style.columnList}>
                <li>Painting</li>
                <li>Printmaking</li>
                <li>Photography</li>
                <li>Sculpture</li>
              </ul>
            </div>
            <div className={style.firstTr}>
              <div className={style.info}>Subject</div>
              <ul className={style.columnList}>
                <li>Painting</li>
                <li>Printmaking</li>
                <li>Photography</li>
                <li>Sculpture</li>
              </ul>
            </div>
            <div className={style.firstTr}>
              <div className={style.info}>Medium</div>
              <ul className={style.columnList}>
                <li>Painting</li>
                <li>Printmaking</li>
                <li>Photography</li>
                <li>Sculpture</li>
              </ul>
            </div>
          </div>
        );
      case 'Artists':
        return 'Learn more about us.';

      default:
        return null;
    }
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.left}>
          <h1 className={style.title}>Yushkov Art</h1>
          <nav>
            <ul>
              {header.map((head) => (
                <li>
                  <button
                    className={style.button}
                    onMouseEnter={(event) => handleMouseEnter(event)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {head}
                    {showInfo && hoveredElement === head && <Info text={getInfoText()} />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={style.rigth}>
          <div className={style.input}>
            <CiSearch className={style.icon} />
            <input type='text' placeholder='Art' />
          </div>
          <div className={style.buttons}>
            <button>Log In</button> <strong>|</strong> <button>Register</button>
          </div>
          <CiHeart className={style.heart} />
          <div className={style.basket}>
            <span className={style.badge}>0</span>
            <BsBasket3 className={style.icon} />
          </div>
        </div>
      </div>
    </header>
  );
};

const Info = ({ text }) => {
  return <div className={`${style.infoContainer} ${style.infoBlock}`}>{text}</div>;
};
