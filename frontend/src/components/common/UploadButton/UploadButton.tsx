import { useState } from 'react';
import ImageUploading, { type ImageListType } from "react-images-uploading";
import './uploadButton.styles.css';
import Modal from '../Modal/Modal.tsx';

export function UploadButton({sendUploadData, images, setImages, instructions, hideImageAfterUpload}: any) {
    const maxNumber = 1;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [buttonPress, setButtonPress] = useState("Upload");
    const [updateIndex, setUpdateIndex] = useState(0);

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

    // DOES NOT WORK ON DIFFERENT PHONE SIZES
    // let instructionLength = instructions.props.children.length;
    // if (instructions.props.children.length === 2) {
    //     instructionLength = instructions.props.children[0].props.children.length;
    // }

    //const modalStyle = instructionLength > 300 ? { width: '85vw', height: '72vh', overflow: 'scroll'} : { width: '85vw' };

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
                    onOpenChange={() => {
                        setIsDialogOpen(false); 
                        if (buttonPress == "Upload") {
                            onImageUpload();
                        }
                        else if (buttonPress == "Update") {
                            onImageUpdate(updateIndex);
                        }
                    }}
                    title='Instructions'
                    children={instructions}
                    modalStyle={{ width: '85vw' }}
                />
            )}
            {images.length === 0 && (
            <button className="customUploadButton"
                style={isDragging ? { color: "red" } : undefined}
                onClick={() => {
                        setIsDialogOpen(true);
                        setButtonPress("Upload");
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
                            setIsDialogOpen(true);
                            setButtonPress("Update");
                            setUpdateIndex(index);
                        }}>Update</button>
                        <button className="customRemoveButton" onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                    <img className={`uploadedImg ${hideImageAfterUpload ? 'hidden' : ''}`} src={image.dataURL} alt="" width="100" />
                </div>
            ))}
        </div>
            )}
            </ImageUploading>
        </div>
    );
}
