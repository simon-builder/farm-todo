'use client';
import React, { useState } from "react";
import { createList, deleteList, updateList } from '../actions';
import { FaTrash, FaChevronRight } from 'react-icons/fa';
import ConfirmDialog from './ConfirmDialog';

interface ListItem {
  id: string;
  name: string;
}

interface ListDisplayProps {
  lists: ListItem[];
}

const ListDisplay: React.FC<ListDisplayProps> = ({ lists: initialLists }) => {
  const [newListName, setNewListName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    
    try {
      await createList(newListName);
      setNewListName("");
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const result = await deleteList(deleteId);
      if (result === null) {
        console.error('Failed to delete list');
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, list: ListItem) => {
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditingName("");
    } else if (e.key === 'Enter') {
      if (editingName.trim() && editingName !== list.name) {
        try {
          const result = await updateList(list.id, editingName.trim());
          if (result === null) {
            console.error('Failed to update list');
            return;
          }
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
        }
      }
      setEditingId(null);
    }
  };

  const handleBlur = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text animate-gradient bg-300% hover:scale-105 transition-transform">
          Lists
        </h1>
        <p className="text-sm mt-2 text-gray-400">Organize your tasks with style</p>
      </div>
      
      <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 shadow-lg mb-8">
        <input 
          type="text" 
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Create new list..."
          className="w-full bg-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
        <button 
          onClick={handleCreateList}
          className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-3 transition-all"
        >
          Create List
        </button>
      </div>

      <div className="space-y-2">
        {initialLists.map((list) => (
          <div 
            key={list.id}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group"
          >
            {editingId === list.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, list)}
                onBlur={handleBlur}
                className="bg-white/10 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                autoFocus
              />
            ) : (
              <span 
                className="font-medium"
                onDoubleClick={() => {
                  setEditingId(list.id);
                  setEditingName(list.name);
                }}
              >
                {list.name}
              </span>
            )}
            <div className="flex items-center space-x-3">
              <FaTrash 
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(list.id);
                }}
              />
              <FaChevronRight 
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete List"
        message="Are you sure you want to delete this list? This action cannot be undone."
      />
    </div>
  );
};

export default ListDisplay;
