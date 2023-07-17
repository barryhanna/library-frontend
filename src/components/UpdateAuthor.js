import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS } from '../queries/queries';

const UPDATE_AUTHOR_BIRTHYEAR = gql`
	mutation setBirthYear($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			born
		}
	}
`;

const UpdateAuthor = ({ setError }) => {
	const [updateAuthor] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const [name, setName] = useState('');
	const [birthyear, setBirthyear] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		updateAuthor({ variables: { name, born: birthyear } });
		setName('');
		setBirthyear('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Set birthyear</h2>
			<label htmlFor="name">
				name
				<input
					type="text"
					name="name"
					id="name"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
			</label>
			<label htmlFor="born">
				born
				<input
					type="text"
					name="born"
					id="born"
					onChange={(e) => setBirthyear(Number(e.target.value))}
					value={birthyear}
				/>
			</label>
			<button type="submit">update author</button>
		</form>
	);
};

export default UpdateAuthor;
