import { useEffect, useState } from 'react';

const useImageUpload = () => {
    const [imageBase64, setImageBase64] = useState<string>("");
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

    const storedImage = localStorage.getItem('updatedProfileImage');
    const storedBlogImage = localStorage.getItem('updatedBlogImage');
    useEffect(() => {
        if (storedImage) {
            setImageBase64(storedImage);
            setIsFileUploaded(true);
        }

        if (storedBlogImage) {
            setImageBase64(storedBlogImage);
            setIsFileUploaded(true);
        }
    }, [storedImage, storedBlogImage]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const base64Image = await convertToBase64(file);
        setImageBase64(base64Image as string);
        setIsFileUploaded(true);
        localStorage.setItem('updatedProfileImage', base64Image as string);
        localStorage.setItem('updatedBlogImage', base64Image as string);
    };

    const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return { imageBase64, setImageBase64, isFileUploaded, handleFileUpload };
};

export default useImageUpload;

