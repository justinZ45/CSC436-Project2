import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Blogs = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getData = async () => {
		const url = 'http://localhost:3001/v1/api/posts';
		setLoading(true);
		setError(false);
		try {
			const request = await fetch(url);
			const response = await request.json();
			setBlogPosts(response);
		} catch (e) {
			setError('Error: ' + e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	console.log(blogPosts);

	return (
		<>
			{error && <ErrorAlert>{error}</ErrorAlert>}
			{!error && loading && (
				<div className="max-w-[500px]">
					<Skeleton count="`10" />
					<div className="text-2xl font-bold ">loading...</div>
				</div>
			)}
			{!error && !loading && (
				<>
					<div className="text-4xl font-bold">Your Post Feed</div>
					<br />
					<br />
					{blogPosts.map((blog) => {
						return (
							<div className="flex h-400px justify-center items-center" key={blog.id}>
								<div className="text-center ">
									<div className="transform transition duration-400 hover:scale-125 ">
										<Link className="text-xl font-bold  " to={`/blog/${blog.id}`}>
											<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border-4 border-black ">
												<div className="px-6 py-4">
													<div className="font-bold text-xl mb-2">{blog.title}</div>
													<p className="text-gray-700 text-base">{blog.content}</p>
												</div>
											</div>
										</Link>
									</div>
									<br />
									<br />
								</div>
							</div>
						);
					})}
				</>
			)}
		</>
	);
};

export default Blogs;
