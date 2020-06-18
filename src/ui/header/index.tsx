import React from 'react';
import styles from './index.module.scss';
import { Logo } from '../logo';

export const Header = () => {
  return (
    <header className={styles.Header}>
      <Logo />
      <nav className={styles.navigationMenu}>
        <ul className={styles.menuList}>
          <li>
            <a href="https://about.mmga.ru/about/">о нас</a>
          </li>
          <li>
            <a href="https://about.mmga.ru/partners/">партнеры</a>
          </li>
          <li>
            <a href="https://about.mmga.ru/contacts/">контакты</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
