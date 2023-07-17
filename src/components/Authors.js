import React from 'react';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { ALL_AUTHORS } from '../queries/queries';
import UpdateAuthor from './UpdateAuthor';

const Authors = (props) => {
	const [authors, setAuthors] = React.useState([]);
	const results = useQuery(ALL_AUTHORS);

	useEffect(() => {
		setAuthors(results?.data?.allAuthors || []);
	}, [results?.data?.allAuthors]);

	if (!props.show) {
		return null;
	}

	if (results.loading) {
		return <div>Loading authors...</div>;
	}

	if (authors.length === 0) {
		return <p>No books.</p>;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<UpdateAuthor authors={authors} />
		</div>
	);
};

export default Authors;
