const OtherSuccess = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-center">Thanh toán thành công!</h2>
                <p className="text-gray-700 mb-8 text-center">Cảm ơn bạn đã tin tưởng chúng tôi.</p>
                <div className="text-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm4 7a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v2zm-4 4a1 1 0 0 0 1-1V8a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1z" />
                    </svg>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded"><a href="/">Quay Lại Trang Chủ</a></button>
                </div>
            </div>
        </div>
    );
};

export default OtherSuccess;
