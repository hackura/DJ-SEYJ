
import MainLayout from '../layouts/MainLayout';
import ServicesComponent from '../components/Services';
import { Helmet } from 'react-helmet-async';

const Services = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Services - DJ SeyJ Mandem</title>
                <meta name="description" content="Professional DJ services for weddings, parties, corporate events, and more. Check out what DJ SeyJ offers." />
            </Helmet>
            <div className="pt-20">
                <ServicesComponent />
            </div>
        </MainLayout>
    );
};

export default Services;
