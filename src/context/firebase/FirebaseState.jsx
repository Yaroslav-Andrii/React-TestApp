import React, { useReducer } from 'react';
import { FirebaseContext } from './firebaseContext';
import { firebaseReducer } from './firebaseReducer';
import { SHOW_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE } from '../types';
import axios from 'axios';

const URL = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
	const initialState = {
		notes: [],
		loading: false,
	}
	const [state, dispatch] =	useReducer(firebaseReducer, initialState);

	const showLoader = () => dispatch({ type: SHOW_LOADER })

	const fetchNotes = async () => {
		showLoader();
		const res = await axios.get(`${URL}/notes.json`);

		if (!res.data) {
			dispatch({
				type: FETCH_NOTES,
				payload: [],
			})
		} else {
			const payload = Object.keys(res.data).map(item => ({...res.data[item], id: item}));

			dispatch({
				type: FETCH_NOTES,
				payload,
			})
		}
	}

	const addNote = async title => {
		try {
			const note = {
				title,
				date: new Date().toJSON(),
			}
	
			const res = await axios.post(`${URL}/notes.json`, note);

			const payload = {
				...note,
				id: res.data.name
			}
			
			dispatch({
				type: ADD_NOTE,
				payload
			})
		} catch (error) {
			throw error
		}
	}

	const removeNote = async noteId => {
		await axios.delete(`${URL}/notes/${noteId}.json`)

		dispatch({
			type: REMOVE_NOTE,
			payload: noteId
		})
	}

	return (
		<FirebaseContext.Provider
			value={{
				fetchNotes,
				addNote,
				removeNote, 
				showLoader,
				loading: state.loading,
				notes: state.notes
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
}
