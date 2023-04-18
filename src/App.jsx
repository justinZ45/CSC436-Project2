import { Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import View from './pages/View';
import Create from './pages/Create';
import Blog from './pages/Blog';
import BlogEdit from './pages/BlogEdit';
import './App.css';

function App() {
	return (
		<>
			<Header />
			<Container>
				<Routes>
					<Route index element={<View />}></Route>
					<Route path="/blog/:id" element={<Blog />}></Route>
					<Route path="/blog/:id/edit" element={<BlogEdit />}></Route>
					<Route path="/create" element={<Create />}></Route>
				</Routes>
			</Container>
			<Footer />
		</>
	);
}

export default App;
