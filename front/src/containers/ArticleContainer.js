import React, {useState} from 'react';
import Article from "../components/Article";

const ArticleContainer = () => {
    const postTime = "Il y a 1 heure";

    const [comment, setComment] = useState('');
    const handleChange = (e) => {
        setComment(e.target.value);
    };
    return (
        <Article
            postTime={postTime}
            comment={comment}
            handleChange={handleChange}
        />
    );
};

export default ArticleContainer;