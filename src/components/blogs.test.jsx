import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Blogs from '../pages/Blogs';
import { BrowserRouter } from 'react-router-dom';

describe('Blogs Component Test', () => {
	test('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<Blogs />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});
});
