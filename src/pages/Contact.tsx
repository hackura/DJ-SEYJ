
import MainLayout from '../layouts/MainLayout';
import ContactComponent from '../components/Contact';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Contact DJ SeyJ - Book Now</title>
                <meta name="description" content="Get in touch with DJ SeyJ Mandem for bookings, inquiries, or just to say hello." />
            </Helmet>
            <div className="pt-20">
                <ContactComponent />
            </div>
        </MainLayout>
    );
};

export default Contact;
