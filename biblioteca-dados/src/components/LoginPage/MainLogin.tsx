function MainLogin() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-grey-500 ">
            <div className="shadow-lg p-8 rounded-lg bg-white ">
                <p className="text-2xl font-bold mb-4">
                    Sign In
                </p>
                <p>
                    please enter your credentials to access your account.
                </p>

                

                <div className="flex flex-col ">
                    <div>
                        <p>
                            Account Type
                        </p>
                    </div>
                    <div className="flex flex-row gap-4 justify-center">
                        <button>
                            Clerk
                        </button>
                        <button>
                            Reader
                        </button>
                    </div> 
                </div>

                
                <form className="flex flex-col mt-4">
                    <p>
                        Email or Username
                    </p>
                    <input type="text" placeholder="Name@domain.com" className="border border-gray-300 rounded-lg p-2 w-full mb-4">
                    </input>
                    <p>
                        Password
                    </p>
                
                    <input type="password" placeholder="*******" className="border border-gray-300 rounded-lg p-2 w-full mb-4">
                    </input>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                        Sign In
                    </button>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <p>Don't Have an account? sign up</p>
                    </div>
                </form>

            </div>
        
        </div>
    );}

export default MainLogin;