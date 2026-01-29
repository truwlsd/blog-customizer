import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

// Импортируем UI-компоненты
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

// Импортируем константы и типы
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Типизируем пропсы: форма принимает функцию для обновления глобального состояния
type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	// 1. Состояние открытия/закрытия панели
	const [isOpen, setIsOpen] = useState(false);

	// 2. Локальное состояние формы (черновик настроек)
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Реф для отслеживания клика вне формы
	const formRef = useRef<HTMLDivElement>(null);

	// Функция открытия/закрытия
	const togglePanel = () => setIsOpen(!isOpen);

	// 3. Закрытие по клику вне формы
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	// 4. Обработчик "Применить"
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState); // Передаем локальные настройки в глобальный App
		setIsOpen(false); // Закрываем панель после применения
	};

	// 5. Обработчик "Сбросить"
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState); // Сбрасываем локально в форме
		setArticleState(defaultArticleState); // Сбрасываем глобально в статье
	};
	

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>

					{/* Выбор шрифта */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(val) =>
							setFormState({ ...formState, fontFamilyOption: val })
						}
						title='Шрифт'
					/>

					{/* Выбор размера шрифта */}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(val) =>
							setFormState({ ...formState, fontSizeOption: val })
						}
						title='Размер шрифта'
					/>

					{/* Выбор цвета шрифта */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(val) => setFormState({ ...formState, fontColor: val })}
						title='Цвет шрифта'
					/>

					<Separator />

					{/* Выбор цвета фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(val) =>
							setFormState({ ...formState, backgroundColor: val })
						}
						title='Цвет фона'
					/>

					{/* Выбор ширины контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(val) =>
							setFormState({ ...formState, contentWidth: val })
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
