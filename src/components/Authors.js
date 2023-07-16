import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

const Authors = (props) => {
	const [authors, setAuthors] = React.useState([]);
	const results = useQuery(ALL_AUTHORS);

	useEffect(() => {
		setAuthors(results.data.allAuthors);
	}, []);

	if (!props.show) {
		return null;
	}

	if (results.loading) {
		return <div>Loading authors...</div>;
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
		</div>
	);
};

export default Authors;
