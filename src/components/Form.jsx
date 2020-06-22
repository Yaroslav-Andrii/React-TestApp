import React, {useState, useContext} from 'react';
import { AlertContext } from '../context/alert/AlertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Form = () => {
	const [value, setValue] = useState('');
	const alert = useContext(AlertContext);
	const { addNote, fetchNotes } = useContext(FirebaseContext);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			if (value.trim()) {
				await addNote(value.trim());
				await fetchNotes();
	
				alert.show('Note was create', 'success');
	
				setValue('');
			} else {
				alert.show('The field is empty!');
			}
		} catch (error) {
			alert.show(error.message, 'danger');
		}
	}

	return (
		<form
			onSubmit={submitHandler}
		>
			<div className="form-group">
				<input 
					type="text" 
					className="form-control"
					placeholder="Enter note"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
		</form>
	)
}