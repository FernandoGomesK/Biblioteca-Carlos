import Header from '../components/LandingPage/LandingPageHeader';
import Footer from '../components/LandingPage/LandingPageFooter';
import { Outlet } from 'react-router-dom';

function PageLayout (){
    return(

        <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
                <Outlet />
            </main>
        <Footer />
        </div>
    );
}


export default PageLayout;