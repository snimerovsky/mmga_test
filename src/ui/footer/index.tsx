import classNames from 'classnames';
import React from 'react';
import footerStyles from './index.module.scss';
import pageStyles from '../../app/modules/landing-home/LandingHomePage.module.scss';
import logo from '../../styles/sources/images/logo.svg';
import tgIcon from '../../styles/sources/images/tg-icon.png';
import socFbIcon from '../../styles/sources/images/soc-fb-icon.png';
import socTwitterIcon from '../../styles/sources/images/soc-twitter-icon.png';
import socTgIcon from '../../styles/sources/images/soc-tg-icon.png';
import socInstIcon from '../../styles/sources/images/soc-inst-icon.png';
import socYoutubeIcon from '../../styles/sources/images/soc-youtube-icon.png';

const styles = {
  ...pageStyles,
  ...footerStyles,
};

export const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.pageWrapper}>
        <div className={styles.footerWrapper}>
          <div className={styles.top}>
            <div className={styles.col}>
              <img
                src={logo}
                alt="logo"
                className={classNames(styles.logo, styles.title)}
              />
            </div>
            <div className={styles.col}>
              <span className={styles.title}>О нас</span>
              <a className={styles.link} href="https://about.mmga.ru/about/">
                О нас
              </a>
              <a className={styles.link} href="https://about.mmga.ru/partners/">
                Партнеры
              </a>
              <a className={styles.link} href="https://about.mmga.ru/vacancy/">
                Вакансии
              </a>
              <a className={styles.link} href="https://about.mmga.ru/contacts/">
                Контакты
              </a>
              <a className={styles.link} href="https://about.mmga.ru/blog/">
                Блог
              </a>
            </div>
            <div className={styles.col}>
              <span className={styles.title}>Сервисы</span>
              <a
                className={styles.link}
                href="https://about.mmga.ru/services/instagram/"
              >
                Instagram
              </a>
              <a
                className={styles.link}
                href="https://about.mmga.ru/services/youtube/"
              >
                YouTube
              </a>
              <a
                className={styles.link}
                href="https://about.mmga.ru/services/facebook/"
              >
                Facebook
              </a>
              <a
                className={styles.link}
                href="https://about.mmga.ru/services/vk/"
              >
                Vk
              </a>
              <a
                className={styles.link}
                href="https://about.mmga.ru/services/other/"
              >
                Другие
              </a>
            </div>
            <div className={styles.col}>
              <span className={styles.title}>Контакты</span>
              <span className={styles.phone}>+7 (967) 220 0999</span>
              <span className={classNames(styles.link, styles.clearLineHeight)}>
                hello@mmga.ru <br />
                6, Krasnobogatirskaya, Moscow
              </span>
              <div className={styles.socialLinkGroup}>
                <a
                  href="https://www.facebook.com/MMGA-111789047195310"
                  className={styles.socialLink}
                >
                  <img
                    className={classNames(styles.img, styles.fb)}
                    src={socFbIcon}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.instagram.com/mmga.ru/"
                  className={styles.socialLink}
                >
                  <img className={styles.img} src={socInstIcon} alt="" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCMXs96vzribohOUfFj-L9jA/"
                  className={styles.socialLink}
                >
                  <img
                    className={classNames(styles.img, styles.youtube)}
                    src={socYoutubeIcon}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.group}>
              <span className={styles.link}>
                © Copyright 2019 WANDI Group production
              </span>
            </div>
            <div className={styles.group}>
              <a
                href="https://about.mmga.ru/privacy-policy/"
                className={styles.link}
              >
                Условия использования
              </a>
              <a href="https://about.mmga.ru/terms/" className={styles.link}>
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
