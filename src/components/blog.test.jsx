import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Blog from '../pages/Blog';
import { BrowserRouter } from 'react-router-dom';

describe('Blog Component Test', () => {
	test('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<Blog />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});
});
