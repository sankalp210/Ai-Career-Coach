import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { File } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function ResumeUploadDialog({
  openResumeUpload,
  setOpenResumeDialog,
  onResumeUploaded,
}: any) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const recordId = uuidv4();
    const formData = new FormData();
    formData.append("recordId", recordId);
    formData.append("resumeFile", selectedFile);

    try {
      const res = await axios.post("/api/ai-resume-agent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log("Upload success", res.data);
        setOpenResumeDialog(false);
        onResumeUploaded(recordId);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Resume PDF File</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <label
            htmlFor="resumeUpload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <File className="w-8 h-8 text-gray-500" />
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {selectedFile
                ? selectedFile.name
                : "Click here to Upload PDF file"}
            </p>

            <input
              type="file"
              accept=".pdf"
              id="resumeUpload"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            disabled={isUploading}
            onClick={() => {
              setSelectedFile(null);
              setOpenResumeDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedFile || isUploading}
            onClick={handleUploadAndAnalyze}
            className="bg-black text-white hover:bg-gray-800"
          >
            {isUploading ? "Uploading..." : "Upload & Analyze"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeUploadDialog;
