"use client";

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Input } from './Input';

export const countryCodes = [
  { code: "+93", name: "Afghanistan", emoji: "🇦🇫" },
  { code: "+355", name: "Albania", emoji: "🇦🇱" },
  { code: "+213", name: "Algeria", emoji: "🇩🇿" },
  { code: "+376", name: "Andorra", emoji: "🇦🇩" },
  { code: "+244", name: "Angola", emoji: "🇦🇴" },
  { code: "+54", name: "Argentina", emoji: "🇦🇷" },
  { code: "+374", name: "Armenia", emoji: "🇦🇲" },
  { code: "+61", name: "Australia", emoji: "🇦🇺" },
  { code: "+43", name: "Austria", emoji: "🇦🇹" },
  { code: "+994", name: "Azerbaijan", emoji: "🇦🇿" },
  { code: "+973", name: "Bahrain", emoji: "🇧🇭" },
  { code: "+880", name: "Bangladesh", emoji: "🇧🇩" },
  { code: "+375", name: "Belarus", emoji: "🇧🇾" },
  { code: "+32", name: "Belgium", emoji: "🇧🇪" },
  { code: "+55", name: "Brazil", emoji: "🇧🇷" },
  { code: "+359", name: "Bulgaria", emoji: "🇧🇬" },
  { code: "+855", name: "Cambodia", emoji: "🇰🇭" },
  { code: "+1", name: "Canada/US", emoji: "🇺🇸" },
  { code: "+56", name: "Chile", emoji: "🇨🇱" },
  { code: "+86", name: "China", emoji: "🇨🇳" },
  { code: "+57", name: "Colombia", emoji: "🇨🇴" },
  { code: "+385", name: "Croatia", emoji: "🇭🇷" },
  { code: "+420", name: "Czech Republic", emoji: "🇨🇿" },
  { code: "+45", name: "Denmark", emoji: "🇩🇰" },
  { code: "+20", name: "Egypt", emoji: "🇪🇬" },
  { code: "+372", name: "Estonia", emoji: "🇪🇪" },
  { code: "+358", name: "Finland", emoji: "🇫🇮" },
  { code: "+33", name: "France", emoji: "🇫🇷" },
  { code: "+995", name: "Georgia", emoji: "🇬🇪" },
  { code: "+49", name: "Germany", emoji: "🇩🇪" },
  { code: "+30", name: "Greece", emoji: "🇬🇷" },
  { code: "+852", name: "Hong Kong", emoji: "🇭🇰" },
  { code: "+36", name: "Hungary", emoji: "🇭🇺" },
  { code: "+354", name: "Iceland", emoji: "🇮🇸" },
  { code: "+91", name: "India", emoji: "🇮🇳" },
  { code: "+62", name: "Indonesia", emoji: "🇮🇩" },
  { code: "+98", name: "Iran", emoji: "🇮🇷" },
  { code: "+964", name: "Iraq", emoji: "🇮🇶" },
  { code: "+353", name: "Ireland", emoji: "🇮🇪" },
  { code: "+972", name: "Israel", emoji: "🇮🇱" },
  { code: "+39", name: "Italy", emoji: "🇮🇹" },
  { code: "+81", name: "Japan", emoji: "🇯🇵" },
  { code: "+962", name: "Jordan", emoji: "🇯🇴" },
  { code: "+7", name: "Kazakhstan/Russia", emoji: "🇷🇺" },
  { code: "+254", name: "Kenya", emoji: "🇰🇪" },
  { code: "+82", name: "South Korea", emoji: "🇰🇷" },
  { code: "+965", name: "Kuwait", emoji: "🇰🇼" },
  { code: "+961", name: "Lebanon", emoji: "🇱🇧" },
  { code: "+60", name: "Malaysia", emoji: "🇲🇾" },
  { code: "+52", name: "Mexico", emoji: "🇲🇽" },
  { code: "+212", name: "Morocco", emoji: "🇲🇦" },
  { code: "+95", name: "Myanmar", emoji: "🇲🇲" },
  { code: "+31", name: "Netherlands", emoji: "🇳🇱" },
  { code: "+64", name: "New Zealand", emoji: "🇳🇿" },
  { code: "+234", name: "Nigeria", emoji: "🇳🇬" },
  { code: "+47", name: "Norway", emoji: "🇳🇴" },
  { code: "+968", name: "Oman", emoji: "🇴🇲" },
  { code: "+92", name: "Pakistan", emoji: "🇵🇰" },
  { code: "+63", name: "Philippines", emoji: "🇵🇭" },
  { code: "+48", name: "Poland", emoji: "🇵🇱" },
  { code: "+351", name: "Portugal", emoji: "🇵🇹" },
  { code: "+974", name: "Qatar", emoji: "🇶🇦" },
  { code: "+40", name: "Romania", emoji: "🇷🇴" },
  { code: "+966", name: "Saudi Arabia", emoji: "🇸🇦" },
  { code: "+65", name: "Singapore", emoji: "🇸🇬" },
  { code: "+27", name: "South Africa", emoji: "🇿🇦" },
  { code: "+34", name: "Spain", emoji: "🇪🇸" },
  { code: "+94", name: "Sri Lanka", emoji: "🇱🇰" },
  { code: "+46", name: "Sweden", emoji: "🇸🇪" },
  { code: "+41", name: "Switzerland", emoji: "🇨🇭" },
  { code: "+886", name: "Taiwan", emoji: "🇹🇼" },
  { code: "+66", name: "Thailand", emoji: "🇹🇭" },
  { code: "+90", name: "Turkey", emoji: "🇹🇷" },
  { code: "+971", name: "United Arab Emirates", emoji: "🇦🇪" },
  { code: "+44", name: "United Kingdom", emoji: "🇬🇧" },
  { code: "+84", name: "Vietnam", emoji: "🇻🇳" }
].sort((a, b) => a.name.localeCompare(b.name));

