import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import './uploadButton.styles.css';

export function UploadButton({sendUploadData}: any) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const instructionText = "In 10-15 randomly selected areas of the field, take a photo of an approximately 1 ft by 1 ft (30 by 30 cm) square of the soil surface.";

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
            {images.length === 0 && (
            <button className="customUploadButton"
                style={isDragging ? { color: "red" } : undefined}
                onClick={() => {
                    alert(instructionText);
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
                            alert(instructionText);
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
