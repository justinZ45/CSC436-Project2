import Container from '../components/Container';
import { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';

const Create = () => {
	const [error, setError] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const createPost = async () => {
		const url = 'http://localhost:3001/v1/api/posts'; //fecth from books api based on book id
		setError(false);
		try {
			const body = { title, content };

			await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			alert('Post Created');
			window.location = '/';
		} catch (e) {
			setError('Error: ' + e.message);
		}
	};

	const titleHandler = (e) => {
		//function to set user's input
		setTitle(e.target.value);
	};

	const contentHandler = (e) => {
		//function to set user's input
		setContent(e.target.value);
	};

	return (
		<Container>
			{error && <ErrorAlert>{error}</ErrorAlert>}
			<div className="text-4xl font-bold">Create a Post</div>
			<br />
			<br />
			<br />
			<div className="flex h-500x justify-center items-center">
				<div className="text-center ">
					<div className="w-full max-w-xs">
						<form className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 border-2 border-black scale-125">
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Title
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									name="title"
									placeholder="title"
									value={title}
									onChange={titleHandler}
								></input>
							</div>
							<div className="mb-6">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Content
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
									name="content"
									placeholder="content"
									value={content}
									onChange={contentHandler}
								></input>
							</div>
							<div className="flex items-center justify-between">
								<a
									className="relative inline-flex items-center justify-center p-4 px-20 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-4 border-green-500  shadow-md group"
									onClick={(e) => createPost(e)}
								>
									<span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"  
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/4000/svg"
										>
											<path
												strokeWidth="2"
												d="                                        M5 13l4 4L19 7
"
											></path>
										</svg>
									</span>
									<span className="absolute flex items-center justify-center w-full h-full  text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
										Create{' '}
									</span>
									<span className="relative invisible">Create</span>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Create;
