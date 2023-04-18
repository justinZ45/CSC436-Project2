import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

const Blog = () => {
	const params = useParams();
	console.log(params.id);

	const [blogPost, setBlogPost] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getBlogData = async () => {
		const url = `http://localhost:3001/v1/api/posts/${params.id}`; //fetch from posts api based on post id
		setLoading(true);
		setError(false);
		try {
			const request = await fetch(url);
			const response = await request.json();
			setBlogPost(response); //set data to state
		} catch (e) {
			setError('Error: ' + e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBlogData();
	}, [params.id]);

	const UpDate = new Date(blogPost.last_updated); //data object used to convert UTC to local time

	const pubDate = new Date(blogPost.originally_published); //data object used to convert UTC to local time

	return (
		<Container>
			{error && <ErrorAlert>{error}</ErrorAlert>}
			{!error && loading && (
				<div className="max-w-[230px]">
					<Skeleton count="7" />
					<div className="text-2xl font-bold ">loading...</div>
				</div>
			)}
			{!error && !loading && (
				<>
					<div className="flex h-500x justify-center items-center">
						<div className="text-center ">
							<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border-4 border-black scale-125">
								<br />
								<div className="transform transition duration-400 hover:scale-125 ">
									<Link to={'./edit'}>
										<a
											href="#_"
											className="relative px-5 py-3 overflow-hidden font-medium text-black bg-gray-400 border border-gray-100 rounded-lg shadow-inner group"
										>
											<span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
											<span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
											<span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
											<span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
											<span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
											<span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
												Edit Post
											</span>
										</a>
									</Link>
								</div>
								<div className="px-6 py-4">
									<div className="font-bold text-xl mb-2">{blogPost.title}</div>
									<p className="text-gray-700 text-base">{blogPost.content}</p>
								</div>
								<div className="px-6 pt-4 pb-2">
									<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										Last Updated: {UpDate.toString()}
									</span>
									<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										Originally Published: {pubDate.toString()}
									</span>
								</div>
							</div>
						</div>
					</div>
					<br />
					<br />
				</>
			)}
		</Container>
	);
};

export default Blog;
