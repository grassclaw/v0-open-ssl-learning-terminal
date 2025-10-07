"use client"

import type { Module } from "@/lib/module-data"

interface ContentBlockProps {
  module: Module
}

export default function ContentBlock({ module }: ContentBlockProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">{module.title}</h2>
      <div className="space-y-4 text-gray-700 min-h-[400px]">{module.content}</div>
    </div>
  )
}
