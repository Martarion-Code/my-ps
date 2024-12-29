// components/LoadingSpinner.js
import { SyncLoader } from 'react-spinners'

const LoadingSpinner = ({ loading }) => {
	return (
		<div className={`loading-spinner-overlay ${'visible'}`}>
			<div className="loading-spinner">
				<SyncLoader color={'#4153b3'} loading={true} />
			</div>
		</div>
	)
}

export default LoadingSpinner
