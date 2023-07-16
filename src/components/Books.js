import React from 'react';
import { gql, useQuery } from '@apollo/client';

const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
		}
	}
`;

const Books = (props) => {
	const [books, setBooks] = React.useState([]);
	const results = useQuery(ALL_BOOKS);

	React.useEffect(() => {
		setBooks(results?.data?.allBooks || []);
	}, [results?.data?.allBooks]);

	if (!props.show) {
		return null;
	}

	if (results.loading) {
		return <div>Loading books...</div>;
	}

	if (books.length === 0) {
		return <p>No books.</p>;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th>title</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
