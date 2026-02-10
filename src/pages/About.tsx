
import MainLayout from '../layouts/MainLayout';
import AboutComponent from '../components/About';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>About DJ SeyJ (Dorpe Karl Seyram) - Formerly DJ Valency</title>
                <meta name="description" content="Learn more about SeyJ Mandem (Dorpe Karl Seyram), formerly known as DJ Valency. Discover his journey as a DJ, Web Developer, and Cyber Analyst." />
                <meta name="keywords" content="DJ SeyJ, Dorpe Karl Seyram, DJ Valency, About DJ SeyJ, Ghana DJ, Web Developer Biography" />
            </Helmet>
            <div className="pt-20">
                <AboutComponent />
            </div>
        </MainLayout>
    );
};

export default About;
