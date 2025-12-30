'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';
import { AuthContext, AuthContextType, User } from '../../../features/auth';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AlertModal from '../../../components/ui/AlertModal';
import { useCallback } from 'react';

const UserListPage = () => {
    const { user, loading: authLoading } = useContext(AuthContext) as AuthContextType;
    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    // Auth Protection
    useEffect(() => {
        if (!authLoading) {
            if (!user || !user.isAdmin) {
                router.push('/login');
            }
        }
    }, [user, authLoading, router]);

    const fetchUsers = useCallback(async () => {
        try {
            const { data } = await api.get('/api/users');
            setUsers(data);
            setLoading(false);
        } catch {
            toast.error('Failed to load personnel data.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const syncUsers = async () => {
            if (user && user.isAdmin) {
                await fetchUsers();
            }
        };
        syncUsers();
    }, [user, fetchUsers]);

    const confirmDeleteHandler = (id: string) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = async () => {
        if (!userToDelete) return;

        try {
            await api.delete(`/api/users/${userToDelete}`);
            toast.success('Personnel record purged.');
            setUsers((prev) => prev.filter((u) => u._id !== userToDelete));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        } catch {
            toast.error('Purge failed.');
            setIsDeleteModalOpen(false);
        }
    };

    if (authLoading || !user || !user.isAdmin) {
        return <div className="min-h-screen pt-20 md:pt-32 text-center font-mono text-clinical-ink/40 animate-pulse">Verifying Credentials...</div>;
    }

    return (
        <div className="min-h-screen pt-20 md:pt-32 pb-40 font-mono text-clinical-ink bg-clinical-canvas">
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
                            {users.map((u) => (
                                <tr key={u._id} className="group hover:bg-clinical-canvas/50 transition-colors">
                                    <td className="p-6 text-clinical-ink/30 font-mono">{u._id.substring(20, 24)}...</td>
                                    <td className="p-6 font-bold text-clinical-ink">{u.name}</td>
                                    <td className="p-6 font-mono text-clinical-ink/70 lowercase">{u.email}</td>
                                    <td className="p-6 text-center">
                                        {u.isAdmin ? (
                                            <FaCheck className="mx-auto text-signal-success" />
                                        ) : (
                                            <FaTimes className="mx-auto text-clinical-ink/20" />
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => confirmDeleteHandler(u._id)}
                                            className="text-clinical-ink/40 hover:text-signal-error transition-colors p-2"
                                            disabled={u.isAdmin}
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
                type="error"
                actionLabel="Confirm Purge"
                onAction={executeDelete}
            />
        </div>
    );
};

export default UserListPage;
