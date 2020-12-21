import React, { useState } from 'react';
import { Koros } from 'hds-react';
import { useTranslation } from 'react-i18next';
import Container from '../component/Container';
import Breadcrumb from '../component/Breadcrumb';
import SearchForm from './SearchForm';
import SearchResultList from './SearchResultList';
import styles from './Search.module.scss';

const style = {
  fontSize: 'var(--fontsize-heading-l)',
} as React.CSSProperties;

const Search = (): JSX.Element => {
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>('');
  return (
    <>
      <div className={styles.headContainer}>
        <Container>
          <Breadcrumb
            current={{ label: 'breadcrumb.search', linkTo: '/search' }}
          />
          <h1 style={style}>{t('search.heading')}</h1>
          <span className="text-lg">{t('search.text')}</span>
          <SearchForm onSearch={setSearch} />
        </Container>
      </div>
      <Koros
        type="wave"
        className="koros"
        style={{ fill: 'white' }}
        flipHorizontal
      />
      <div style={{ backgroundColor: 'var(--tilavaraus-gray)' }}>
        <Container main>
          <SearchResultList search={search} />
        </Container>
      </div>
    </>
  );
};

export default Search;
