import { useState } from 'react';
import ImageUploading, { type ImageListType } from "react-images-uploading";
import './uploadButton.styles.css';
import Modal from '../Modal/Modal.tsx';

export function UploadButton({sendUploadData, images, setImages}: any) {
    const maxNumber = 1;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const modalInstructions = <p>INSTRUCTIONS</p>;

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    }

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        // send the dataUrl only if there is one
        if(imageList.length == 1){
            sendUploadData(imageList[0].dataURL);
        } else {
            sendUploadData(null)
        }
    };

    return (
        <div className="UploadButton">
        <ImageUploading
            multiple={false}
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
        >
        {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
        }) => (
        <div>
            {/* Hides the button if an image is uploaded */}
            {isDialogOpen && (
                <Modal
                    isOpen={isDialogOpen}
                    onOpenChange={handleDialogClose}
                    title='Organic Matter Analysis'
                    children={modalInstructions}
                    modalStyle={{ width: '85vw' }}
                />
            )}
            {images.length === 0 && (
            <button className="customUploadButton"
                style={isDragging ? { color: "red" } : undefined}
                onClick={() => {
                        handleDialogOpen();
                        onImageUpload();
                    }}
                {...dragProps}
            >
                Add Image
            </button>
            )}
            {imageList.map((image, index) => (
                <div key={index} className="image-item">
                    <div className="image-item__btn-wrapper btn-wrapper-margin">
                        <button className="customUpdateButton" onClick={() => {
                            handleDialogOpen();
                            onImageUpdate(index);
                        }}>Update</button>
                        <button className="customRemoveButton" onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                    <img className="uploadedImg" src={image.dataURL} alt="" width="100" />
                </div>
            ))}
        </div>
            )}
            </ImageUploading>
        </div>
    );
}
