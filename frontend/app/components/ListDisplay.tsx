'use client';
import React, { useState } from "react";
import { createList } from '../actions';

interface ListItem {
  id: string;
  name: string;
}

interface ListDisplayProps {
  lists: ListItem[];
}

const ListDisplay: React.FC<ListDisplayProps> = ({ lists: initialLists }) => {
  const [newListName, setNewListName] = useState("");

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

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 inline-block text-transparent bg-clip-text">
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
            <span className="font-medium">{list.name}</span>
            <svg 
              className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDisplay;