export const PhoneInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(countryCodes.find(c => c.code === '+62') || countryCodes[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countryCodes.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.includes(search)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    // Only allow numbers, spaces, and hyphens
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9\s\-]/g, '');
    if (props.onInput) props.onInput(e);
  };

  return (
    <div className="flex w-full gap-2 relative">
      <input type="hidden" name="countryCode" value={selected.code} />
      
      {/* Custom Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-[90px] sm:w-[105px] shrink-0 items-center justify-between rounded-md border border-gray-300 bg-white px-2 sm:px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-900 transition-colors hover:bg-gray-50"
        >
          <span className="truncate flex items-center gap-1.5">
            <span className="text-base leading-none">{selected.emoji}</span>
            <span className="font-medium text-xs sm:text-sm">{selected.code}</span>
          </span>
          <svg className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-[260px] rounded-lg border border-gray-100 bg-white p-1 shadow-xl max-h-[320px] flex flex-col">
            <div className="p-2 border-b border-gray-50">
              <div className="relative">
                <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search country or code..." 
                  className="w-full text-sm rounded-md bg-gray-50 pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-900 border border-transparent focus:border-emerald-200 transition-colors"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ul className="overflow-y-auto p-1 flex-1 custom-scrollbar">
              {filteredCountries.length > 0 ? filteredCountries.map(c => (
                <li 
                  key={c.name}
                  onClick={() => {
                    setSelected(c);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors ${
                    selected.name === c.name 
                      ? 'bg-emerald-50 text-emerald-950 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-950'
                  }`}
                >
                  <span className="text-lg leading-none">{c.emoji}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-gray-400 text-xs font-mono">{c.code}</span>
                </li>
              )) : (
                <li className="px-3 py-6 text-sm text-gray-500 text-center flex flex-col items-center gap-2">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>No results found</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <Input 
        {...props} 
        ref={ref} 
        type="tel" 
        className="flex-1" 
        onInput={handleInput}
      />
    </div>
  )
});

PhoneInput.displayName = 'PhoneInput';
