import { useState, useEffect } from 'react';
import api from '../lib/api';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AlertModal from '../components/ui/AlertModal';
import { Helmet } from 'react-helmet-async';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/api/users');
                setUsers(data);
                setLoading(false);
            } catch {
                toast.error('Failed to load personnel data.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const confirmDeleteHandler = (id) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = async () => {
        if (!userToDelete) return;

        try {
            await api.delete(`/api/users/${userToDelete}`);
            toast.success('Personnel record purged.');
            setUsers((prev) => prev.filter((user) => user._id !== userToDelete)); // Optimistic/Local update
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        } catch {
            toast.error('Purge failed.');
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-clinical-canvas text-clinical-ink pt-32 pb-40 font-mono">
            <Helmet>
                <title>Personnel | Command Center</title>
            </Helmet>
            <div className="container mx-auto px-container-sm md:px-container-md lg:px-container-lg max-w-7xl">

                <div className="mb-12">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-clinical-ink/40 mb-2 block">
                        Admin Protocol
                    </span>
                    <h1 className="font-display font-black text-5xl md:text-heading-sub uppercase leading-[0.9]">Personnel Database</h1>
                </div>

                <div className="overflow-x-auto border border-clinical-ink/10 bg-white rounded-3xl shadow-soft">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-clinical-ink/10 text-[10px] uppercase tracking-widest text-clinical-ink/40">
                                <th className="p-6 font-normal">ID</th>
                                <th className="p-6 font-normal">Name</th>
                                <th className="p-6 font-normal">Email (Contact)</th>
                                <th className="p-6 font-normal text-center">Admin Access</th>
                                <th className="p-6 font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-clinical-ink/5 text-[11px] uppercase tracking-wide">
                            {users.map((user) => (
                                <tr key={user._id} className="group hover:bg-clinical-canvas/50 transition-colors">
                                    <td className="p-6 text-clinical-ink/30 font-mono">{user._id.substring(20, 24)}...</td>
                                    <td className="p-6 font-bold text-clinical-ink">{user.name}</td>
                                    <td className="p-6 font-mono text-clinical-ink/70 lowercase">{user.email}</td>
                                    <td className="p-6 text-center">
                                        {user.isAdmin ? (
                                            <FaCheck className="mx-auto text-signal-success" />
                                        ) : (
                                            <FaTimes className="mx-auto text-clinical-ink/20" />
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => confirmDeleteHandler(user._id)}
                                            className="text-clinical-ink/40 hover:text-signal-error transition-colors p-2"
                                            disabled={user.isAdmin}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {loading && (
                    <div className="mt-8 text-center font-mono text-xs text-clinical-ink/40 animate-pulse">
                        Synchronizing Database...
                    </div>
                )}
            </div>

            <AlertModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Purge Personnel Record"
                message="Confirm deletion of this user. This action cannot be undone."
                type="danger"
                actionLabel="Confirm Purge"
                onAction={executeDelete}
            />
        </div>
    );
};

export default UserListPage;
