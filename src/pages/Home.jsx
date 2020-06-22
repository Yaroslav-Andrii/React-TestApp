import React, { Fragment, useContext, useEffect } from 'react';

import { Form } from '../components/Form';
import { Notes } from '../components/Notes';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Loader } from '../components/Loader';
import { AlertContext } from '../context/alert/AlertContext';

export const Home = () => {
	
	const {
		fetchNotes,
		removeNote,
		loading,
		notes
	} = useContext(FirebaseContext);

	const {show} =	useContext(AlertContext);

	useEffect(() => {
		fetchNotes();		
		//eslint-disable-next-line
	}, [])

	const onRemove = (id) => {
		show('The note was delet');
		removeNote(id);
	}

	return (
		<Fragment>
			<Form/>
			<hr/>
			{loading ? <Loader/> : <Notes notes={notes} onRemove={onRemove}/>}
		</Fragment>
	);
}