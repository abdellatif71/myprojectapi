

'use client'; 

import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string; // urlToImage ist optional
}

const Home = () => {

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {

    const fetchArticles = async () => {
    
        const apiKey = '5763595b2c4446cdaae3a00385b2add4'; // Ersetze mit deinem API-Schlüssel
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setArticles(data.articles);
     
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js News App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 7. JSX rendert die Artikel */}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Next.js News App
        </h1>

        <div className={styles.grid}>
          {/* 7. JSX rendert die Artikel */}
          {articles.map((article, index) => (
            <a key={index} href={article.url} className={styles.card}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className={styles.image} />}
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <a
          href="https://newsapi.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NewsAPI.org
        </a>
      </footer>
    </div>
  );
};

export default Home;