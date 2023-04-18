import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import View from '../pages/View';
import { BrowserRouter } from 'react-router-dom';

describe('View Component Test', () => {
	test('renders without crashing', () => {
		const { container } = render(
			<BrowserRouter>
				<View />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});
});
