import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import BlogEdit from '../pages/BlogEdit';
import { BrowserRouter } from 'react-router-dom';

describe('Edit Component Test', () => {
	test('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<BlogEdit />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});
});
