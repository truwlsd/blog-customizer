import { useState, CSSProperties } from 'react';

// Импортируем компоненты из соседних папок в components/
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

// Импортируем константы (поднимаемся на 2 уровня выше: app -> components -> src)
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

// Импортируем стили (путь к глобальным стилям или модулям)
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main} // ИСПРАВЛЕНО: убрали clsx для статичного класса
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
