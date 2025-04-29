import { DNA } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div className='loader-spinner'>
            <DNA
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>)
}

export default LoadingSpinner
