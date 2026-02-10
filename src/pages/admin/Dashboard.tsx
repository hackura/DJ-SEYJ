
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Upload, Music, Image as ImageIcon, Home, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            }
            setLoading(false);
        };
        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!audioFile || !imageFile) { /* We might want to allow default image later */
            setStatus('Please select both audio and image files.');
            return;
        }

        setUploading(true);
        setStatus('Uploading files...');

        try {
            // 1. Upload Audio
            const audioExt = audioFile.name.split('.').pop();
            const audioFileName = `${Date.now()}-audio.${audioExt}`;
            const { error: audioError } = await supabase.storage
                .from('mixes')
                .upload(audioFileName, audioFile);

            if (audioError) throw audioError;

            // 2. Upload Image
            const imageExt = imageFile.name.split('.').pop();
            const imageFileName = `${Date.now()}-cover.${imageExt}`;
            const { error: imageError } = await supabase.storage
                .from('mixes')
                .upload(imageFileName, imageFile);

            if (imageError) throw imageError;

            // 3. Get Public URLs
            const { data: { publicUrl: audioUrl } } = supabase.storage.from('mixes').getPublicUrl(audioFileName);
            const { data: { publicUrl: imageUrl } } = supabase.storage.from('mixes').getPublicUrl(imageFileName);

            // 4. Insert into Database
            const { error: dbError } = await supabase.from('mixes').insert([
                {
                    title,
                    description,
                    audio_url: audioUrl,
                    cover_url: imageUrl,
                    created_at: new Date().toISOString(),
                }
            ]);

            if (dbError) throw dbError;

            setStatus('Mix uploaded successfully!');
            setTitle('');
            setDescription('');
            setAudioFile(null);
            setImageFile(null);

        } catch (error: unknown) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setStatus(`Error: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
                <div className="mb-12 flex justify-end">
                    <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm">
                        <Home size={16} /> Back to Public Site
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Form */}
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Upload size={20} className="text-gold-500" /> Upload New Mix
                        </h2>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Mix Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
                                    placeholder="e.g. Summer Vibes Vol. 1"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 h-24"
                                    placeholder="Tracklist or description..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Audio File (MP3)</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                                            className="hidden"
                                            id="audio-upload"
                                        />
                                        <label htmlFor="audio-upload" className="flex items-center justify-center w-full h-32 bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-gold-500 transition-colors">
                                            {audioFile ? (
                                                <div className="text-center">
                                                    <Music className="mx-auto mb-2 text-gold-500" />
                                                    <span className="text-xs text-gray-300 truncate max-w-[100px] block">{audioFile.name}</span>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-500">
                                                    <Music className="mx-auto mb-2" />
                                                    <span className="text-xs">Select MP3</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Cover Art</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="flex items-center justify-center w-full h-32 bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-gold-500 transition-colors">
                                            {imageFile ? (
                                                <div className="text-center">
                                                    <img
                                                        src={URL.createObjectURL(imageFile)}
                                                        alt="Preview"
                                                        className="h-20 w-20 object-cover rounded mx-auto mb-1"
                                                    />
                                                    <span className="text-xs text-gray-300 truncate max-w-[100px] block">{imageFile.name}</span>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-500">
                                                    <ImageIcon className="mx-auto mb-2" />
                                                    <span className="text-xs">Select Image</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {status && (
                                <div className={`p-3 rounded-lg text-sm ${status.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                    {status}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-gold-500 text-black font-bold py-3 rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {uploading ? <><Loader2 className="animate-spin" /> Uploading...</> : 'Upload Mix'}
                            </button>
                        </form>
                    </div>

                    {/* Quick Stats / Recent Uploads Placeholders */}
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-6">Recent Uploads</h2>
                        <div className="text-gray-500 text-center py-12">
                            No uploads yet.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
