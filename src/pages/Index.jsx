import React, { useState, useEffect } from 'react'
import qs from 'qs' 

function Index() {

    const [articles, setArticles] = useState([]);

    const query = qs.stringify(
        { populate: '*' },
        { encodeValuesOnly: true }
    )

    const fetchData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/articles?${query}`);
            const json = await res.json();
            const articles = json.data;
            setArticles(articles);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return articles.length > 0 && (
        <div>
            <div className="title-wrapper">
                <h1 className='app__title'>Test CMS Strapi pour 308—MA</h1>
            </div>
            {articles.map((article) => {

                const articleCategory = article.attributes['categories'].data[0].attributes['nom']

                return (
                    <div className="article__card" key={ article.id }>
                        <p className="article__title">{ article.attributes['titre'] }</p>
                        <p className="article__content">{article.attributes['contenu']}</p>
                        <p className="article__category">{ articleCategory }</p>
                    </div>
                )
            }) }
        </div>
    )
}

export default Index