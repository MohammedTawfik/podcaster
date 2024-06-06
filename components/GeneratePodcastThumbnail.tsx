import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import useGeneratePodcastThumbnail from "@/hooks/GeneratePodcastThumbnailHook";

const GeneratePodcastThumbnail = ({
  setImage,
  setImageStorageId,
  imageUrl,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAIThumbnail, setIsAIThumbnail] = useState(false);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const { toast } = useToast();
  const imageRef = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getPodcastUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageProcessing(true);
    setImage("");

    try {
      const file = new File([blob], fileName, { type: "image/png" });
      const uploadStatus = await startUpload([file]);
      const storageId = (uploadStatus[0].response as any).storageId;
      setImageStorageId(storageId);
      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageProcessing(false);
      toast({
        title: "Image Uploaded",
        description: "Image has been successfully uploaded",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error uploading image",
        description: "Failed to upload image",
        variant: "destructive",
      });
      setIsImageProcessing(false);
    }
  };
  const generatePodcastThumbnail = async () => {};
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((buffer) => {
        return new Blob([buffer], { type: "image/png" });
      });
      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error uploading image",
        description: "Failed to upload image",
        variant: "destructive",
      });
      setIsImageProcessing(false);
    }
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          className={cn("", { "bg-black-6": isAIThumbnail })}
          onClick={() => setIsAIThumbnail(true)}
        >
          Use AI to generate thumbnail
        </Button>

        <Button
          type="button"
          variant="plain"
          className={cn("", { "bg-black-6": !isAIThumbnail })}
          onClick={() => setIsAIThumbnail(false)}
        >
          Upload custom image
        </Button>
      </div>

      {isAIThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className=" mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI Prompt to Generate Podcast Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder="Provide text to generate thumbnail"
              rows={5}
              value={prompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="submit"
              className="text-16 bg-orange-1 text-white-1 py-4 font-bold"
              onClick={generatePodcastThumbnail}
            >
              {isImageProcessing ? (
                <>
                  Generating...
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="image_div"
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageProcessing ? (
            <Image
              src="/icons/upload-image.svg"
              alt="Upload"
              width={40}
              height={40}
            />
          ) : (
            <div className="flex-center text-16 font-medium text-white-1">
              Uploading
              <Loader size={20} className="animate-spin" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-orange-1 font-bold text-12 ">
              Click to upload
            </h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG or GIF (max. 1080x1080px){" "}
            </p>
          </div>
        </div>
      )}
      {imageUrl && (
        <div className="flex-center w-full">
          <Image
            src={imageUrl}
            alt="Thumbnail"
            width={200}
            height={200}
            className="mt-5"
          />
        </div>
      )}
    </>
  );
};

export default GeneratePodcastThumbnail;
