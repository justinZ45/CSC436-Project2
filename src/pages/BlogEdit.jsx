import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogEdit = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const params = useParams();

	console.log(params.id);

	const getBlogData = async () => {
		const url = `http://localhost:3001/v1/api/posts/${params.id}`; //fetch from books api based on book id
		setLoading(true);
		setError(false);
		try {
			const request = await fetch(url);
			const response = await request.json();
			setTitle(response.title);
			setContent(response.content);
		} catch (e) {
			setError('Error: ' + e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBlogData();
	}, [params.id]);

	const editPost = async () => {
		const url = `http://localhost:3001/v1/api/posts/${params.id}`; //fecth from books api based on book id
		setError(false);
		try {
			const body = { title, content };

			const response = await fetch(url, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (response.status == 200) {
				alert('Post Updated');
			}
		} catch (e) {
			setError('Error: ' + e.message);
		}
	};

	const deletePost = async () => {
		const url = `http://localhost:3001/v1/api/posts/${params.id}`; //fecth from books api based on book id
		setError(false);
		try {
			const body = { title, content };

			const response = await fetch(url, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			if (response.status == 200) {
				alert('Post Deleted');
				window.location = '/';
			}
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

	console.log(title);

	return (
		<Container>
			{error && <ErrorAlert>{error}</ErrorAlert>}
			{!error && !loading && (
				<>
					<div className="text-4xl font-bold">Edit a Post</div>
					<br />
					<br />
					<br />
					<div className="flex h-500x justify-center items-center">
						<div className="text-center ">
							<div className="w-full max-w-xs">
								<form className="bg-white shadow-md rounded px-14 pt-6 pb-8 mb-4  scale-125 border-2 border-black">
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">
											Title
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											name="title"
											placeholder={title}
											value={title}
											onChange={titleHandler}
										></input>
									</div>
									<div className="mb-6">
										<label className="block text-gray-700 text-sm font-bold mb-2">
											Content
										</label>
										<input
											className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
											name="content"
											placeholder={content}
											value={content}
											onChange={contentHandler}
										></input>
									</div>
									<div className="flex items-center justify-between">
										<a
											className="relative inline-flex items-center justify-center p-4  py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-4 border-blue-500  shadow-md group"
											onClick={(e) => editPost(e)}
										>
											<span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
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
											<span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
												Update{' '}
											</span>
											<span className="relative invisible">Update</span>
										</a>

										<a
											className="relative inline-flex items-center justify-center p-4 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-4 border-red-500  shadow-md group"
											onClick={(e) => deletePost(e)}
										>
											<span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
												<svg
													className="w-6 h-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/4000/svg"
												>
													<path strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
												</svg>
											</span>
											<span className="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">
												Delete{' '}
											</span>
											<span className="relative invisible">Delete</span>
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</>
			)}
		</Container>
	);
};

export default BlogEdit;
