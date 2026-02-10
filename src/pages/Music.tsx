
import MainLayout from '../layouts/MainLayout';
import MixesComponent from '../components/Mixes';
import { Helmet } from 'react-helmet-async';

const Music = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Music & Mixes - DJ SeyJ Mandem</title>
                <meta name="description" content="Listen to the latest mixes and sets by DJ SeyJ Mandem. Vibes on replay." />
            </Helmet>
            <div className="pt-20">
                <MixesComponent />
            </div>
        </MainLayout>
    );
};

export default Music;
