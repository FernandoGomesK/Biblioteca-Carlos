import MoveButton from '../Button';

function LandingPageHeader() {
    return(
 
 <div className="flex flex-row justify-between items-center padding-6 m-6 border-b border-gray-600">
            <div className="flex flex-row gap-4 ml-4 mb-4 items-center justify-center">
                <div className="flex flex-row gap-2 items-center">
                    <svg className="w-6 h-6 text-white dark:text-white bg-blue-500 rounded-md min-h-6 min-w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                    </svg>
                    <p className="text-lg font-bold text-blue-500">Simple Book/PDF Manager</p>
                    
                </div>
                
                <div className="flex flex-row gap-2 items-center">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                    </svg>
                
                <MoveButton text="Home" to="/" onClick={() => {}} isSecondary={true} />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                    </svg>
                    
                    <MoveButton text="Library" to="/library" onClick={() => {}} isSecondary={true} />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                    </svg>
                    
                    <MoveButton text="Profile" to="/profile" onClick={() => {}} isSecondary={true} />
                </div>        
            </div >
            <div className="flex flex-row gap-4 ml-4 mb-4 items-center justify-center">
                <input placeholder="Search books..." className="border border-gray-300 rounded-md p-2 h-6"></input>
                <MoveButton text="Sign in" to="/login" onClick={() => {}} />
            </div>
                
            
        </div>

);}

export default LandingPageHeader;
