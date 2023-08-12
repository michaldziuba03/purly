'use client';
import { Calendar, BarChart2 } from 'lucide-react';
import React from 'react';

export function Link() {
  return (
    <div className="flex bg-white rounded-lg p-8 w-full">
      <div className="flex gap-4">
        <div className="rounded-full flex justify-center items-center border w-12 h-12">
          <img
            alt="fav"
            src="https://www.google.com/s2/favicons?domain=www.google.com&sz=32"
          />
        </div>
        <div className="flex flex-col gap-2">
          <a className="scroll-m-20 text-lg font-semibold tracking-tight hover:underline">
            Google website
          </a>
          <a
            className="text-sm text-blue-600 font-semibold hover:underline"
            href="http://localhost:4200/xYz2"
          >
            http://localhost:4200/xYz2
          </a>

          <a className="text-sm hover:underline" href="https://www.google.com">
            https://www.google.com
          </a>

          <div className="flex gap-4 items-center mt-6 text-muted-foreground text-sm font-medium">
            <div className="flex gap-1.5 items-center">
              <Calendar className="w-4 h-4" />
              Jun 17, 2023
            </div>

            <div className="flex gap-1.5 items-center cursor-pointer">
              <BarChart2 className="w-4 h-4" />
              Stats
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
