"use client"

import { useState, useCallback } from "react"
import { Upload, Image as ImageIcon, X, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadSectionProps {
  onAnalyze: (file: File) => void
  isAnalyzing: boolean
}

export function UploadSection({ onAnalyze, isAnalyzing }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return

    setFile(selectedFile)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        handleFile(droppedFile)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        handleFile(selectedFile)
      }
    },
    [handleFile]
  )

  const clearFile = useCallback(() => {
    setFile(null)
    setPreview(null)
  }, [])

  return (
    <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Upload Label</h2>
          <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
        </div>
      </div>

      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-xl p-8 lg:p-12 transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">
              Drop your nutrition label here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse from your device
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, WEBP up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative rounded-xl overflow-hidden border border-border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain bg-secondary"
            />
            <button
              onClick={clearFile}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* File info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {file?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {file && (file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* Analyze button */}
          <Button
            onClick={() => file && onAnalyze(file)}
            disabled={isAnalyzing}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 h-12"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze Label
              </>
            )}
          </Button>
        </div>
      )}

      {/* Analysis status */}
      {isAnalyzing && (
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">AI Processing</p>
              <p className="text-xs text-muted-foreground">Analyzing your nutrition label...</p>
            </div>
          </div>
          <div className="space-y-2">
            {["Detecting label", "Extracting nutrients", "Calculating health score"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
