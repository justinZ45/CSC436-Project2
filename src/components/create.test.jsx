import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Create from '../pages/Create';
import { BrowserRouter } from 'react-router-dom';

describe('Create Component Test', () => {
	test('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<Create />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});
});
